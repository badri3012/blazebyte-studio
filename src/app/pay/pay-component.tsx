"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { Invoice, getInvoiceById, getInvoiceByProjectId, PaymentReceipt } from "@/lib/invoice-store";
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  ArrowRight, 
  Building2, 
  FileText, 
  CreditCard,
  Rocket,
  RefreshCw,
  Sparkles
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PayComponent() {
  const searchParams = useSearchParams();
  const { playHover, playClick, playSuccess } = useSound();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentState, setPaymentState] = useState<"IDLE" | "SUCCESS" | "FAILED">("IDLE");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  useEffect(() => {
    const idParam = searchParams.get("id");
    const projParam = searchParams.get("project");

    let foundInvoice: Invoice | null = null;
    if (idParam) foundInvoice = getInvoiceById(idParam);
    else if (projParam) foundInvoice = getInvoiceByProjectId(projParam);
    
    // Default fallback
    if (!foundInvoice) foundInvoice = getInvoiceById("INV-BB-2026-1002");

    if (foundInvoice) {
      setInvoice(foundInvoice);
      if (foundInvoice.status === "ADVANCE PAID" || foundInvoice.status === "PROJECT ACTIVE" || foundInvoice.status === "PAID IN FULL") {
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
      }
    } else {
      setErrorMsg("Invoice record not found.");
    }
    setLoading(false);
  }, [searchParams]);

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    playClick();
    if (!invoice) return;

    setIsProcessing(true);
    setErrorMsg("");

    try {
      // 1. Create Razorpay order on server side
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: invoice.invoiceId,
          clientEmail: invoice.clientEmail,
          clientName: invoice.clientName
        })
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        setIsProcessing(false);
        if (orderData.alreadyPaid) {
          setPaymentState("SUCCESS");
          return;
        }
        setErrorMsg(orderData.error || "Failed to initialize secure checkout order.");
        setPaymentState("FAILED");
        return;
      }

      // 2. Test Mode Handler (Direct verification if Razorpay keys are placeholders)
      if (orderData.testMode) {
        console.log("[TEST MODE PAYMENT SIMULATION INITIATED]");
        
        const verifyRes = await fetch("/api/verify-razorpay-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invoiceId: invoice.invoiceId,
            razorpayOrderId: orderData.orderId,
            razorpayPaymentId: `pay_test_${Math.floor(100000 + Math.random() * 900000)}`,
            isTestMode: true
          })
        });

        const verifyData = await verifyRes.json();
        setIsProcessing(false);

        if (verifyRes.ok && verifyData.success) {
          playSuccess();
          setInvoice(verifyData.invoice);
          setReceipt(verifyData.receipt);
          setPaymentState("SUCCESS");
        } else {
          setErrorMsg(verifyData.error || "Server payment verification failed.");
          setPaymentState("FAILED");
        }
        return;
      }

      // 3. Real Razorpay Checkout Modal
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setIsProcessing(false);
        setErrorMsg("Failed to load Razorpay payment gateway. Check network connection.");
        setPaymentState("FAILED");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BLAZEBYTE STUDIO",
        description: `50% Advance — Invoice ${invoice.invoiceId}`,
        image: "https://blazebyte.store/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: invoice.clientName,
          email: invoice.clientEmail,
          contact: invoice.clientPhone
        },
        theme: {
          color: "#3457FF"
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-razorpay-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                invoiceId: invoice.invoiceId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            setIsProcessing(false);

            if (verifyRes.ok && verifyData.success) {
              playSuccess();
              setInvoice(verifyData.invoice);
              setReceipt(verifyData.receipt);
              setPaymentState("SUCCESS");
            } else {
              setErrorMsg(verifyData.error || "PAYMENT NOT COMPLETED: Verification failed.");
              setPaymentState("FAILED");
            }
          } catch (err) {
            console.error(err);
            setIsProcessing(false);
            setErrorMsg("PAYMENT NOT COMPLETED: Verification error.");
            setPaymentState("FAILED");
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setErrorMsg("Payment checkout session was cancelled by user. Project remains unactivated.");
            setPaymentState("FAILED");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      setErrorMsg("An unexpected connection error occurred.");
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
                className="w-full sm:w-auto px-6 py-3 bg-[#F4F1EA] text-[#17191C] border border-[#17191C] font-mono font-bold text-xs uppercase hover:bg-[#17191C] hover:text-[#F4F1EA] transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT PAYMENT RECEIPT</span>
              </button>

              <Link href={`/invoice?id=${invoice.invoiceId}`} onClick={playClick}>
                <button className="w-full sm:w-auto px-6 py-3 bg-[#3457FF] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF]/90 transition-all flex items-center justify-center gap-2">
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
                <p className="text-[11px] text-red-800 font-sans">
                  {errorMsg || "Your project has not been activated yet. Please verify payment details and try again."}
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
                    <span>INITIALIZING SECURE CHECKOUT...</span>
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
