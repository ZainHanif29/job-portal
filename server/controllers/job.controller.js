import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      job,
      success: true,
      message: "New job created successfully.",
    });
  } catch (error) {
    console.log(`Internal Server Error in Post-Job API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Post-Job API: ${error} `,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: `Jobs not found.`,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(`Internal Server Error in Get-All-Job API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-All-Job API: ${error} `,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: `Jobs not found.`,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Job-By-ID API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Job-By-ID API: ${error} `,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: `Jobs not found.`,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Admin-Job API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Admin-Job API: ${error} `,
    });
  }
};
