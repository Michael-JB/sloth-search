/* Copyright (c) 2023 Michael Barlow */

import React, { useEffect, useState } from "react";

import { Query } from "./Query";
import styled from "@emotion/styled";
import { Paper, ThemeProvider } from "@mui/material";
import { LoadingSpinner } from "./LoadingSpinner";
import { KeyAlert } from "./KeyAlert";
import { useSystemColourScheme } from "hooks/useSystemColourScheme";
import { getOpenAIApiKey } from "storage/apiKey";

export default () => {
  const [apiKey, setApiKey] = useState<string | false | undefined>(undefined);
  const theme = useSystemColourScheme();

  useEffect(() => {
    (async () => {
      try {
        const apiKey = await getOpenAIApiKey();
        setApiKey(apiKey ?? false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Panel elevation={0}>
        {apiKey === undefined && <LoadingSpinner />}
        {apiKey === false && <KeyAlert />}
        {apiKey && <Query openAIApiKey={apiKey} />}
      </Panel>
    </ThemeProvider>
  );
};

const Panel = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 20rem;
  padding: 1rem 0.8rem 0.8rem 0.8rem;
  border-radius: 0;
`;
