# Pixhawk

**Infographics**

https://ardupilot.org/copter/docs/advanced-pixhawk-quadcopter-wiring-chart.html

![info](/hardware/assets/pixhawk_basics.assets/infographics.jpg)

![test](/research/_posts/2021-10-12-Optimization Result.md)

## 연결

### 전면 포트

- Switch: 반드시 연결해야 한다.
- Buzzer: 취사선택
- Micro-SD card: 펌웨어, 비행기록이 저장된다. 반드시 장착한다.
- Telem1: 텔레메트리를 연결한다. 비행상태를 전송하고, USB케이블 없이 텔레메트리를 통해서 FC세팅을 할 수 있다.
- GPS: GPS를 연결. 다른 전자장치에서 멀리 떨어뜨린다.
- I2C: $I^2C$  지자계센서를 연결한다. 보드에 이미 지자계센서가 있으므로 추가로 연결하면 redundancy.
- SPKT/DSM: 스펙트럼 리시버를 연결한다.

### 윗면 포트

윗면에는 DF-13 type 포트가 줄줄이 있다. 전면부쪽이 GND, 후면부쪽이 Signal이다.

- Main out: ESC를 연결한다.
- Aux out: 별도의 서보, 짐벌 등을 연결한다.
- RC: PPM receiver, Futaba S.BUS receiver를 연결한다. PPM Encoder와 연결된 PWM receiver를 연결하기도 한다.

## 펌웨어

- Master / Beta / Stable 로 구분된다. 

모드 지원: Acro, Stabilize, Altitude control, Position control, Loiter, RTL(RTH) 모드가 있다.

Failsafe: 저전압, RSSI, 정해진 장소 벗어나는 경우에 대응할 수 있다.

### 지상국 (GCS, Ground Control System)

- ArduPilot 에서 개발한 Mission Planner 를 사용할 수 있다.
  - APM Planner는 Mission Planner의 축소 버전.
- PX4팀에서 개발한 QGroundControl를 사용할 수 있다.

#### Mission Planner

- PX4미지원, 윈도우만 지원.
- 충돌회피, 농약살포, 낙하산 등을 활용할 수 있다.

#### QGroundControl

- Ardupilot Copter, PX4등 MAVLink프로토콜을 사용하는 장치를 지원. 윈도우, 리눅스, 맥, 안드로이드, iOS등 지원.
- 초기설정, Waypoint, 기본적인 Autopilot기능이 쉽다.
- https://docs.px4.io/main/en/config/firmware.html

## 비행모드

비행모드는 Manual / Assisted / Auto 로 구분된다.

### Manual 

Manual 모드에는 Acro / Stabilize / Rattitude 가 있다.

- 모드 공통: Yaw, Throttle은 각속도, 상하속도를 제어함.

- Acro: 완전 수동. Roll/pitch 각속도 제어. 
- Stabilize: Roll/pitch 기울기 제어. 스틱을 중립으로 두면 수평을 유지.
- Rattitude: Acro, Stabilize의 혼합. 평소에는 Stabilize 모드와 같다가, 임계값보다 더 스틱을 기울이면 Acro모드처럼 동작함.

### Assisted

- Throttle은 상하각 속도를 제어함. 임계값보다 작으면 현재 고도 유지.
- Altitude Control: 고도 고정 모드. 
- Position Control: 위치 제어 모드. 롤/피치가 아닌 이동속도를 제어한다.

### Auto

사용자의 입력을 거의 받지 않는 모드.

- Loiter/Hold: 위치 고정 모드
- RTL/Return: return to launch.
- Mission: 임무 수행 모드. 지상국에서 보낸 임무를 따른다. 임무가 없는 경우 현위치에서 Loiter.



