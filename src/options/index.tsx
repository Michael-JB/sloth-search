/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import { createRoot } from "react-dom/client";
import { Options } from "./Options";

(() => {
  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  createRoot(root).render(<Options />);
})();
