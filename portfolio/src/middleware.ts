import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1]
        const [user, pwd] = atob(authValue).split(":")

        if (user === process.env.USERNAME && pwd === process.env.PASSWORD) {
            return NextResponse.next()
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
    })
}
