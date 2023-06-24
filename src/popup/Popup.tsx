import React from "react";
import styled from "styled-components";
import { QueryInput } from "./QueryInput";
import { messageActiveTab } from "messaging";

export default () => {
  const messagingTest = async (query: string) => {
    const response = await messageActiveTab({ type: "pageText" });
    if (!response.ok) {
      console.error("Failed to message active tab: ", response.reason);
      return;
    }
    console.log("Payload from active tab: ", response.payload);
  };

  return (
    <Panel>
      <h1>Semantic Search</h1>
      <QueryInput onSubmit={messagingTest} disabled={false} />
    </Panel>
  );
};

const Panel = styled.div`
  background-color: cyan;
  width: 400px;
  height: 300px;
`;
