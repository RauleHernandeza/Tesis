var dgram = require('dgram')
var Client = dgram.createSocket('udp4')
var os = require('os')
var spawn = require('child_process').spawn
//hola mundo

function conection(timer, port, ip){

        setInterval(()=>{

            //monitoring data

            let temp

            let data= {
                architecture: os.arch(),
                average_load: os.loadavg(),
                hostname: os.hostname(),
                speed: os.cpus()[0].speed
            }
            
            temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

            //Client_UDP and temperature
            temp.stdout.on('data', function(temp) {
                temperature = temp.toString()/1000
                console.log(temperature)
                data.temperature= temperature + " celcius"
                Client.send(JSON.stringify(data), port, ip)
            })

        },timer)
}

//conection(2000, 8081, "localhost")

module.exports = {
    conection
}
