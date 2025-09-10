import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // For now, just log the message (in production, you'd send an email)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // In a real application, you would:
    // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
    // 2. Store the message in a database
    // 3. Send a confirmation email to the user

    return NextResponse.json({
      success: true,
      message: 'Message received successfully',
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
