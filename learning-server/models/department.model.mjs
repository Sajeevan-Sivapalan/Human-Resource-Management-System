import { Schema, SchemaTypes, model } from "mongoose";

const departmentSchema = new Schema({
  did: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
  dname: {
    type: String,
    required: true,
  },
  noOfEmployees: Number,
  employees: [
    {
      eid: {
        type: SchemaTypes.ObjectId,
        ref: "Employee",
        required: true,
      },
      name: String,
    },
  ],
});

const departmentModel = model("Department", departmentSchema);
export default departmentModel;
