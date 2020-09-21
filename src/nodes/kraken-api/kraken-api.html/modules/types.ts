import { EditorNodeProperties } from "node-red";
import { KrakenApiOptions } from "../../shared/types";

export interface KrakenApiEditorNodeProperties
  extends EditorNodeProperties,
    KrakenApiOptions {}
