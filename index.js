// Se utiliza para obtener información de la máquina.
var os = require('os');
 
 // Obtener la información de la CPU de la máquina actual
 let x
 x=os.cpus ()

//Se le coloca un -1 al x.leght para evitar un error
 for (i=0; i<=x.length-1; i++){ 
    let p=x[i].times.user
    console.log ('Información de la CPU:', p)
 }

 console.log ('Información de la CPU:', x)
 //console.log ('Información de la CPU:', x)
 
 // memoria memoria
 //console.log ('memoria memoria es:', os.totalmem ())
 
 // Bits del sistema (x64, x86)
//console.log(os.arch())
 
 // Información de la tarjeta de red
//console.log(os.networkInterfaces())