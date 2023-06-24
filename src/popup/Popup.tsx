/* Copyright (c) 2023 Michael Barlow */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryInput } from "./QueryInput";
import { messageActiveTab } from "messaging";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

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
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const splitText = await splitter.createDocuments([text]);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitText,
    new OpenAIEmbeddings({ openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY })
  );
  return vectorStore;
};

type PageText =
  | string //text
  | false; //no text

export default () => {
  const [pageText, setPageText] = useState<PageText | undefined>(undefined);
  const [vectorStore, setVectorStore] = useState<MemoryVectorStore | undefined>(
    undefined
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  const buildVectorStore = async () => {
    const text = await fetchPageText();
    if (!text) {
      setPageText(false);
      return;
    }
    setPageText(text);
    const store = await generateVectorStore(text);
    setVectorStore(store);
  };

  useEffect(() => {
    buildVectorStore().catch(setError);
  }, []);

  if (error)
    return (
      <Panel>
        <p>Error: {error.message}</p>
      </Panel>
    );

  if (pageText === undefined)
    return (
      <Panel>
        <p>Fetching page...</p>
      </Panel>
    );

  if (pageText === false)
    return (
      <Panel>
        <p>Nothing to show...</p>
      </Panel>
    );

  if (!vectorStore)
    return (
      <Panel>
        <p>Indexing...</p>
      </Panel>
    );

  // Temporary simple cosine similarity search for testing
  const onQuerySubmit = async (query: string) =>
    console.log(await vectorStore.similaritySearch(query, 1));

  return (
    <Panel>
      <h1>Semantic Search</h1>
      <QueryInput onSubmit={onQuerySubmit} disabled={false} />
    </Panel>
  );
};

const Panel = styled.div`
  background-color: cyan;
  width: 400px;
  height: 300px;
`;
