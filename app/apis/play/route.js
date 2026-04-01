import axios from "axios";

const PRIVATE_DOMAIN = "apiinfo.prc10sr0101.xyz";
const WEBSITE = "SPCWIN";
const CERT = "IAeBfLDHAGVSyyx8";
const AGENT = "spcwin01bdt";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    // STEP 1: get active domain
    const domainRes = await axios.post(
      `https://${PRIVATE_DOMAIN}/api/apiWallet/${WEBSITE}/queryDomain`,
      new URLSearchParams({ cert: CERT }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const data = domainRes.data;

    const domain = data.domains.sort((a, b) => a.priority - b.priority)[0].domain;
    const apiServer = data.subDomains.apiServer;

    const activeDomain = `${apiServer}.${domain}`;

    // STEP 2: get key (create user)
    const keyRes = await axios.post(
      `https://${activeDomain}/api/apiWallet/${WEBSITE}/getKey`,
      new URLSearchParams({
        cert: CERT,
        userId,
        userName: userId,
        agent: AGENT,
        currency: 33
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const key = keyRes.data.key;

    // STEP 3: generate login URL
    const loginUrl = `https://${activeDomain}/apiWallet/player/${WEBSITE}/login?userId=${userId}&key=${encodeURIComponent(
      key
    )}`;

    return Response.json({ loginUrl });

  } catch (err) {
    console.error(err.response?.data || err.message);
    return Response.json({ error: "Failed to connect 9wickets" }, { status: 500 });
  }
}