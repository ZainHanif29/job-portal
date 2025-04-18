import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job id is not found" });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this jobs",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    job.save();
    return res.status(201).json({
      success: true,
      message: "Job apply successfully",
    });
  } catch (error) {
    console.log(`Internal Server Error in Apply-Job API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Apply-Job API: ${error} `,
    });
  }
};
export const getApplyJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
      });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No Application",
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Apply-Job API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Apply-Job API: ${error} `,
    });
  }
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Applicants API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Applicants API: ${error} `,
    });
  }
};
export const updatedStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Application not found",
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(`Internal Server Error in Updated-Status API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Updated-Status API: ${error} `,
    });
  }
};
