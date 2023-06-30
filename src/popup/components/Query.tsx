/* Copyright (c) 2023 Michael Barlow */

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { QueryInput } from "./QueryInput";
import { messageActiveTab } from "messaging";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { LoadingSpinner } from "./LoadingSpinner";
import { createPageIndex, executeQuery } from "search/search";
import { useErrorReporter } from "hooks/useErrorReporter";

const fetchPageText = async (): Promise<string> => {
  const response = await messageActiveTab({ type: "pageText" });
  if (!response.ok)
    throw new Error("Failed to message active tab: " + response.reason);
  const pageText = response.payload;
  if (!pageText) throw new Error("Failed to fetch page text");
  return response.payload;
};

type QueryProps = {
  openAIApiKey: string;
};

export const Query = ({ openAIApiKey }: QueryProps) => {
  const [pageIndex, setPageIndex] = useState<MemoryVectorStore | undefined>(
    undefined
  );
  const [answerText, setAnswerText] = useState<string | undefined>(undefined);
  const [errorMessage, reportError] = useErrorReporter();

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
  }, []);

  const onQuerySubmit = async (query: string) => {
    try {
      if (!pageIndex) throw new Error("Invalid page index.");
      const queryResult = await executeQuery(openAIApiKey, pageIndex, query);
      setAnswerText(queryResult);
    } catch (error) {
      reportError({
        displayMessage: "Failed to execute query. See console for details.",
        error,
      });
    }
  };

  if (errorMessage)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );

  if (!pageIndex) return <LoadingSpinner />;

  return (
    <>
      <QueryInput onSubmit={onQuerySubmit} />
      {answerText && <AnswerText variant="body1">{answerText}</AnswerText>}
    </>
  );
};

const AnswerText = styled(Typography)`
  margin-top: 1rem;
`;
