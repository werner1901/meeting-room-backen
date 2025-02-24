1. 读typeorm的文档，关注entity的写法，一对一/一对多/多对多的写法/entity Manager和Repository的区别
<https://www.typeorm.net/custom-repository>

2. 发送邮件验证码已加上。注意用env配置信息时，需要修改nest-cli.json，以及configModule模块需要全局引入后才能用

3. 需要再看一下vo是什么:
dto 是 data transfer object，用于参数的接收。
vo 是 view object，用于返回给视图的数据的封装。
而 entity 是和数据库表对应的实体类。

4. @Query是怎么用的