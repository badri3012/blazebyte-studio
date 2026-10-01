import { NextResponse } from "next/server";
import { dbGetInvoiceById, dbGetInvoiceByProjectId, dbGetAllInvoices, dbSaveInvoice } from "@/lib/supabase-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const project = searchParams.get("project");
    const all = searchParams.get("all");

    if (all === "true") {
      const invoices = await dbGetAllInvoices();
      return NextResponse.json({ success: true, invoices });
    }

    if (id) {
      const invoice = await dbGetInvoiceById(id);
      if (!invoice) {
        return NextResponse.json({ error: `Invoice with ID '${id}' not found.` }, { status: 404 });
      }
      return NextResponse.json({ success: true, invoice });
    }

    if (project) {
      const invoice = await dbGetInvoiceByProjectId(project);
      if (!invoice) {
        return NextResponse.json({ error: `Invoice for project '${project}' not found.` }, { status: 404 });
      }
      return NextResponse.json({ success: true, invoice });
    }

    const invoices = await dbGetAllInvoices();
    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("[INVOICE API GET ERROR]", error);
    return NextResponse.json({ error: "Failed to retrieve invoice records." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, totalAmount, serviceCategory, selectedPackage, projectName, scopeSummary } = body;

    if (!clientName || !clientEmail || !totalAmount) {
      return NextResponse.json(
        { error: "Client Name, Client Email, and Total Amount are required to generate an invoice." },
        { status: 400 }
      );
    }

    const numAmount = Number(totalAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: "Invalid Total Amount specified." }, { status: 400 });
    }

    const invoice = await dbSaveInvoice({
      clientName,
      clientEmail,
      clientCompany: body.clientCompany,
      clientPhone: body.clientPhone,
      totalAmount: numAmount,
      serviceCategory: serviceCategory || "Web",
      selectedPackage: selectedPackage || "Custom Build",
      projectName: projectName || `${serviceCategory || "Digital"} System Project`,
      scopeSummary: scopeSummary || [
        "Custom system architecture & wireframes",
        "High-performance production build",
        "Quality assurance & edge release deployment"
      ]
    });

    return NextResponse.json({
      success: true,
      message: "Invoice successfully created.",
      invoice
    });
  } catch (error) {
    console.error("[INVOICE API POST ERROR]", error);
    return NextResponse.json({ error: "Failed to generate invoice." }, { status: 500 });
  }
}
