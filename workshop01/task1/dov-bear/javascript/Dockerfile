FROM node:24

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY main.js .
COPY public public 
COPY views views

RUN npm ci

ENV PORT=5000 INSTANCE_NAME="dov-bear"

EXPOSE ${PORT}

ENTRYPOINT ["node", "main.js"]

# docker build -t zixinn/dov-bear .
# docker run -d -p 5000:5000 -e PORT=5000 -e INSTANCE_NAME=dov-bear -e INSTANCE_HASH=hash1 zixinn/dov-bear

# docker login
# docker push zixinn/dov-bear
