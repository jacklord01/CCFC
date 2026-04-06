import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {},
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("[MIDDLEWARE AUTH]", {
          path: req.nextUrl.pathname,
          hasToken: !!token,
          tokenSub: token?.sub,
          tokenEmail: token?.email,
        });

        if (
          req.nextUrl.pathname.startsWith('/admin/login') ||
          req.nextUrl.pathname.startsWith('/admin/setup-security')
        ) {
          return true;
        }
        return !!token;
      }
    }
  }
);

export const config = {
  // Protect all routes under /admin
  matcher: ["/admin/:path*"],
};
