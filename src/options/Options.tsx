/* Copyright (c) 2023 Michael Barlow */

import * as React from "react";
import styled from "@emotion/styled";

export default () => (
  <Panel>
    <button onClick={() => alert("This is a test")}>Click me</button>
  </Panel>
);

const Panel = styled.div`
  background-color: red;
  width: 600px;
  height: 600px;
`;
