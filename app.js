import express from 'express';
import { connectDB } from './utils/mongo.js';
import productRoutes from './routes/products/product.js'
import userRoutes from './routes/user/user.js'
// import { isAutheticated } from './middleware/user.js';
import multer from 'multer';
import helmet from "helmet";
import { isAuthenticated } from './middleware/user.js';


const upload = multer({ dest : './public/data/uploads/' })

const app = express();

app.use(express.json());
app.use(express.urlencoded())

const PORT = 3334;  





app.get('/', (req, res) => {
    res.send('Hello, world!');
});


connectDB();

app.use(helmet());
app.use('/api', userRoutes)
app.use('/api', productRoutes);

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
});

app.use('/api/test1', isAuthenticated , (req, res)=>{
    console.log('hello')
})

app.listen(PORT, ()=> {
    console.log('server is up and running')
})


















