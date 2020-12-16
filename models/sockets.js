const BandList = require('./band-list');

class Sockets {

    constructor( io ) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado');
            //Emitir al cliente todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());
            //votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.incrementVotes( id );
                //aqui se nesecita volver a emitir la siguiente instrccion 
                this.io.emit('current-bands', this.bandList.getBands());
                //para que se actualize en el frontend
            })
            //borrar banda
            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand( id );
                this.io.emit('current-bands', this.bandList.getBands());
            });
            //cambiar nombre de la banda
            socket.on('cambiar-nombre-banda', ({ id, nombre }) => {
                this.bandList.changeName( id, nombre );
                this.io.emit('current-bands', this.bandList.getBands());
            });
            //crear una nueva banda
            socket.on('crear-banda', ({ nombre }) => {
                this.bandList.addBand( nombre );
                this.io.emit('current-bands', this.bandList.getBands());
            });
        });
        
    }


}


module.exports = Sockets;