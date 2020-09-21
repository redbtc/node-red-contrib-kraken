import { EditorNodeCredentials } from "node-red";
import { KrakenApiConfigCredentials } from "../../shared/types";

export const krakenApiConfigCredentials: EditorNodeCredentials<KrakenApiConfigCredentials> = {
  apiKey: { type: "text" },
  privKey: { type: "text" },
};
