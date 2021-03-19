# plantpoint_frontend

Frontend for SmartFarm System . Should activate with plantpoint_backend.

### Installation

To install related packages, write a command line below on the project home directory.

```bash
npm install
```



### Prerequisite

Before start this frontend project, set these constants in plantpoint-frontend/src/reference/secret.ts

```typescript
/* plantpoint-frontend/src/reference/secret.ts */
export const API = 'http://IP:PORT'; // Backend Server ip and port
export const WS = 'http://IP:PORT'; // Websocket ip and port
export const CAM_IP = 'http://IP:PORT' // CCTV Web Camera ip and port
```



## Usage

<p align="center">
  <img src="./documentation/intro.png" width="90%" />
</p>


<br/>

* Power Automation
* Remote Control
* Environments and Power Logging
* CCTV

<br/>

<p align="center">
  <img src="./documentation/schedule.png" width="90%" />
</p>


<br/>

* Add Schedule 
* Change Schedule
* Find Schedule
* Remove Schedule