import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Company name is required." });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ success: false, message: "You can't register same company." });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      company,
      success: true,
      message: "Company registered successfully.",
    });
  } catch (error) {
    console.log(`Internal Server Error in Register-Company API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Register-Company API: ${error} `,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        success: false,
        message: `Companies not found`,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
      message: `Company found successfully`,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Company API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Company API: ${error} `,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: `Company not found`,
      });
    }
    return res.status(200).json({
      company,
      success: true,
      message: `Company found successfully`,
    });
  } catch (error) {
    console.log(`Internal Server Error in Get-Company-By-Id API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Get-Company-By-Id API: ${error} `,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //   cloudinary
    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }
    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(200).json({
        success: false,
        message: `Company not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Company information updated successfully`,
    });
  } catch (error) {
    console.log(`Internal Server Error in Update-Company API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Update-Company API: ${error} `,
    });
  }
};
