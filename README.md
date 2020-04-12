# redis-over-websocket-server

#### 介绍

基于 websocket 的 redis 发布订阅 协议服务器

此服务 在 localhost 上监听 2000 端口

#### 软件架构

软件架构说明

#### 安装教程

1.需要先安装 redis

2.安装依赖

```powershell
yarn install
```

#### 使用说明

1.编译

```powershell
yarn build
```

2. 启动服务器

```powershell
yarn start
```

# 服务路径 /websocket

# 服务协议基于 websocket

https://developer.mozilla.org/zh-CN/docs/Web/API/websocket


https://github.com/pladaria/reconnecting-websocket

# 发布订阅的协议

## 客户端发送

### 发布

"channel": 频道

"message" : 消息

```json
{
    "type": "publish",
    "channel": "test",
    "message": "foo"
}
```

### 订阅

"channel": 频道

```json
{ "type": "subscribe", "channel": "test" }
```

### 退订

"channel": 频道

```json
{ "type": "unsubscribe", "channel": "test" }
```

## 服务器发送

## 消息

"channel": 频道

"message" : 消息

```json
{ "type": "message", "channel": "test", "message": "foo" }
```

## 报错

"error":报错信息字符串

"stack":报错的信息数组

```json
{
    "stack": [
        "AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:",
        "assert(!Array.isArray(obj))",
        "at on_message (D:\\Documents\\GitHub\\pubsub-websocket-server\\dist\\index.cjs:111:5)"
    ],
    "error": "AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:  assert(!Array.isArray(obj))",
    "type": "error"
}
```
