import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Protect all routes under /admin EXCEPT for the login page
  matcher: ["/admin/:path((?!login|setup-security).*)"],
};
