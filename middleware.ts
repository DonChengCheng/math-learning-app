import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnCourses = req.nextUrl.pathname.startsWith('/courses')
  const isOnPractice = req.nextUrl.pathname.startsWith('/practice')
  const isOnAuth = req.nextUrl.pathname.startsWith('/auth')

  if ((isOnDashboard || isOnCourses || isOnPractice) && !isLoggedIn) {
    return Response.redirect(new URL('/auth/signin', req.nextUrl))
  }

  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}