const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
const { Pool } = require('pg')

function Server(showlog, serverport, hostt, userr, passwordd, databasee, dbportt) {

    const pool = new Pool({
        host: hostt,
        user: userr,
        password: passwordd,
        database: databasee,
        port: dbportt
    })


    socket.on('message', async (msg, rinfo) => {
        console.log(JSON.parse(msg))
        console.log(rinfo)
        let data = JSON.parse(msg)
        await send_data(pool, data, rinfo)
        const receive = await receive_data(pool, data, rinfo)
        const statistics = stat(pool, receive)
    })

    socket.bind(serverport)

}

const send_data = async (pool, data, rinfo) => {

    try {

        let insert = 'insert into data_collection (architecture, hostname, freemem, platform, totalment, uptime, temperature_celcius, address) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *'
        let values = [data.architecture, data.hostname, data.freemem, data.platform, data.totalment, data.uptime, data.temperature, rinfo.address]
        const send = await pool.query(insert, values)
        //console.log(send.rows)

        insert = 'insert into cpus (id_data_collection, first_model, first_model_speed, second_model, second_model_speed, third_model, third_model_speed, fourth_model, fourth_model_speed) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *'
        values = [send.rows[0].id_data_collection, data.cpus[0].model, data.cpus[0].speed, data.cpus[1].model, data.cpus[1].speed, data.cpus[2].model, data.cpus[2].speed, data.cpus[3].model, data.cpus[3].speed]
        const send2 = await pool.query(insert, values)
        //console.log(send2.rows);

        insert = 'insert into average_load (id_data_collection, first_load, second_load, third_load) values ($1, $2, $3, $4) returning *'
        values = [send.rows[0].id_data_collection, data.average_load[0], data.average_load[1], data.average_load[2]]
        const send3 = await pool.query(insert, values)
        //console.log(send3.rows);

        //console.log(send.rows[0].id_data_collection);
        //return send
    }
    catch (err) {
        console.log(err)
    }

}

const receive_data = async (pool, data, rinfo)=>{

    try{

        let query = 'select * from data_collection where hostname = $1 and address = $2'
        let value = [data.hostname, rinfo.address]
        const receive = await pool.query(query, value)
        //console.log(receive.rows)
        return receive

    }
    catch (err) {
        console.log(err)
    }

}

const stat = async (pool, receive)=>{

    let Dividend = 0
    let ram_summation = 0
    let conver = 0
    let Splitter = receive.rows.length
    receive.rows.map( x => {
    console.log(x)
    Dividend= Dividend + x.temperature_celcius
    conver = x.freemem / 1000000000
    ram_summation = ram_summation + conver
    })
    console.log(Dividend)
    console.log(Splitter)
    let average_ram = ram_summation / Splitter
    let average_temperature = Dividend / Splitter
    console.log(average_temperature.toFixed(2))
    console.log(average_ram.toFixed(2))
}


Server(true, 8081, 'localhost', 'postgres', 'postgres', 'Tesis2', '5432')

module.exports = {
    Server
}

        //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
        //let r = JSON.parse(msg)
        //console.log(r.freemem)
        //let average_temperatur = +r.temperature
        //console.log(average_temperatur)
        // let average_temperature
        //console.log(r.cpus[0].model)
/* console.log('Avarage_Temperature= 41,7 celcius')
console.log('Average_Ram_consumed= 0,644116165 GB') */
        //console.log('Available_space=');

/*  if(showlog){
socket.on('message', (msg, rinfo) => {

 console.log(JSON.parse(msg))
 
});    
 
socket.bind(8081); 
}
else{
socket.on('message', (msg, rinfo) => {
});    
 
socket.bind(8081);
} */

/*  let y = r.freemem
y = y / 1000000000
let t = r.totalment
t = t / 1000000000
console.log(y);
console.log(t); */