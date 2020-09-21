import { Node, NodeDef } from "node-red";
import { KrakenApiOptions } from "../shared/types";

export interface KrakenApiNodeDef extends NodeDef, KrakenApiOptions {}

export type KrakenApiNode = Node;
