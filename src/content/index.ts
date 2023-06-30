/* Copyright (c) 2023 Michael Barlow */

import { convert } from "html-to-text";
import {
  ContentScriptRequest,
  ContentScriptResponse,
  registerMessageListener,
} from "messaging";

const extractDocumentText = () => {
  return convert(document.body.innerText);
};

const handleMessage = (
  request: ContentScriptRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sender: chrome.runtime.MessageSender
): ContentScriptResponse => {
  switch (request.type) {
    case "pageText":
      return { ok: true, payload: extractDocumentText() };
    default:
      return { ok: false, reason: "Unknown request type" };
  }
};

registerMessageListener(handleMessage);
