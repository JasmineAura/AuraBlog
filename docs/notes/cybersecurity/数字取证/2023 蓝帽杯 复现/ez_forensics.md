---
title: ez_forensics
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/e9jm28qo/
---
拿到一个内存镜像，先扫描一下文件，发现桌面上面有几个文件，分别是 key.rsmr，table.zip，readme.txt。

table.zip 里面也有一个 readme.txt，很明显是明文攻击。

![](../../../../images/5e78007578921d8877c19b9c1ce811d2.png)

但是桌面上的 readme.txt 和压缩包中的 readme.txt 大小对应不上，可能被修改过，于是去看编辑框 editbox。

![](../../../../images/b8b20ef6a84cf85359a73c2ce1cd6f03.png)

上面 undoBuf 中的内容才是真正的 readme.txt 中的内容。

然后明文攻击。

![](../../../../images/6ebcf173ba794365f6ed5ebd480d15eb.png)解开压缩包拿到里面的一个 table 文件，其实是一个 png，是这样的内容。

![](../../../../images/afcf21a941b8bc98b737561c48088353.png)

桌面上还有一个 rsmr 文件，不知道是干什么的，可以看一下用户操作记录。

![](../../../../images/eeb1b805f5e180e93ee28940c7171f47.png)

发现这个应该是一个记录鼠标相关信息的一个文件，移动轨迹？

网上搜一下这个工具，安装好以后可以自动识别这个 rsmr 文件，双击打开会直接播放鼠标行为，开一个画图记录下来。

发现可以和之前那张 table 图片对应。

![](../../../../images/1ee60eb160e38829f5ebdaceb4a320a2.png)

得到一个字符串 a91e37bf。

继续看内存镜像，在 consoles 里面有一串密文，应该是 AES，用在线网站解密可以得到 flag 的第二部分。

![](../../../../images/9a015a8de19fdc6b6d6d0d51de71347a.png)

![](../../../../images/4aadefcbf13c69b620d6752f83bc1baa.png)

![](../../../../images/d424f98e82a671e0eb00572605f309df.png)

第一部分在这里，可以用 Passware Kit 找到。

```plain
flag{194a019a-1767-913a-f140-2626195942a0}

```

