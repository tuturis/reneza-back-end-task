import { DocumentType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Inquiry } from "./model";

export type InquiryResolverParent = DocumentType<Inquiry> & {
  tracker_id: ObjectId;
};

export const inquiryResolvers = {
  time: async ({ time }: InquiryResolverParent) => {
    return time;
  },
  ip: async ({ ip }: InquiryResolverParent) => {
    return ip;
  },
  tracker: async ({ tracker_id }: InquiryResolverParent) => {
    return { id: tracker_id };
  },
};
