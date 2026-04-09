import { LoginForm } from "@/components/auth/login-form"
import { ShieldAlert } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <ShieldAlert size={28} />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Doctor Portal
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Log in to manage your patient records securely.
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>Secure, Hipaa-compliant access to medical records.</p>
        </div>
      </div>
    </div>
  )
}
