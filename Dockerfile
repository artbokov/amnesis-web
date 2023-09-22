FROM node:18.16.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --legacy-peer-deps --silent
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

# production environment
FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/build /app
COPY ./nginx.conf /etc/nginx/nginx.conf