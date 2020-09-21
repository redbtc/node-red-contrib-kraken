import { EditorNodeProperties } from "node-red";
import {
  KrakenApiConfigCredentials,
  KrakenApiConfigOptions,
} from "../../shared/types";

export type KrakenApiConfigEditorNodeCredentials = KrakenApiConfigCredentials;

export interface KrakenApiConfigEditorNodeProperties
  extends EditorNodeProperties,
    KrakenApiConfigOptions {}
