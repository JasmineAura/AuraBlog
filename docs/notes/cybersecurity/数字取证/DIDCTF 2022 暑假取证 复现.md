---
title: DIDCTF 2022 暑假取证 复现
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/1yiifney/
---
有嫌疑人在使用Windows系统，取证人员对该系统进行了硬盘镜像。通过自己的工具软件对档案袋中的镜像文件进行提取、分析、逆向、恢复、破解、查找等，在线完成填空、简答。

计算机镜像资料镜像名为“windows7disk.E01”



## Question 1
> 请找出操作系统主机名。
>

![](../../../images/7adf3fa6f0a083e4946e10ff2e2ac154.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">WIN-49I0SNRJAMF</font>

```

## Question 2
> 请给出源磁盘的SHA256哈希值。
>

![](../../../images/3a46614b295e7ff25027a38d0acde326.png)

```plain
4547A61A11064DF47B272A4803788597F9A5E9AC0F11A93ABE58C8B8588956CB

```

## Question 3
> 请找出操作系统中安装的Android模拟器名称和安装日期。
>
> 格式：模拟器名时间
>
> 例子：雷电模拟器2022年06月23日
>

![](../../../images/8f529f27343f92c5076acefad798a8d7.png)

找到一个夜神模拟器，然后去看安装的软件。

![](../../../images/efd29cf186b96d2b6289ce019cab3526.png)

可以找到安装日期。

```plain
夜神模拟器2021年05月03日

```

## Question 4 
> 请找出使用Bitlocker加密的虚拟磁盘文件。
>
> 格式：1.txt/2.txt
>

![](../../../images/0dff4d6cd2ae764a17937662fc586973.png)

在 poiuy 用户的 Documents 中。

```plain
my.vhd/my1.vhd

```

## Question 5
> 请找出操作系统安装日期。
>
> 格式:2022-01-04 12:47:43
>

![](../../../images/3d13109c76d7cde5d0bc806b748175c3.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">2021-05-03 18:44:28</font>

```



## Question 6
> 请找出操作系统最后登录的用户。
>

![](../../../images/d6add90748e87f287e64808ea38bd37b.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">poiuy</font>

```



## Question 7
> 请找出操作系统中安装的浏览器最后浏览过的网站域名 [格式： www.baidu.com]
>

![](../../../images/30bc74e1ef913e4f4670b8a339178393.png)

```plain
passport.baidu.com

```



## Question 8
> 请找出操作系统中安装的浏览器名称的对应的安装日期。
>
> 本题仅一次答题机会
>
> 
>
> □ 360浏览器2021-05-03 20:16:43
>
> □ Edge浏览器2021-05-03 20:26:44
>
> □ 谷歌浏览器2021-05-03 20:16:44
>
> □ 搜狗极速浏览器2021-06-03 20:16:44
>

![](../../../images/41bead8e45da19c7342903a68ed14d64.png)

只有一个谷歌浏览器，时间也对的上，选 C。

```plain
C

```

## Question 9
> 请找出操作系统版本号。
>

![](../../../images/e3b096158665ff9a6fcb02d6f571deb9.png)

```plain
6.1

```



## Question 10
> 请找出操作系统设置的时区名称。
>
> 本题仅一次答题机会
>
> 
>
> □ UTC+8
>
> □ UTC+4
>
> □ UTC+2
>
> □ UTC+6
>

![](../../../images/a1465a5209818a78e91aa53cd5a7738a.png)

```plain
A

```

## Question 11
> 请找出操作系统中安装的浏览器“自动填充”中保存的网站密码信息（网站、用户名、密码）
>
> 格式：网站+用户名+密码
>
> 例子：[https://blog.didctf.com/+admin+admin111](https://blog.didctf.com/+admin+admin111)
>

![](../../../images/d173d5a3419525022b67b2763a2a0398.png)

```plain
[https://www.baidu.com/](https://www.baidu.com/)+<font style="color:rgba(0, 0, 0, 0.87);">test+test@test2021.com</font>

```



## Question 12
> 请找出用户“poiuy”的SID。
>

![](../../../images/e81accd7cd51af4a61a1517d5798d719.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">S-1-5-21-435394657-638363951-1066549375-1000</font>

```



## Question 13
> 请给出源磁盘的大小（字节）。
>

![](../../../images/7dba0273fb9b56889028f6b36c60430f.png)

![](../../../images/8a86bc255fe4ddc4405a452801d6a16e.png)

简单的换算关系。

```plain
32212254720

```



## Question 14
> 请找出各分区文件系统类型。
>

![](../../../images/8fa9a806b5114da16f65ac7f4dd04ac3.png)

```plain
ntfs

```

## Question 15
> 请找出曾经连接到该系统的U盘的品牌、序列号、最后插拔日期。
>
> 格式：SAMSUNG+FAWC524213104FAWV146+2022-07-14
>

![](../../../images/cbfa2008bc019877ac76c35f3256024d.png)

![](../../../images/03669e090400ee6c8aac37516409e480.png)

```plain
SanDisk+<font style="color:rgba(0, 0, 0, 0.87);">4C530001310423109141+2021-05-04</font>

```

## Question 16
> 请找出回收站中的文件的名称
>
> 格式：2333.exe+1.txt+3.E01
>
> 注意顺序
>

![](../../../images/6f95efdfc10adf1cb8c1c4464d7f3083.png)

注意按照时间顺序排序。

```plain
<font style="color:rgba(0, 0, 0, 0.87);">nox_setup_v7.0.0.6_full.exe+新建文本文档1.txt+测试.rtf</font>

```

## Question 17
> 请找出使用Bitlocker加密的虚拟磁盘文件恢复密钥文件名是什么。
>

两种方法。

### 法 1
![](../../../images/bc24f516e1f77f3db60407987782bbd3.png)

### 法 2
BitLocker 的密钥放在了 poiuy 用户的 Documents 中，可以直接找到。

![](../../../images/7a9d5d43af59525eb289111d49f1eca8.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">BitLocker 恢复密钥 666E6292-906B-4A9B-9167-4DB146123BAD.txt</font>

```

## <font style="color:rgba(0, 0, 0, 0.87);">Question 18</font>
> 请找出用户“poiuy”的登录密码。
>

![](../../../images/23ceaafd646c9826c4802f2bcafcad4e.png)

```plain
<font style="color:rgba(0, 0, 0, 0.87);">09876543</font>

```

