/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import styled from "@emotion/styled";

import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => (
  <LoadingPanel>
    <CircularProgress />
  </LoadingPanel>
);

const LoadingPanel = styled(Box)`
  display: flex;
  justify-content: center;
`;
