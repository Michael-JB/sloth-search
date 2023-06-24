import React, { useState } from "react";
import styled from "styled-components";

type QueryInputProps = {
  onSubmit: (query: string) => void;
  disabled: boolean;
};

// A VERY hacked-together input component for testing purposes
export const QueryInput = ({ onSubmit, disabled }: QueryInputProps) => {
  const [input, setInput] = useState("");

  const submit = (): void => onSubmit(input);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") submit();
  };

  return (
    <Panel>
      <label htmlFor="name">Enter your query:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => setInput((e.target as HTMLInputElement).value)}
        onKeyDown={handleKeyDown}
        required={true}
        minLength={1}
        maxLength={100}
        size={50}
      />
      <button onClick={submit}>Click me</button>
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 0.5rem;
  }
`;
