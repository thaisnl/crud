FROM node:current-alpine

EXPOSE 3000
EXPOSE 35729

USER root

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/
RUN npm install 
RUN npm install -g react-scripts 

ADD . /app

CMD ["npm", "start"]