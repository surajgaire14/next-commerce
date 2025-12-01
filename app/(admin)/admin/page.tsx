// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { redirect } from "next/navigation"
// import { Dashboard } from "@/components/dashboard/dashboard";

// export default async function Home() {
//   const session = await getServerSession(authOptions)

//   if (!session || (session.user as any)?.role !== "ADMIN") {
//     redirect("/auth/signin")
//   }
//   return <Dashboard />
// }

"use client"

import { ContentArea } from "@/components/dashboard/content-area"

export default function DashboardPage() {
  return <ContentArea />
}
