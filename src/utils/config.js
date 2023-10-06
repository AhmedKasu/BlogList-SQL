import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const DATABASE_URL_DEV = process.env.DATABASE_URL_DEV
const JWT_SECRET = process.env.JWT_SECRET

export { PORT, DATABASE_URL_DEV, JWT_SECRET }
