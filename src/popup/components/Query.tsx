/* Copyright (c) 2023 Michael Barlow */

import React, { useState } from "react";

import styled from "@emotion/styled";
import { QueryInput } from "./QueryInput";
import { Alert, AlertTitle, Divider, Typography } from "@mui/material";
import { LoadingSpinner } from "./LoadingSpinner";
import { QueryResult, executeQuery } from "search";
import { useErrorReporter } from "hooks/useErrorReporter";
import { usePageIndex } from "popup/hooks/usePageIndex";
import { Sources } from "./Sources";

type QueryProps = {
  openAIApiKey: string;
};

export const Query = ({ openAIApiKey }: QueryProps) => {
  const [errorMessage, reportError] = useErrorReporter();
  const pageIndex = usePageIndex(openAIApiKey, reportError);
  const [queryResult, setQueryResult] = useState<QueryResult | undefined>(
    undefined
  );

  const onQuerySubmit = async (query: string) => {
    try {
      if (!pageIndex) throw new Error("Invalid page index.");
      const queryResult = await executeQuery(openAIApiKey, pageIndex, query);
      setQueryResult(queryResult);
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
    <QueryPanel>
      <QueryInput onSubmit={onQuerySubmit} />
      {queryResult && (
        <>
          <QueryAnswerText variant="body1">
            {queryResult.answer}
          </QueryAnswerText>
          <Divider />
          <Sources sources={queryResult.sources} />
        </>
      )}
    </QueryPanel>
  );
};

const QueryAnswerText = styled(Typography)`
  margin: 1rem 0;
`;

const QueryPanel = styled.div`
  display: flex;
  flex-direction: column;
`;
