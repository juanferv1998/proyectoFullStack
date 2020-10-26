require('./database')
const app = require('./app')



// Server is listening
app.listen(app.get('port'), () =>{
    console.log('server on port',app.get('port'));
}) ;