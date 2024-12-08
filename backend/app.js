import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

const app = express();
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect("mongodb+srv://restApi:blogApi@cluster0.i1jwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>app.listen(5001))
.then(()=> console.log("server connected to localhost and database")
)
.catch((err) => console.log(err));















