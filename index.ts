import express, {Application} from 'express';
import dotenv from 'dotenv';
// import router from './src/routes/routes.ts'

dotenv.config();

const app:Application = express();

const PORT:number = Number(process.env.PORT) || 3000;

//MIDDLEWARES
app.use(express.json());
// app.use(router);

app.listen(PORT, ():void => {
    console.log(`Server started at ${PORT}`);
})