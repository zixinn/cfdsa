FROM node:24 AS builder

WORKDIR /src

COPY angular.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY public public 
COPY src src

RUN npm install -g @angular/cli
RUN npm ci
RUN ng build

FROM caddy:2.10.2-alpine

WORKDIR /caddy

RUN mkdir -p /caddy/html

COPY --from=builder /src/dist/angular/browser/ /caddy/html/
COPY caddy/error.html /caddy/html/
COPY caddy/Caddyfile /caddy/Caddyfile

ENV CADDY_PORT=3000

EXPOSE ${CADDY_PORT}

CMD ["caddy", "run", "--config", "/caddy/Caddyfile"]

# docker buildx build --platform linux/amd64 -t zixinn/cadang:v1 .
# docker run -d -p 5000:5000 -e CADDY_PORT=5000 zixinn/cadang:v1
# docker push zixinn/cadang:v1

# ####
# FROM node:24 as angular

# WORKDIR /src

# # Install Angular CLI
# RUN npm install -g @angular/cli

# COPY *.json .
# COPY public public 
# COPY src src

# # Install the packages and build
# RUN npm ci && ng build

# FROM caddy:2.10

# WORKDIR /app

# COPY caddy/Caddyfile .

# RUN mkdir html
# COPY caddy/error.html html
# COPY --from=angular /src/dist/angular/browser/* html

# ENV CADDY_PORT=3000

# EXPOSE ${CADDY_PORT}

# ENTRYPOINT caddy run --config=/app/Caddyfile

# # docker buildx build --platform linux/amd64 -t zixinn/cadang:v1.5 .
# # docker run -d -p 8080:3000 zixinn/cadang:v1.5
# # docker push zixinn/cadang:v1.5
