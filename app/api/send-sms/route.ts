import { NextRequest, NextResponse } from 'next/server'

const FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2'
const BUSINESS_NUMBER = '+917795440217'

function normalizeIndianNumber(phone: string) {
  return phone.replace(/\D/g, '').replace(/^91/, '')
}

export async function POST(request: NextRequest) {
  try {
    const { message, toPhone, fromPhone } = await request.json()

    if (!message || !toPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: message and toPhone' },
        { status: 400 }
      )
    }

    const apiKey = process.env.FAST2SMS_API_KEY
    if (!apiKey) {
      const devWarning = 'Missing FAST2SMS_API_KEY environment variable. Add FAST2SMS_API_KEY to .env.local to send real SMS.'
      console.warn(devWarning)
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json(
          {
            success: true,
            message: 'SMS provider not configured in development. Message logged on the server.',
            debug: devWarning,
            toPhone: BUSINESS_NUMBER,
          },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'SMS provider not configured' },
        { status: 500 }
      )
    }

    const cleanedNumber = normalizeIndianNumber(toPhone)
    if (!/^[0-9]{10}$/.test(cleanedNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid toPhone number format' },
        { status: 400 }
      )
    }

    const smsPayload = {
      route: 'v3',
      sender_id: 'TXTIND',
      message: `${message}\n\nSender phone: ${fromPhone || 'Not provided'}`,
      language: 'english',
      flash: 0,
      numbers: cleanedNumber,
    }

    const smsResponse = await fetch(FAST2SMS_URL, {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsPayload),
    })

    const responseText = await smsResponse.text()
    let smsResult: unknown = null

    try {
      smsResult = JSON.parse(responseText)
    } catch {
      smsResult = { raw: responseText }
    }

    if (!smsResponse.ok || (smsResult as any).return !== true) {
      console.error('Fast2SMS error status:', smsResponse.status, smsResult)
      return NextResponse.json(
        {
          success: false,
          error: 'SMS provider rejected the request',
          details: smsResult,
        },
        { status: smsResponse.ok ? 502 : smsResponse.status }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'SMS request submitted successfully',
        toPhone: BUSINESS_NUMBER,
        providerResponse: smsResult,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing SMS:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send SMS',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}



