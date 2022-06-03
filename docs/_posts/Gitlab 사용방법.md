---
layout: post
title: "Install and Using Gitlab on Docker Synology NAS"
date:   2022-02-18 00:22:00 +0900
categories: Gitlab Docker Synology ssh
---

# Gitlab 사용방법

본 문서는 시놀로지 나스에서 깃랩을 설치하고 실사용하는 방법에 대해서 다룬다.

## 1.설치

1. 패키지 센터에서 Docker를 설치한다.
2. Docker를 실행해서 레지스트리 탭에서 gitlab을 검색하고, `gitlab/gitlab-ce`를 다운로드한다.
3. 이미지 탭에서, 방금 다운로드 및 설치한 `gitlab/gitlab-ce:latest`를 실행한다. 잡다구리한 설정을 해준다.
   1. 이름 지어준다.
   2. 자동 재시작 설정해준다.
   3. 로컬 포트와 컨테이너 포트를 아래와 같이 지정해준다. (로컬 포트는 마음대로)
      - 로컬 포트 / 컨테이너 포트
      - 44444 / 22 # ssh용
      - 44445 / 443 # ssh용 인 것 같은데, 잘 모르겠다.
      - 44446 / 80 # 웹 서비스용
      - 44447 / 9091 # 어느 블로그 글에서 넣으라고 해서 넣었는데, 잘 모르겠다.
4. 해당 이미지가 실행되면, 컨테이너 탭에서 확인할 수 있다. 더블클릭해서 들어간 뒤 터미널 탭을 보면 부팅중인 것을 확인할 수 있다.
5. 부팅이 되면, 웹브라우저를 통해 깃랩에 접속할 수 있다.
   - 나스가 공유기 밑에 있는 경우, 포트포워드를 해 주기 전까지는 접속이 안 될 수도 있다.
   - 예시: 국민대학교 FMCL 연구실 gitlab 주소: http://fmcl.kookmin.ac.kr:44446 
6. 설치 직후에는 관리자 계정뿐이다. 관리자 계정은 root이고, 암호는 무작위로 생성된다. 도커의 터미널 탭에서 새 터미널을 띄운 뒤 다음과 같이 입력해 확인할 수 있다. 접속한 뒤 관리자 페이지에서 비밀번호를 변경해 주자.
   - `root@gitlab:/# cat /etc/gitlab/initial_root_password | grep Pass`

## 2. 프로젝트 운용

위에서 설치한 깃랩 웹을 통해 레포지토리를 생성한 뒤, github에서 사용하던 것처럼 ssh를 통해 클론하려고 했더니 서버를 찾을 수 없는 오류가 발생했다. 해결하기 위해서는 다음과 같이 로컬 pc의 ssh 설정 과정이 필요하다.

1. 로컬 pc의 ssh 공개키를 깃랩 서버에 등록한다.

2. 로컬 pc의 `~/.ssh/config` 파일을 열고 다음과 같이 입력한다.

   ```config
   Host gitlab
   	IdentityFile ~/.ssh/id_ed25519 # 로컬 pc의 ssh 키 파일
   	User gitlab_username # 깃랩 계정
   	Hostname fmcl.kookmin.ac.kr # 깃랩을 설치한 시놀로지 나스 주소
   	Port 44444 # 깃랩 도커 실행 시 컨테이너 포트 22에 대응하는 로컬 포트번호 
   ```

3. 클론할 때는 다음과 같이 입력하면 된다.

   `git clone git@gitlab:[레포지토리주소].git`

   ssh config 파일에 gitlab 이라는 닉네임(?)을 fmcl.kookmin.ac.kr 주소로 연결해 준 것이므로, 다른 서버의 깃랩을 쓰고 싶다면 해당 부분을 수정해주면 된다.

   ​	

