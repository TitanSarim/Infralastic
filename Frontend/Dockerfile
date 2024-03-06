# stage 1 - build react app

FROM node:current-alpine3.16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN echo "GENERATE_SOURCEMAP=false" > .env

RUN npm cache clean --force
RUN rm -rf ~/.npm
RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN npm install --force
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.23.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# Stage 1: Build the client project
FROM node:current-alpine as client-builder

WORKDIR /app

# Copy the package.json and yarn.lock files from the root folder
COPY package.json yarn.lock nx.json webpack.config.js .babelrc .eslintrc.json jest.config.ts tsconfig.app.json tsconfig.json tsconfig.spec.json ./

# Copy the project files for the client project
COPY apps/client ./apps/client

# Install dependencies for the client project
RUN yarn install --frozen-lockfile

# Build the client project
RUN yarn nx build client --prod

# Stage 2: Build the app-store project
FROM node:current-alpine as app-store-builder

WORKDIR /app

# Copy the package.json and yarn.lock files from the root folder
COPY package.json yarn.lock nx.json webpack.config.js .babelrc .eslintrc.json jest.config.ts tsconfig.app.json tsconfig.json tsconfig.spec.json ./

# Copy the project files for the app-store project
COPY apps/app-store ./apps/app-store

# Install dependencies for the app-store project
RUN yarn install --frozen-lockfile

# Build the app-store project
RUN yarn nx build app-store --prod

# Stage 3: Serve the projects with Nginx
FROM nginx:1.23.3-alpine

# Copy the built client project from the client-builder stage
COPY --from=client-builder /app/dist/apps/client /usr/share/nginx/html/client

# Copy the built app-store project from the app-store-builder stage
COPY --from=app-store-builder /app/dist/apps/app-store /usr/share/nginx/html/app-store

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configurations for the client and app-store projects
COPY nginx/nginx.conf /etc/nginx/conf.d

# Expose the ports
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
