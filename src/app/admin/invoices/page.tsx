"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSound } from "@/context/sound-context";
import { Invoice } from "@/lib/invoice-store";
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Search, 
  Printer, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2,
  DollarSign,
  UserCheck
} from "lucide-react";

export default function AdminInvoicesPage() {
  const { playHover, playClick } = useSound();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form State for New Invoice Creation
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectName, setProjectName] = useState("");
  const [serviceCategory, setServiceCategory] = useState<Invoice["serviceCategory"]>("Web");
  const [selectedPackage, setSelectedPackage] = useState("Custom Build");
  const [totalAmount, setTotalAmount] = useState<number>(30000);
  const [scopeInputs, setScopeInputs] = useState<string>(
    "Custom system architecture & technical wireframes\nHigh-performance production build\nQuality assurance testing & edge deployment"
  );

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch("/api/invoice?all=true");
      const data = await res.json();
      if (data.success && data.invoices) {
        setInvoices(data.invoices);
      } else {
        setInvoices([]);
      }
    } catch {
      setInvoices([]);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    const scopeArr = scopeInputs.split("\n").map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientCompany,
          clientEmail,
          clientPhone,
          projectName,
          serviceCategory,
          selectedPackage,
          totalAmount: Number(totalAmount),
          scopeSummary: scopeArr.length > 0 ? scopeArr : undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.invoice) {
        alert(`Invoice ${data.invoice.invoiceId} successfully created and persisted to Supabase database.`);
        fetchInvoices();
        setShowCreateModal(false);
      } else {
        alert(data.error || "Failed to create invoice.");
      }
    } catch {
      alert("Error creating invoice.");
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = 
      inv.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.projectId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "ALL") return matchesSearch;
    if (selectedFilter === "AWAITING") return matchesSearch && (inv.status === "AWAITING ADVANCE" || inv.status === "ISSUED");
    if (selectedFilter === "PAID") return matchesSearch && (inv.status === "ADVANCE PAID" || inv.status === "PROJECT ACTIVE" || inv.status === "PAID IN FULL");
    return matchesSearch;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8 font-sans bg-[#F4F1EA] text-[#17191C] min-h-screen">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#17191C] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl text-[#17191C] uppercase">
              BLAZEBYTE ADMIN
            </span>
            <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border border-[#17191C] bg-[#17191C] text-[#F4F1EA] uppercase">
              COMMERCIAL INVOICES
            </span>
          </div>
          <p className="text-xs font-mono text-[#5A606A] mt-1">
            Generate project quotations, issue invoices, monitor 50% advance payments, and verify client receipts.
          </p>
        </div>

        <button
          onClick={() => {
            playClick();
            setShowCreateModal(true);
          }}
          onMouseEnter={playHover}
          className="px-5 py-3 bg-[#3457FF] hover:bg-[#3457FF]/90 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>GENERATE NEW INVOICE</span>
        </button>
      </div>

      {/* Filter & Search Rail */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A606A]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Client, ID, or Project..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#17191C]/30 text-[#17191C] text-xs focus:border-[#3457FF] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "AWAITING", "PAID"].map((flt) => (
            <button
              key={flt}
              onClick={() => {
                playClick();
                setSelectedFilter(flt);
              }}
              className={`px-3 py-1.5 border font-bold uppercase transition-all cursor-pointer ${
                selectedFilter === flt
                  ? "bg-[#17191C] text-[#F4F1EA] border-[#17191C]"
                  : "bg-white text-[#5A606A] border-[#17191C]/20 hover:border-[#3457FF]"
              }`}
            >
              {flt} INVOICES
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white border-2 border-[#17191C] overflow-hidden shadow-xl">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#17191C] text-[#F4F1EA] uppercase">
            <tr>
              <th className="p-3">Invoice & Project ID</th>
              <th className="p-3">Client & Company</th>
              <th className="p-3">Service & Package</th>
              <th className="p-3 text-right">Total Value</th>
              <th className="p-3 text-right">50% Advance</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#17191C]/15">
            {filteredInvoices.map((inv) => {
              const isPaid = inv.status === "ADVANCE PAID" || inv.status === "PROJECT ACTIVE" || inv.status === "PAID IN FULL";
              return (
                <tr key={inv.invoiceId} className="hover:bg-[#F4F1EA]/50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-[#17191C]">{inv.invoiceId}</div>
                    <div className="text-[10px] text-[#3457FF]">{inv.projectId}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-[#17191C]">{inv.clientName}</div>
                    <div className="text-[10px] text-[#5A606A]">{inv.clientCompany}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-[#17191C]">{inv.projectName}</div>
                    <div className="text-[10px] text-[#5A606A]">{inv.selectedPackage} ({inv.serviceCategory})</div>
                  </td>
                  <td className="p-3 text-right font-bold text-[#17191C]">
                    ₹{inv.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 text-right font-bold text-[#3457FF]">
                    ₹{inv.advanceRequired.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 font-bold uppercase text-[10px] border ${
                      isPaid 
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300" 
                        : "bg-amber-50 text-amber-900 border-amber-300"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/invoice?id=${inv.invoiceId}`} target="_blank" onClick={playClick}>
                        <button className="px-2.5 py-1 bg-[#17191C] text-[#F4F1EA] text-[10px] font-bold uppercase hover:bg-[#3457FF]">
                          VIEW
                        </button>
                      </Link>
                      <Link href={`/pay?id=${inv.invoiceId}`} target="_blank" onClick={playClick}>
                        <button className="px-2.5 py-1 bg-[#3457FF] text-white text-[10px] font-bold uppercase hover:bg-[#3457FF]/80">
                          PAY PORTAL
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CREATE INVOICE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#17191C]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#17191C] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-[#17191C]/20 pb-4">
              <h3 className="font-heading font-black text-xl text-[#17191C] uppercase">
                GENERATE NEW PROJECT INVOICE
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-xs font-mono font-bold text-[#5A606A] hover:text-[#17191C]"
              >
                [CLOSE]
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ananya Patel"
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Client Company</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Patel Global"
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Client Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="ananya@patelglobal.com"
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Client Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Patel Global E-Commerce Platform"
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Service Sector</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                  >
                    <option value="Web">Web Development</option>
                    <option value="Growth">Digital Marketing</option>
                    <option value="AI">AI Solutions</option>
                    <option value="App">Custom Applications</option>
                    <option value="Custom">Custom Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#17191C] mb-1">Total Project Value (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF] font-bold"
                  />
                </div>
                <div className="p-3 bg-[#3457FF]/10 border border-[#3457FF] flex flex-col justify-center">
                  <span className="text-[10px] text-[#3457FF] font-bold uppercase">AUTOMATIC 50% ADVANCE</span>
                  <span className="text-base font-black text-[#3457FF]">₹{Math.round(totalAmount * 0.5).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#17191C] mb-1">Deliverables & Scope (1 item per line)</label>
                <textarea
                  rows={4}
                  value={scopeInputs}
                  onChange={(e) => setScopeInputs(e.target.value)}
                  className="w-full p-2.5 border border-[#17191C]/30 bg-[#F4F1EA] text-xs focus:border-[#3457FF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-[#17191C]/30 font-bold uppercase hover:bg-gray-100"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#3457FF] text-white font-bold uppercase hover:bg-[#3457FF]/90 shadow-md"
                >
                  GENERATE & ISSUE INVOICE
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
