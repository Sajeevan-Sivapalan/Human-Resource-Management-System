import { Schema, SchemaTypes, model } from "mongoose";

const courseSchema = new Schema({
  cid: {
    type: String,
    unique: true,
    uppercase: true,
    required: true,
  },
  cname: {
    type: String,
    required: true,
  },
  img: String,
  description: {
    type: String,
    required: true,
  },
  ETC: String,
  noOfEnrolls: Number,
  skills: [String],
  requireTo: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Department",
    },
  ],
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
  enrollers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Employee",
    },
  ],
  deptCounts: {
    HR: { type: Number, default: 0 },
    LAW: { type: Number, default: 0 },
    IT: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    required: true,
  },
});

const courseModel = model("Course", courseSchema);
export default courseModel;
