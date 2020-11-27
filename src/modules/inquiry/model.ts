import { prop } from "@typegoose/typegoose";

export interface IInquiry {
  time: Date
  ip: String
}
export class Inquiry {
  @prop({ required: true })
  time!: Date;
  @prop({ required: true })
  ip!: string;
  constructor(inquary: IInquiry) {
    Object.assign(this, inquary)
  }
}
