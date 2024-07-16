import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    // /loginと/registerページへのアクセスでログイン済の場合は/dashboardに飛ばす
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    // ログイン済でない場合は/loginへ飛ばす
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        // async authorized(req, token) {
        // 権限制御する場合はこんな感じになる
        // if(token.role === "admin") return true
        return true
      },
    },
  }
)

export const config = {
  // このページの時のみ発火する
  matcher: ["/dashboard/:path", "/editor/:path", "/login", "/register"],
}
