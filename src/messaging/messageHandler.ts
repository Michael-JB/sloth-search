import { ContentScriptRequest, ContentScriptResponse } from "./messageTypes";

export const messageActiveTab = async (
  message: ContentScriptRequest
): Promise<ContentScriptResponse> => {
  const activeTab = await getActiveTab();
  if (!activeTab || !activeTab.id) {
    return { ok: false, reason: "Could not identify active tab" };
  }
  const response: ContentScriptResponse = await chrome.tabs.sendMessage(
    activeTab.id,
    message
  );
  return response;
};

export const registerMessageListener = (
  handleMessage: (
    request: ContentScriptRequest,
    sender: chrome.runtime.MessageSender
  ) => ContentScriptResponse
) => {
  chrome.runtime.onMessage.addListener(
    (
      request: ContentScriptRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: ContentScriptResponse) => void
    ) => {
      const response = handleMessage(request, sender);
      sendResponse(response);
    }
  );
};

const getActiveTab = async (): Promise<chrome.tabs.Tab | undefined> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    status: "complete",
    windowType: "normal",
  });
  return tab;
};
