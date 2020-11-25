import { prop } from "@typegoose/typegoose";

export class Inquiry {
  @prop({ required: true })
  time!: Date;
  @prop({ required: true })
  ip!: string;
}
