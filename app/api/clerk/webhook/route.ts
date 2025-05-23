// app/api/clerk/webhook/route.ts
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  const payload = await req.arrayBuffer()
  const body = Buffer.from(payload)
  const heads = headers()

  const svixHeaders = {
    'svix-id': (await heads).get('svix-id') || '',
    'svix-timestamp': (await heads).get('svix-timestamp') || '',
    'svix-signature': (await heads).get('svix-signature') || '',
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const wh = new Webhook(webhookSecret)

  let evt
  try {
    evt = wh.verify(body, svixHeaders)
  } catch (err) {
    console.error('❌ Webhook verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // @ts-ignore
  const { type, data } = evt
  console.log(`🔔 Clerk Webhook received: ${type}`, data)

  console.log(type , data);
  

  if (type === 'user.created') {
    console.log('🎉 New user created:', data)
    // Do something with the user
  }

  return NextResponse.json({ success: true })
}
