import { trackerResolvers } from "./tracker/resolvers";
import { GraphQLDateTime, GraphQLTime } from "graphql-iso-date";
import { inquiryResolvers } from "./inquiry/resolvers";
import { createTracker } from "./tracker/mutations";
import { listTrackers } from "./tracker/queries";

export const resolvers = {
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
  Tracker: trackerResolvers,
  Inquiry: inquiryResolvers,

  Mutation: {
    createTracker,
  },
  Query: {
    listTrackers,
  },
};
