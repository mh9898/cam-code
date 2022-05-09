#run dev enviroment
#FROM node
#COPY . /app
#WORKDIR /app
#COPY entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh
#ADD . .
#RUN npm install
#ENTRYPOINT ["/entrypoint.sh"]
#EXPOSE 3000
#CMD ["npm", "start"]

#run build enviroment
FROM node as build
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run build"]

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
