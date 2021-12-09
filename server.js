const express = require( 'express' );
const routes = require( './routes/index.js' );
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( express.static( 'public' ) );

app.use( '/', routes );


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
