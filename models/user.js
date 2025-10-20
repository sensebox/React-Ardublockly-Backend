const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "creator", "user"],
      default: "user",
    },
    authProvider: {
      type: String,
      enum: ["native", "opensensemap"],
      default: "native",
    },
  },
  {
    timestamps: true,
  }
);
