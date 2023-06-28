/* Copyright (c) 2023 Michael Barlow */

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { QueryInput } from "./QueryInput";
import { messageActiveTab } from "messaging";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { CircularProgress, Paper, Typography } from "@mui/material";

const fetchPageText = async (): Promise<string | undefined> => {
  const response = await messageActiveTab({ type: "pageText" });
  if (!response.ok) {
    console.error("Failed to message active tab: ", response.reason);
    return;
  }
  return response.payload;
};

const generateVectorStore = async (
  text: string
): Promise<MemoryVectorStore> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });
  const splitText = await splitter.createDocuments([text]);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitText,
    new OpenAIEmbeddings({ openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY })
  );
  return vectorStore;
};

export default () => {
  const [vectorStore, setVectorStore] = useState<MemoryVectorStore | undefined>(
    undefined
  );
  const [error, setError] = useState<Error | undefined>(undefined);
  const [answerText, setAnswerText] = useState<string>("");

  const buildVectorStore = async () => {
    const text = await fetchPageText();
    if (!text) {
      setError(new Error("Failed to fetch page text"));
      return;
    }
    const store = await generateVectorStore(text);
    setVectorStore(store);
  };

  useEffect(() => {
    buildVectorStore().catch(setError);
  }, []);

  if (error)
    return (
      <Panel>
        <Typography variant="body1" color="red">
          Error: {error.message}
        </Typography>
      </Panel>
    );

  if (!vectorStore)
    return (
      <Panel>
        <LoadingPanel elevation={0}>
          <CircularProgress />
        </LoadingPanel>
      </Panel>
    );

  const onQuerySubmit = async (query: string) => {
    const model = new OpenAI({
      openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const chainResult = await chain.call({ query });

    setAnswerText(chainResult?.text ?? "Could not answer query.");
  };

  return (
    <Panel elevation={0}>
      <QueryInput onSubmit={onQuerySubmit} />
      {answerText && <AnswerText variant="body1">{answerText}</AnswerText>}
    </Panel>
  );
};

const LoadingPanel = styled(Paper)`
  display: flex;
  justify-content: center;
`;

const AnswerText = styled(Typography)`
  margin-top: 1rem;
`;

const Panel = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 20rem;
  padding: 1rem 0.8rem 0.8rem 0.8rem;
`;
