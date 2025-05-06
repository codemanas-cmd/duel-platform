// models/Match.js
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    problems: [
      {
        // problemId: String,
        // title: String,
        // url: String,
        // rating: Number,
        // tags: [String],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
      },
    ],

    results: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        score: {
          type: Number,
          default: 0,
        },
        solvedProblems: [
          {
            problemId: String,
            solvedAt: Date,
            timeTaken: Number, // in seconds or ms
          },
        ],
      },
    ],

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,

    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
