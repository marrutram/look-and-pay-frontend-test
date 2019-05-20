FROM node:8-alpine as build-deps
USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm cache clean --force\
    && npm install\
    && npm rebuild node-sass --force\
    && npm run build

FROM nginx:1.12-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN apk update && apk add --no-cache ca-certificates
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]