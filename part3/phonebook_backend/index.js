const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
})

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan(':method :url - :body'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

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
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((el) => el.id === id);
  if (person) {
    return res.json(person);
  }

  return res.status(404).end();
});

app.post('/api/persons', (req, res) => {
  const { body } = req;
  checkBody(body, res);

  const ids = persons.map((p) => p.id);
  const maxId = Math.max(...ids);

  const personToAdd = {
    name: body.name,
    number: body.number,
    id: maxId + 1,
  };
  persons = persons.concat(personToAdd);
  res.json(personToAdd);
});

app.put('/api/persons/:id', (req, res) => {  
  const { body } = req;
  const id = Number(req.params.id);
  checkBody(body, res);
  const oldPerson = persons.find((p) => p.id === id);
  persons = persons.filter((p) => p.id !== id);

  const personToUpdate = {
    ...oldPerson,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(personToUpdate);
  res.json(personToUpdate);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((el) => el.id !== id);
  return res.status(204).end();
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();
  res.send(`Phonebook has info for ${length} people\n${date}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
