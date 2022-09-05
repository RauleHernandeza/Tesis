var dgram = require('dgram')
var Client = dgram.createSocket('udp4')
/* var Client2 = dgram.createSocket('udp4') */
var os = require('os')
var d = require('diskinfo');
var spawn = require('child_process').spawn

function send_information(timer, port, ip){
   
        setInterval(()=>{

            //monitoring data

            const info = data()
            let temp

            temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

            //Client_UDP and temperature
            temp.stdout.on('data', function(temp) {
                temperature = temp.toString()/1000
                info.temperature= temperature //+ " celcius"
                Client.send(JSON.stringify(info), port, ip)
            })

        },timer)
}

function data () {

    let data= {
        architecture: os.arch(),
        hostname: os.hostname(),
        freemem: os.freemem(),
        average_load: os.loadavg(),
        platform: os.platform(),
        totalment: os.totalmem(),
        uptime: os.uptime(),
        cpus: os.cpus()
        
    }
    return data
}

send_information(2000, 8081, "localhost")

module.exports = {
    data,
    send_information
}
