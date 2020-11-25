import { ObjectId } from "mongodb";
import { Context } from "../context";

export type TrackerResolverParent = {
  id: ObjectId;
};
export const trackerResolvers = {
  id: async ({ id }: TrackerResolverParent) => {
    return id;
  },
  fileUrl: async (
    { id }: TrackerResolverParent,
    args: unknown,
    { trackerLoader }: Context
  ) => {
    // TODO TASK 1

    console.log("IMPLEMENT TASK 1");

    return "TASK 1";
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
