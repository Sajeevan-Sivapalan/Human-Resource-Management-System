import Employee from "../models/employee.model.mjs";
import Department from "../models/department.model.mjs";
import Course from "../models/course.model.mjs";
import Module from "../models/module.model.mjs";
import mongoose from "mongoose";

const getAllModule = async (req, res) => {
  try {
    res.status(200).json({ message: "Call To All Dept" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getModuleProg = async (req, res) => {
  const { username, cid } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const course = await Course.findOne({ cid: cid })
      .populate("modules")
      .session(session);

    const { _id, modules } = course;

    const employee = await Employee.findOne(
      {
        username: username,
        "enrolled.courseId": _id,
      },
      {
        "enrolled.$": 1,
      }
    ).session(session);

    if (employee) {
      const result = await Employee.findOne(
        {
          username: username,
          "enrolled.courseId": course._id,
        },
        {
          "enrolled.$": 1,
        }
      ).session(session);

      if (result) {
        const { progress, completedModules } = result.enrolled[0];
        const empProg = { progress, completedModules, modules };
        await session.commitTransaction();
        return res.status(200).json(empProg);
      }

      session.endSession();
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};

const updateModuelProg = async (req, res) => {
  const { cid, mid, username } = req.body;
  console.log(req.body);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const course = await Course.findOne({ cid: cid }).session(session);
    const module = mongoose.Types.ObjectId(mid);

    if (!course) {
      return res.status(500).json({ message: "Course Not Found" });
    }

    const filter = {
      username: username,
      enrolled: {
        $elemMatch: {
          courseId: course._id,
          completedModules: { $ne: module },
        },
      },
    };

    const result = await Employee.findOneAndUpdate(
      filter,
      {
        $push: { "enrolled.$.completedModules": module },
        $inc: { "enrolled.$.progress": 1 },
      },
      { session: session }
    );

    console.log(result);

    if (result) {
      session.commitTransaction();
      return res
        .status(200)
        .json({ message: "employee document updated correctly" });
    }

    if (!result) {
      session.abortTransaction();
      return res.status(500).json({
        message:
          "employee document didn't update correctlty cause may could be update alredy done before",
      });
    }

    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};

const createModule = async (req, res) => {
  const {
    id,
    page: { header, body },
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { _id, cname } = Course.findOne({ cid: id });
    const [module] = await Module.create(
      [
        {
          cid: _id,
          cname,
          header,
          body,
        },
      ],
      { session }
    );

    console.log(module);

    const update = await Course.updateOne(
      { cid: id },
      { $push: { modules: module._id } },
      { session }
    );

    console.log(update);

    if (update.acknowledged) {
      await session.commitTransaction();
      return res
        .status(200)
        .json({ message: `${cname}:${header} Succcessfully Created` });
    } else {
      return res.status(500).json({ message: `(cid) modules didn't updated` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

const getModuleByID = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await Module.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!module) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateModuleByID = async (req, res) => {
  try {
    const {
      mid,
      page: { header, body },
    } = req.body;

    const result = await Module.updateOne(
      { _id: mongoose.Types.ObjectId(mid) },
      { $set: { header, body } }
    );

    if (result) res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteModuleByID = async (req, res) => {
  const { cid, mid } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Module.deleteOne(
      {
        _id: mongoose.Types.ObjectId(mid),
      },
      { session }
    );

    const update = await Course.updateOne(
      { cid: cid },
      { $pull: { modules: mid } },
      { session }
    );

    console.log(update, result);

    if (update.acknowledged) {
      await session.commitTransaction();
      return res.status(200).json({ message: `Successfully Deleted` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

export {
  updateModuelProg,
  getModuleProg,
  getAllModule,
  createModule,
  getModuleByID,
  updateModuleByID,
  deleteModuleByID,
};
