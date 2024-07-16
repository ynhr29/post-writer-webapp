import { Button, buttonVariants } from "@/components/ui/button"
import UserAuthForm from "@/components/user-auth-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function Login() {
  return (
    <div>
      <Link href={"/"}>
        <Button
          variant="ghost"
          className="absolute left-4 top-4 md:left-8 md:top-8"
        >
          <>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Topへ戻る
          </>
        </Button>
      </Link>
      <div className="container flex flex-col justify-center h-screen items-center w-screen">
        <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              メールアドレスを入力してログインできます
            </p>
          </div>

          <UserAuthForm />

          <p className="text-muted-foreground px-8 text-center text-sm">
            <Link href={"/register"} className="underline underline-offset-4">
              アカウントを持っていませんか？
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
