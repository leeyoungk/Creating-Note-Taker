const fs = require( 'fs' );
const util = require( 'util' );

const readFile = util.promisify( fs.readFile );

const writeToFile = ( filePath, content ) =>
	fs.writeFile( filePath, content, ( err ) =>
		err ? console.log( err ) : console.log( `path to written file: ${filePath}` )
	);


const appendToFile = ( obj, filePath ) => {
        readFile( filePath )
            .then( ( data ) => {
                const parsedData = JSON.parse( data );
    
                parsedData.push( obj );
    
                const dataJSON = JSON.stringify( parsedData, null, 4 );
    
                writeToFile( filePath, dataJSON );
            } );
};
module.exports = {
	readFile,
	writeToFile,
	appendToFile
};