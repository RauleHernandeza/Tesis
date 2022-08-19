var dgram = require('dgram')
var Client = dgram.createSocket('udp4')
var os = require('os')
var spawn = require('child_process').spawn

function conection(timer, port, ip, data){

        setInterval(()=>{

            //monitoring data

            const info = data()
            let temp
            

            temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

            //Client_UDP and temperature
            temp.stdout.on('data', function(temp) {
                temperature = temp.toString()/1000
                console.log(temperature)
                info.temperature= temperature + " celcius"
                Client.send(JSON.stringify(info), port, ip)
            })

        },timer)
}

function data () {

    let data= {
        architecture: os.arch(),
        average_load: os.loadavg(),
        hostname: os.hostname(),
        speed: os.cpus()[0].speed
    }
    return data
}



//conection(2000, 8081, "localhost", data)

module.exports = {
    conection, 
    data
}
