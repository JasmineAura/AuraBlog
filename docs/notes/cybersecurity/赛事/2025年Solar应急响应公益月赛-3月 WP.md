---
title: 2025年Solar应急响应公益月赛-3月 WP
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/w0j0sr7t/
---
## 【签到】和黑客去Battle把！
> 题目描述
>
> 某某文化有限公司被加密啦！老板给了小王5000美元请你帮助小王和黑客谈判争取使用最低的价格买下密钥！
>
> 【用户ID为登录青少年CTF平台的手机号】
>
> 【本题为模拟请勿当真！禁止攻击平台！】
>

登入附件中提到的平台。

![](../../../images/166f6f9075be0bb4999cf6f393d2e4f9.png)



## 窃密排查-1
> 题目描述
>
> 发现内部数据被窃取，进行紧急上机。请通过黑客遗留痕迹进行排查：
>
> 找到黑客窃密工具的账号
>
> 容器账号密码：root:Solar@2025_03!
>

ssh 连接后发现有一个 megacmdserver.log 日志文件，打开后发现账号。

![](../../../images/b3bd3ba9ed49950fbd325b69f06fdc88.png)



## 溯源排查-4
> 题目描述
>
> 业务系统已被删除，找出可能存在漏洞的应用
>

在根目录发现了 nacos，这个就是存在漏洞的应用。



## 溯源排查-5
> 题目描述
>
> 请提交漏洞cve编号
>

先做第六题再回来看，搜索一下 Nacos Hessian 反序列化漏洞，找到了这个。

![](../../../images/06b3d10dd89f3e54cd2c8aaceb05ad30.png)

CNVD-2023-45001。

但是提交不对，这里很坑，要把 CNVD 改成 CVE，即提交 CVE-2023-45001。



## 溯源排查-6
> 题目描述
>
> 找出黑客利用漏洞使用的工具的地址，该工具为开源工具
>

在 tmp 目录下发现 java 的 class 文件，用 jadx-gui 反编译一下，发现是哥斯拉的马。

![](../../../images/37d80bd756503f25b8117a9bb7be7791.png)

网上去搜一下和 nacos 相关的 CVE，找到了这个工具。

[https://github.com/c0olw/NacosRce](https://github.com/c0olw/NacosRce)

![](../../../images/900d703eb55371fa257c82f5feea54d9.png)

答案就是这个。



## 2503逆向
> 题目描述
>
> 重要文件被加密了，请分析加密器解开该文件。
>
> 提示：加密前的文件前四个字节为flag，且开机时间较短
>

IDA 打开分析，发现读取了 flag.txt 中的内容，然后做了 RC4 加密，密钥是一个长度为 16 的字符串，以 GetTickCount() 作为种子，然后生成随机数一张表的索引，具体逻辑如下：

![](../../../images/6011760d22f0172857cf34d634952297.png)

题目中提示开机时间较短，于是考虑去爆破这个 GetTickCount 的值，也就是随机数的种子。

这里为了方便，先用 C++ 爆破种子，把所有密钥生成到一个字典里面，然后在通过 python 进行批量解密，最后只要解密出来的字符串包含 flag 这四个字符，就说明密钥正确。

```cpp
#include<bits/stdc++.h>
#include<windows.h>
using namespace std;

int main(){
	freopen("dict.txt","w",stdout);
	string table = "qa0wserdf1tg9yuhjio2pklz8xbvcn4mPL7JKOIHUG3YTF6DSREAWQZX5MNCBV";
	for(int i=1000000;i<=2000000;i++){
		srand(i);
		string key = "";
		for(int j=0;j<16;j++){
			int tmp = rand()%62;
			key += table[tmp];
		}
		cout<<key<<endl;
	}
	return 0;
}


```

```python
from Crypto.Cipher import ARC4 as rc4cipher

def rc4_decrypt(ciphertext, key):
    key = key.encode()
    enc = rc4cipher.new(key)
    plaintext = enc.decrypt(ciphertext)
    return plaintext

def main():
    # 读取密钥文件
    with open('dict.txt', 'r') as f:
        keys = [line.strip() for line in f.readlines()]

    # 读取密文文件
    with open('flag.txt.freefix', 'rb') as f:
        ciphertext = f.read()

    # 尝试每个密钥进行解密
    for key in keys:
        # 解密数据
        plaintext = rc4_decrypt(ciphertext, key)
        
        print(f"尝试密钥: {key}")
        print(f"解密结果: {plaintext}\n")

        # 可以在这里添加逻辑来判断是否找到了正确的密钥
        # 例如，检查解密后的数据是否包含某些已知的明文内容
        if b"flag" in plaintext:  # 假设明文包含"flag"字样
            print(f"找到正确密钥: {key}")
            print(f"解密后的明文: {plaintext}")
            break

if __name__ == "__main__":
    main()

    
```

![](../../../images/71430dbbdeb332f83258790421711036.png)





## 题外话
做 窃密排查-2 的时候参考的文章，尝试把进程的内存 dump 出来，结果还是没发现账户的密码。

[https://arista.my.site.com/AristaCommunity/s/article/Forensic-Investigation-of-the-MEGAcmd-Client](https://arista.my.site.com/AristaCommunity/s/article/Forensic-Investigation-of-the-MEGAcmd-Client)

[https://blog.nviso.eu/2024/09/04/megasync-forensics-and-intrusion-attribution/](https://blog.nviso.eu/2024/09/04/megasync-forensics-and-intrusion-attribution/)

