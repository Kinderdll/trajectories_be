const WebSocket = require('ws');
const sqlite3=require('sqlite3').verbose()
const express=require('express');
const app=express();
const moment=require('moment');
const wss = new WebSocket.Server({ server:app.listen(8080) });
  
  
wss.on('connection', ws => {
    let days=('C:\\Users\\eyth_\\Desktop\\HUA\\WebDev\\tracectories_be\\data\\Days.db')
    const db = new sqlite3.Database(days, (err) => {
    if (err) {  return console.error(err.message); }
    console.log("Connected to database");
  });
    console.log("New Client Connected");
    db.get("Select timestamp from day",(err,row)=>{
    let first_timestamp= row.timestamp;
    sendData(db,ws,first_timestamp);
    })
})


function sendData(database,ws,begin_date){
  let data=[];
  let b=moment(begin_date);
  let end_date=b.clone().add(60,'seconds').format('YYYY-MM-DD HH:mm:ss').toString()
    database.all(`Select rowID as id ,ship_name as name,longitude as lon,latitude as lat ,destination,timestamp from Day Where timestamp between  ?  and  ? `,[begin_date,end_date],(error,rows)=>{
    if(error){console.log(error.message); return;}
    if(rows.length!=0){
      rows.forEach(row=> data.push(row))
      ws.send(JSON.stringify(data))
      setTimeout(function()
      {sendData(database,ws,end_date)},1000);
    }
    else{
      ws.close(1000,"Sent all data");
      database.close();
    } 
  })
}
