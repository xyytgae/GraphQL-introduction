# GraphQL-introduction

# 参考サイト
https://www.wakuwakubank.com/posts/641-nodejs-graphql/

# 調べた事
✕ const express_graphql = require('express-graphql')

◯ const express_graphql = require('express-graphql').graphqlHTTP


# 分かった事

+ SQLと同じように型指定を行う
+ TypeScriptのintefaceのようにオブジェクトの型を定義することも出来る
+ 使用するスキーマが変わることで型の名前の変わる。（ex: String => GraphQLString）
+ resolve関数を使うことで他のテーブル(?)からデータを取得可能。
