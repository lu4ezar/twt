FROM node:20.4-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production=false
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
