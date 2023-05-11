import Employee from "../models/employee.model.mjs";
import Department from "../models/department.model.mjs";
import Course from "../models/course.model.mjs";
import mongoose from "mongoose";

const enrolledToCourse = async (req, res) => {
  const { username, cid } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const course = await Course.findOne({ cid: cid }).session(session);

    const employee = await Employee.findOne({ username: username })
      .populate("department")
      .session(session);

    const department = employee.department._id;
    const departmentName = employee.department.did;
    const departments = course.requireTo;

    if (departments.some((dep) => dep.equals(department))) {
      await Course.findOneAndUpdate(
        { _id: course._id, enrollers: { $ne: employee._id } },
        {
          $addToSet: { enrollers: employee._id },
          $inc: { [`deptCounts.${departmentName}`]: 1 },
        },
        { session }
      );

      await Employee.findOneAndUpdate(
        { _id: employee._id, "enrolled.courseId": { $ne: course._id } },
        {
          $push: {
            enrolled: {
              courseId: course._id,
              progress: 0,
              completedModules: [],
            },
          },
        },
        { session }
      );

      await session.commitTransaction();
      return res.status(200).json({ message: "Successfully Enrolled" });
    } else {
      await session.abortTransaction();
      return res.status(500).json({ message: "Not Allowed" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

const getAllCourse = async (req, res) => {
  //   console.log(req.body);
  const { search } = req.query;

  console.log(search);
  if (!search || search === "undefined") {
    console.log("Called");
    try {
      const courses = await Course.find().sort({ createdAt: -1 }).limit(20);
      console.log(courses);
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const courses = await Course.find({
        cname: { $regex: search, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(20);
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const createCourse = async (req, res) => {
  const { category, nid, img, cname, ETC, requireTo, description, skills } =
    req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const getDeptObj = async (dept) => {
      const id = await Department.findOne(
        { did: dept },
        { _id: 1 },
        { session }
      );

      return id;
    };

    const require = [];

    for (const dept in requireTo) {
      const result = await getDeptObj(requireTo[dept]);
      require.push(result);
    }

    const [course] = await Course.create(
      [
        {
          cid: `${category}${nid}`,
          img,
          cname,
          description,
          skills,
          ETC,
          requireTo: require,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({
      message: `${course.cname}(${course.cid}) is successfully created`,
    });
  } catch (err) {
    res.status(500).json({ messages: err.message });
  } finally {
    session.endSession();
  }
};

const getCourseByID = async (req, res) => {
  try {
    const { id, type } = req.params;
    const { username } = req.query;

    let isEnrolled = false;

    if (type === "employee") {
      const course = await Course.findOne({ cid: id })
        .populate("modules", "cid cname header")
        .exec()
        .catch((err) => console.log(err));

      if (!course) {
        return res.status(404).json({ message: "Not Found" });
      }

      const required = [];

      for (const dept in course.requireTo) {
        const result = await Department.findOne(
          {
            _id: course.requireTo[dept],
          },
          { dname: 1 }
        );
        required.push(result);
      }

      if (username) {
        const { enrolled } = await Employee.findOne({ username: username });
        const enrollSet = new Set(
          enrolled.map((course) => course.courseId.toString())
        );

        isEnrolled = enrollSet.has(course._id.toString());
      }

      return res
        .status(200)
        .json({ ...course.toObject(), required, isEnrolled });
    } else if (type === "admin") {
      const course = await Course.findOne({ cid: id })
        .populate("modules")
        .populate("enrollers")
        .exec()
        .catch((err) => console.log(err));

      if (!course) {
        return res.status(404).json({ message: "Not Found" });
      }

      const required = [];

      for (const dept in course.requireTo) {
        const result = await Department.findOne(
          {
            _id: course.requireTo[dept],
          },
          { did: 1, _id: 0 }
        );

        required.push(result.did);
      }

      console.log(required);

      if (username) {
        const { enrolled } = await Employee.findOne({ username: username });
        const enrollSet = new Set(
          enrolled.map((course) => course.courseId.toString())
        );

        isEnrolled = enrollSet.has(course._id.toString());
      }

      return res
        .status(200)
        .json({ ...course.toObject(), required, isEnrolled });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { cid, required, ...updateData } = req.body;
    const require = [];
    const getDeptObj = async (dept) => {
      const id = await Department.findOne({ did: dept }, { _id: 1 });
      return id;
    };

    for (const dept in required) {
      const result = await getDeptObj(required[dept]);
      require.push(result);
    }

    console.log(require);

    const result = await Course.findOneAndUpdate(
      { cid: cid },
      { ...updateData, requireTo: require }
    );

    res.status(200).json({ message: "course updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourseByID = async (req, res) => {
  const { id } = req.body;

  try {
    res.status(200).json({ message: "Call To Dlete Course By ID" });
  } catch (err) {
    res.ststus(500).json({ message: err.message });
  }
};

export {
  enrolledToCourse,
  getAllCourse,
  createCourse,
  getCourseByID,
  updateCourseByID,
  deleteCourseByID,
};
