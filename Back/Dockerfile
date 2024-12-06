FROM node:latest

WORKDIR /app
COPY . .
RUN npm install bcrypt
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]