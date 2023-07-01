/* Copyright (c) 2023 Michael Barlow */

import { useCallback, useState } from "react";

type ErrorReport = {
  displayMessage: string;
  error: unknown;
};

export type ErrorReporter = (errorReport: ErrorReport) => void;

type ErrorReporterReturn = [string | undefined, ErrorReporter, () => void];

export const useErrorReporter = (): ErrorReporterReturn => {
  const [displayMessage, setDisplayMessage] = useState<string | undefined>(
    undefined
  );

  const reportError = useCallback(({ displayMessage, error }: ErrorReport) => {
    setDisplayMessage(displayMessage);
    console.error(error instanceof Error ? error.message : error);
  }, []);

  const clearError = useCallback(() => {
    setDisplayMessage(undefined);
  }, []);

  return [displayMessage, reportError, clearError];
};
