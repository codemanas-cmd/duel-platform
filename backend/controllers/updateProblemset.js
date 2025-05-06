import Problem from "../models/Problem.js"
import axios from "axios"
import Contest from "../models/Contest.js"


const updateProblems = async (req, res) => {
    const fetchProblemsFromCF = async () => {
        try {
            const url = process.env.CF_API_PROBLEMSET_URL
            const response = await axios.get(url)
            return response.data.result.problems
        } catch (error) {
            console.error("Error fetching Codeforces problems:", error);
            return [];
        }
    }
    
    const requiredProps = ["rating","name","contestId","index","type"]
    let counter = 0
    try {
        const problems = await fetchProblemsFromCF()
        // await Problem.deleteMany()
        for(const problem of problems){
            
            const exists = await Problem.exists({contestId:problem.contestId, index:problem.index})
            if(exists)
                break;
            let skip = false
            for(const req of requiredProps){
                if(!problem[req]){
                    skip = true;
                    break;
                }
            }
            if(skip)continue;
            counter++;
            const contestRecord = await Contest.findOne({id:problem.contestId})
            const contestType = (contestRecord) ? contestRecord.type : "unknown"
            Problem.create({
                problemId: String(problem.contestId) + problem.index,
                name: problem.name,
                rating: problem.rating,
                tags: problem.tags,
                contestId: problem.contestId,
                index: problem.index,
                contestType: contestType,
                type: problem.type,
            })
        }
        return res.json({ message: "Problemset updated successfully",newUpdates:counter, problem: await Problem.find()});
    } catch (error) {
        console.error("Error updating problems:", error);
        return res.status(500).json({ error: "Failed to update problems" });
    }
}

export default updateProblems;