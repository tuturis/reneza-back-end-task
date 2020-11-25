import { trackerLoader } from "./tracker/dataloader";
import express from "express";

export type Context = {
  trackerLoader: ReturnType<typeof trackerLoader>;
  ip: string;
};

export const context = ({ req }: { req: express.Request }): Context => {
  return {
    trackerLoader: trackerLoader(),
    ip: req?.headers["x-forwarded-for"] as string,
  };
};
