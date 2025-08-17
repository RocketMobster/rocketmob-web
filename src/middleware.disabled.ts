// NOTE: Middleware doesn't work with static exports
// This file is kept for reference, but won't be active
// with "output: export" in next.config.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // If we're at the root path
  if (url.pathname === '/') {
    // Redirect to /rocketmob-web
    url.pathname = '/rocketmob-web';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
