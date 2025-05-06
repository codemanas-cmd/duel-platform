import axios from "axios";

export default async function verifyHandle(req, res) {
  const { username } = req.body;
  const START = 1;
  const COUNT = 1;

  try {
    const url = process.env.CF_API_SUBMISSIONS_URL + `?handle=${username}&from=${START}&count=${COUNT}`;
    const response = await axios.get(url);

    const sub = response.data.result[0];
    if (
      sub &&
      sub.verdict === "COMPILATION_ERROR" &&
      Date.now() - sub.creationTimeSeconds * 1000 < 7200000
    ) {
      return res.json({ verified: true });
    } else {
      return res.json({ verified: false });
    }
  } catch (error) {
    console.error("verifyHandle::Error Verifying User Handle:", error.message);
    return res.status(500).json({ error: "Failed to verify handle" });
  }
}
