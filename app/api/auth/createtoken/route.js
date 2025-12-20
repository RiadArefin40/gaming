export async function POST() {
  try {
    const response = await fetch(
      "https://bs.sxvwlkohlv.com/api/v2/auth/createtoken/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          clientId: "testId",
          clientSecret: "testSecret",
        }),
      }
    );

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    return Response.json(
      { message: "Token API failed" },
      { status: 500 }
    );
  }
}
