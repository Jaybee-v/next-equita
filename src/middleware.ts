import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const publicPaths = ["/", "/signup", "/about", "/contact"];

export default auth((req) => {
  const reqUrl = new URL(req.url);
  const isPublicPath = publicPaths.some((path) =>
    reqUrl.pathname.startsWith(path)
  );
  if (!req.auth && !isPublicPath) {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }

  if (req.auth && reqUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL(`/`, reqUrl));
  }
});
