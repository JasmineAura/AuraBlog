---
title: 2022 DIDCTF 复现
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/pitjtiwf/
---
> 在一起涉网诈骗案件中，办案机关扣押了嫌疑人的电脑以及调取了涉案相关的服务器数据，要求对其数据进行检验分析。
>

**挂载密码：Amw_E%KGmH%11kx-ICgVD1X&@**

## 准备工作
挂载两个加密容器，DIDCTF 里面是磁盘镜像和服务器，DIDCTF-2 里面是两个流量包。

![](../../../images/1221c155d8bf49384147889da156467b.png)

![](../../../images/a6af15cd11f4553219d6fde1307d9b4f.png)

## 介质与手机取证
### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">1</font>
> 请计算计算机的磁盘SHA256值
>

![](../../../images/e7ff11e1b737abeea87cb5fd11f18db1.png)

```plain
2B18B049698C725E42BCF9A8ED04B6D206F9473FC5D23571EAEC3F1E1E71BF9E

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">2</font>
> 记录计算机名与开机用户名（格式：计算机名-开机用户名）
>

![](../../../images/d3e0a34573ec3c47b599ee435f81b09f.png)

```plain
DESKTOP-1R1FP8B-hello

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">3</font>
> 记录计算机操作系统的具体Build版本号
>

![](../../../images/e4f959cf3de6e416fba3b7fc82ab6344.png)

```plain
18363

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">4</font>
> 计算机中后缀名是jpg的缩略图数量为
>

![](../../../images/75809ee20090df6564d5492b37f6d4b8.png)

简单过滤一下后缀名即可。

```plain
43

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">5</font>
> 计算机系统桌面管理应用相关的记录事件ID为
>

不知道的话可以过滤出来找一下。

![](../../../images/2986438b561a008feb5e6718974fc570.png)

其实是常识。

```plain
9027

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">6</font>
> 记录当前计算机操作系统使用的文件系统格式
>

![](../../../images/c76593c9dbc42aa4f95247767bc03781.png)

```plain
NTFS

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">7</font>
> 当前计算机操作系统默认的照片查看器为
>
> 
>
>  A. WPS图片
>
>  B. 2345图片
>
>  C. Windows图片
>
>  D. Edge
>

仿真一下。

![](../../../images/6fc1d3d1ca8975defa7135349eea3b9e.png)

桌面随便挑一个图片打开，是用 WPS 图片打开的，选 A。

```plain
A

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">8</font>
> 记录计算机Foxmail软件的安装时间
>

![](../../../images/14cca9eb2ecb9b41015240f72a1b762e.png)

```plain
2020-07-27 12:56:47

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">9</font>
> 记录计算机于2020年7月29日最后一次运行navicat时间
>

![](../../../images/78d80e08c5681dc621da872f8b73daec.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">2020-07-29 16:31:22</font>

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">10</font>
> 嫌疑人曾用远程工具连接过__台服务器
>

![](../../../images/4175581aa2bb661ba91d78f8bee77b2d.png)

![](../../../images/f8a2ff97ede78bdf46325bf12c3befee.png)

回收站里面还有一个。

```plain
4

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">11</font>
> 查找计算机中有关手机应用的痕迹，记录APP文件所在路径,无需输入盘符（例：/Program/apk/999.jpg）
>

![](../../../images/568e36972e38864deb9d01bb91879f83.png)

```plain
/Users/hello/Downloads/2020001.apk

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">12</font>
> 查找嫌疑人电脑上网站源码最可能的来源
>
> 
>
>  A. 网页下载
>
>  B. 蓝牙传递
>
>  C. 邮箱获得
>

![](../../../images/505aeadc8cadb0ab908f2b7e7425b84f.png)

![](../../../images/4a40a34f15da657437d5815b6a38ec65.png)

```plain
C

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">13</font>
> 接上题，通过对源码分析，判断源码中有关数据库连接信息配置文件名为
>

![](../../../images/de30d1c36fe55b8721772211543bbc2e.png)

```plain
config.db.php

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">14</font>
> 记录手机自动连接过的WIFI名称
>

![](../../../images/7040e08955b4d50855ebd8ec13643f43.png)

当作新检材导入。

![](../../../images/54f35b927080a664edd2d07875639e8a.png)

```plain
Xiaomi_6294_5G

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">15</font>
> 分析手机数据，请判断微博发送的验证码的短信是否已读，若已读，请写出读取时间
>

![](../../../images/e6ca01642d068f244483309b8f0eb768.png)

[https://www.forensics-wiki.com/base/time/#javascript](https://www.forensics-wiki.com/base/time/#javascript)

这是一个 18 位的时间戳，取出前 9 位的数值，加上 `978307200` 再转换即可。

![](../../../images/2637a03b51942d2206e6439b28f2231e.png)

```plain
2020-07-28 15:14:29

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">16</font>
> 接上题，分析微博账号加入群（戏精学院~武汉基友）的时间
>

![](../../../images/d7fccffca08e0bcbe9769c35681f9bd7.png)

```plain
2018-04-30 23:16:00

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">17</font>
> 选择手机数据当中，与百度相关的应用名
>
> 
>
> A. 手机百度
>
> B. 百度网盘
>
> C. 百度地图
>
> D. 百度输入法
>
> E. 百度手机卫士
>

![](../../../images/5a0474875a922f452b19039abdbd362f.png)

```plain
ABC

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">18</font>
> 统计计算机中，5、6月份工资表发放总额为多少元
>

在回收站里面，拖出来。

两个 Excel 都有密码，尝试寻找一些线索。

![](../../../images/d7b512f1f7b9fdf01fae0d02cf55efa5.png)

![](../../../images/503dc150939d8251b661bac6d7ecb4d5.png)

![](../../../images/e7f1999391c491da0f9125c91166109b.png)

求和求和再求和。

```plain
106480

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">19</font>
> 嫌疑人曾经登录过某分发网站，查找登录的用户名和密码（格式：用户名-密码）
>

![](../../../images/f15b627d56cc2f6d02c119cd9cce3a1c.png)

没有看到保存的密码，那就去看一下 cookie。

![](../../../images/a3347cc9e913ca6bde783f53bbaec813.png)

用户名和密码的哈希都能看到。注意用户名要 URL 解码。

![](../../../images/b354d5e2ac6d44ccb422dd4900d65e5a.png)

其实呢，计算机里面可以直接看到，不需要这么麻烦。

![](../../../images/735c473bbf9595f6327a2ac87dbc40f2.png)

```plain
8@qq.com-admin123456

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">20</font>
> 提取计算机中名称为“1.jfif”图片中的隐藏文件，并获取第一行内容
>

![](../../../images/80100720bbed7a9300320166bc021f8f.png)

在学习资料里面。

![](../../../images/7228fd9f5e200bc510207bb72c4b7267.png)

后面隐写了一个 word 文档。

![](../../../images/601992640194355036fd16bc92748787.png)

```plain
一、贷款销售开场白话术

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">21</font>
> 找出计算机中WPS的下载网址
>

![](../../../images/57ca3ec0714b78757140108a9c3c2066.png)

```plain
[https://pacakge.cache.wpscdn.cn/wps/download/W.P.S.982801.12012.2019.exe](https://pacakge.cache.wpscdn.cn/wps/download/W.P.S.982801.12012.2019.exe)

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">22</font>
> 嫌疑人最可能使用哪两个工具登录访问暗网
>
> 
>
> A. Google Chrome
>
> B. Tor浏览器
>
> C. Clash VPN
>
> D. v2rayN-Core VPN
>

![](../../../images/815e69d52b472b0729f3e27a279ad609.png)

```plain
BD

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">23</font>
> 暗网登录地址账号密码（格式：地址-账号-密码）
>

![](../../../images/9c738b794a72ddc296b23e3b5e5b882d.png)

有一个叫 web 的文件，搞出来看看，发现其实是一个 Word 文档。

![](../../../images/ec1bcb3135cd57735b58360d20d4a9b4.png)

```plain
[http://c2p3hg35jalss7b2a6hkmhzflgevkonqt7g6jze62ro2g4h4wmzwobid.onion-e268443e4-76a2173be](http://c2p3hg35jalss7b2a6hkmhzflgevkonqt7g6jze62ro2g4h4wmzwobid.onion-e268443e4-76a2173be)

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">24</font>
> 查找嫌疑人电脑上存有的分发账号，里面的账号共有多少条
>

![](../../../images/0f755a1d691a11ea48046432f0e70ac7.png)

![](../../../images/e5e17040e4bb438d9d30515090da23ed.png)

```plain
14

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">25</font>
> 计算机中是否存在加密容器，其形式为
>
> 
>
>  A. Bitlocker
>
>  B. TrueCrypt
>
>  C. VeraCrypt
>
>  D. FreeOTFE
>
>  E. CnCrypt
>

![](../../../images/6ffea263014e9757f15e98736f5449e8.png)

```plain
C

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">26</font>
> 接上题，尝试运行容器加密文件，获得加密文件包含的文件名（如有多个文件，使用 - 连接）
>

![](../../../images/cc02a2f4ddb2677b0b5ae993913536fe.png)

旁边两张图片是密钥文件，mm 的第一行是挂载密钥，那个无法显示的 jpg 是加密容器。

![](../../../images/790d21a24f41fbfac698bd433942beca.png)

分两次挂载，第一次用第一行的密钥挂载，第二次用两个密钥文件挂载，最后总共得到两个文件。

```plain
工资七月.xlsx-分发账号

```

## 服务器取证
### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">1</font>
> root用户最初使用192.168.197.1登录系统的时间？
>

直接给了虚拟机，双击 vmx 打开即可。

不知道用户密码，直接单用户模式进去修改。

![](../../../images/d364837e613414055c5a3d93a07e1e0b.png)

然后登录时用 root 用户登录即可。

![](../../../images/8d8a746cb80cade31f9cf6499ec4644f.png)

```plain
2020-08-31 10:19:20

```



### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">2</font>
> 记录服务器根目录文件系统格式
>

![](../../../images/43b0ebe4a991b59ee39ba6e5459d057d.png)

```plain
xfs

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">3</font>
> 记录ssh远程登录端口
>

![](../../../images/c3ee09559fa3ea4eb24cd5b5f39921b3.png)

```plain
13434

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">4</font>
> 查看并记录管理面板的安全入口8位字符
>

![](../../../images/92615e59ed0add4e00bd10fd6fdffb4f.png)

```plain
68c6da24

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">5</font>
> 数据库用户名为fafafa的密码为
>

![](../../../images/3f542511d15aa8b885d77e64543166f1.png)

```plain
pMP3zhGXyBXf6wBd

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">6</font>
>  服务器存在一个分发网站，它是由什么网站框架搭建的
>
> 
>
> A. Nginx
>
> B. Apache
>
> C. Thinkphp
>
> D. Python
>

![](../../../images/8cda83940799867c0541dbf6fcc6ea1c.png)

```plain
A

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">7</font>
> 请列出系统中部署的网站路径。
>

![](../../../images/8824a78518555c2c693f516465834dd3.png)

```plain
/www/wwwroot/fafafa.online

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">8</font>
> 记录服务器分发网站域名
>

![](../../../images/8415fa8b7b5929a9d322ac65a79c74e6.png)

```plain
fafafa.online

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">9</font>
> 访问分发网站，网站首页界面的背景颜色为：
>
> 
>
>  A. 绿色
>
>  B. 蓝色
>
>  C. 红色
>
>  D. 粉色
>
>  E. 黑色
>
>  F. 黄色
>

![](../../../images/a5e6e7bbb1369a127a7785aa41f372cf.png)

域名里面加一个 IP，然后直接去访问。

![](../../../images/9a6b0d7137da695950fc9da71174ff15.png)

```plain
F

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">10</font>
> 目前网站共注册个__用户人数以及用户共上传__个APP（使用 - 连接）
>

关闭防火墙，然后连接数据库。

![](../../../images/67ef5522d71334f5d23ef73554aa0587.png)

![](../../../images/dac02592ef4ebfe044da6419a67d6c3a.png)

![](../../../images/ed961657cb7bdbae9da642c3f9932fc2.png)

![](../../../images/474c1bf0200bab18e35b12af51eaebd8.png)

访问 admin.php 登录后台。

![](../../../images/22429c1dfa1bf8125b1899d52fc44e96.png)

![](../../../images/3c7351b865d463e7d2f6b8f1a230daa4.png)

5 个用户，4个应用。

```plain
5-4

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">11</font>
> 若上传一非法文件至分发网站，网站默认会把文件存放在什么位置
>

![](../../../images/66a356ec87ed0f7839135e65b0b4a3ec.png)

```plain
/www/wwwroot/fafafa.online/data/tmp/

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">12</font>
> 嫌疑人可能利用什么软件（脚本、程序）对后台数据库数据进行了备份，其名称是什么
>

![](../../../images/7cc29bc78569b0b0108562f26e492288.png)

```plain
backupdb.sh

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">13</font>
> 服务器中存在远程控制软件，软件名称是__及其版本号是__ （使用 - 连接）
>

有一个细节，就是刚启动服务器的时候，会弹出来一个 teamviewer 的窗口，这个就是远控软件。

![](../../../images/399c6021f5432cde3650ad02451a08bb.png)

```plain
teamviewer-12.0.258841

```



### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">14</font>
> 服务器目前安装的容器版本是__使用的容器ID为__ （使用 - 连接）
>

![](../../../images/999be2f4b866743ca9c0a03e7dca4c48.png)

![](../../../images/841a45a60d3f102b529f3eff3b14bd8d.png)

```plain
1.13.1-1fc110c6b336

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">15</font>
> 提取fafafa.txt文件，前内容前6字符为
>

![](../../../images/645b98d5e03164173c5b9d791c1ede38.png)

```plain
adbcef

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">16</font>
> 服务器使用的容器映射出来的端口号为
>

![](../../../images/5744602dd85042a296e0c03d8d860de6.png)

```plain
3310

```

## 流量分析
### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">1</font>
> 分析检材1，黑客的IP地址是
>

![](../../../images/8f5ce3c7043af0b1e752821ff8831a33.png)

发送 HTTP 请求的 ip 就是黑客的 ip。

```plain
192.168.94.59

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">2</font>
> 分析检材1，黑客登录web后台使用的账号是
>

![](../../../images/d94f394dee26f3e9f6ecc41a69d0b9dd.png)

直接去看最后一个和登录相关的流量，这个一定是登录成功的。

```plain
admin

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">3</font>
> 分析检材1，黑客登录web后台使用的密码是
>

![](../../../images/673c399c9145f4b16717043cec4e06a3.png)

同上。

```plain
admin!@#pass123

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">4</font>
> 分析检材1，网站账号“人事”所对应的登录密码是
>

![](../../../images/21973151fb7bda1cd4ff6356cf5e9774.png)

就在下面一条流量，用户名 URL 解码就是人事。

```plain
hr134679

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">5</font>
> 分析检材1．黑客上传的webshell文件名是
>

![](../../../images/15159e27badeb1b162115d27069ebafa.png)

```plain
a.php

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">6</font>
> 分析检材1，数据库所在的内网地址为
>

去看一下攻击者用 webshell 干了些什么。

![](../../../images/afe20de94aaae6508048a4383ffafde6.png)

有一条流量看了 config.php 的备份文件。

```plain
10.3.3.101

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">7</font>
```plain
e667jUPvJjXHvEUv

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">8</font>
> 分析检材2，数据库的版本号为
>

![](../../../images/846dbe87d935df11fa4e540a94be5e63.png)

看第一个 tcp 流就行。

```plain
5.5.49

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">9</font>
> 分析检材2，“dou＿config”表中，“name”字段值是“tel的行中，“value”值是
>

![](../../../images/92fd040f23d1a320b1da70f4d8d91bde.png)

```plain
0659-8686868

```

### <font style="color:#5C8D07;">Q</font><font style="color:#07787E;">uestion </font><font style="color:#5C8D07;">10</font>
> 分析检材2，黑客获取了数据库中保存的邮箱账号和密码，其中sool＠test.com的密码是
>

![](../../../images/98a41582eb58ffa6b8b44e845e997dd7.png)

全局搜索，在 920 这条 tcp 流中找到。

![](../../../images/1661376bc60584de2aa55e1dea08ad1a.png)

```plain
qaz123!@#

```

