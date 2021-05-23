const express = require('express')
const express_graphql = require('express-graphql').graphqlHTTP
// const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    post(id: Int!): Post
    posts: [Post]
  }
  
  type Post {
    id: Int
    title: String
    author: String
    content: String
  }
`)

const dummyPosts = [
  { id: 1, title: 'titleXXXX', author: 'yamada', content: 'abcdefg' },
  { id: 2, title: 'titleYYYY', author: 'suzuki', content: '1234567' },
  { id: 3, title: 'titleZZZZ', author: 'tanaka', content: 'ABCDEFG' },
]
const root = {
  post: (args) => {
    const id = args.id
    return dummyPosts.filter((post) => post.id == id)[0]
  },
  posts: () => dummyPosts,
}

const app = express()
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(5000, () => console.log('Example app listening on port 5000!'))
