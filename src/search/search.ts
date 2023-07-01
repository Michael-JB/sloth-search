/* Copyright (c) 2023 Michael Barlow */

import {
  OpenAIEmbeddings,
  OpenAIEmbeddingsParams,
} from "langchain/embeddings/openai";
import {
  RecursiveCharacterTextSplitter,
  RecursiveCharacterTextSplitterParams,
} from "langchain/text_splitter";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI, OpenAIInput } from "langchain/llms/openai";
import { BaseLLMParams } from "langchain/dist/llms/base";

const OPENAI_EMBEDDINGS_CONFIG: Partial<OpenAIEmbeddingsParams> = {
  maxRetries: 2,
};

const OPENAI_CONFIG: Partial<OpenAIInput> & Partial<BaseLLMParams> = {
  maxRetries: 2,
};

const TEXT_SPLITTER_CONFIG: Partial<RecursiveCharacterTextSplitterParams> = {
  chunkSize: 400,
  chunkOverlap: 100,
};

const createDocuments = async (text: string): Promise<Document[]> => {
  const splitter = new RecursiveCharacterTextSplitter(TEXT_SPLITTER_CONFIG);
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
    new OpenAIEmbeddings({ ...OPENAI_EMBEDDINGS_CONFIG, openAIApiKey })
  );
  return vectorStore;
};

export const executeQuery = async (
  openAIApiKey: string,
  pageIndex: MemoryVectorStore,
  query: string
): Promise<string> => {
  const model = new OpenAI({ ...OPENAI_CONFIG, openAIApiKey });
  const chain = RetrievalQAChain.fromLLM(model, pageIndex.asRetriever());
  const chainResult = await chain.call({ query });
  return chainResult.text ?? "Failed to answer query.";
};
