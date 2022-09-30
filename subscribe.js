const mqtt = require('mqtt')
    const host = 'broker.hivemq.com'
    const port = '1883'
    const clientId = `mqttItera_${Math.random().toString(16).slice(3)}`


    const connectUrl = `mqtt://${host}:${port}`

    const client = mqtt.connect(connectUrl, {
        clientId,
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        connectTimeout: 30 * 1000,
        rejectUnauthorized: false,
        
        //uncomment if need username or password
        //   username: 'emqx',
        //   password: 'public',
        reconnectPeriod: 1000,
    })

    const subtopic = '/+/mqtt'
    client.on('connect', () => {
        console.log('Connected')
        client.subscribe([subtopic], () => {
            console.log(`Subscribe to topic '${subtopic}'`)
        })
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })