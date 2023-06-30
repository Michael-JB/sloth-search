/* Copyright (c) 2023 Michael Barlow */

import { useState } from "react";

type ErrorReport = {
  displayMessage: string;
  error: unknown;
};

type ErrorReporterReturn = [
  string | undefined,
  (errorReport: ErrorReport) => void
];

export const useErrorReporter = (): ErrorReporterReturn => {
  const [displayMessage, setDisplayMessage] = useState<string | undefined>(
    undefined
  );

  const reportError = ({ displayMessage, error }: ErrorReport) => {
    setDisplayMessage(displayMessage);
    console.error(error instanceof Error ? error.message : error);
  };

  return [displayMessage, reportError];
};
