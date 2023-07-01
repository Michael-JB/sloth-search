/* Copyright (c) 2023 Michael Barlow */

import browser from "webextension-polyfill";
import { ContentScriptRequest, ContentScriptResponse } from "./messageTypes";

export const messageActiveTab = async (
  message: ContentScriptRequest
): Promise<ContentScriptResponse> => {
  const activeTab = await getActiveTab();
  if (!activeTab || !activeTab.id)
    return { ok: false, reason: "Could not identify active tab" };
  const response: ContentScriptResponse = await browser.tabs
    .sendMessage(activeTab.id, message)
    .catch((error: Error) => ({ ok: false, reason: error.message }));
  return response;
};

export const registerMessageListener = (
  handleMessage: (
    request: ContentScriptRequest,
    sender: browser.Runtime.MessageSender
  ) => ContentScriptResponse
) => {
  browser.runtime.onMessage.addListener(
    (
      request: ContentScriptRequest,
      sender: browser.Runtime.MessageSender,
      sendResponse: (response: ContentScriptResponse) => void
    ) => {
      const response = handleMessage(request, sender);
      sendResponse(response);
    }
  );
};

const getActiveTab = async (): Promise<browser.Tabs.Tab | undefined> => {
  const [tab] = await browser.tabs
    .query({
      active: true,
      lastFocusedWindow: true,
      status: "complete",
      windowType: "normal",
    })
    .catch(() => [undefined]);
  return tab;
};
