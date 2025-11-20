const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')
const { applyMiddleware } = require('@reduxjs/toolkit')

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

app.db=router.db


app.use(cors())
app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use(auth)
app.use(router)

app.listen(8000, () => {
  console.log('JSON Server is running on port 8000')
})