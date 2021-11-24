const { ApolloServer, gql } = require("apollo-server");

const authors = [
  {
    name: "Miguel",
    id: "56165415615151121561515615",
    born: 1975,
    bookCount: 2,
  },
  {
    name: "Miguel 2",
    id: "5616541561510000000615",
    born: 1985,
    bookCount: 3,
  },
  {
    name: "Miguel 3",
    id: "5616541666666561515615",
    born: 1995,
    bookCount: 1,
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    allAuthors: () => authors,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
