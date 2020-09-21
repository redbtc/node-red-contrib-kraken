import { Node, NodeDef } from "node-red";
import {
  KrakenApiConfigCredentials,
  KrakenApiConfigOptions,
} from "../shared/types";
import { KrakenClient } from "./kraken-client";

export interface KrakenApiConfigNodeDef
  extends NodeDef,
    KrakenApiConfigOptions {}

export interface KrakenApiConfigNode extends Node<KrakenApiConfigCredentials> {
  client?: KrakenClient;
}
