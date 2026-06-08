FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
EXPOSE 3001

CMD ["sh", "-c", "npx json-server --watch src/data/db.json --port 3001 & npm run dev -- --host"]