const http = require('http') // HTTP library
const dotEnv = require('dotenv') // parsers .env as process.env
const express = require('express') // express 
const mongoose = require('mongoose') // ORM for Mongodb
const bodyParser = require('body-parser') // to parse request body
const session = require('express-session') // to store user (for authentication)
const AuthRouter = require('./routes/auth') // custom auth router
const OrderRouter = require('./routes/order') // custom order router
const ProductRouter = require('./routes/product') // custom product router
const PaymentRouter = require('./routes/payment') // custom payment router
const DocsRouter = require('./routes/docs') // custom payment router
const { MemoryStore } = require('express-session') // Memory Store to store session data

dotEnv.config() // configured .env with process.env process.env.ABC => 123

const app = express() // created app 
const server = http.createServer(app) // created server using HTTP and app

mongoose.connect(process.env.MOGODB_URI) // database connection

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore(),
  cookie: { secure: false, maxAge: new Date(Date.now() + (30 * 86400 * 1000)) }
})) // configured session


// body parser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(express.json())

// sets view engine
app.set('view engine', 'pug')


// middleware, adds current_user to response locals
app.use((req, res, next) => {
  res.locals = {
    current_user: req.session.current_user // || null
  }
  next()
})

app.use(express.static('files'))

// configured custom routers
app.use('/auth', AuthRouter)
app.use('/orders', OrderRouter)
app.use('/products', ProductRouter)
app.use('/bills', PaymentRouter)
app.use('/docs', DocsRouter)

app.get('/', (req, res) => {
    res.render('home')
})

// starts server on the port (defined in .env)
server.listen(process.env.PORT)