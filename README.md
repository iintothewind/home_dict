# home_dict

本项目提供了英文->中文双解词典的API.
字典的原始数据取自[skywind3000/ECDICT](https://github.com/skywind3000/ECDICT)

## API spec

### request

- path: `/home_dict/translate`
- param: `user=用户名`
- param: `word=待查询的英文单词`

### response

- 200 OK

```json
{
  "word": "good",
  "phonetic": "gud",
  "definition": "n. benefit\nn. moral excellence or admirableness\nn. that which is pleasing or valuable or useful\na. having desirable or positive qualities especially those suitable for a thing specified",
  "translation": "n. 善行, 好处, 利益\na. 好的, 优良的, 上等的, 愉快的, 有益的, 好心的, 慈善的, 虔诚的",
  "exchange": "复数 : goods\n比较级 : better\n最高级 : best"
}
```

- 404 Not Found

```json
{
  "error": "requested word not found"
}
```

## installation

### download ECDICT database

- 从[ECDICT](https://github.com/skywind3000/ECDICT/releases)下载`ecdict-sqlite-28.zip`
- 解压缩`stardict.db`到`db/stardict.db`

### prepare data

- 连接`stardict.db`
- 运行`etc/ddl.sql`

### pre-install

因为项目用到了`sqlite3`需要编译本地代码, 所以需要编译环境

- 对于windows平台, 需要安装python3和vc++2015
- 对于linux平台, 需要安装python3和gcc
- 需要本地有node和typescript, ts-node支持

### install

- npm install






