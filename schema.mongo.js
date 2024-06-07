const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addressModel = mongoose.model("Address", addressSchema);

module.exports = addressModel;
