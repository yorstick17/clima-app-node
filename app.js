const lugar = require('./lugar/lugar');
const clima = require('./lugar/clima');

const axios = require('axios');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtner el clima',
        demand: true
    }
}).argv;

//console.log(argv.direccion);

/*lugar.getLugarLatLng(argv.direccion)
    .then(console.log);*/

/*clima.getClima(40.750000, -74.000000)
    .then(console.log)
    .catch(console.log);*/

const getInfo = async(direccion) => {

    const direc = await lugar.getLugarLatLng(direccion);
    let rpta = '';
    if (direc.direccion.length === 0) {
        rpta = 'No se pudo obtener la direccion';
    } else {
        rpta = `El clima de ${direc.direccion}`;
    }
    const climita = await clima.getClima(direc.lat, direc.lng);
    if (climita.length !== 0) {
        rpta = rpta + ' es de ' + climita;
    } else {
        rpta = `No se pudo obtener el clima de ${direc.direccion} `;
    }
    return rpta;

}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);