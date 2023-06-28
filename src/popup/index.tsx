/* Copyright (c) 2023 Michael Barlow */

import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./Popup";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(<Popup />);
