import * as React from "react";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import axios from "axios";
function EditAssignmentForm({ assignmentDetail }) {
  const [preAssignmentDetail, setPreAssignmentDetail] = useState("");
  const handdleSubmit = async (event) => {
    try {
      await axios.put(
        `http://localhost:4001/admin/updateassignment/${assignmentDetail.assignment_id}`,
        {
          assignment_duration: assignmentDetail.assignment_duration,
          assignment_detail: assignmentDetail.assignment_detail,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setPreAssignmentDetail(assignmentDetail.assignment_detail);
  }, [assignmentDetail]);
  return (
    <form
      id="edit-assignment"
      onSubmit={handdleSubmit}
      className="w-full h-full pl-[100px] pt-[50px]"
    >
      <FormGroup className="bg-white w-[90%] border-gray-200 rounded-2xl p-[80px]">
        <h3 className="text-xl">Course</h3>
        <FormControl
          variant="filled"
          sx={{ m: 0, width: "45%", paddingY: 2 }}
          disabled
        >
          <InputLabel id="demo-simple-select-filled-label" className=" mt-4">
            Course Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={assignmentDetail.course_name}
          >
            <MenuItem value={assignmentDetail.course_name}>
              <em>{assignmentDetail.course_name}</em>
            </MenuItem>
          </Select>
        </FormControl>
        <div className="flex">
          <div className="w-[45%]">
            <h3 className="text-xl">Lesson</h3>
            <FormControl
              variant="filled"
              sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
              disabled
            >
              <InputLabel id="demo-simple-select-filled-label" className="mt-4">
                Lesson Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={String(assignmentDetail.lesson_name)}
              >
                <MenuItem value={assignmentDetail.lesson_name}>
                  <em>{assignmentDetail.lesson_name}</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-[45%] ml-10">
            <h3 className="text-xl">Sub-lesson</h3>
            <FormControl
              variant="filled"
              sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
              disabled
            >
              <InputLabel id="demo-simple-select-filled-label" className="mt-4">
                Sub-lesson Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={assignmentDetail.sub_lesson_name}
              >
                <MenuItem value={assignmentDetail.sub_lesson_name}>
                  <em>{assignmentDetail.sub_lesson_name}</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <hr className="mt-10 mb-7" />
        <h1 className="text-gray-600 text-2xl mb-10">Assignment detail</h1>
        <h3 className="mb-2 text-xl">Assignment *</h3>
        <TextField
          defaultValue={assignmentDetail.assignment_detail}
          id="outlined-multiline-static"
          label="Assignment"
          multiline
          className="w-full mb-2"
          onChange={(e) => {
            assignmentDetail.assignment_detail = e.target.value;
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
            defaultValue={assignmentDetail.assignment_duration}
            onChange={(event) => {
              assignmentDetail.assignment_duration = event.target.value;
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

export default EditAssignmentForm;
