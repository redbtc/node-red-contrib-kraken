import { EditorRED } from "node-red";
import { krakenApiConfigCredentials } from "./modules/config";
import {
  KrakenApiConfigEditorNodeCredentials,
  KrakenApiConfigEditorNodeProperties,
} from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<
  KrakenApiConfigEditorNodeProperties,
  KrakenApiConfigEditorNodeCredentials
>("kraken-api-config", {
  category: "config",
  defaults: {
    name: { value: "" },
  },
  credentials: krakenApiConfigCredentials,
  label: function () {
    return this.name || "Kraken API client config";
  },
});
