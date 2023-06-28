/* Copyright (c) 2023 Michael Barlow */

import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type QueryInputProps = {
  onSubmit: (query: string) => Promise<void>;
};

export const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [submitPending, setSubmitPending] = useState<boolean>(false);

  const submit = async (): Promise<void> => {
    if (!inputRef?.current?.value) return;
    setSubmitPending(true);
    await onSubmit(inputRef.current.value);
    setSubmitPending(false);
    // TODO: the following re-focus doesn't work as the rendered component is still disabled at the time of the focus call. Fix this.
    // inputRef.current.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") submit();
  };

  return (
    <QueryInputPanel elevation={0}>
      <StyledTextField
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        label="Enter a query"
        disabled={submitPending}
        color="primary"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={submit} edge="end" disabled={submitPending}>
                {submitPending ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </QueryInputPanel>
  );
};

const QueryInputPanel = styled(Paper)`
  display: flex;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;
