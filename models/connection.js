const mongoose = require("mongoose");
// Prise en compte de la dépréciaton mongoose sur la connection
mongoose.set('strictQuery', false);
const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
