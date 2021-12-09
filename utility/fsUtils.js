const fs = require( 'fs' );
const util = require( 'util' );

const readFromFile = util.promisify( fs.readFile );


const writeToFile = ( filePath, content ) =>
	fs.writeFile( filePath, content, ( err ) =>
		err ? console.log( err ) : console.log( `File written to path: ${filePath}` )
	);

const appendToFile = ( obj, filePath ) => {
	readFromFile( filePath )
		.then( ( data ) => {
			const parsedData = JSON.parse( data );

			parsedData.push( obj );

			const dataJSON = JSON.stringify( parsedData, null, 4 );

			writeToFile( filePath, dataJSON );
		} );
};

module.exports = {
	readFromFile,
	writeToFile,
	appendToFile
};