const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const InMemoryUserRepository = require('./src/repositories/InMemoryUserRepository')

// dotenv.config()

const app = makeApp(new InMemoryUserRepository())

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT || 3000}/`)
})
