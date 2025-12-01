import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">Welcome to Your App</h1>
        <p className="text-muted-foreground">Authentication system with Prisma, NextAuth, and admin routes</p>

        {session ? (
          <div className="space-y-4">
            <p className="text-lg">
              Welcome, <span className="font-semibold">{session.user?.name}</span>!
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link href="/protected">Protected Area</Link>
              </Button>
              {(session.user as any)?.role === "ADMIN" && (
                <Button asChild variant="secondary">
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/api/auth/signout">Sign Out</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
