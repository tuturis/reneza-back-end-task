import { gql } from "apollo-server-express";

export const schema = gql`
  scalar DateTime
  scalar Time
  
  type TrackRespone {
    id: ID!
    ip: String!
  }

  type Inquiry {
    time: DateTime!
    ip: String!
    tracker: Tracker!
  }

  type Tracker {
    id: ID!
    fileUrl: String!
    inquiries: [Inquiry!]!
  }
  
  type Mutation {
    createTracker(file: Upload): Tracker!
  }
  
  type Query {
    listTrackers(ids: [ID!]): [Tracker!]!
    track(id: ID!): TrackRespone!
  }
`;
