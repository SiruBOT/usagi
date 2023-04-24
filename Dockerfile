# Set base image to node:lts-alpine
FROM node:lts-alpine
# Install node.js dependencies, yarn (libc6-compat  https://github.com/nodejs/docker-node#nodealpine)
RUN apk add --no-cache libc6-compat  yarn 
# Set workdir to /app
WORKDIR /app
# Copy files to /app
COPY ./ /app
# Install dependencies
RUN  yarn --frozen-lockfile && yarn add sharp
# Build project
RUN yarn run build
# Copy standalone .js file and static files
COPY /.next/standalone ./
# Expose 3000 port
EXPOSE 3000
# Set env PORT to 3000, NODE_ENV to production
ENV PORT 3000 NODE_ENV production
# Run server.js
CMD ["node", "server.js"]