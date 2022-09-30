const mqtt = require('mqtt')
const host = 'broker.hivemq.com'
const port = '1883'
const clientId = `mqttItera_${Math.random().toString(16).slice(3)}`


const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  //uncomment if need username or password
//   username: 'emqx',
//   password: 'public',
  reconnectPeriod: 1000,
})

const pubtopic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('Connected')
  setInterval(function(){ 
    var message = {
        data : Math.floor(Math.random() * (20-10) + 30),
        tanggal : new Date(Date.now()).toString()
    }
    client.publish(pubtopic, JSON.stringify(message) , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
      })
  },1000)
})