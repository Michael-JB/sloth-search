/* Copyright (c) 2023 Michael Barlow */

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const createDocuments = async (text: string): Promise<Document[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });
  const documents = await splitter.createDocuments([text]);
  return documents;
};

export const createPageIndex = async (
  openAIApiKey: string,
  text: string
): Promise<MemoryVectorStore> => {
  const documents = await createDocuments(text);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings({ openAIApiKey })
  );
  return vectorStore;
};

export const executeQuery = async (
  openAIApiKey: string,
  pageIndex: MemoryVectorStore,
  query: string
): Promise<string> => {
  const model = new OpenAI({ openAIApiKey });
  const chain = RetrievalQAChain.fromLLM(model, pageIndex.asRetriever());
  const chainResult = await chain.call({ query });
  return chainResult.text ?? "Failed to answer query.";
};
