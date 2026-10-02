"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { Invoice } from "@/lib/invoice-store";
import { SITE_CONFIG } from "@/config/studio-data";
import { 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  FileText, 
  CreditCard,
  Building2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  Download,
  AlertCircle
} from "lucide-react";

interface InvoiceViewProps {
  initialInvoiceId?: string;
}

export function InvoiceViewComponent({ initialInvoiceId }: InvoiceViewProps) {
  const searchParams = useSearchParams();
  const { playHover, playClick } = useSound();
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const idParam = initialInvoiceId || searchParams.get("id");
    const projParam = searchParams.get("project");
    const pkgParam = searchParams.get("package");

    async function loadInvoice() {
      try {
        let apiUrl = "";
        if (idParam) apiUrl = `/api/invoice?id=${encodeURIComponent(idParam)}`;
        else if (projParam) apiUrl = `/api/invoice?project=${encodeURIComponent(projParam)}`;

        if (apiUrl) {
          const res = await fetch(apiUrl);
          const data = await res.json();
          if (res.ok && data.invoice) {
            setInvoice(data.invoice);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("API fetch invoice warning:", e);
      }

      setErrorMsg('Invoice record not found.');
        setLoading(false);
      }

    loadInvoice();
  }, [initialInvoiceId, searchParams]);

  const handlePrint = () => {
    playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        <div className="p-8 border border-[#17191C]/20 bg-white">Loading Authoritative Invoice Record...</div>
      </div>
    );
  }

  if (!invoice || errorMsg) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] p-8 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white border-2 border-[#17191C] p-8 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-[#3457FF] mx-auto" />
          <h1 className="text-xl font-heading font-black uppercase">INVOICE NOT FOUND</h1>
          <p className="text-xs font-mono text-[#5A606A]">
            The requested invoice identifier could not be verified in the studio system.
          </p>
          <Link href="/" onClick={playClick}>
            <button className="px-6 py-2.5 bg-[#17191C] text-[#F4F1EA] text-xs font-mono font-bold uppercase hover:bg-[#3457FF] transition-all">
              RETURN TO BLAZEBYTE
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isAlreadyPaid = (invoice.status === "ADVANCE PAID" || invoice.status === "PROJECT ACTIVE" || invoice.status === "PAID IN FULL") &&
                        Boolean(invoice.razorpayPaymentId) &&
                        Number(invoice.advancePaid) > 0;

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] font-sans selection:bg-[#3457FF]/20 selection:text-[#17191C] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Printable Invoice Paper Frame */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-[#17191C] shadow-2xl p-6 sm:p-12 space-y-10 relative print:shadow-none print:border-none print:p-0">
        
        {/* Top Header & Branding */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#17191C] pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-tight text-[#17191C] uppercase">
                BLAZEBYTE
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border border-[#17191C] bg-[#17191C] text-[#F4F1EA] uppercase">
                STUDIO
              </span>
            </div>
            <p className="text-xs font-mono text-[#5A606A]">
              PRECISION DIGITAL EXPERIENCES â€¢ GROWTH â€¢ INTELLIGENT SYSTEMS
            </p>
            <div className="text-[11px] font-mono text-[#5A606A] pt-1 space-y-0.5">
              <div>Coimbatore, Tamil Nadu, India</div>
              <div>Domain: blazebyte.shop</div>
              <div>Email: blazebytestudio7@gmail.com</div>
              <div>WhatsApp: {SITE_CONFIG.contact.whatsappDisplay}</div>
              <div className="pt-1 font-bold text-[#17191C]">Udyam Reg: UDYAM-TN-03-0334061</div>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-2">
            <div className="inline-block px-3 py-1 bg-[#17191C] text-[#F4F1EA] font-mono text-xs font-bold uppercase tracking-wider">
              OFFICIAL STUDIO INVOICE
            </div>
            <div className="text-xl font-mono font-black text-[#17191C]">
              {invoice.invoiceId}
            </div>
            <div className="flex items-center sm:justify-end gap-2 text-xs font-mono">
              <span className="text-[#5A606A]">STATUS:</span>
              <span className={`px-2 py-0.5 font-bold uppercase border ${
                isAlreadyPaid 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300" 
                  : "bg-amber-50 text-amber-900 border-amber-300"
              }`}>
                {invoice.status}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F4F1EA] border border-[#17191C]/15 font-mono text-xs">
          <div>
            <span className="text-[#5A606A] text-[10px] block uppercase">INVOICE DATE</span>
            <span className="font-bold text-[#17191C]">{invoice.invoiceDate}</span>
          </div>
          <div>
            <span className="text-[#5A606A] text-[10px] block uppercase">PAYMENT DUE DATE</span>
            <span className="font-bold text-[#17191C]">{invoice.dueDate}</span>
          </div>
          <div>
            <span className="text-[#5A606A] text-[10px] block uppercase">PROJECT ID</span>
            <span className="font-bold text-[#3457FF]">{invoice.projectId}</span>
          </div>
          <div>
            <span className="text-[#5A606A] text-[10px] block uppercase">SERVICE CATEGORY</span>
            <span className="font-bold text-[#17191C]">{invoice.serviceCategory}</span>
          </div>
        </div>

        {/* Client & Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#17191C]/15 pb-8">
          
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>BILLED TO CLIENT</span>
            </div>
            <div className="space-y-1 font-sans">
              <div className="font-heading font-black text-lg text-[#17191C] uppercase">{invoice.clientName}</div>
              <div className="text-sm font-semibold text-[#5A606A]">{invoice.clientCompany}</div>
              <div className="text-xs font-mono text-[#5A606A]">{invoice.clientEmail}</div>
              <div className="text-xs font-mono text-[#5A606A]">{invoice.clientPhone}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>PROJECT SPECIFICATION</span>
            </div>
            <div className="space-y-1 font-sans">
              <div className="font-heading font-black text-lg text-[#17191C] uppercase">{invoice.projectName}</div>
              <div className="text-sm font-semibold text-[#5A606A]">Package: {invoice.selectedPackage}</div>
              <div className="text-xs font-mono text-[#5A606A]">Commercial Policy: 50% Advance Confirmation</div>
            </div>
          </div>

        </div>

        {/* Deliverable Scope Summary */}
        <div className="space-y-4 border-b border-[#17191C]/15 pb-8">
          <div className="text-xs font-mono font-bold text-[#17191C] uppercase tracking-wider">
            APPROVED PROJECT SCOPE & DELIVERABLES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {invoice.scopeSummary.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#17191C] p-2.5 bg-[#F4F1EA]/50 border border-[#17191C]/10">
                <CheckCircle2 className="w-4 h-4 text-[#3457FF] shrink-0 mt-0.5" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown & 50% Advance Table */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-[#17191C] uppercase tracking-wider">
            FINANCIAL BREAKDOWN & ADVANCE STRUCTURE
          </div>

          <div className="border-2 border-[#17191C] overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#17191C] text-[#F4F1EA] uppercase">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17191C]/15">
                <tr>
                  <td className="p-3 font-bold text-[#17191C]">
                    Total Project Value â€” {invoice.projectName} ({invoice.selectedPackage})
                  </td>
                  <td className="p-3 text-right font-bold text-[#17191C]">
                    â‚¹{invoice.totalAmount.toLocaleString("en-IN")}
                  </td>
                </tr>
                
                {/* 50% ADVANCE HIGHLIGHT ROW */}
                <tr className="bg-[#3457FF]/10 border-t-2 border-b-2 border-[#3457FF]">
                  <td className="p-4">
                    <div className="font-heading font-black text-sm text-[#17191C] uppercase">
                      PROJECT CONFIRMATION: 50% ADVANCE REQUIRED
                    </div>
                    <div className="text-[11px] text-[#5A606A] font-normal">
                      Mandatory advance payment required to initiate project discovery & technical architecture.
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-mono font-black text-lg text-[#3457FF]">
                      â‚¹{invoice.advanceRequired.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-[#3457FF] font-bold">
                      50% ADVANCE DUE
                    </div>
                  </td>
                </tr>

                {/* 50% BALANCE ROW */}
                <tr>
                  <td className="p-3">
                    <div className="font-bold text-[#17191C]">
                      PROJECT BALANCE: 50% AS PER AGREED DELIVERY TERMS
                    </div>
                    <div className="text-[10px] text-[#5A606A]">
                      Payable according to agreed milestone / final project approval delivery terms.
                    </div>
                  </td>
                  <td className="p-3 text-right font-bold text-[#5A606A]">
                    â‚¹{invoice.balanceRemaining.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Terms Section */}
        <div className="p-5 bg-[#F4F1EA] border border-[#17191C]/20 space-y-3 font-mono text-xs">
          <div className="font-bold text-[#17191C] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3457FF]" />
            <span>STUDIO COMMERCIAL PAYMENT TERMS</span>
          </div>
          <ul className="space-y-1.5 text-[#5A606A] text-[11px] leading-relaxed">
            {invoice.paymentTerms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons Section */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#17191C] print:hidden">
          <button
            onClick={handlePrint}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F4F1EA] hover:bg-[#17191C] text-[#17191C] hover:text-[#F4F1EA] border border-[#17191C] font-mono font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / DOWNLOAD INVOICE</span>
          </button>

          {!isAlreadyPaid ? (
            <Link
              href={`/pay?id=${invoice.invoiceId}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="w-full sm:w-auto px-8 py-4 bg-[#3457FF] hover:bg-[#3457FF]/90 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>PAY â‚¹{invoice.advanceRequired.toLocaleString("en-IN")} ADVANCE â†’</span>
            </Link>
          ) : (
            <div className="px-6 py-3.5 bg-emerald-100 text-emerald-900 border border-emerald-400 font-mono font-bold text-xs uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>50% ADVANCE CONFIRMED â€” PROJECT ACTIVE</span>
            </div>
          )}
        </div>

        {/* Trust Footer */}
        <div className="pt-6 border-t border-[#17191C]/10 font-mono text-[10px] text-[#5A606A] space-y-1">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="space-y-0.5">
              <p className="font-bold text-[#17191C]">BlazeByte Studio â€” Official Commercial Document</p>
              <p>Coimbatore, Tamil Nadu, India â€” blazebyte.shop â€” blazebytestudio7@gmail.com</p>
              <p>Udyam Registration: UDYAM-TN-03-0334061</p>
            </div>
            <div className="text-right space-y-0.5">
              <p>Payments via Razorpay â€” Secured & Encrypted</p>
              <p>Cancellation: Client may cancel within 24 hrs.</p>
              <p>Refund: 40% of amount actually paid.</p>
            </div>
          </div>
          <p className="text-center pt-2 border-t border-[#17191C]/10">{invoice.invoiceId} â€” Generated by BlazeByte Studio Commercial System</p>
        </div>

      </div>
    </div>
  );
}
