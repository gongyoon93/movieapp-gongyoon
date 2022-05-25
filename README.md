# movieapp-gongyoon
2022.05.22
backend server 실행시 internal/modules/cjs/loader.js:905 throw err 에러 발생
> npm 재설치 이후에도 해결되지 않아 경로 다시 확인 후 변경하여 수정.
2022.05.25
로그인 성공하여도 랜딩페이지 라우팅 후 다시 로그인화면 돌아와짐
> 로그인 성공시 token 의 cookie 이름이 다르게 되어있다는걸 확인. 수정