const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
const file= require('fs')
//const {cover_to_string, cover_to_array} = require('./assistant/auxiliary')

function Server (you_want_log) {
    socket.on('message', (msg, rinfo) => {
        //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
        console.log(JSON.parse(msg))

    });    

    socket.bind(8081);        
}

Server(true)

module.exports = {
    Server
}