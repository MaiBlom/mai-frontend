FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /var/www/html

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]