require('./mongo');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url - :body'));

// let persons = [];

const checkBody = (body, res) => {
  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' });
  }
};

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return res.json(person);
      }

      return res.status(404).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res) => {
  const { body } = req;
  checkBody(body, res);

  const personToAdd = new Person({
    name: body.name,
    number: body.number,
  });

  personToAdd.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  checkBody(body, res);

  const personToUpdate = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, personToUpdate, {new: true})
  .then(updatedPerson => res.json(updatedPerson))
  .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).end();
    })
    .catch((err) => next(err));
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();
  res.send(`Phonebook has info for ${length} people\n${date}`);
});

app.use(notFound);
app.use(handleErrors);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
