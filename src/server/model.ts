import mongoose from "mongoose";

const ShoppingSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  quantity: Number,
  purchased: Boolean,
});

const ShoppingList = mongoose.model("ShoppingList", ShoppingSchema);

export default ShoppingList;
