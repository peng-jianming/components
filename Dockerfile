# build stage
# 创建构建依赖的基础镜像,该阶段生成的镜像命名为build-stage
# 之后COPY --FROM=<name>可以引用此阶段生成的镜像
FROM node:lts-alpine as build-stage
# 创建一个工作目录
WORKDIR /app
# 在WORKDIR之后,COPY命令就是相对于/app运行的
# 将当前文件全部拷贝到/app里面
COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]