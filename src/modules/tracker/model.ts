import * as mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Inquiry } from "../inquiry/model";

export class Tracker {
  @prop({ required: true })
  filename!: string;

  @prop({ required: true, _id: false, type: Inquiry })
  inquiries!: Array<Inquiry>;
}

export const TrackerModel = getModelForClass(Tracker, {
  existingMongoose: mongoose,
  schemaOptions: {
    collection: "Trackers",
  },
});
