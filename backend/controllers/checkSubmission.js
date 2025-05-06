import axios from "axios"

export default async function checkSubmission(req, res) {
    const { username, problemId } = req.body;
    const START = 1;
    const COUNT = 10;
    const url = process.env.CF_API_SUBMISSIONS_URL + `?handle=${username}&from=${START}&count=${COUNT}`;

    try {
        const response = await axios.get(url);
        const subs = response.data.result;

        for (const sub of subs) {
            const solvedId = `${sub.problem.contestId}${sub.problem.index}`;
            if (sub.verdict === 'OK' && solvedId === problemId) {
                return res.json({ solved: true });
            }
        }
        return res.json({ solved: false });
    } catch (error) {
        console.error("checkSubmission::Error checking User Accepted status:", error.message);
        return res.status(500).json({ error: "Failed to check submission" });
    }
}
