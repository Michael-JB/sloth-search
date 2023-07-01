/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

(() => {
  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  createRoot(root).render(<Popup />);
})();
