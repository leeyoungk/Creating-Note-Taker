const router = require( 'express' ).Router();
const notesRouter = require( './notes' );
const pagesRouter = require( './pages' );

router.use( '/api/notes', notesRouter );
router.use( '/', pagesRouter );

module.exports = router;