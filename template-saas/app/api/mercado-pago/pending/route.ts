import mpClient from "@/app/lib/mercado-pago";
import { Payment, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const paymentId = searchParams.get("payment_id");
        const testeId = searchParams.get("external_reference");

        if (!paymentId || !testeId) {
            return NextResponse.json({ error: "Payment ID or teste ID not found" }, { status: 404 })
        }

        const payment = new Payment(mpClient);
        const paymentData = await payment.get({
            id: paymentId,
        })

        if (paymentData.status === "approved" || paymentData.date_approved !== null) {
            return NextResponse.redirect(new URL("/success", req.url));
        }


        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar checkout com Mercado Pago" }, { status: 500 })
    }

}