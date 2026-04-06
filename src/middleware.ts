import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {},
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ req, token }) => {
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
