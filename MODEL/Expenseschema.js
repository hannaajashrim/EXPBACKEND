const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  type: { type: String, default: "Anonymous" },
  name: { type: String, default: "Investment" },
  user: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expensemodel = mongoose.model("expense", ExpenseSchema);

module.exports = Expensemodel;
