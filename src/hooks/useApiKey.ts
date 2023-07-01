/* Copyright (c) 2023 Michael Barlow */

import { ErrorReporter } from "hooks/useErrorReporter";
import { useEffect, useState } from "react";
import { getOpenAIApiKey } from "storage";

type OpenAIApiKeyReturn =
  | string // API key
  | false // No API key
  | undefined; // API key not yet loaded

export const useOpenAIApiKey = (
  reportError: ErrorReporter
): OpenAIApiKeyReturn => {
  const [apiKey, setApiKey] = useState<OpenAIApiKeyReturn>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const apiKey = await getOpenAIApiKey();
        setApiKey(apiKey ?? false);
      } catch (error) {
        reportError({
          displayMessage: "Failed to load API key. See console for details.",
          error,
        });
        setApiKey(false);
      }
    })();
  }, [reportError]);

  return apiKey;
};
