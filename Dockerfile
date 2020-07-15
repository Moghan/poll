FROM nginx:alpine

## Replace the default nginx index page with our Angular app
RUN rm -rf /usr/share/nginx/html/*
COPY /build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]