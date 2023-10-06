import { Router } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/protect.js";
const userRouter = Router();
userRouter.use(protect);
userRouter.get("/", async (req, res) => {
  const results = await supabase.from("users").select("*");
  if (results.statusText === "OK") {
    return res.json({ data: results.data });
  } else {
    return res.status(400).send(`API ERROR : ${results.error}`);
  }
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase.from("users").select("*").eq("user_id", id);
  // const hasAvatar = await supabase
  //   .from("users")
  //   .select("user_avatar")
  //   .eq("user_id", id);
  // console.log(results.data);
  if (results.statusText === "OK" && results.data[0].user_avatar !== null) {
    const avatarPath = await supabase.storage
      .from("user_avatars")
      .getPublicUrl(results.data[0].user_avatar);
    const token = jwt.sign(
      {
        user_id: results.data[0].user_id,
        user_email: results.data[0].user_email,
        user_name: results.data[0].user_name,
        user_education: results.data[0].user_education,
        user_dob: results.data[0].user_dob,
        user_avatar: avatarPath.data.publicUrl,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Fetching succesfully",
      token,
    });
  } else if (
    results.statusText === "OK" &&
    results.data[0].user_avatar === null
  ) {
    // console.log("Yes!");
    const token = jwt.sign(
      {
        user_id: results.data[0].user_id,
        user_email: results.data[0].user_email,
        user_name: results.data[0].user_name,
        user_education: results.data[0].user_education,
        user_dob: results.data[0].user_dob,
        user_avatar: null,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "90000",
      }
    );

    return res.json({
      message: "Fetching succesfully",
      token,
    });
  } else {
    return res.status(400).send(`API ERROR : ${results.error}`);
  }
});

userRouter.post("/", async (req, res) => {
  const results = await supabase.from("users").insert([
    {
      user_name: `${req.body.user_name}`,
      user_education: `${req.body.user_education}`,
      user_dob: `${req.body.user_dob}`,
    },
  ]);
  if (results.statusText === "OK") {
    return res.json({ message: "Create users successfully" });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});

userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body.user_email);
  const oldPath = await supabase
    .from("users")
    .select("user_avatar")
    .eq("user_id", id);
  let results;
  let url;
  if (req.body.user_avatar !== null) {
    results = await supabase
      .from("users")
      .update({
        user_email: `${req.body.user_email}`,
        user_name: `${req.body.user_name}`,
        user_education: `${req.body.user_education}`,
        user_dob: `${req.body.user_dob}`,
        user_avatar: `${req.body.user_avatar}`,
      })
      .eq("user_id", id)
      .select();
    url = await supabase.storage
      .from("user_avatars")
      .remove([oldPath.data[0].user_avatar]);
  } else {
    results = await supabase
      .from("users")
      .update({
        user_email: `${req.body.user_email}`,
        user_name: `${req.body.user_name}`,
        user_education: `${req.body.user_education}`,
        user_dob: `${req.body.user_dob}`,
      })
      .eq("user_id", id)
      .select();
  }
  if (results.statusText === "OK") {
    return res.json({ message: "Update users successfully" });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});

userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase.from("users").delete().eq("user_id", id);
  if (results.status === 204) {
    return res.json({ message: "Deleted users successfully." });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});
export default userRouter;
