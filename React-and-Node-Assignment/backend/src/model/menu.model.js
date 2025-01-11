import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Appetizers", "Main Course", "Desserts", "Beverages", "Sides"],
      default: "Main Course",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("MenuModel", menuSchema);

export default MenuModel;
