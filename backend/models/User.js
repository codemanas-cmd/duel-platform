import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
      minlength: [6, "Username must contain at least 6 characters"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    profilePic:{
        type: {
            public_id: String,
            url: String,
        },
    },
    
    matchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],

    stats: {
      matchCount: {
        type: Number,
        default: 0,
      },
      winCount: {
        type: Number,
        default: 0,
      },
      lossCount: {
        type: Number,
        default: 0,
      },
      fastestWin: {
        type: Number, // number of seconds stored
        default: 0,
      },
      hardestSolved: {
        type: Number, //rating 
        default: 0, 
      },
      maxWinInOneDay: {
        type: Number,
        default: 0,
      },
      winRatio: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);


UserSchema.methods.getFormattedFastestWin = function () {
    const totalSeconds = this.stats.fastestWin;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

UserSchema.index({ username: 1 }); 

const User = mongoose.model("User", UserSchema);

export default User;
