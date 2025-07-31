import { getCookie, setCookie, getSignedCookie, setSignedCookie } from 'hono/cookie'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

const COOKIE_SECRET = 'your-cookie-secret-key'

export const setupCookieRoutes = (app: Hono<AppContext>) => {
  app.get('/api/cookies/demo', async (c) => {
    setCookie(c, 'demo-cookie', 'hello-world', {
      maxAge: 3600,
      secure: true,
      httpOnly: true,
      sameSite: 'Strict'
    })

    await setSignedCookie(c, 'signed-demo', 'secure-value', COOKIE_SECRET, {
      maxAge: 3600,
      secure: true
    })

    setCookie(c, 'user-preferences', JSON.stringify({
      theme: 'dark',
      currency: 'USD'
    }), {
      maxAge: 86400 * 30,
      secure: true
    })

    return c.json({
      message: 'Demo cookies set',
      cookies: ['demo-cookie', 'signed-demo', 'user-preferences'],
      requestId: c.get('requestId')
    })
  })

  app.get('/api/cookies/read', async (c) => {
    const demoCookie = getCookie(c, 'demo-cookie')
    const signedDemo = await getSignedCookie(c, COOKIE_SECRET, 'signed-demo')
    const preferences = getCookie(c, 'user-preferences')

    return c.json({
      cookies: {
        demo: demoCookie,
        signed: signedDemo,
        preferences: preferences ? JSON.parse(preferences) : null
      },
      requestId: c.get('requestId')
    })
  })
}
