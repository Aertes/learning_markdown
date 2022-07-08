| 源        | URL                                                          | 主页                                                         |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| npm       | [https://registry.npmjs.org/](https://link.segmentfault.com/?enc=okssAnmmQjRf5KfC1RxvrA%3D%3D.P1IePZi8YlNfOeRq7DhpjnG%2B8NL%2BxbrV9jM0%2BG7DfcA%3D) | [ https://www.npmjs.com/](https://link.segmentfault.com/?enc=VSGq%2BwwBt9N2aP0otQ9sFA%3D%3D.iNk%2Bo4Fl7NrNZK6xbIjDK%2BZFphPTVcdOI9EkKDFRGm4%3D) |
| cnpm      | [http://r.cnpmjs.org/](https://link.segmentfault.com/?enc=pXBAU4AqvyvZLo8gNibnlw%3D%3D.L6uNO7qyl81FkteHMfqkbNSqedK8m9e6yTbAQkrKRP8%3D) | [ https://cnpmjs.org/](https://link.segmentfault.com/?enc=LHGFHd6KvmzYvgyIrz4hPA%3D%3D.K1N4H75RgMxmXkKOdelfwqas2KkW4b9tJZB%2Frh6EgH8%3D) |
| taobao    | [https://registry.npm.taobao.org/](https://link.segmentfault.com/?enc=UG1ORB26CvsTpXnWQgMkSQ%3D%3D.FmWw9i9%2FuHIO8gPZi%2Bd8b00F2sRBw9trs8%2B1x685h4p01y4S7joKXF3N1ralne3e) | [https://npm.taobao.org/](https://link.segmentfault.com/?enc=Jr7flUpcP%2BZkFkRz3w1P%2BQ%3D%3D.GL4x8gDyXFJFwTDwzgQLfQGJfZzDCiW09yeoECIBmFM%3D) |
| npmMirror | [https://skimdb.npmjs.com/regi...](https://link.segmentfault.com/?enc=urzZENjt5Xn58CEyvsaWBA%3D%3D.1E9uly6M26GCdbBJVyDDG3fnTzMHFgeNizIehBnFuHj%2FnVhm35fMV%2FC9ykpNVn46) | [https://skimdb.npmjs.com/](https://link.segmentfault.com/?enc=NtitN8i8Y%2BYajUcNhSZu8w%3D%3D.C0eJQgpFdhAWSVy79QbI3tG%2FVE5Og02zdNK0WtI%2FUFA%3D) |
| nj        | [ https://registry.nodejitsu.com/](https://link.segmentfault.com/?enc=PgQKfHtSbocPIVF80HjSPw%3D%3D.iLwk9mN%2FJmFWwKSDevTrHK1eNzjoLBkCDGQddITeTkI%3D) | [ https://www.nodejitsu.com/](https://link.segmentfault.com/?enc=7hvOp4RoWOxCkzibrhPGjw%3D%3D.17m1SRKou6TN9l3oPxWIjNwhbccFbMke41H1ZDicF38%3D) |
| rednpm    | https://skimdb.npmjs.com/registry/                           | [http://npm.mirror.cqupt.edu.cn/](https://link.segmentfault.com/?enc=sbhiYyfnV3BlifaXBoYsoQ%3D%3D.0ByhFssdnmYz7a%2FrvzSM4SEdmZeEg5wFre9GIHXe9TA%3D) |
| edunpm    | [http://registry.enpmjs.org/](https://link.segmentfault.com/?enc=S0YR6cogxRahWDCB1eqz3g%3D%3D.EAArzuJS4mALtti2j%2FoqJ3YTQWcP2d84W6OI4OnlVyE%3D) | [http://www.enpmjs.org/](https://link.segmentfault.com/?enc=eNFilouRzKQdcdjjqjizGg%3D%3D.fFGZqyRtip2tm4T42UzipmFtK5cXisbzfmoxXtuoyN4%3D) |

```shell
# 全局安装
npm install -g nrm
# 查看是否安装成功
nrm --version
# 列出可选的源：nrm ls
nrm ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  
# 切换使用的源：nrm use npm
nrm use npm
                        
   Registry has been set to: https://registry.npmjs.org/
   
   
# 添加一个源：nrm add <registry> <url>
nrm add company http://npm.company.com/   

    add registry company success
    
# 删除一个源：nrm del <registry>
nrm del company

    delete registry company success

# 测试源速度：nrm test
nrm test npm

* npm ---- 833ms

nrm test

* npm ---- 807ms
  cnpm --- 374ms
  taobao - 209ms
  nj ----- Fetch Error
  rednpm - Fetch Error
  npmMirror  1056ms
  edunpm - Fetch Error
  
# 访问源的主页：nrm home taobao
nrm home taobao

```

