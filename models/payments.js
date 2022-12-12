const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  bookingID: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" },
  baseAmount: Number,
  totalAmount: Number,
  paymentTime: Number,
  cardAccountNumber: Number,
  transactionId: String,
});

const Payment = mongoose.model("payments", paymentSchema);

module.exports = Payment;
