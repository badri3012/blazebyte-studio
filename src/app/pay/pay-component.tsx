"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { Invoice, PaymentReceipt } from "@/lib/invoice-store";
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  FileText, 
  CreditCard,
  Rocket,
  RefreshCw
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PayComponentProps {
  initialInvoiceId?: string;
}

export function PayComponent({ initialInvoiceId }: PayComponentProps = {}) {
  const searchParams = useSearchParams();
  const { playHover, playClick, playSuccess } = useSound();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentState, setPaymentState] = useState<"IDLE" | "SUCCESS" | "FAILED">("IDLE");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  useEffect(() => {
    const idParam = initialInvoiceId || searchParams.get("id");
    const projParam = searchParams.get("project");

    async function loadInvoiceData() {
      let foundInvoice: Invoice | null = null;
      
      try {
        let apiUrl = "";
        if (idParam) apiUrl = `/api/invoice?id=${encodeURIComponent(idParam)}`;
        else if (projParam) apiUrl = `/api/invoice?project=${encodeURIComponent(projParam)}`;

        if (apiUrl) {
          const res = await fetch(apiUrl);
          const data = await res.json();
          if (res.ok && data.invoice) {
            foundInvoice = data.invoice;
          }
        }
      } catch (e) {
        console.warn("API invoice fetch fallback:", e);
      }

      if (foundInvoice) {
        setInvoice(foundInvoice);
        const isVerifiedPaid = (foundInvoice.status === "ADVANCE PAID" || foundInvoice.status === "PAID IN FULL" || foundInvoice.status === "PROJECT ACTIVE") &&
                               Boolean(foundInvoice.razorpayPaymentId) &&
                               Number(foundInvoice.advancePaid) > 0;

        if (isVerifiedPaid) {
          setPaymentState("SUCCESS");
          if (foundInvoice.receiptId) {
            setReceipt({
              receiptId: foundInvoice.receiptId,
              invoiceId: foundInvoice.invoiceId,
              projectId: foundInvoice.projectId,
              clientName: foundInvoice.clientName,
              clientCompany: foundInvoice.clientCompany,
              clientEmail: foundInvoice.clientEmail,
              amountPaid: foundInvoice.advancePaid,
              paymentType: "50% PROJECT ADVANCE",
              paymentMethod: "Razorpay Online Gateway",
              paymentReference: foundInvoice.razorpayPaymentId || "PAY_CONFIRMED",
              paymentDate: foundInvoice.paymentDate || new Date().toISOString(),
              status: "PAID",
              balanceRemaining: foundInvoice.balanceRemaining
            });
          }
        } else {
          setPaymentState("IDLE");
        }
      } else {
        setErrorMsg("Invoice record not found.");
      }
      setLoading(false);
    }

    loadInvoiceData();
  }, [searchParams]);

  // Dynamically load Razorpay SDK and await
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        console.log("[RAZORPAY SCRIPT LOG] window.Razorpay is already present in DOM.");
        resolve(true);
        return;
      }
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        console.log("[RAZORPAY SCRIPT LOG] Script tag exists in DOM, waiting for onload...");
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        setTimeout(() => resolve(typeof window !== "undefined" && Boolean(window.Razorpay)), 2000);
        return;
      }
      console.log("[RAZORPAY SCRIPT LOG] Creating script tag dynamically...");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("[RAZORPAY SCRIPT LOG] Script loaded successfully.");
        resolve(true);
      };
      script.onerror = (err) => {
        console.error("[RAZORPAY SCRIPT ERROR] Failed to load checkout.js script:", err);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    playClick();
    if (!invoice) return;

    setIsProcessing(true);
    setErrorMsg("");

    console.log("[PAYMENT STEP 1] Initiating payment flow for invoice:", invoice.invoiceId);

    try {
      // 1. Create Razorpay order on server side (Authoritative server-calculated 50% advance)
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: invoice.invoiceId,
          clientEmail: invoice.clientEmail,
          clientName: invoice.clientName
        })
      });

      const orderData = await res.json().catch(() => ({ error: "Invalid JSON response from server" }));

      console.error("[PAYMENT STEP 1 DEBUG] create-order response status:", res.status, "Response payload:", orderData);

      if (!res.ok || !orderData.success) {
        setIsProcessing(false);
        if (orderData.alreadyPaid) {
          const checkRes = await fetch(`/api/invoice?id=${encodeURIComponent(invoice.invoiceId)}`);
          const checkData = await checkRes.json();
          const isVerified = checkRes.ok && 
                             (checkData.invoice?.status === "ADVANCE PAID" || checkData.invoice?.status === "PAID IN FULL") && 
                             Boolean(checkData.invoice?.razorpayPaymentId) && 
                             Number(checkData.invoice?.advancePaid) > 0;
          if (isVerified) {
            setInvoice(checkData.invoice);
            setPaymentState("SUCCESS");
            return;
          }
        }
        const errMsg = orderData.error || `Server error (${res.status}) initializing checkout order.`;
        console.error("[PAYMENT FAILED] create-order error:", errMsg);
        setErrorMsg(`ORDER CREATION FAILED: ${errMsg}`);
        setPaymentState("FAILED");
        return;
      }

      // Requirement 4: Confirm frontend uses exact property names: orderId, amount, currency, keyId
      const { orderId, amount, currency, keyId } = orderData;

      console.log("[PAYMENT STEP 2] Verified order payload keys:", {
        hasOrderId: Boolean(orderId),
        hasAmount: Boolean(amount),
        currency,
        keyIdPrefix: keyId ? keyId.substring(0, 8) : "MISSING"
      });

      if (!orderId || !keyId || !amount) {
        const errMsg = "Server response missing required orderId, amount, or keyId parameters.";
        console.error("[PAYMENT FAILED]", errMsg, orderData);
        setIsProcessing(false);
        setErrorMsg(`INVALID ORDER RESPONSE: ${errMsg}`);
        setPaymentState("FAILED");
        return;
      }

      // Requirement 3: Ensure checkout.js loaded dynamically and awaited BEFORE new window.Razorpay(options).open()
      console.log("[PAYMENT STEP 3] Awaiting Razorpay script load...");
      const isLoaded = await loadRazorpayScript();

      console.error("[PAYMENT STEP 3 DEBUG] checkout.js script loaded:", isLoaded, "window.Razorpay exists:", typeof window !== "undefined" && Boolean(window.Razorpay));

      if (!isLoaded || typeof window === "undefined" || !window.Razorpay) {
        const errMsg = "Unable to load Razorpay payment gateway script (checkout.js). Check network/ad-blocker settings.";
        console.error("[PAYMENT FAILED]", errMsg);
        setIsProcessing(false);
        setErrorMsg(`GATEWAY SCRIPT LOAD FAILED: ${errMsg}`);
        setPaymentState("FAILED");
        return;
      }

      // Requirement 1 & 2: Construct options object and log keys
      const options = {
        key: keyId,
        amount: amount,
        currency: currency || "INR",
        name: "BLAZEBYTE STUDIO",
        description: `50% Advance — Invoice ${invoice.invoiceId}`,
        image: "https://blazebyte.shop/images/logo.png",
        order_id: orderId,
        prefill: {
          name: invoice.clientName,
          email: invoice.clientEmail,
          contact: invoice.clientPhone
        },
        theme: {
          color: "#3457FF"
        },
        handler: async function (response: any) {
          console.log("[PAYMENT STEP 4] Razorpay modal completed payment. Received handler payload:", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            hasSignature: Boolean(response.razorpay_signature)
          });

          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                invoiceId: invoice.invoiceId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            console.error("[PAYMENT VERIFY DEBUG] Verify response status:", verifyRes.status, "Payload:", verifyData);

            if (verifyRes.ok && verifyData.verified === true && verifyData.success === true) {
              // Reload authoritative invoice from server
              const reloadRes = await fetch(`/api/invoice?id=${encodeURIComponent(invoice.invoiceId)}`);
              const reloadData = await reloadRes.json();

              const isReloadVerified = reloadRes.ok && 
                                       (reloadData.invoice?.status === "ADVANCE PAID" || reloadData.invoice?.status === "PAID IN FULL") && 
                                       Boolean(reloadData.invoice?.razorpayPaymentId) && 
                                       Number(reloadData.invoice?.advancePaid) > 0;

              if (isReloadVerified) {
                playSuccess();
                setInvoice(reloadData.invoice);
                if (verifyData.receipt) setReceipt(verifyData.receipt);
                setPaymentState("SUCCESS");
              } else {
                const msg = "Payment verified by server, but database re-query did not reflect advance payment. Status remains AWAITING ADVANCE.";
                console.error("[PAYMENT FAILED]", msg);
                setErrorMsg(`VERIFICATION DISCREPANCY: ${msg}`);
                setPaymentState("FAILED");
              }
            } else {
              const msg = verifyData.error || "Server signature verification failed.";
              console.error("[PAYMENT FAILED]", msg);
              setErrorMsg(`VERIFICATION REJECTED: ${msg}`);
              setPaymentState("FAILED");
            }
          } catch (err: any) {
            console.error("[PAYMENT VERIFY EXCEPTION]", err);
            setErrorMsg(`VERIFICATION EXCEPTION: ${err.message || "Server verification error."}`);
            setPaymentState("FAILED");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("[PAYMENT MODAL DISMISSED] Razorpay modal closed by user.");
            setIsProcessing(false);
            setErrorMsg("CHECKOUT CANCELLED: Payment modal was closed before completing payment. The project remains in 'AWAITING ADVANCE' state.");
            setPaymentState("FAILED");
          }
        }
      };

      console.error("[PAYMENT STEP 4 DEBUG] Razorpay Options Keys:", Object.keys(options));

      // 4. Open Razorpay Standard Checkout Modal
      try {
        console.log("[PAYMENT STEP 5] Instantiating window.Razorpay(options)...");
        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (resp: any) {
          console.error("[RAZORPAY SDK PAYMENT FAILED]", resp);
          setIsProcessing(false);
          setErrorMsg(`RAZORPAY PAYMENT FAILED: ${resp.error?.description || resp.error?.reason || "Payment declined."}`);
          setPaymentState("FAILED");
        });

        console.log("[PAYMENT STEP 6] Calling rzp.open()...");
        rzp.open();
      } catch (rzpOpenErr: any) {
        console.error("[RAZORPAY OPEN THREW EXCEPTION]", rzpOpenErr);
        setIsProcessing(false);
        setErrorMsg(`RAZORPAY MODAL OPEN FAILED: ${rzpOpenErr.message || "Failed to launch payment window."}`);
        setPaymentState("FAILED");
      }

    } catch (error: any) {
      console.error("[PAYMENT UNHANDLED EXCEPTION]", error);
      setIsProcessing(false);
      setErrorMsg(`UNEXPECTED PAYMENT ERROR: ${error.message || "Connection error."}`);
      setPaymentState("FAILED");
    }
  };

  const handlePrintReceipt = () => {
    playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Payment Confirmation Environment...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] p-8 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white border-2 border-[#17191C] p-8 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-[#3457FF] mx-auto" />
          <h1 className="text-xl font-heading font-black uppercase">INVALID INVOICE</h1>
          <p className="text-xs font-mono text-[#5A606A]">
            No valid project invoice found for payment processing.
          </p>
          <Link href="/" onClick={playClick}>
            <button className="px-6 py-2.5 bg-[#17191C] text-[#F4F1EA] text-xs font-mono font-bold uppercase hover:bg-[#3457FF]">
              RETURN HOME
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] font-sans selection:bg-[#3457FF]/20 selection:text-[#17191C] py-12 px-4 sm:px-6 lg:px-8">
      {/* Requirement 3: Load checkout.js via next/script with strategy "afterInteractive" */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Strip */}
        <div className="border-b-2 border-[#17191C] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-tight text-[#17191C] uppercase">
                BLAZEBYTE
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border border-[#17191C] bg-[#17191C] text-[#F4F1EA] uppercase">
                STUDIO
              </span>
            </div>
            <p className="text-xs font-mono text-[#5A606A] mt-1">
              SECURE PROJECT PAYMENT & ACTIVATION PORTAL
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#17191C] text-[#F4F1EA] font-mono text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5 text-[#3457FF]" />
            <span>RAZORPAY VERIFIED</span>
          </div>
        </div>

        {/* --- STATE 01: SUCCESS STATE (Payment Confirmed & Receipt) --- */}
        {paymentState === "SUCCESS" && (
          <div className="bg-white border-2 border-[#17191C] p-8 sm:p-12 shadow-2xl space-y-8 print:shadow-none print:border-none print:p-0">
            
            <div className="border-b-2 border-emerald-600 pb-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-mono text-xs font-bold uppercase border border-emerald-300 inline-block">
                PAYMENT RECEIVED — PROJECT CONFIRMED
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-[#17191C] uppercase">
                PROJECT ACTIVATED
              </h1>
              <p className="text-xs font-mono text-[#5A606A] max-w-md mx-auto">
                Your 50% project advance has been verified server-side. Development and technical architecture timelines have officially commenced.
              </p>
            </div>

            {/* Official Payment Receipt Breakdown */}
            <div className="p-6 bg-[#F4F1EA] border border-[#17191C]/20 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#17191C]/15 pb-3">
                <span className="font-bold text-[#17191C] uppercase">OFFICIAL PAYMENT RECEIPT</span>
                <span className="text-[#3457FF] font-bold">{receipt?.receiptId || invoice.receiptId || "RCPT-VERIFIED"}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">INVOICE NUMBER</span>
                  <span className="font-bold text-[#17191C]">{invoice.invoiceId}</span>
                </div>
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">PROJECT ID</span>
                  <span className="font-bold text-[#3457FF]">{invoice.projectId}</span>
                </div>
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">CLIENT NAME</span>
                  <span className="font-bold text-[#17191C]">{invoice.clientName}</span>
                </div>
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">PAYMENT METHOD</span>
                  <span className="font-bold text-[#17191C]">Razorpay Online</span>
                </div>
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">RAZORPAY PAYMENT ID</span>
                  <span className="font-bold text-[#3457FF]">{invoice.razorpayPaymentId || receipt?.paymentReference || "pay_verified"}</span>
                </div>
                <div>
                  <span className="text-[#5A606A] text-[10px] block uppercase">PAYMENT DATE</span>
                  <span className="font-bold text-[#17191C]">{invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleDateString("en-IN") : "Today"}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#17191C]/15 grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-emerald-400">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase">50% ADVANCE PAID</span>
                  <span className="text-lg font-black text-emerald-700">₹{invoice.advanceRequired.toLocaleString("en-IN")}</span>
                </div>
                <div className="p-3 bg-white border border-[#17191C]/15">
                  <span className="text-[10px] text-[#5A606A] font-bold block uppercase">REMAINING BALANCE</span>
                  <span className="text-lg font-black text-[#17191C]">₹{invoice.balanceRemaining.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Next Milestone Information */}
            <div className="p-4 bg-[#17191C] text-[#F4F1EA] space-y-2 font-mono text-xs">
              <div className="text-[#3457FF] font-bold uppercase flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                <span>NEXT STEP: STAGE 01 KICKOFF</span>
              </div>
              <p className="text-[#A5A5A5] text-[11px] leading-relaxed">
                Our lead engineer will reach out via WhatsApp/Email to schedule the technical discovery blueprint call within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 print:hidden">
              <button
                onClick={handlePrintReceipt}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-6 py-3 bg-[#F4F1EA] text-[#17191C] border border-[#17191C] font-mono font-bold text-xs uppercase hover:bg-[#17191C] hover:text-[#F4F1EA] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT PAYMENT RECEIPT</span>
              </button>

              <Link href={`/invoice?id=${invoice.invoiceId}`} onClick={playClick}>
                <button className="w-full sm:w-auto px-6 py-3 bg-[#3457FF] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF]/90 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>VIEW INVOICE RECORD →</span>
                </button>
              </Link>
            </div>

          </div>
        )}

        {/* --- STATE 02: IDLE OR FAILED PAYMENT FORM --- */}
        {paymentState !== "SUCCESS" && (
          <div className="bg-white border-2 border-[#17191C] p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Failure Alert Banner */}
            {paymentState === "FAILED" && (
              <div className="p-4 bg-red-50 border-2 border-red-600 text-red-900 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold uppercase text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>PAYMENT NOT COMPLETED</span>
                </div>
                <p className="text-[11px] text-red-800 font-sans break-words font-mono font-semibold">
                  {errorMsg || "Your project has not been activated yet. The invoice remains in 'AWAITING ADVANCE' state."}
                </p>
              </div>
            )}

            {/* Commercial Summary Box */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>COMMERCIAL PAYMENT SUMMARY</span>
              </div>

              <div className="p-5 bg-[#F4F1EA] border border-[#17191C]/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#17191C]/15 pb-3 gap-2">
                  <div>
                    <h2 className="font-heading font-black text-xl text-[#17191C] uppercase">{invoice.projectName}</h2>
                    <p className="text-xs font-mono text-[#5A606A]">Package: {invoice.selectedPackage} ({invoice.serviceCategory})</p>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs">
                    <span className="text-[#5A606A] text-[10px] block uppercase">INVOICE NUMBER</span>
                    <span className="font-bold text-[#17191C]">{invoice.invoiceId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 bg-white border border-[#17191C]/15">
                    <span className="text-[#5A606A] text-[10px] block uppercase">TOTAL PROJECT VALUE</span>
                    <span className="text-base font-bold text-[#17191C]">₹{invoice.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 bg-white border-2 border-[#3457FF]">
                    <span className="text-[#3457FF] text-[10px] font-bold block uppercase">50% ADVANCE DUE</span>
                    <span className="text-lg font-black text-[#3457FF]">₹{invoice.advanceRequired.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#17191C]/15">
                    <span className="text-[#5A606A] text-[10px] block uppercase">BALANCE REMAINING</span>
                    <span className="text-base font-bold text-[#5A606A]">₹{invoice.balanceRemaining.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Verification Details */}
            <div className="p-4 bg-[#F4F1EA]/50 border border-[#17191C]/10 flex flex-wrap justify-between items-center text-xs font-mono text-[#5A606A] gap-4">
              <div>
                Client: <span className="text-[#17191C] font-bold">{invoice.clientName}</span> ({invoice.clientCompany})
              </div>
              <div>
                Email: <span className="text-[#17191C] font-bold">{invoice.clientEmail}</span>
              </div>
            </div>

            {/* Trust Assurance Statement */}
            <div className="p-4 bg-[#17191C] text-[#F4F1EA] space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 font-bold text-[#3457FF]">
                <ShieldCheck className="w-4 h-4" />
                <span>SERVER-AUTHENTICATED PAYMENT GATEWAY</span>
              </div>
              <p className="text-[#A5A5A5] text-[11px] leading-relaxed">
                Payments are processed through Razorpay using 256-bit SSL encryption. The 50% advance amount is authoritatively calculated server-side.
              </p>
            </div>

            {/* Checkout Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                onMouseEnter={playHover}
                className={`w-full py-4 bg-[#3457FF] hover:bg-[#3457FF]/90 text-white font-mono font-bold text-base uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${
                  isProcessing ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>OPENING SECURE RAZORPAY CHECKOUT...</span>
                  </>
                ) : paymentState === "FAILED" ? (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>TRY PAYMENT AGAIN (₹{invoice.advanceRequired.toLocaleString("en-IN")} ADVANCE) →</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>PAY ₹{invoice.advanceRequired.toLocaleString("en-IN")} ADVANCE →</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#5A606A]">
                <Link href={`/invoice?id=${invoice.invoiceId}`} className="hover:underline">
                  ← Return to Invoice Document
                </Link>
                <span>Direct Studio Support: blazebytestudio7@gmail.com</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
