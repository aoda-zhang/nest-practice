# Honey-service teachnic

## HMAC 加密

-   ✅

![HMAC.png](https://img2.imgtp.com/2024/05/21/C9PadGKh.png)

## 数据库权限升级

## 微服务拆分和调用

-   PROD 只读权限账号申请

## 将数据库操作更改为Prisma

-   ❌ 不支持采用yaml配置config
-   ❌ 不支持拆分不同的数据模型

## RBAC权限设计

> 前端token登录->后端查询用户信息->返回给前端用户角色和权限列表->前端根据权限列表控制前端逻辑->前端页面发起请求->后端根据具体角色和权限验证请求合法性

> 四个角色 root admin major guest

-   root 添加role 权限 一切操作都合法
-   admin 设置角色的新权限
-   major 上述不可用 不可使用注册功能
-   guest 上述不可用 不可以提交报销功能

## 批量更新某个权限到角色中
