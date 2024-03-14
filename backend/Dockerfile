FROM node:20.11.1-alpine
WORKDIR /app
COPY package*.json /
RUN npm install
EXPOSE 3001/tcp
CMD ["npm", "run", "dev"]