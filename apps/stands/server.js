const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const InMemoryStandRepository = require('./src/repositories/InMemoryStandRepository')

// dotenv.config()

const app = makeApp(new InMemoryStandRepository())

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT || 3000}/`)
})
