var dgram = require('dgram')
var Client = dgram.createSocket('udp4')
/* var Client2 = dgram.createSocket('udp4') */
var os = require('os')
var d = require('diskinfo');
var spawn = require('child_process').spawn

function send_information(timer, port, ip, data){
   
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

/* d.getDrives(function(err, aDrives) {
    setInterval(()=>{
        for (var i = 0; i < aDrives.length; i++) {
            if( aDrives[i].filesystem.toLowerCase() == '/dev/sda' + i){
                console.log('Drive ' + aDrives[i].filesystem)
                let t = {
                    filesystem: aDrives[i].filesystem,
                    blocks: aDrives[i].blocks,
                    used:aDrives[i].used,
                    available:aDrives[i].available,
                    capacity:aDrives[i].capacity,
                    mounted:aDrives[i].mounted
                }
                Client2.send(JSON.stringify(t), 8081, "localhost")
                
            }
        }
    },2000)

}) */

//conection(2000, 8081, "localhost", data)
send_information(2000, 8081, "localhost", data)

module.exports = {
    //conection, 
    data,
    send_information
}
