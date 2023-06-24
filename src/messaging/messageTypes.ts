/* Copyright (c) 2023 Michael Barlow */

type Result<Payload> =
  | { ok: true; payload: Payload }
  | { ok: false; reason: string };

type PageTextRequest = {
  type: "pageText";
};

type PageTextResponse = Result<string>;

export type ContentScriptRequest = PageTextRequest;
export type ContentScriptResponse = PageTextResponse;
