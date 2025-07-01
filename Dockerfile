ARG GO_VERSION=1.24
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-alpine AS uilayer

WORKDIR /app

# Git is required for some dependencies pulled from repositories
RUN apk add --no-cache git

RUN corepack enable && corepack prepare yarn@4.4.0 --activate

COPY ./web-app/package.json ./web-app/yarn.lock ./web-app/.yarnrc.yml ./

RUN yarn install

COPY ./web-app .

RUN yarn build

USER node

FROM golang:${GO_VERSION}-alpine AS golayer
WORKDIR /console/

ADD go.mod .
ADD go.sum .

# Get dependencies - will also be cached if we won't change mod/sum
RUN go mod download

ADD . .

ENV CGO_ENABLED=0
ENV GO111MODULE=on

COPY --from=uilayer /app/build ./web-app/build
RUN go build -trimpath --tags=kqueue,operator -ldflags "-w -s" -a -o console ./cmd/console

FROM scratch
EXPOSE 9090

COPY --from=golayer /console/console .

ENTRYPOINT ["/console"]
CMD [ "server"]
