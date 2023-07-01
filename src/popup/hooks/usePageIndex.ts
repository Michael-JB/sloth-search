/* Copyright (c) 2023 Michael Barlow */

import { ErrorReporter } from "hooks/useErrorReporter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { messageActiveTab } from "messaging";
import { useEffect, useState } from "react";
import { createPageIndex } from "search";

const fetchPageText = async (): Promise<string> => {
  const response = await messageActiveTab({ type: "pageText" });
  if (!response.ok)
    throw new Error("Failed to message active tab: " + response.reason);
  const pageText = response.payload;
  if (!pageText) throw new Error("Failed to fetch page text");
  return response.payload;
};

type PageIndexReturn = MemoryVectorStore | undefined;

export const usePageIndex = (
  openAIApiKey: string,
  reportError: ErrorReporter
): PageIndexReturn => {
  const [pageIndex, setPageIndex] = useState<PageIndexReturn>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const pageText = await fetchPageText();
        const index = await createPageIndex(openAIApiKey, pageText);
        setPageIndex(index);
      } catch (error) {
        reportError({
          displayMessage: "Failed to index the page. See console for details.",
          error,
        });
      }
    })();
  }, [openAIApiKey, reportError]);

  return pageIndex;
};
