/* Copyright (c) 2023 Michael Barlow */

import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSystemColourScheme } from "hooks/useSystemColourScheme";
import { storeOpenAIApiKey } from "storage";
import { useErrorReporter } from "hooks/useErrorReporter";
import { useOpenAIApiKey } from "hooks/useApiKey";

export const Options = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [errorMessage, reportError, clearError] = useErrorReporter();
  const apiKey = useOpenAIApiKey(useErrorReporter()[1]);
  const [submitPending, setSubmitPending] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const theme = useSystemColourScheme();

  const onSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const onSubmit = async (): Promise<void> => {
    if (!inputRef?.current?.value) return;
    setSubmitPending(true);
    try {
      await storeOpenAIApiKey(inputRef.current.value);
      clearError();
    } catch (error) {
      reportError({
        displayMessage: "Failed to store API key. See console for details.",
        error,
      });
      return;
    } finally {
      setSubmitPending(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Panel elevation={0}>
        <StyledTextField
          inputRef={inputRef}
          label="OpenAI API key"
          disabled={submitPending}
          color="primary"
          id="standard-basic"
          variant="standard"
          placeholder="sk-..."
          helperText="Sloth Search requires a valid OpenAI API key to function. Sloth
          Search stores this key safely in session storage, and will not send it
          anywhere other than the OpenAI APIs. You will need to re-enter this key if
          you close the browser."
          type={showKey ? "text" : "password"}
          value={apiKey ? apiKey : undefined}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle API key visibility"
                  onClick={() => setShowKey(!showKey)}
                  disabled={submitPending}
                  edge="end"
                >
                  {showKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={onSubmit} disabled={submitPending}>
          Save
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={onSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {errorMessage ? (
            <Alert onClose={onSnackbarClose} severity="error">
              Error: {errorMessage}
            </Alert>
          ) : (
            <Alert onClose={onSnackbarClose} severity="success">
              Saved
            </Alert>
          )}
        </Snackbar>
      </Panel>
    </ThemeProvider>
  );
};

const Panel = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 40rem;
  border-radius: 0;
  padding: 1rem;
`;

const StyledTextField = styled(TextField)`
  align-self: stretch;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
`;
