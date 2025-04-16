import { db } from "@/app/lib/firebase";
import resend from "@/app/lib/resend";
import "server-only";

import Stripe from "stripe";

export async function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {
    if (event.data.object.payment_status === "paid") {
        console.log("Pagamento realizado com sucesso. Enviar um e-mail e liberar acesso.");

        const metadata = event.data.object.metadata;
        const userId = metadata?.userId;
        const userEmail = event.data.object.customer_email || event.data.object.customer_details?.email;

        if (!userId || !userEmail) {
            console.error("User ID or Email not found");
            return;
        }

        await db.collection("users").doc(userId).update({
            stripeSubscriptionId: event.data.object.subscription,
            subscriptionStatus: "active",
        });

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
}