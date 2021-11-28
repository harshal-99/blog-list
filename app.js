import mongoose from "mongoose"
import express  from "express"
import cors     from "cors"
import "express-async-errors"

import { MONGODB_URI } from "./utils/config.js"
import logger          from "./utils/logger.js"
import middleware      from "./utils/middleware.js"
import blogRouter      from "./controllers/bloglist.js"
import loginRouter     from "./controllers/login.js";
import userRouter      from "./controllers/users.js";

logger.info("connecting to", MONGODB_URI)


mongoose.connect(MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app