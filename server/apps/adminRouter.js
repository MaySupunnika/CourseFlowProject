import { Router, query, response } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";
// import jwt from "jsonwebtoken";
import { protect } from "../middlewares/protect.js";
// import { upload } from "../middlewares/multerConfig.js";
import multer from "multer";

const adminRouter = Router();
adminRouter.use(protect);

adminRouter.get("/", async (req, res) => {
  try {
    let startAt = 0;
    let endAt = 7;
    const { data, error, count } = await supabase
      .from("courses")
      .select("public_status", { count: "exact" });
    let contReturn = 0;
    if (count % 8 !== 0) {
      contReturn = count - (count % 8);
      contReturn = contReturn / 8;
      contReturn += 1;
    } else {
      contReturn = count / 8;
    }
    if (Number(req.query.page) && Number(req.query.page) !== 1) {
      endAt = req.query.page * 8;
      endAt += Number(req.query.page - 1);
      startAt = endAt - 8;
    }
    if (req.query.title.length !== 0) {
      // console.log("condition runing");
      const coursesWithTitle = await supabase
        .from("courses")
        .select(
          "course_id, course_name, course_price, course_created_at, course_updated_at, course_duration, course_cover_img, public_status"
        )
        .order("public_status", {
          ascending: true,
        })
        .order("created_at", { ascending: false })
        .ilike("course_name", `%${req.query.title}%`)
        .limit(8);
      if (
        coursesWithTitle.data.length !== 0 ||
        coursesWithTitle.statusText === "OK"
      ) {
        const courseIdMaping = coursesWithTitle.data.map((vale) => {
          return vale.course_id;
        });
        const lessonWithTitle = await supabase
          .from("lessons")
          .select("course_id, lesson_name")
          .in("course_id", courseIdMaping);
        const newMap = coursesWithTitle.data.map((value) => {
          return {
            ...value,
            lesson_amount: lessonWithTitle.data.filter((subValue) => {
              return subValue.course_id === value.course_id;
            }).length,
          };
        });
        return res.json({ data: newMap, all_course: contReturn });
      }
    }
    const courses = await supabase
      .from("courses")
      .select(
        "course_id, course_name, course_price, course_created_at, course_updated_at, course_duration, course_cover_img, public_status"
      )
      .order("public_status", {
        ascending: req.query.publicStatus === "true" ? false : true,
      })
      .order("course_created_at", {
        ascending: req.query.createdat === "false" ? false : true,
      })
      .order("course_price", {
        ascending: req.query.price === "true" ? false : true,
      })
      .order("course_updated_at", {
        ascending: req.query.updatedat === "true" ? "" : true,
      })
      .range(startAt, endAt);
    if (courses.data.length !== 0 || courses.statusText === "OK") {
      const courseIdMaping = courses.data.map((vale) => {
        return vale.course_id;
      });
      const lesson = await supabase
        .from("lessons")
        .select("course_id, lesson_name")
        .in("course_id", courseIdMaping);
      // console.log(lesson);
      const newMap = courses.data.map((value) => {
        return {
          ...value,
          lesson_amount: lesson.data.filter((subValue) => {
            return subValue.course_id === value.course_id;
          }).length,
        };
      });
      return res.json({ data: newMap, all_course: contReturn });
    } else {
      return res.status(400).json({
        message:
          courses.data.length === 0
            ? "not found"
            : courses.data.error
            ? `${courses.data.error}`
            : "API INVALID",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "supabase invalid",
    });
  }
});

adminRouter.get("/courses/:courseId", async (req, res) => {
  try {
    if (req.params.courseId) {
      const courseResults = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", req.params.courseId);
      const lessonResult = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", req.params.courseId)
        .order("priority", { ascending: true });
      const lessonIdAraray = lessonResult.data.map((value) => {
        return value.lesson_id;
      });
      const sublessonResult = await supabase
        .from("sub_lessons")
        .select("*")
        .in("lesson_id", lessonIdAraray)
        .order("priority", { ascending: true });
      const newLessonMaping = lessonResult.data.map((value) => {
        return {
          ...value,
          lessonName: value.lesson_name,
          subLessons: sublessonResult.data.filter((subValue) => {
            return subValue.lesson_id === value.lesson_id;
          }),
        };
      });
      if (
        courseResults.statusText === "OK" &&
        lessonResult.statusText === "OK"
      ) {
        return res.json({
          data: {
            course: courseResults.data,
            lessons: newLessonMaping,
          },
        });
      }
    } else {
      return res.status(404).json({
        error: "course_id not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "supabase invalid",
    });
  }
});

adminRouter.get("/assignment/getcourse", async (req, res) => {
  const courseForReturn = await supabase
    .from("courses")
    .select("course_id, course_name");
  return res.json({
    data: courseForReturn.data,
  });
});

adminRouter.get("/assignment/getlesson/:courseId", async (req, res) => {
  const lessonForReturn = await supabase
    .from("lessons")
    .select("lesson_name, lesson_id")
    .eq("course_id", req.params.courseId);
  return res.json({
    data: lessonForReturn.data,
  });
});

adminRouter.get("/getassignment", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("assignments")
      .select("assignment_id", { count: "exact" });
    let contReturn = 0;
    if (count % 8 !== 0) {
      contReturn = count - (count % 8);
      contReturn = contReturn / 8;
      contReturn += 1;
    } else {
      contReturn = count / 8;
    }
    if (req.query.page) {
      let startAt = 0;
      let endAt = 7;
      if (Number(req.query.page) && Number(req.query.page) !== 1) {
        endAt = req.query.page * 8;
        endAt += Number(req.query.page - 1);
        startAt = endAt - 8;
      }
      const fetchAssignment = await supabase
        .rpc("get_assignments")
        .range(startAt, endAt);
      return res.json({
        data: fetchAssignment.data,
        pageCount: contReturn,
      });
    } else {
      const response = await supabase.rpc("get_assignments").limit(8);
      return res.json({
        data: response.data,
        pageCount: contReturn,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Supabase Error",
    });
  }
});

adminRouter.put("/updateassignment/:assignmentId", async (req, res) => {
  const response = await supabase
    .from("assignments")
    .update({ ...req.body })
    .eq("assignment_id", req.params.assignmentId);
  // console.log(req.body);
  // console.log(response);
  return res.json({ message: "Update assignment successfully" });
});

adminRouter.get("/assignment/getsublesson/:lessonId", async (req, res) => {
  const subLessonForReturn = await supabase
    .from("sub_lessons")
    .select("sub_lesson_name, sub_lesson_id")
    .eq("lesson_id", req.params.lessonId);
  const assignmentForMap = await supabase
    .from("assignments")
    .select("sub_lesson_id")
    .in(
      "sub_lesson_id",
      subLessonForReturn.data.map((sublesson) => {
        return sublesson.sub_lesson_id;
      })
    );
  const subLessonMapForReturn = subLessonForReturn.data.filter((sublesson) => {
    return !assignmentForMap.data
      .map((assignments) => {
        return assignments.sub_lesson_id;
      })
      .includes(sublesson.sub_lesson_id);
  });
  return res.json({
    data: subLessonMapForReturn,
  });
});

adminRouter.post("/create/assignment/:subLessonId", async (req, res) => {
  try {
    const timeStamp = new Date();
    const response = await supabase.from("assignments").insert({
      sub_lesson_id: req.params.subLessonId,
      assignment_detail: req.body.assignment_detail,
      assignment_duration: Number(req.body.duration),
      created_at: timeStamp.toISOString(),
    });
    return res.json({
      message: "Assignment created successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Supabase Server Error",
    });
  }
});

const storageControll = multer({ storage: multer.memoryStorage() });
const multerUpload = storageControll.fields([
  { name: "courseVideoTrailerFile", maxCount: 1 },
  { name: "courseCoverImgFile", maxCount: 1 },
  { name: "subLessonVideoFile", maxCount: 100 },
  { name: "singleSubLessonVideo", maxCount: 1 },
]);

adminRouter.post("/add/lesson/:courseId", multerUpload, async (req, res) => {
  try {
    const lessonName = req.body.lesson_name;
    const lessonPriority = req.body.lesson_priority;
    const subLessonArray = req.body[`sub_lesson.sub_lesson_name`];
    const sub_lesson_video_array = req.files.subLessonVideoFile;
    const inSertLesson = await supabase
      .from("lessons")
      .insert({
        course_id: req.params.courseId,
        lesson_name: lessonName,
        priority: lessonPriority,
      })
      .select();
    const fetchLessonId = await supabase
      .from("lessons")
      .select("lesson_id")
      .eq("course_id", req.params.courseId)
      .eq("priority", lessonPriority);
    const currentLessonId = fetchLessonId.data[0].lesson_id;
    let subLessonForInsert;
    if (typeof subLessonArray !== "string") {
      subLessonForInsert = subLessonArray.map((value, index) => {
        return {
          lesson_id: currentLessonId,
          sub_lesson_name: value,
          priority: req.body[`sub_lesson.priority`][index],
        };
      });
    } else {
      subLessonForInsert = {
        lesson_id: currentLessonId,
        sub_lesson_name: subLessonArray,
        priority: 1,
      };
    }

    // console.log(subLessonForInsert);
    const insertSubLesson = await supabase
      .from("sub_lessons")
      .insert(subLessonForInsert)
      .select();
    // console.log(insertSubLesson);
    sub_lesson_video_array.map(async (value, index) => {
      const uploadVideo = await supabase.storage
        .from("sublesson_video")
        .upload(
          `${req.params.courseId}/${currentLessonId}/${value.originalname}`,
          value.buffer,
          {
            cacheControl: 3600,
            upsert: true,
            contentType: value.mimetype,
          }
        );
      const filePath = await supabase.storage
        .from("sublesson_video")
        .getPublicUrl(
          `${req.params.courseId}/${currentLessonId}/${value.originalname}`
        );
      await supabase
        .from("sub_lessons")
        .update({ sub_lesson_video: filePath.data.publicUrl })
        .eq("lesson_id", currentLessonId)
        .eq("sub_lesson_name", req.body[`sub_lesson.sub_lesson_name`][index]);
    });
    return res.json({ message: "Insert sub lesson successfully" });
  } catch (err) {
    console.log(err);
  }
});

adminRouter.post("/course/created", multerUpload, async (req, res) => {
  const courseDetail = req.body.courseDetail;
  const lessonsDetail = req.body.lessonsDetail;
  const course_cover_img = req.files.courseCoverImgFile[0];
  const course_video_trailer = req.files.courseVideoTrailerFile[0];
  const sub_lesson_video_array = req.files.subLessonVideoFile;
  try {
    // Insert to courses table
    const timeStamp = new Date();
    const resultInsertCoursesTable = await supabase
      .from("courses")
      .insert({
        course_name: courseDetail.course_name,
        course_price: Number(courseDetail.course_price),
        course_summary: courseDetail.course_summary,
        course_detail: courseDetail.course_detail,
        course_duration: courseDetail.course_duration,
        course_created_at: timeStamp.toISOString(),
        course_updated_at: timeStamp.toISOString(),
      })
      .select();

    // Fetch course_id
    const courseDetailFormSupabase = await supabase
      .from("courses")
      .select("course_id")
      .eq("course_name", courseDetail.course_name)
      .eq("course_price", courseDetail.course_price)
      .eq("course_duration", courseDetail.course_duration);

    const course_id = courseDetailFormSupabase.data[0].course_id;

    //**Maping lessons */
    // console.log(lessonsDetail);
    const lessonForInsert = lessonsDetail.map((value) => {
      return {
        course_id: course_id,
        priority: value.priority,
        lesson_name: value.lesson_name,
      };
    });

    const resultInsertLessonsTable = await supabase
      .from("lessons")
      .insert(lessonForInsert)
      .select();

    // * Fetch lesson id
    const fetchLessonIdResult = await supabase
      .from("lessons")
      .select("lesson_id, lesson_name")
      .eq("course_id", course_id);

    //* Map sub lesson
    const mapSubLesson = lessonsDetail.map((value) => {
      return value.sub_lesson.map((subValue) => {
        return {
          ...subValue,
          lesson_id: fetchLessonIdResult.data.filter((rdValue) => {
            return value.lesson_name === rdValue.lesson_name;
          })[0].lesson_id,
        };
      });
    });
    const arrangeMapSubLesson = [];
    mapSubLesson.map((value) => {
      value.map((subValue) => arrangeMapSubLesson.push(subValue));
    });
    arrangeMapSubLesson.map(async (value) => {
      const filePath = `${course_id}/${value.lesson_id}/${value.sub_lesson_video}`;
      const fileBuffer = sub_lesson_video_array.filter((subValue) => {
        return subValue.originalname === value.sub_lesson_video;
      })[0].buffer;
      const fileContentType = sub_lesson_video_array.filter((subValue) => {
        return subValue.originalname === value.sub_lesson_video;
      })[0].mimetype;
      const resultUpload = await supabase.storage
        .from("sublesson_video")
        .upload(filePath, fileBuffer, {
          cacheControl: 3600,
          upsert: true,
          contentType: fileContentType,
        });
      const subVideorUrl = supabase.storage
        .from(`sublesson_video/${course_id}/${value.lesson_id}`)
        .getPublicUrl(value.sub_lesson_video);
      const resultInsertSub = await supabase
        .from("sub_lessons")
        .insert({ ...value, sub_lesson_video: subVideorUrl.data.publicUrl })
        .select();
    });
    const imgPath = await supabase.storage
      .from("course_images")
      .upload(course_cover_img.originalname, course_cover_img.buffer, {
        cacheControl: 3600,
        upsert: true,
        contentType: course_cover_img.mimetype,
      });
    const videoPath = await supabase.storage
      .from("course_video_trailers")
      .upload(course_video_trailer.originalname, course_video_trailer.buffer, {
        cacheControl: 3600,
        upsert: true,
        contentType: course_video_trailer.mimetype,
      });
    const videoTrailerUrl = await supabase.storage
      .from("course_video_trailers")
      .getPublicUrl(videoPath.data.path);
    const imgaesTrailerUrl = await supabase.storage
      .from("course_images")
      .getPublicUrl(imgPath.data.path);
    // console.log(videoTrailerUrl);
    const reAssignPath = await supabase
      .from("courses")
      .update({
        course_cover_img: imgaesTrailerUrl.data.publicUrl,
        course_video_trailer: videoTrailerUrl.data.publicUrl,
      })
      .eq("course_id", course_id);
    return res.json({
      message: "Created course",
    });
  } catch (error) {
    console.log(error);
    const courseDetailFormSupabase = await supabase
      .from("courses")
      .select("course_id")
      .eq("course_name", courseDetail.course_name)
      .eq("course_price", courseDetail.course_price)
      .eq("course_duration", courseDetail.course_duration);
    const deletedSubjectError = await supabase
      .from("couses")
      .delete()
      .eq("course_id", courseDetailFormSupabase.data[0].course_id);
    return res.status(400).json({
      message: error,
    });
  }
});

adminRouter.put("/public/:courseId", async (req, res) => {
  await supabase
    .from("courses")
    .update({
      public_status: req.body.publicStatus,
    })
    .eq("course_id", req.params.courseId);
  return res.json({
    message: "Public Status updated successfully",
  });
});

adminRouter.put("/updated/:courseId", multerUpload, async (req, res) => {
  const timeStamp = new Date();
  const courseDetails = {
    course_name: req.body.courseDetail.course_name,
    course_price: req.body.courseDetail.course_price,
    course_summary: req.body.courseDetail.course_summary,
    course_detail: req.body.courseDetail.course_detail,
    course_duration: req.body.courseDetail.course_duration,
    course_updated_at: timeStamp.toISOString(),
  };
  try {
    if (
      req.files.courseVideoTrailerFile === undefined &&
      req.files.courseCoverImgFile === undefined
    ) {
      const result = await supabase
        .from("courses")
        .update(courseDetails)
        .eq("course_id", req.params.courseId);
      return res.json({
        message: "Coures updeated successfully",
      });
    } else {
      // console.log(req.files);
      if (req.files.courseCoverImgFile !== undefined) {
        const imgPath = await supabase.storage
          .from("course_images")
          .upload(
            req.files.courseCoverImgFile[0].originalname,
            req.files.courseCoverImgFile[0].buffer,
            {
              cacheControl: 3600,
              upsert: true,
              contentType: req.files.courseCoverImgFile[0].mimetype,
            }
          );
        const imgaesTrailerUrl = await supabase.storage
          .from("course_images")
          .getPublicUrl(imgPath.data.path);
        courseDetails.course_cover_img = imgaesTrailerUrl.data.publicUrl;
      }
      if (req.files.courseVideoTrailerFile !== undefined) {
        const videoPath = await supabase.storage
          .from("course_video_trailers")
          .upload(
            req.files.courseVideoTrailerFile[0].originalname,
            req.files.courseVideoTrailerFile[0].buffer,
            {
              cacheControl: 3600,
              upsert: true,
              contentType: req.files.courseVideoTrailerFile[0].mimetype,
            }
          );
        const videoTrailerUrl = await supabase.storage
          .from("course_video_trailers")
          .getPublicUrl(videoPath.data.path);
        courseDetails.course_video_trailer = videoTrailerUrl.data.publicUrl;
      }
      const result = await supabase
        .from("courses")
        .update(courseDetails)
        .eq("course_id", req.params.courseId);
      return res.json({
        message: "Coures updeated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
});

//get all lessons and sub-lesson details
adminRouter.get("/lessons/:lessonId", async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const lessonName = await supabase
      .from("lessons")
      .select("lesson_name")
      .eq("lesson_id", lessonId);

    const sublessonResult = await supabase
      .from("sub_lessons")
      .select("*")
      .eq("lesson_id ", lessonId)
      .order("priority", { ascending: true });

    if (lessonName.data.length === 0) {
      return res.status(404).json({ error: "Lesson not exist" });
    } else if (sublessonResult.data.length === 0) {
      return (
        res.json({
          data: lessonName.data[0].lesson_name,
        }),
        res.json({ message: "Sub lesson not exsit" })
      );
    } else {
      return res.json({
        data: {
          lesson_name: lessonName.data[0].lesson_name,
          sub_lessons: sublessonResult.data,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// edit lesson name (button update lesson name)
adminRouter.put("/updated/lesson/:courseId/:lessonId", async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const updateAtCourse = await supabase
      .from("courses")
      .update({ course_updated_at: new Date() })
      .eq("course_id", courseId)
      .select();

    const updateLessonName = await supabase
      .from("lessons")
      .update({ lesson_name: req.body.lesson_name })
      .eq("course_id", courseId)
      .eq("lesson_id", lessonId)
      .select();

    if (!updateAtCourse.data && !updateLessonName.data) {
      return res.status(404).json({
        error: updateAtCourse.error.message,
        error: updateLessonName.error.message,
      });
    } else {
      return res.status(200).json({ message: "Lesson updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// create sub-lesson (button create)
adminRouter.post(
  "/created/sublesson/:courseId/:lessonId",
  multerUpload,
  async (req, res) => {
    try {
      const { courseId, lessonId } = req.params;
      const sub_lesson_video = req.files.singleSubLessonVideo[0];
      const filePath = `${courseId}/${lessonId}/${sub_lesson_video.originalname}`;
      if (!sub_lesson_video) {
        return res.status(400).json({ message: "Video not exist" });
      }
      const uploadVideo = await supabase.storage
        .from("sublesson_video")
        .upload(filePath, sub_lesson_video.buffer, {
          cacheControl: 3600,
          upsert: true,
          contentType: sub_lesson_video.mimetype,
        });
      if (uploadVideo.error) {
        return res.status(400).json({ error: uploadVideo.error });
      }

      const videoUrl = await supabase.storage
        .from(`sublesson_video/${courseId}/${lessonId}`)
        .getPublicUrl(sub_lesson_video.originalname);
      if (videoUrl.error) {
        return res.status(400).json({ error: videoUrl.error });
      }

      const findSubLesson = await supabase
        .from("sub_lessons")
        .select("*")
        .eq("lesson_id", lessonId);

      const sublessonInsert = await supabase.from("sub_lessons").insert({
        sub_lesson_name: req.body.sub_lesson_name,
        sub_lesson_video: videoUrl.data.publicUrl,
        lesson_id: lessonId,
        priority: findSubLesson.data.length + 1,
      });
      const createdAtCourse = await supabase
        .from("courses")
        .update({
          course_created_at: new Date(),
        })
        .eq("course_id", courseId)
        .select();
      if (sublessonInsert.error) {
        return res.status(400).json({ error: sublessonInsert.error });
      }
      return res.status(200).json({ message: "Success to create sub-lesson" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// update sub-lesson (button update)
adminRouter.put(
  "/updated/sublesson/:courseId/:lessonId/:subLessonId",
  multerUpload,
  async (req, res) => {
    try {
      const { courseId, lessonId, subLessonId } = req.params;
      const subLessonName = req.body.sub_lesson_name;
      if (req.files.singleSubLessonVideo) {
        const sub_lesson_video = req.files.singleSubLessonVideo[0];
        const filePath = `${courseId}/${lessonId}/${sub_lesson_video.originalname}`;
        const { data: uploadVideo, error: ErrorUploadVideo } =
          await supabase.storage
            .from("sublesson_video")
            .upload(filePath, sub_lesson_video.buffer, {
              cacheControl: "3600",
              upsert: true,
              contentType: sub_lesson_video.mimetype,
            });
        const { data: videoUrl, error: ErrorvideoUrl } = await supabase.storage
          .from(`sublesson_video/${courseId}/${lessonId}`)
          .getPublicUrl(sub_lesson_video.originalname);
        // console.log(videoUrl);
        const { data: subLessonUpdate, error: ErrorSubLessonUpdate } =
          await supabase
            .from("sub_lessons")
            .update({
              sub_lesson_video: videoUrl.publicUrl,
              sub_lesson_name: req.body.sub_lesson_name,
            })
            .eq("lesson_id", lessonId)
            .eq("sub_lesson_id", subLessonId)
            .select();
        const { data: updatedAtCourse, error: ErrorUpdateAtCourse } =
          await supabase
            .from("courses")
            .update({ course_updated_at: new Date() })
            .eq("course_id", courseId)
            .select();
        if (ErrorUploadVideo) {
          return res.status(400).json({ error: ErrorUploadVideo });
        }

        if (ErrorvideoUrl) {
          return res.status(400).json({ error: ErrorvideoUrl });
        }

        if (ErrorSubLessonUpdate && ErrorUpdateAtCourse) {
          return res.status(400).json({
            error: ErrorSubLessonUpdate,
            error: ErrorUpdateAtCourse,
          });
        }
        return res
          .status(200)
          .json({ message: "Updated sub-lessons successfully" });
      } else {
        const { data: subLessonUpdate, error: ErrorSubLessonUpdate } =
          await supabase
            .from("sub_lessons")
            .update({
              sub_lesson_name: req.body.sub_lesson_name,
            })
            .eq("lesson_id", lessonId)
            .eq("sub_lesson_id", subLessonId)
            .select();
        const { data: updatedAtCourse, error: ErrorUpdateAtCourse } =
          await supabase
            .from("courses")
            .update({ course_updated_at: new Date() })
            .eq("course_id", courseId)
            .select();
        if (ErrorSubLessonUpdate && ErrorUpdateAtCourse) {
          return res.status(400).json({
            error: ErrorSubLessonUpdate,
            error: ErrorUpdateAtCourse,
          });
        }
        return res
          .status(200)
          .json({ message: "Updated sub-lessons successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

adminRouter.delete("/assignment/:assignmentId", async (req, res) => {
  try {
    await supabase
      .from("assignments")
      .delete()
      .eq("assignment_id", req.params.assignmentId);
    return res.json({
      message: "Delete assignment successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

adminRouter.delete("/sublessons/:sublessonId", async (req, res) => {
  try {
    const sublessonId = req.params.sublessonId;

    const isValidSublessonUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(
      sublessonId
    );

    if (!isValidSublessonUUID) {
      return res.status(400).json({ error: "Invalid sublessonId format" });
    }

    const sublessonExists = await supabase
      .from("sub_lessons")
      .select("*")
      .eq("sub_lesson_id", sublessonId)
      .single();

    if (!sublessonExists) {
      return res
        .status(404)
        .json({ error: `Sublesson with ID ${sublessonId} does not exist.` });
    }

    const sublessonDeleteResult = await supabase
      .from("sub_lessons")
      .delete()
      .eq("sub_lesson_id", sublessonId);

    return res.json({
      message: `Sublesson with ID ${sublessonId} has been deleted.`,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      error:
        "An error occurred while processing the delete request for the sublesson.",
    });
  }
});
// button public course
// adminRouter.put;

// remove course

// adminRouter.delete("/mydesirecourses/:userId/:courseId", async (req, res) => {
//   const { userId, courseId } = req.params;
//   const result = await supabase
//     .from("user_course_details")
//     .delete()
//     .eq("user_id", userId)
//     .eq("course_id", courseId);
//   console.log(result);
//   if (result.status === 204) {
//     return res.json({ message: "Remove desired course successfully." });
//   } else {
//     return res.status(400).send(`API ERROR`);
//   }
// });

adminRouter.delete("/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(req.params.courseId);

    const isValidUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(courseId);

    if (!isValidUUID) {
      return res.status(400).json({ error: "Invalid courseId format" });
    }

    if (!courseId) {
      return res.status(400).json({
        error: "courseId is required",
      });
    }

    const result = await supabase
      .from("courses")
      .delete()
      .eq("course_id", courseId);
    console.log(result);

    const lessonDeleteResult = await supabase
      .from("lessons")
      .delete()
      .eq("course_id", courseId);
    console.log(lessonDeleteResult);

    return res.json({
      message: `Course with ID ${courseId} and its related content have been deleted.`,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      error: "An error occurred while processing the delete request.",
    });
  }
});

//deleting a single lesson
adminRouter.delete("/lessons/:lessonId/:courseId", async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const courseId = req.params.courseId;
    // console.log(lessonId);
    const isValidLessonUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(lessonId);
    const isValidCourseUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(courseId);

    if (!isValidCourseUUID || !isValidLessonUUID) {
      return res
        .status(400)
        .json({ error: "Invalid courseId or lessonId format" });
    }

    if (!courseId || !lessonId) {
      return res.status(400).json({
        error: "courseId and lessonId are required",
      });
    }

    // Check if the course exists
    const courseExists = await supabase
      .from("courses")
      .select("course_id")
      .eq("course_id", courseId)
      .single();

    if (!courseExists) {
      return res.status(404).json({
        error: `Course with ID ${courseId} does not exist.`,
      });
    }

    // Check if the lesson exists for the specific course
    const lessonExists = await supabase
      .from("lessons")
      .select("lesson_id")
      .eq("lesson_id", lessonId)
      .eq("course_id", courseId)
      .single();

    if (!lessonExists) {
      return res.status(404).json({
        error: `Lesson with ID ${lessonId} does not exist for the course.`,
      });
    }

    // Delete the lesson
    const lessonDeleteResult = await supabase
      .from("lessons")
      .delete()
      .eq("course_id", courseId)
      .eq("lesson_id", lessonId);

    return res.json({
      message: `Lesson with ID ${lessonId} has been deleted from the course.`,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      error:
        "An error occurred while processing the delete request for the lesson.",
    });
  }
});

// deleting a single sublesson
adminRouter.delete("/sublessons/:sublessonId", async (req, res) => {
  try {
    const sublessonId = req.params.sublessonId;

    const isValidSublessonUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(
      sublessonId
    );

    if (!isValidSublessonUUID) {
      return res.status(400).json({ error: "Invalid sublessonId format" });
    }

    const sublessonExists = await supabase
      .from("sub_lessons")
      .select("*")
      .eq("sub_lesson_id", sublessonId)
      .single();

    if (!sublessonExists) {
      return res
        .status(404)
        .json({ error: `Sublesson with ID ${sublessonId} does not exist.` });
    }

    const sublessonDeleteResult = await supabase
      .from("sub_lessons")
      .delete()
      .eq("sub_lesson_id", sublessonId);

    return res.json({
      message: `Sublesson with ID ${sublessonId} has been deleted.`,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      error:
        "An error occurred while processing the delete request for the sublesson.",
    });
  }
});

export default adminRouter;
