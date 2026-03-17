export async function POST() {
  try {
    const res = await fetch(
      "https://ex-api-demo-yy.568win.com/web-root/restricted/information/get-game-list.aspx",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CompanyKey:"F38A19A3FFDD4DF89A243A8ED8ACC6C6" ,
          ServerId: "spcwin1234",
          GpId: 2,
          IsGetAll: true,
        }),
        cache: "no-store", // optional (avoids caching issues)
      }
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error },
      { status: 500 }
    );
  }
}