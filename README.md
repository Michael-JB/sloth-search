# browser-semantic-search

![Build status](https://github.com/Michael-JB/browser-semantic-search/actions/workflows/build.yml/badge.svg)

TODO: project description

## Compatibility

This extension is compatible with the following browsers:

- [Google Chrome](https://www.google.com/intl/en_uk/chrome/)

## Instructions

### Build and run

- Install dependencies: `npm install`
- Generate a production build in the `dist` directory: `npm run build`
- Load the `dist` directory in your browser

### Development

To run TypeScript type checking, run `npm run typecheck`. To run this while you make changes, run `npm run typewatch`.

## Future plans

These are features that I'd like to add in the future.

- [ ] User sessions. A user would be able to start a session to index multiple pages. Queries would then be evaluated over the resulting index.
- [ ] Improved HTML text scraping. At the moment, the text extraction is quite rudimentary and the indexed data is of a low quality. It would be great to improve this.
- [ ] Back it with a server. At the moment, users have to enter their own API keys. The resulting annoyance to the user is exaggerated by the inability to persist keys between browser sessions for security reasons.
- [ ] Custom prompt. At the moment, we use the stock langchain QA retrieval chain. Though this already works well, tuning the prompt and vector querying will give better results.

## Built with

- [OpenAI](https://openai.com/) - Completion and embeddings API
- [LangChain](https://js.langchain.com/) - Vector database and LLM framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Typing for JavaScript
- [Vite](https://vitejs.dev/) - Build system (mostly used for pre-configured [Rollup](https://rollupjs.org/))
- [npm](https://www.npmjs.com/) - JavaScript dependency management
- [nano-react-app](https://github.com/nano-react-app/nano-react-app) - Project bootstrap, because I've decided that `create-react-app` is too bloated

## License

[MIT license](./LICENSE)
