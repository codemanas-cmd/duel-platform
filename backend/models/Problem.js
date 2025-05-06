import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    problemId: {type:String, required:true, unique: true},
    name: { type: String, required: true },
    rating: {type: Number, required: true},
    tags: [{ type: String }],
    contestId: { type: Number, required: true },
    index: { type: String, required: true },
    contestType:{type:String},
    type: { type: String, required: true },
})

ProblemSchema.index({contestId:1, index:1}) // for problem indentification
ProblemSchema.index({tags:1, contestId:-1})
ProblemSchema.index({rating:1, contestId:-1})
ProblemSchema.index({rating:1, tags:1, contestId:-1})

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;