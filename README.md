# JavaScript Everywhere

## 구입처

[O'REILLY](https://www.jseverywhere.io/) / [한빛미디어](https://www.hanbit.co.kr/store/books/look.php?p_code=B5225420272)

## install node

```
$ brew update

$ brew install node

$ node --version

$ npm --version
```

## install MongoDB

```
$ brew update

$ brew tap mongodb/brew

$ brew instsall mongodb-community@4.4

# run MongoDB
$ brew services start mongodb-community

# MongDB 실행 중인지 확인
$ ps -ef | grep mongd
```

> 2020.2.2 기준 MacOS 11은 MongoDB가 지원하지 않았다..
> Docker로 해결

```
docker run -d --name mongo-db -v /Users/doky/data:/data/db -p 27017:27017 mongo
```

## install Expo

```
$ npm install -g expo-cli
```

## install prettier

- code formating

```
$ npm install -g prettier
```

> https://github.com/javascripteverywhere
