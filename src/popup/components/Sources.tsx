/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";

type SourcesProps = {
  sources: string[];
};

export const Sources = ({ sources }: SourcesProps) => (
  <StyledAccordion disableGutters elevation={0}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>Sources</Typography>
    </AccordionSummary>
    <StyledAccordionDetails>
      {sources.map((source, index) => (
        <Typography key={index} variant="body2">
          {`${index + 1}: "${source}"`}
        </Typography>
      ))}
    </StyledAccordionDetails>
  </StyledAccordion>
);

// A slightly annoying hack to remove the top border from the accordion
const StyledAccordion = styled(Accordion)`
  &:before: {
    display: none;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0.5rem 1rem;
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;
