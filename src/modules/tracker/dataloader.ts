import { DocumentType } from "@typegoose/typegoose";
import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { Tracker, TrackerModel } from "./model";

type BatchTenancyCases = (
  ids: ReadonlyArray<ObjectId>
) => Promise<Array<DocumentType<Tracker>>>;

export const batchLoadTrackers: BatchTenancyCases = async (ids) => {
  const trackers = await TrackerModel.find({
    _id: { $in: ids },
  });

  const hash: Record<string, DocumentType<Tracker>> = {};
  trackers.forEach((tracker) => {
    hash[tracker._id.toString()] = tracker;
  });

  return ids.map((id) => hash[id.toString()] || null);
};

export const trackerLoader = () =>
  new DataLoader<ObjectId, DocumentType<Tracker>>(batchLoadTrackers);
