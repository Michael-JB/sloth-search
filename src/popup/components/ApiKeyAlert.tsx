/* Copyright (c) 2023 Michael Barlow */

import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import browser from "webextension-polyfill";
import styled from "@emotion/styled";

export const ApiKeyAlert = () => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription variant="body1">
      You need to provide an OpenAI API key to use Semantic Search.
    </AlertDescription>
    <Button
      variant="contained"
      onClick={() => browser.runtime.openOptionsPage()}
      endIcon={<OpenInNewIcon />}
    >
      Open settings
    </Button>
  </Alert>
);

const AlertDescription = styled(Typography)`
  margin-bottom: 0.5rem;
`;
