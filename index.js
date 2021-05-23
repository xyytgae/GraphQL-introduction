const express = require('express')
const express_graphql = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')

const app = express()

app.use(
  '/graphql',
  express_graphql({
    schema: buildSchema('type Query { wakuwaku: String }'),

    // Resolver
    rootValue: {
      wakuwaku: () => 'Hello World!',
    },

    graphiql: true,
  }),
)

app.listen(5000, () => console.log('Example app listening on port 5000!'))
