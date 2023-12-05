import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  wallet: {
    type: String,
    required: true,
  },
  image: String,
  
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  dashboard: {
    type: Boolean,
    default: false,
  },
  // communities: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Community",
  //   },
  // ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;