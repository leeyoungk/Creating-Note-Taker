const router = require( 'express' ).Router();
const uniqid = require( 'uniqid' );
const {
	readFromFile,
	writeToFile,
	appendToFile
} = require( '../utility/fsUtils' );

const dbFilePath = './db/db.json';

router.get( '/', ( req, res ) => {
	readFromFile( dbFilePath )
		.then( ( data ) => {
			const parsedData = JSON.parse( data );

			res.status( 200 ).json( parsedData );
		} )
		.catch( ( error ) => res.status( 500 ).json( error ) );
} );

router.post( '/', ( req, res ) => {
	console.log( 'New Notes', req.body );
	const { title, text } = req.body;

	const newNote = {
		title,
		text,
		id: uniqid()
	};
	appendToFile( newNote, dbFilePath );
	console.log( 'Note added' );
	res.status( 200 ).json( 'Note added' );
} );

router.delete( '/:id', ( req, res ) => {
	const noteId = req.params.id;

	readFromFile( dbFilePath )
		.then( ( data ) => JSON.parse( data ) )
		.then( ( json ) => {
			const noteRemoved = json.filter( note => note.id !== noteId );
			const dataJSON = JSON.stringify( noteRemoved, null, 4 );

			writeToFile( dbFilePath, dataJSON );

			console.log( 'Note deleted ' );
			res.status( 200 ).json( 'Note deleted' );
		} )
		.catch( ( error ) => res.status( 500 ).json( error ) );
} );

module.exports = router;