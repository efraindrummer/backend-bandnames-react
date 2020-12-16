const Band = require("./band");

class BandList {
    constructor(){
        this.bands = [
            new Band('Metallica'),
            new Band('Maddona'),
            new Band('Katy Perry'),
            new Band('Bon Jovi')
        ];
    }

    addBand( name ){
        const newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands;
    }

    removeBand( id ){
        this.bands = this.bands.filter( band => band.id !== id );
    }

    getBands(){
        return this.bands;
    }

    incrementVotes( id ){
        this.bands = this.bands.map( band => {
            if( band.id === id ){
                band.votes += 1;
            }
            return band;
        })
    }

    changeName( id, newName ){
        this.bands = this.bands.map( band => {
            if( band.id === id ){
                band.name = newName;
            }
            return band;
        })
    }
}

module.exports = BandList;