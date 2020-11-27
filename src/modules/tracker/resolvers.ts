import { urlencoded } from "express";
import { ObjectId } from "mongodb";
import { Context } from "../context";

export type TrackerResolverParent = {
  id: ObjectId;
};
export type TrackerResoverFilename = {
  filename: String;
}
export const trackerResolvers = {
  id: async ({ id }: TrackerResolverParent) => {
    return id;
  },
  fileUrl: async (
    { id }: TrackerResolverParent,
    args: unknown,
    { trackerLoader }: Context
  ) => {
    let uri = encodeURIComponent(`/graphql/?query={track{id}}?variables={id:${id}}`)
    return `${process.env.API_URL || "localhost" + ":" + process.env.PORT}${uri}`;
  },
  inquiries: async (
    { id }: TrackerResolverParent,
    args: unknown,
    { trackerLoader }: Context
  ) => {
    const { inquiries } = await trackerLoader.load(id);

    console.log(inquiries);

    console.log(
      inquiries.map(({ ip, time }) => {
        return {
          ip,
          time,
          tracker_id: id,
        };
      })
    );

    return inquiries.map(({ ip, time }) => {
      return {
        ip,
        time,
        tracker_id: id,
      };
    });
  },
};
