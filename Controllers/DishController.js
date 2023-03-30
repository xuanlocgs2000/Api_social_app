import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
const Food = require("./foodModel");
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      status: "success",
      data: {
        foods,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        food,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createFood = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        food: newFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        food,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
};
