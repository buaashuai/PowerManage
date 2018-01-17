**项目说明** 
- PowerManager是一个轻量级权限管理系统，其核心设计目标是开发迅速、学习简单、轻量级、易扩展
- 使用PowerManager搭建项目，只需编写30%左右代码，其余的代码交给系统自动生成


**具有如下特点** 
- 轻量级的权限系统，只涉及Spring、Shiro、Mybatis后端框架，降低学习使用成本
- 友好的代码结构及注释，便于阅读及二次开发
- 支持HTML、JSP、Velocity、Freemarker等视图，零技术门槛
- 灵活的权限控制，可控制到页面或按钮，满足绝大部分的权限需求(如需控制到按钮级别，需使用Shiro标签，控制按钮的显示或隐藏)
- 页面交互使用Vue2.x，极大的提高了开发效率
- 完善的代码生成机制，可在线生成entity、xml、dao、service、html、js代码，减少70%以上的开发任务
- 引入quartz定时任务，可动态完成任务的添加、修改、删除、暂停、恢复及日志查看等功能
- 引入路由机制，刷新页面会停留在当前页


项目运行

- 通过git下载源码
- 创建数据库PowerManager，数据库编码为UTF-8
- 执行doc/db.sql文件，初始化数据
- 修改db.properties文件，更新MySQL账号和密码
- Eclipse、IDEA执行【clean package tomcat8:run】命令，即可运行项目
- 项目访问路径：http://localhost
- 非Maven方式启动，则默认访问路径为：http://localhost:8080/PowerManager
- 账号密码：admin/admin

项目部署

在开发环境下项目的js没有经过压缩和混淆，部署的时候需要依照下面的步骤：
- 把webapp目录中的index.html中的 `<script src="js/bootstrap.js"></script> ` 改为 ` <script src="dest/bootstrap.js"></script> `
- 把webapp/js目录中的bootstrap.js中的 DEBUG 变量的值改为 false
- 把com.powerManage.utils包中Constant.java中的DEBUG改为false
- 在WEB-INFO中打开控制台，运行"npm install", 然后运行"npm run webpack" 压缩并混淆前端资源文件
- 打包项目部署在Tomcat中即可

![输入图片说明](http://cdn.renren.io/img/3c744febfa944b26b3b9594ae73d4f80 "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/f3cc56b411c542d6aa4c01aaa8513995 "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/4319bad87a9f4cc5a1d19a70b4288dbb "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/12f1ff16350d44e2a03f3698a9d2e5ee "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/1181f88d52494b7296b53824dda47115 "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/ef65919f507d4e82900b323680789bf0 "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/087d9b845de3401589e606d43e68e4f2 "在这里输入图片标题")
![输入图片说明](http://cdn.renren.io/img/a3e55c6b2c2e4ab3aa05c3f3cf9fd96a "在这里输入图片标题")




 **技术选型：** 
核心框架：Spring Framework 4.3.13
安全框架：Apache Shiro 1.3
视图框架：Spring MVC 4.3.13
持久层框架：MyBatis 3.3
定时器：Quartz 2.2
数据库连接池：Druid 1.0
日志管理：SLF4J 1.7、Log4j
页面交互：Vue2.x


 **软件需求** 
JDK1.7+
MySQL5.5+
Tomcat7.0+
Maven3.0+

 **致谢** 
 
本项目改编自开源项目 renren-security
