const file= require('fs')

function cover_to_string(format){
    let log="first_average_load:" + format[0] + "\n" +
    "second_average_load:" + format[1] + "\n" +
    "third_average_load:" + format[2] + "\n" +
    "architecture:" + format[3] + "\n" +
    "hostname:" + format[4] + "\n" +
    "temperatura:" + format[5] + "\n" + ""
    return log
}

function cover_to_array(buff){
    let chain=buff.toString()
    let array= chain.split(",")
    return array
}

function create_object(array){
    object= {
        first_average_load:array[0],
        second_average_load:array[1],
        third_average_load:array[2],
        architecture:array[3],
        hostname:array[4],
        temperatura:array[5]
    }
    return object
}

function write_in_the_log(log){
    file.appendFile('../log.txt', log, (error)=>{
        if (error){
            console.log("no deberia de verse este mensaje" + error)
        }else {console.log("datos ingresados")}
    })
}

function create_log(log){
    file.writeFile('../log.txt', log, (error)=>{
        if(error){
            console.log("No se pudo crear el archivo" + error + "\n")
        } else 
            {console.log("archivo creado" + "\n")}
    })
}
module.exports={
    cover_to_string,
    cover_to_array,
    create_object,
    write_in_the_log,
    create_log
}