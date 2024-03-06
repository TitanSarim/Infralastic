# Stage 1: Build the client project
FROM node:current-alpine as app-store-builder

WORKDIR /app
COPY package.json yarn.lock nx.json webpack.config.js babel.config.json .eslintrc.json jest.config.ts tsconfig.base.json ./

COPY apps/app-store ./apps/app-store

COPY libs/loader ./libs/loader

COPY libs/global-state ./libs/global-state

RUN yarn install --frozen-lockfile

RUN yarn nx build app-store --prod

# Stage 2: Serve the projects with Nginx
FROM nginx:1.23.3-alpine

COPY --from=app-store-builder /app/dist/apps/app-store /usr/share/nginx/html/app-store

RUN rm /etc/nginx/conf.d/default.conf

COPY apps/app-store/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
