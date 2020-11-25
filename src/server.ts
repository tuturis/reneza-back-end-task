import express from "express";
import { fakeStorage } from "./services/storage";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { resolvers } from "./modules/resolvers";
import { context } from "./modules/context";

const EXAMPLE_QUERY = `#example query for 2 task.
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
}`;

export const startApp = async () => {
  const app = express();

  await fakeStorage.init();
  if (!process.env.MONGO_URL) {
    throw new Error("Missing env mongodb connection env var.");
  }
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context,
    playground: {
      tabs: [
        {
          name: "2-task-example-query",
          endpoint: `http://localhost:${process.env.PORT}/graphql`,
          query: EXAMPLE_QUERY,
          variables: '{"ids":[]}',
        },
      ],
    },
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};
