import express from "express";
import supabase from "../supabaseClient.js";
import validateEnrollment from "../middleware/validateEnrollment.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

router.post("/enroll", validateEnrollment, async (req, res) => {
  const { student_name, course_id } = req.body;

  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ student_name, course_id }]);

  if (error) return res.status(500).json(error);

  res.json(data);
});

router.get("/courses/:id/enrollments", async (req, res) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("course_id", req.params.id);

  if (error) return res.status(500).json(error);

  res.json(data);
});

export default router;