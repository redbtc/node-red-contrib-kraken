import { NodeInitializer, NodeMessageInFlow, NodeStatus } from "node-red";
import { KrakenClientPayload } from "../kraken-api-config/modules/kraken-client";
import { KrakenApiConfigNode } from "../kraken-api-config/modules/types";
import { KrakenApiNode, KrakenApiNodeDef } from "./modules/types";

const statuses: Record<
  "idle" | "misconfigured" | "error" | "sending" | "blank",
  NodeStatus
> = {
  idle: { fill: "green", shape: "dot", text: "idle" },
  misconfigured: {
    fill: "red",
    shape: "ring",
    text: "misconfigured",
  },
  error: { fill: "red", shape: "ring", text: "error" },
  sending: { fill: "blue", shape: "dot", text: "sending" },
  blank: {},
};

interface KrakenMessage extends NodeMessageInFlow {
  method?: unknown;
  payload?: unknown;
}

const nodeInit: NodeInitializer = (RED): void => {
  function KrakenApiNodeConstructor(
    this: KrakenApiNode,
    config: KrakenApiNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    if (!config.client) {
      this.status(statuses.misconfigured);
      return;
    }

    const clientNode = RED.nodes.getNode(config.client) as KrakenApiConfigNode;
    if (!clientNode || !clientNode.client) {
      this.status(statuses.misconfigured);
      return;
    }

    const krakenClient = clientNode.client;

    this.on("input", async (msg: KrakenMessage, send, done) => {
      const method = config.method || msg.method;
      if (typeof method !== "string") {
        done(
          new Error("Invalid Method: " + typeof method + " - should be string")
        );
        return;
      }

      const payload = (msg.payload as KrakenClientPayload) || {};
      if (typeof payload !== "object") {
        done(
          new Error(
            "Invalid Payload: " + typeof payload + " - should be object"
          )
        );
        return;
      }

      try {
        this.status(statuses.sending);
        const resData = await krakenClient.request(method, payload);
        this.status(statuses.idle);
        msg.payload = resData;
      } catch (e) {
        this.status(statuses.error);
        done(e);
        return;
      }

      send(msg);
      done();
    });
  }

  RED.nodes.registerType("kraken-api", KrakenApiNodeConstructor);
};

export = nodeInit;
