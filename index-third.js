const express = require('express')
// const express_graphql = require('express-graphql')
const express_graphql = require('express-graphql').graphqlHTTP

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')

const dummyPosts = [
  { id: 1, title: 'titleXXXX', content: 'abcdefg' },
  { id: 2, title: 'titleYYYY', content: '1234567' },
  { id: 3, title: 'titleZZZZ', content: 'ABCDEFG' },
]

const dummyComments = [
  { id: 1, postId: 1, author: 'authorXXXX', body: 'aaaaaaaaaaaa' },
  { id: 2, postId: 2, author: 'authorYYYY', body: 'bbbbbbbbbbbb' },
  { id: 3, postId: 1, author: 'authorZZZZ', body: 'cccccccccccc' },
  { id: 4, postId: 3, author: 'authorYYYY', body: 'dddddddddddd' },
]

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: {
    id: {
      type: GraphQLInt,
    },
    postId: {
      type: GraphQLInt,
    },
    author: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  },
})

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        const postId = parent.id
        return dummyComments.filter((comment) => comment.postId == postId)
      },
    },
  },
})

const RootType = new GraphQLObjectType({
  name: 'RootType',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return dummyPosts
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, args) {
        const id = args.id
        return dummyPosts.filter((post) => post.id == id)[0]
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootType,
})

const app = express()
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    graphiql: true,
  }),
)

app.listen(5000, () => console.log('Example app listening on port 5000!'))
