# baramgil

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 완전 처음
git clone 깃허브주소
// 브랜치 확인(-a 옵션으로 원격 브랜치까지 확인)
git branch -a
// 원격 "ooo 브랜치"를 로컬로 당기기 (로컬 ooo 브랜치에서 작업하기 위해)
git switch -t origin/ooo

### 작업 후
git add .

git commit -m '커밋내용'
// 작업중인 로컬 브랜치에서 커밋한 내역을 원격 ooo 브랜치로 올리기
// -u 옵션으로 다음부터는 git push 만하여도 자동으로 git push origin ooo 와 같음
git push -u origin ooo

깃허브주소로 이동해서 해당 ooo 브랜치 이동
pull request 요청
아래 내용에는 작업한 내용 적기


내용 작업 후


### 첫날 제외 다른 날 또는 push 가 안되는 경우
git pull --no-rebase origin ooo

