# Reneza challenge

We are happy that you decided to solve our little challenge. We hope that you won't find it too hard :)

## Task

Create an email tracking system.

### Tips

- One of the most common strategy is to generate a unique link of an image and track whether a request was made.
- Use playground at /graphql only for queries/mutations which do not include Upload type. For document upload see https://github.com/jaydenseric/graphql-multipart-request-spec. Mutation example:

```
curl 'http://localhost:3000/graphql' \
    -F operations='{"query":"mutation ($file: Upload!) {\n  createTracker(file:$file) {\n    id\n  inquiries { \n ip  } \n fileUrl }\n}","variables":{"file":null}}' \
    -F map='{"0":["variables.file"]}' \
    -F 0=@YOUR_IMAGE.jpg
```

### Subtasks

1. We need to register url calls. (clue: You can achieve this by creating a restful endpoint. Or maybe graphql?). Make sure that fileUrl resolver returns a link to uploaded file. The link must work with GET method and register inquiry according to file.
2. Implement query `listTrackers`.
   Query test example:

```
query ($ids: [ID!]!) {
    listTrackers(ids: $ids) {
        id
        fileUrl
        inquiries {
            time
            ip
        }
    }
}
```

As a final result of these to tasks, you should be able to run this query in the playground:

```
query ($ids:[ID!]!) {
  listTrackers(ids:$ids) {
    id
    fileUrl
    inquiries {
      time
      ip
      tracker {
        id
        fileUrl
      }
    }
  }
}
```

### Advanced/Optional

3. As you can see `Tracker` is linking to `Inquiry` and vice versa. This allows for the client to enter an unlimited depth query. This could be used to construct a DoS attack. Make sure that the client could not enter a query deeper than 5 layers.

4. Add paging mechanism for `listTrackers`

Notes:

- At least one meaningful automated test present.
- Code should be easy to read and understand, don’t over engineer
- Use any git storage you want and share a link to it. Make sure its public
