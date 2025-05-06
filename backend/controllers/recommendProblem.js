import axios from "axios";
import Problem from "../utils/Problem.js";

const fetchProblemsFromCF = async (tags = []) => {
  try {
    const baseUrl = process.env.CF_API_PROBLEMSET_URL;
    const url = tags.length > 0 ? `${baseUrl}?tags=${tags.join(';')}` : baseUrl;
    const response = await axios.get(url);
    return response.data.result.problems;
  } catch (error) {
    console.error("Error fetching Codeforces problems:", error);
    return [];
  }
};

const fetchUserProblems = async (usernames, minRating, maxRating) => {
  try {
    const requests = usernames.map(handle =>
      axios.get(`${process.env.CF_API_SUBMISSIONS_URL}?handle=${handle}`)
    );
    const responses = await Promise.all(requests);
    const solvedSet = new Set();
    for (const resp of responses) {
      resp.data.result.forEach(item => {
        const { contestId, index, rating } = item.problem;
        if (rating >= minRating && rating <= maxRating) {
          solvedSet.add(`${contestId}-${index}`);
        }
      });
    }
    return solvedSet;
  } catch {
    return new Set();
  }
};

async function recommendProblem({
  usernames = [],
  minRating = 800,
  maxRating = 3500,
  tagsAllowed = [],
  tagsNotAllowed = []
}) {
  try {
    const [allProblems, userProblems] = await Promise.all([
      fetchProblemsFromCF(tagsAllowed),
      fetchUserProblems(usernames, minRating, maxRating)
    ]);

    const problems = [];

    for (const problem of allProblems) {
      const problemId = `${problem.contestId}-${problem.index}`;

      if (
        userProblems.has(problemId) ||
        (problem.rating && (problem.rating < minRating || problem.rating > maxRating))
      ) continue;

      const hasAllTags = tagsAllowed.every(tag => problem.tags.includes(tag));
      const hasBadTags = problem.tags.some(tag => tagsNotAllowed.includes(tag));
      if (!hasAllTags || hasBadTags) continue;

      problems.push(problem);
      if (problems.length >= 25) break;
    }

    if (problems.length === 0) {
      return { problem: null, message: "No matching problems found." };
    }

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    return { problem: new Problem(randomProblem), message: "Problem found!" };

  } catch (error) {
    console.error("Error recommending a problem:", error);
    return { error: "Failed to recommend problems", message: error.message };
  }
}

async function recommendProblemRoute(req, res) {
  const response = await recommendProblem(req.body);
  return res.json(response);
}

export { recommendProblem, recommendProblemRoute };
