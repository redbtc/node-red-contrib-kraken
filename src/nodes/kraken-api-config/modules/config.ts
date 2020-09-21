import { NodeCredentials } from "node-red";
import { KrakenApiConfigCredentials } from "../shared/types";

export const krakenApiConfigCredentials: NodeCredentials<KrakenApiConfigCredentials> = {
  apiKey: { type: "text" },
  privKey: { type: "text" },
};
