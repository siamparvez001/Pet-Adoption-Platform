// import { NextResponse } from 'next/server'
// import { auth } from './lib/auth';
// import { headers } from 'next/headers';

// export async function proxy(request) {
//     const session = await auth.api.getSession({
//         headers: await headers()
//     })

//     if (!session) {
//         return NextResponse.redirect(new URL('/signin', request.url))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         "/add-pet/:path*",
//         "/my-requests/:path*",
//     ],
// }





import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    
}
 
export const config = {
  matcher: [
    
    "/my-requests/:path*",
    
    "/add-pet/:path*",
  ],
}