import { type NextRequest, NextResponse } from "next/server"
import { addToWaitlist } from "@/lib/waitlist"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { email, firstName, phoneNumber, selectedCountry, interest } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Prepare data for database
    const waitlistData = {
      email: email.toLowerCase().trim(),
      first_name: firstName?.trim() || null,
      phone_number: phoneNumber?.trim() || null,
      country_code: selectedCountry?.code || null,
      country_name: selectedCountry?.name || null,
      interest: interest || null,
    }

    const result = await addToWaitlist(waitlistData)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist!",
      data: result.data,
    })
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
