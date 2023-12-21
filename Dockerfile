#production environment
FROM nginx:1.25.3-alpine

RUN ["apk", "upgrade", "--no-cache"]

# Used by nginx
ARG PROXY_URL
ENV PROXY_URL=${PROXY_URL}
RUN echo ${PROXY_URL}

COPY ./build /var/www
COPY ./nginx/nginx.conf.template /nginx.conf.template
# envsubst to substitute ENV variables in config
CMD ["/bin/sh" , "-c" , "envsubst < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
