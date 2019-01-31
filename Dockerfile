# - Used since it's a small node image
FROM node:8.15-alpine

# - Default port 8080, 9999(debug) and 7357 (test)
ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT 9999 7357

# - Default to production but can be overridden by compsose
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# - Tini to launch node app
RUN apk add --update tini

# - Ensure latest version of npm
RUN npm i npm@latest -g

# - install dependencies first in different location for bind mounting
RUN mkdir -p /src
WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# - copt over source files
WORKDIR /opt/app
COPY . /opt/app

USER node

# - start the app
CMD ["node", "app.js"]