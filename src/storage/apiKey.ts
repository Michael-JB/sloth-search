/* Copyright (c) 2023 Michael Barlow */

import browser from "webextension-polyfill";

const OPENAI_API_KEY_STORAGE_KEY = "OPENAI_API_KEY";

/* We use session storage as the API key is sensitive: we do not want it to persist to disk. */
const storage = browser.storage.session;

export const storeOpenAIApiKey = async (apiKey: string): Promise<void> => {
  await storage.set({ [OPENAI_API_KEY_STORAGE_KEY]: apiKey });
};

export const getOpenAIApiKey = async (): Promise<string> => {
  return (await storage.get([OPENAI_API_KEY_STORAGE_KEY]))[
    OPENAI_API_KEY_STORAGE_KEY
  ];
};
