

# Trajectories Backend

Access Database:
  - Navigate to https://github.com/Kinderdll/trajectories_be.git 
  - Locate Database file in database_folder
  - Donwload a file called Days.db 
  - Replace db file
  ```
wss.on('connection', ws => {
      let days=('Example Database file')
      const db = new sqlite3.Database(days, (err) => {
      if (err) {  return console.error(err.message); }
      console.log("Connected to database");
 });
  ```
  To file path you just downloaded 
   ```
wss.on('connection', ws => {
      let days=('./database/Days.db')
      const db = new sqlite3.Database(days, (err) => {
      if (err) {  return console.error(err.message); }
      console.log("Connected to database");
 });
  ```


```sh
mkdir project_folder
cd project_folder/
git clone https://github.com/Kinderdll/trajectories_be.git 
cd project_folder/trajectories_be
npm install 
npm start
```

## Google Cloud VM instance
-public IP : 34.89.245.202  (if reboot you should need new ip)
-port : 3000

VM is configured to always start as process server.js via forever npm and crontab
## Example
const ws = new WebSocket('ws://34.89.245.202:3000');