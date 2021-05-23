const express = require('express')
// const express_graphql = require('express-graphql')
const express_graphql = require('express-graphql').graphqlHTTP

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')

let dummyPosts = [
  { id: 1, title: 'titleXXXX', content: 'abcdefg' },
  { id: 2, title: 'titleYYYY', content: '1234567' },
  { id: 3, title: 'titleZZZZ', content: 'ABCDEFG' },
]

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
})

const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
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
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve(parent, args) {
        const id = args.id
        return dummyPosts.filter((post) => post.id == id)[0]
      },
    },
  },
})

const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { post: { type: PostInputType } },
      resolve: (value, args) => {
        const post = args.post
        dummyPosts.push(post)
        return post
      },
    },
    deletePost: {
      type: new GraphQLList(PostType),
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (value, args) => {
        const id = args.id
        dummyPosts = dummyPosts.filter((post) => post.id != id)
        return dummyPosts
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: RootType,
  mutation: MutationType,
})

const app = express()
app.use('/graphql', express_graphql({ schema: schema, graphiql: true }))

app.listen(5000, () => console.log('Example app listening on port 5000!'))
