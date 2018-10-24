### 脚本说明

使用google的BigQuery来获取aos-cube的下载量

需要翻墙才能正常运行（因为会访问google的BigQuery）。

**请慎重使用这些脚本，因为bigquery是付费的，每个月可以免费查询1T的数据。**

### 生成秘钥

参考该链接生成自己的秘钥：https://cloud.google.com/storage/docs/authentication#generating-a-private-key

|脚本|说明|
|:---:|---|
|get-aoscube-download-daily.js|获取从2017-10-20开始到指定日期的每天下载量|

### 运行

```sh
npm install
node ./get-aoscube-download-daily.js
```

