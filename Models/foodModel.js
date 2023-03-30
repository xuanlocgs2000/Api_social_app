import mongoose from "mongoose";
const Schema = mongoose.Schema;
const foodSchema = new Schema({
  name: String,
  region: String,
  ingredients: [String],
  preparation: String,
  history: String,
});
const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
