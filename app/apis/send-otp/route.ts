import { NextRequest, NextResponse } from "next/server";

// Helper function to generate 4-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    // Generate OTPs
    const bodyOtp = generateOtp();    // OTP in message body
    const buttonOtp = generateOtp();  // OTP in button (if needed)

    const data = {
      token: "8Pv0sYhabhUYcSH0Q4T3MZOQcRTOmfYTeOvqxsS0905881a8",
      phone,
      template_name: "otp_message",
      template_language: "en",
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: bodyOtp },
          ],
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [
            { type: "text", text: buttonOtp },
          ],
        },
      ],
    };

    const response = await fetch(
      "https://api.prowhats.com/api/v1/wpbox/sendtemplatemessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    // Return API response + generated OTPs
    return NextResponse.json({
      apiResult: result,
      bodyOtp,
      buttonOtp,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong sending OTP" },
      { status: 500 }
    );
  }
}
