import { Schema, SchemaTypes, model } from "mongoose";

const moduleSchema = new Schema({
  cid: {
    type: SchemaTypes.ObjectId,
    ref: "Course",
  },
  cname: {
    type: String,
  },
  header: String,
  body: String,
});

const moduleModel = model("Module", moduleSchema);
export default moduleModel;
