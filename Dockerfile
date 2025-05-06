# 1. Build Stage
FROM node:20-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production Stage (Nginx)
FROM nginx:alpine as production-stage

# 빌드된 정적 파일을 Nginx 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx 설정 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
