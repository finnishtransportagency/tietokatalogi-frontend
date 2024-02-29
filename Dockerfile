#production environment
FROM nginx:1.25.3-alpine

RUN ["apk", "upgrade", "--no-cache"]

# Used by nginx
ARG PROXY_URL
ENV PROXY_URL=${PROXY_URL}
RUN echo ${PROXY_URL}

COPY ./build /var/www
COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf

# substitute proxy url in nginx conf at buildtime
RUN sed -i 's|!PROXY_URL!|'${PROXY_URL}'|' /etc/nginx/nginx.conf

# substitute nameserver url in nginx conf at runtime
CMD [ "/bin/sh", "-c", "sed -i 's|!NAMESERVER!|'$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')'|' /etc/nginx/nginx.conf \
  && exec nginx -g 'daemon off;'" ]
