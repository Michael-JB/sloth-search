/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import { Query } from "./components/Query";
import styled from "@emotion/styled";
import {
  Alert,
  AlertTitle,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { useSystemColourScheme } from "hooks/useSystemColourScheme";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ApiKeyAlert } from "./components/ApiKeyAlert";
import { useOpenAIApiKey } from "hooks/useApiKey";
import { useErrorReporter } from "hooks/useErrorReporter";

export const Popup = () => {
  const [errorMessage, reportError] = useErrorReporter();
  const apiKey = useOpenAIApiKey(reportError);
  const theme = useSystemColourScheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Panel elevation={0}>
        {errorMessage ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        ) : (
          <>
            {apiKey === undefined && <LoadingSpinner />}
            {apiKey === false && <ApiKeyAlert />}
            {apiKey && <Query openAIApiKey={apiKey} />}
          </>
        )}
      </Panel>
    </ThemeProvider>
  );
};

const Panel = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 25rem;
  padding: 1rem 0.8rem 0.8rem 0.8rem;
  border-radius: 0;
`;
