var dgram = require('dgram')
var Client = dgram.createSocket('udp4')
var os = require('os')
var spawn = require('child_process').spawn


function conection(timer, port, ip){

        setInterval(()=>{

            //monitoring data

            let average_load, architecture, temp, send, hostname, speed
            architecture= os.arch()
            average_load= os.loadavg()
            hostname= os.hostname()
            speed= os.cpus()[0].speed
            send= new Array(average_load, architecture, hostname)
            temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

            //Cliente_UDP and teperature
            temp.stdout.on('data', function(temperature) {
                Client.send(send + "," +temperature/1000, port, ip)
            })

        },timer)
}

conection(2000, 8081, "localhost")

module.exports = {
    conection
}
