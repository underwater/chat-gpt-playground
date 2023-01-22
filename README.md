# ChatGPT Playground

This is a prototype for building integrations with ChatGPT. OpenAI does not yet have an official API for ChatGPT, so this project uses [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api). The package uses Puppeteer to authenticate through Chrome, and then afterwards you can interact with ChatGPT programmatically.

# Installation

If you haven't already, install [Node](https://nodejs.org/en). v18 or higher is required.

```
brew install node
```

Clone this repository.

```
git clone https://github.com/davidtkramer/chat-gpt-playground.git
```

Navigate to project directory and install dependencies.

```
cd chat-gpt-playground
npm install
```

Create a .env file in the root of the project with your OpenAI credentials. You will also need a [NopeCha](https://nopecha.com) API key so Puppeteer can solve the captcha when logging into OpenAI.

```
EMAIL=your_email
PASSWORD=your_open_ai_password
NOPECHA_KEY=your_nopecha_key
```

# Quick Start

This project includes a server built with [fastify](https://www.fastify.io/), that provides a single endpoint for interacting with ChatGPT. First, start the server:

```
node server.js
```

Puppeteer will open chrome and authenticate, and then the server will begin accepting requests on `localhost:3456`. To start a conversation, send a POST request to the `/sendMessage` endpoint with the following JSON body:

```
{
    "message": "Hello ChatGPT!"
}
```

The server will return a JSON payload with ChatGPT's response:

```
{
    "id": "message-id",
    "conversationId": "conversation-id",
    "text": "Hello, how can I help you?",
}
```

The `id` and `conversationId` can be provided in subsequent requests to `/sendMessage` to continue the same conversation. Omitting them will start a new conversation.

```
{
    "message": "Hello ChatGPT!",
    "conversationId: "conversation-id",
    "parentMessageId": "message-id"
}
```

This project also includes a simple web app for interacting with the ChatGPT server. This command will open the app in your browser on `localhost:5173`.

```
npm run dev
```
