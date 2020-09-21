import { NodeInitializer } from "node-red";
import { krakenApiConfigCredentials } from "./modules/config";
import { KrakenClient } from "./modules/kraken-client";
import { KrakenApiConfigNode, KrakenApiConfigNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function KrakenApiConfigNodeConstructor(
    this: KrakenApiConfigNode,
    config: KrakenApiConfigNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    if (
      this.credentials &&
      this.credentials.apiKey &&
      this.credentials.privKey
    ) {
      this.client = new KrakenClient(
        this.credentials.apiKey,
        this.credentials.privKey,
        "0"
      );
    }
  }

  RED.nodes.registerType("kraken-api-config", KrakenApiConfigNodeConstructor, {
    credentials: krakenApiConfigCredentials,
  });
};

export = nodeInit;
