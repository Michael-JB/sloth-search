/* Copyright (c) 2023 Michael Barlow */

import {
  ContentScriptRequest,
  ContentScriptResponse,
  registerMessageListener,
} from "messaging";

const extractDocumentText = () => {
  return document.body.innerText;
};

const handleMessage = (
  request: ContentScriptRequest
): ContentScriptResponse => {
  switch (request.type) {
    case "pageText":
      return { ok: true, payload: extractDocumentText() };
    default:
      return { ok: false, reason: "Unknown request type" };
  }
};

registerMessageListener(handleMessage);
