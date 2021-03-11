const mongoose = require('mongoose');
const { Schema, model } = mongoose;

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const connectionString = `mongodb://fullstack:${password}@cluster0-shard-00-00.3xzlf.mongodb.net:27017,cluster0-shard-00-01.3xzlf.mongodb.net:27017,cluster0-shard-00-02.3xzlf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1k5y1u-shard-0&authSource=admin&retryWrites=true&w=majority`;
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

const personSchema = new Schema({
  name: String,
  number: Number,
});

const Person = model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const contact = new Person({
    name: String(process.argv[3]),
    number: Number(process.argv[4]),
  });

  contact
    .save()
    .then((response) => {
      console.log(
        'saved',
        `added ${response.name} number ${response.number} to phonebook`
      );
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('error saved', err);
    });
}
