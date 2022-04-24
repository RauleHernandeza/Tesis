const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
const file= require('fs')

function Server () {
            socket.on('message', (msg, rinfo) => {
                console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)

                string=msg.toString()
                array=string.split(",")

                log=
                "first_average_load:" + array[0] + "\n" +
                "second_average_load:" + array[1] + "\n" +
                "third_average_load:" + array[2] + "\n" +
                "architecture:" + array[3] + "\n" +
                "hostname:" + array[4] + "\n" +
                "temperatura:" + array[5] 

                object={
                    first_average_load:array[0],
                    second_average_load:array[1],
                    third_average_load:array[2],
                    architecture:array[3],
                    hostname:array[4],
                    temperatura:array[5]
                }

                file.writeFile('log.txt', log, (error)=>{
                    if(error){
                        console.log("No se pudo crear el archivo")
                    } else "Todo bien"
                })


                console.log(object)
            });    
            socket.bind(8081);        
}

//Server()

module.exports = {
    Server
}