const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  serviceID: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
  startDate: Date,
  endDate: Date,
  price: Number,
  total: Number,
  paymentStatus: Boolean,
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
