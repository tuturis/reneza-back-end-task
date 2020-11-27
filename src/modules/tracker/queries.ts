import { TrackerResolverParent } from "./resolvers";
import { Context } from "../context";
import { ObjectId } from "mongodb";
import { TrackerModel } from "./model";
import { Inquiry } from "../inquiry/model";

export type TrackRespone = {
  id: String
  ip: String
}

export const listTrackers = async (
  parent: unknown,
  { ids }: { ids: Array<ObjectId> },
  { trackerLoader }: Context
): Promise<Array<TrackerResolverParent>> => {
  // @ts-ignore
  return await trackerLoader.loadMany(ids);
};

export const track = async (
  parent: unknown,
  { id }: { id: ObjectId },
  { trackerLoader, ip }: Context
): Promise<TrackRespone> => {
  const track_parent = await TrackerModel.findById(id)
  const inquiry = new Inquiry({ time: new Date(), ip: ip })
  track_parent?.inquiries.push(inquiry)
  await track_parent?.save()
  return { id: track_parent?.id, ip: ip }
}