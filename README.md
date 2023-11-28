# Getting Started

To set up a basic server with Express and MySQL, follow these steps:

## Installation

1. **Initialize Node.js Project:**

```bash
npm init --yes
```

2. **Install Dependencies:**

```bash
npm install cors express jsonwebtoken mysql2
```

3. **Install devDependencies:**

```bash
npm install --save-dev dotenv nodemon prettier
```

## Configuration

1. **Edit `package.json`:** Add the following:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

2. **Edit `index.js`:** Check the `index.js` for an example.

## Running Server

```bash
npm run dev
```
