/* Copyright (c) 2023 Michael Barlow */

import React, { useState } from "react";
import styled from "@emotion/styled";
import { QueryInput } from "./QueryInput";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { LoadingSpinner } from "./LoadingSpinner";
import { executeQuery } from "search";
import { useErrorReporter } from "hooks/useErrorReporter";
import { usePageIndex } from "popup/hooks/usePageIndex";

type QueryProps = {
  openAIApiKey: string;
};

export const Query = ({ openAIApiKey }: QueryProps) => {
  const [errorMessage, reportError] = useErrorReporter();
  const pageIndex = usePageIndex(openAIApiKey, reportError);
  const [answerText, setAnswerText] = useState<string | undefined>(undefined);

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
