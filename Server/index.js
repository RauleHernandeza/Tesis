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
        const send = await save_data(pool, data, rinfo)
        const receive = await receive_data(pool, data, rinfo)
        const statistics = stat(receive)
        await send_statistic(pool, send, statistics)

    })

    socket.bind(serverport)

}

const save_data = async (pool, data, rinfo) => {

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

        return send

    }
    catch (err) {
        console.log(err)
    }

}

const receive_data = async (pool, data, rinfo) => {

    try {

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

const stat = (receive) => {

    let temperature_summation = 0
    let ram_summation = 0
    let conver = 0
    let Splitter = receive.rows.length
    let hostname = ''

    receive.rows.map(x => {

        console.log(x)
        temperature_summation = temperature_summation + x.temperature_celcius
        conver = x.freemem / 1000000000 //transform from byte to Gygas
        ram_summation = ram_summation + conver
        hostname = x.hostname
    })

    let average_ram = ram_summation / Splitter
    let average_temperature = temperature_summation / Splitter
    

    console.log('average temperature of ' + hostname + ' ' + average_temperature.toFixed(2) + ' celcius')
    console.log('average ram consumed of ' + hostname + ' ' + average_ram.toFixed(2) + 'GB')

    return {average_ram: average_ram, average_temperature:average_temperature}
}

const send_statistic = async (pool, send, statistics) => {

    try {
        let date = new Date()
        let time = '' + date.getHours() - 12 + ':' + date.getMinutes()  + ':' + date.getSeconds()
        let ship_date = '' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
        let query = 'insert into Statistics (ID_Data_Collection, average_temperature, average_ram_consumed, arrive_time, arrive_date) values ($1, $2, $3, $4, $5) returning *'
        let value = [send.rows[0].id_data_collection, statistics.average_ram, statistics.average_temperature, time, ship_date]
        const receive = await pool.query(query, value)
        /* console.log(time)
        console.log(ship_date) */
        //console.log(receive.rows)

    }
    catch (err) {
        console.log(err)
    }

}


Server(true, 8081, 'localhost', 'postgres', 'postgres', 'Tesis2', '5432')

module.exports = {
    Server
}