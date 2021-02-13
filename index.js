const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
dotenv.config();

//Swagger configuration
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))


//Cors configuration
const config = {
    application: {
        cors: {
            server: [{
                origin: "*",
                credentials: true
            }]
        }
    }
}
app.use(cors(
    config.application.cors.server
));

//Database
require("./database/sequelize")

//Import Routes
const MemberRoutes = require("./routes/MemberRoutes")


//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));

//Fisrt route
app.get('/',(req,res)=>{
    res.send("This project is the rest API of the student branch of University El Bosque <a href='/swagger'>Swagger</a>")
})

//Declare routes
app.use("/api/members",MemberRoutes)


//Initialize the server
app.listen(port,() => {
    console.log('Server on port ' + port)
}) 