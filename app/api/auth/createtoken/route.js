export async function POST() {
  try {
    const response = await fetch(
      "https://bs.sxvwlkohlv.com/api/v2/auth/createtoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          clientId: "milon123",
          clientSecret: "1vHaGWinUcpRDjQFsx0UghE7evaKIvMo",
        }),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.log(error, 'error')
    return Response.json(
      { message: "Token API failed" },
      { status: 500 },
      {error: error}
    );
  }
}
