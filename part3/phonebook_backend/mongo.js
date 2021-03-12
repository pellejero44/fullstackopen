require('dotenv').config();
const mongoose = require('mongoose');

// const password = process.argv[2];

const connectionString = process.env.MONGO_DB_URI;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('database conected');
  })
  .catch((err) => {
    console.error(err);
  });

process.on('uncaughtException', () => {
  mongoose.connection.disconnect();
});

// if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// }

// if (process.argv.length === 5) {
//   const contact = new Person({
//     name: String(process.argv[3]),
//     number: Number(process.argv[4]),
//   });

//   contact
//     .save()
//     .then((response) => {
//       console.log(
//         'saved',
//         `added ${response.name} number ${response.number} to phonebook`
//       );
//       mongoose.connection.close();
//     })
//     .catch((err) => {
//       console.error('error saved', err);
//     });
// }
