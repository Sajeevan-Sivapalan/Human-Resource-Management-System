import { Schema, SchemaTypes, model } from "mongoose";

const employeeSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  lastName: {
    type: String,
    required: true,
  },
  enrolled: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      progress: Number,
      completedModules: [
        {
          type: Schema.Types.ObjectId,
          ref: "Module",
        },
      ],
    },
  ],
  skills: {
    general: Number,
    accounting: Number,
    hr: Number,
    marketing: Number,
    econ: Number,
  },
  completed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const employeeModel = model("Employee", employeeSchema);
export default employeeModel;
