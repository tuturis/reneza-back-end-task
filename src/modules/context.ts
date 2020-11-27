import { trackerLoader } from "./tracker/dataloader";
import express from "express";
import {
  IPv4Resolver,
  IPv6Resolver,
} from 'graphql-scalars';
export type Context = {
  trackerLoader: ReturnType<typeof trackerLoader>;
  ip: string;
};

export const context = ({ req }: { req: express.Request }): Context => {
  return {
    trackerLoader: trackerLoader(),
    ip: req?.ip,
  };
};
