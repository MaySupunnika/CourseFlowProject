import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import useAssignmentHook from "../../hook/useAssignmentHook";
import FormGroup from "@mui/material/FormGroup";
function AssignmentForm() {
  const {
    createButtom,
    courseList,
    getCourseList,
    fetch,
    setFetch,
    setCourseList,
    lessonList,
    setLessonList,
    subLessonList,
    setSubLessonList,
    courseShow,
    setCourseShow,
    lessonShow,
    setLessonShow,
    subLessonShow,
    setSubLessonShow,
    assignmentDetail,
    setAssignmentDetail,
    duration,
    setDuration,
    getLesson,
    getSubLesson,
  } = useAssignmentHook();
  const handdleSubmit = async () => {
    const lessonId = subLessonList.filter(
      (value) => value.sub_lesson_name === subLessonShow
    )[0].sub_lesson_id;
    const dataForm = {
      assignment_detail: assignmentDetail,
      duration: duration,
    };
    try {
      const res = await axios.post(
        `http://localhost:4001/admin/create/assignment/${lessonId}`,
        dataForm
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (fetch === 0) {
      getCourseList().then((data) => {
        setCourseList(data);
      });
      setFetch(1);
    }
  }, [fetch]);

  return (
    <form
      id="create-assignment"
      onSubmit={handdleSubmit}
      className="w-full h-full pl-[100px]"
    >
      <FormGroup className="bg-white w-[90%] border-gray-200 rounded-2xl p-[80px]">
        <h3 className="text-xl">Course</h3>
        <FormControl variant="filled" sx={{ m: 0, width: "45%", paddingY: 2 }}>
          <InputLabel id="demo-simple-select-filled-label" className=" mt-4">
            Course Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={courseShow}
            onChange={(event) => {
              setCourseShow(event.target.value);
              getLesson(event.target.value).then((lesson) => {
                if (lesson.length > 0) {
                  setLessonList(lesson);
                  setLessonShow("");
                  setSubLessonShow("");
                  setSubLessonList([]);
                } else {
                  setLessonList([]);
                }
              });
            }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {courseList.map((value, index) => {
              return (
                <MenuItem key={value.course_id} value={value.course_name}>
                  {value.course_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="flex">
          <div className="w-[45%]">
            <h3 className="text-xl">Lesson</h3>
            <FormControl
              variant="filled"
              sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
              disabled={lessonList.length === 0}
            >
              <InputLabel id="demo-simple-select-filled-label" className="mt-4">
                Lesson Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={lessonShow}
                defaultValue={""}
                onChange={(event) => {
                  setLessonShow(event.target.value);
                  getSubLesson(event.target.value).then((sublesson) => {
                    if (sublesson.length > 0) {
                      setSubLessonShow("");
                      setSubLessonList(sublesson);
                    } else {
                      setSubLessonList([]);
                    }
                  });
                }}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {lessonList.map((value, index) => {
                  return (
                    <MenuItem key={value.lesson_id} value={value.lesson_name}>
                      {value.lesson_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="w-[45%] ml-10">
            <h3 className="text-xl">Sub-lesson</h3>
            <FormControl
              variant="filled"
              sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
              disabled={subLessonList.length === 0}
            >
              <InputLabel id="demo-simple-select-filled-label" className="mt-4">
                Sub-lesson Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={subLessonShow}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    setSubLessonShow(event.target.value);
                  } else {
                    setLessonShow("");
                  }
                }}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {subLessonList.map((value, index) => {
                  return (
                    <MenuItem
                      key={value.sub_lesson_id}
                      value={value.sub_lesson_name}
                    >
                      {value.sub_lesson_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <hr className="mt-10 mb-7" />
        <h1 className="text-gray-600 text-2xl mb-10">Assignment detail</h1>
        <h3 className="mb-2 text-xl">Assignment *</h3>
        <TextField
          defaultValue={""}
          id="outlined-multiline-static"
          label="Assignment"
          multiline
          className="w-full mb-2"
          onChange={(e) => {
            setAssignmentDetail(e.target.value);
          }}
        />
        <h3 className="mb-2 mt-5 text-xl">Duration of assignment (day)</h3>
        <FormControl
          variant="filled"
          sx={{ m: 0, width: "45%", borderRadius: "50%" }}
        >
          <InputLabel id="demo-simple-select-filled-label">Days</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1 day</MenuItem>
            <MenuItem value={2}>2 day</MenuItem>
            <MenuItem value={3}>3 day</MenuItem>
            <MenuItem value={4}>4 day</MenuItem>
            <MenuItem value={5}>5 day</MenuItem>
            <MenuItem value={6}>6 day</MenuItem>
            <MenuItem value={7}>7 day</MenuItem>
            <MenuItem value={8}>8 day</MenuItem>
            <MenuItem value={9}>9 day</MenuItem>
            <MenuItem value={10}>10 day</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </form>
  );
}

export default AssignmentForm;
