# ChatGPT Playground

This project is a prototype for building integrations with ChatGPT. OpenAI does not yet have an official API for ChatGPT, so this project uses the [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api). The package uses Puppeteer to authenticate through Chrome, and then afterwards you can interact with ChatGPT programmatically.

# Installation

If you haven't already, install node. v18 or higher is required.

Clone this repository.

```
git clone [url here]
```

Navigate to project directory and install dependencies.

```
cd chat-gpt-playground
npm install
```

Create a .env file in the root of the project with your OpenAI credentials. You will also need a [NopeCha](https://nopecha.com) API key so puppeteer can solve the captcha when logging into OpenAI.

```
EMAIL=your_email
PASSWORD=your_open_ai_password
NOPECHA_KEY=your_nopecha_key
```

Run ChatGPT server.

```
node server.js
```

Run development server.

```
npm run dev
```
