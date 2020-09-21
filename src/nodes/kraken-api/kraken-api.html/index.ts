import { EditorRED } from "node-red";
import { KrakenApiEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<KrakenApiEditorNodeProperties>("kraken-api", {
  category: "Red BTC",
  color: "#B3A9EE",
  defaults: {
    client: { value: "", type: "kraken-api-config", required: true },
    method: { value: "" },
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "kraken-logo.svg",
  paletteLabel: "kraken api",
  label: function () {
    if (this.name) {
      return this.name;
    }
    if (this.method) {
      return this.method.split("/").splice(0, 1).join("/"); // without private/public part
    }
    return "kraken api";
  },
});
