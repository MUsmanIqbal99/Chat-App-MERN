import dotenv from 'dotenv'
dotenv.config();

import app, { server } from './app.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 8000;


connectDB().then(()=> {
  server.listen(PORT , ()=> {
    console.log(`App listening on PORT ${PORT}`);
  })
}).catch ((error)=> {
  console.log(`MongoDB Connection Failed: ${error}`);
})