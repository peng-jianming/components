# 创建构建依赖的基础镜像,该阶段生成的镜像命名为build-stage
# 之后COPY --FROM=<name>可以引用此阶段生成的镜像
FROM node:lts-alpine as build-stage

# 将源文件.拷贝到app下(没有则创建)
COPY . /app

# 指定app为工作目录(只有WORKDIR指定的目录会一直存在)
WORKDIR /app

# Dockerfile 的指令每执行一次都会在 docker 上新建一层
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

# 将上面生成镜像中构建好的文件复制到nginx内容的默认目录上
COPY --from=build-stage /app/dist /usr/share/nginx/html

# nginx暴露80端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]