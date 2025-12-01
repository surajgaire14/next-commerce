import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center max-w-md">
        <h1 className="text-3xl font-bold">Protected Page</h1>
        <p className="text-muted-foreground">This page is only accessible to authenticated users</p>

        <div className="bg-card p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-2">Current User:</p>
          <p className="font-semibold">{session.user?.name}</p>
          <p className="text-sm text-muted-foreground">{session.user?.email}</p>
        </div>

        <Button asChild variant="outline">
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </main>
  )
}
