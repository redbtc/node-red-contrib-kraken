import crypto from "crypto";
import fetch from "node-fetch";
import qs from "querystring";

// regular API 
// const apiRootUrl = "https://api.kraken.com";

const apiRootUrl = "https://www.cryptofacilities.com";


const userAgent = "node-red-contrib-kraken-futures";

const commonHeaders: Record<string, string> = {
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent": userAgent,
};

export class KrakenAPIError extends Error {}

interface ApiResponse {
  error?: string[];
  result?: unknown;
}

export type KrakenClientPayload = Record<
  string,
  | string
  | number
  | boolean
  | readonly string[]
  | readonly number[]
  | readonly boolean[]
  | null
>;

export class KrakenClient {
  constructor(
    private apiKey: string,
    private privKey: string,
    private apiVer: string
  ) {}

  private async makeRequest(
    url: string,
    headers: Record<string, string>,
    body: string
  ) {
    const response = await fetch(url, { headers, body, method: "post" });

    const respJson = (await response.json()) as ApiResponse;

    if (respJson.error && respJson.error.length) {
      throw new KrakenAPIError(respJson.error.join(", "));
    }

    return respJson.result;
  }

  private async publicRequest(
    method: string,
    payload: KrakenClientPayload = {}
  ): Promise<unknown> {
    const url = apiRootUrl + "/" + this.apiVer + "/" + method;
    const body = qs.stringify(payload);
    const headers = Object.assign({}, commonHeaders);

    return await this.makeRequest(url, headers, body);
  }

  private createPrivateHeaders(path: string, body: string, nonce: number) {
    const bufPrivKey = Buffer.from(this.privKey, "base64");

    const hash = crypto.createHash("sha256");
    const hashDigest = hash.update(nonce.toString() + body).digest().toString("latin1");

    const hmac = crypto.createHmac("sha512", bufPrivKey);
    const hmacDigest = hmac
      .update(path + hashDigest, "latin1")
      .digest("base64");

    return {
      "API-Key": this.apiKey,
      "API-Sign": hmacDigest,
    };
  }

  private async privateRequest(
    method: string,
    payload: KrakenClientPayload = {}
  ): Promise<unknown> {
    const path = "/" + this.apiVer + "/" + method;
    const url = apiRootUrl + path;

    const nonce = new Date().getTime() * 1000;
    payload.nonce = nonce;

    const body = qs.stringify(payload);

    const headers = Object.assign(
      {},
      commonHeaders,
      this.createPrivateHeaders(path, body, nonce)
    );

    return await this.makeRequest(url, headers, body);
  }

  async request(
    method: string,
    payload: KrakenClientPayload = {}
  ): Promise<unknown> {
    if (method.startsWith("private/")) {
      return this.privateRequest(method, payload);
    } else if (method.startsWith("public/")) {
      return this.publicRequest(method, payload);
    } else {
      throw new Error("invalid api method");
    }
  }
}
