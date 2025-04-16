import resend from "@/app/lib/resend";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
    const metadata = paymentData.metadata;
    const userEmail = metadata.user_email;
    const testeId = metadata.teste_id;
    console.log("Pagamento efetuado com sucesso", { userEmail, testeId, paymentData });

    const { data, error } = await resend.emails.send({
        from: 'Acme <teste@teste.teste>',
        to: [userEmail],
        subject: 'Pagamento realizado com sucesso',
        text: "Pagamento realizado com sucesso!"
    });

    if (error) {
        console.error(error);
    }

    console.log(data);
}