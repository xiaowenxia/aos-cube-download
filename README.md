### 脚本说明

使用google的BigQuery来获取aos-cube的下载量

需要翻墙才能正常运行（因为会访问google的BigQuery）。

**请慎重使用这些脚本，因为bigquery是付费的，每个月可以免费查询1T的数据。**

### 生成秘钥

参考该链接生成自己的秘钥：https://cloud.google.com/storage/docs/authentication#generating-a-private-key

|脚本|说明|
|:---:|---|
|get-aoscube-install-count.js|获取指定日期到现在的下载量|
|get-aoscube-download-daily.js|获取从2017-10-20开始到指定日期的每天下载量|
|get-aoscube-download-daily-pip.js|获取从2018-09-04开始到指定日期的每天pip下载量(去掉了源镜像工具的下载量)|
|get-aoscube-download-system.js|获取一个月的不同操作系统的下载量|

### 运行

```sh
npm install
node ./get-aoscube-download-daily.js
```

### 从2017-10-20到2018-08-30的下载量

#### 数据下载

[count-20171020-20180830](http://gitlab.alibaba-inc.com/chenan.xxw/eco-scripts/blob/master/get-ucube-install-count/count-20171020-20180830.xlsx)

#### 图表展示：

总下载量：

![](download_count_20171020-20180830.png)

当日下载量：

![](daily_count_20171020-20180830.png)

