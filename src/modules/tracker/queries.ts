import { DocumentType } from "@typegoose/typegoose";
import { TrackerResolverParent } from "./resolvers";
import { Context } from "../context";
import { ObjectId } from "mongodb";
import { Tracker } from "./model";

export const listTrackers = async (
  parent: unknown,
  { ids }: { ids: Array<ObjectId> },
  { trackerLoader }: Context
): Promise<Array<TrackerResolverParent>> => {
  // TODO 2 task

  console.log("IMPLEMENT TASK 2");

  return [];
};
