# Stage 1: Build the client project
FROM node:current-alpine as client-builder

WORKDIR /app

COPY package.json yarn.lock nx.json webpack.config.js babel.config.json .eslintrc.json jest.config.ts tsconfig.base.json ./

COPY apps/client ./apps/client

COPY libs/loader ./libs/loader

COPY libs/global-state ./libs/global-state

RUN yarn install --frozen-lockfile

RUN yarn nx build client --prod

# Stage 2: Serve the projects with Nginx
FROM nginx:1.23.3-alpine

COPY --from=client-builder /app/dist/apps/client /usr/share/nginx/html/client

RUN rm /etc/nginx/conf.d/default.conf

COPY apps/client/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
