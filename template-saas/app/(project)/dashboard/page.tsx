import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard'",
};

export default async function Dashboard() {
    // estamos no lado do servidor!
    // para ser do lado do cliente, seria necessário escrever "use client" no inicio do arquivo
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Protected Dashboard</h1>
            <p>{session?.user?.email ? session?.user?.email : "Usuário não está logado!"}</p>
            {
                session?.user?.email && (
                    <form action={handleAuth}>
                        <button type="submit" className="border rounded-md px-2 cursor-pointer">Logout</button>
                    </form>
                )
            }
            <Link href="/pagamentos">Pagamentos</Link>
        </div>
    )
}