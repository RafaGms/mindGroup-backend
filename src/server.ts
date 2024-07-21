import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes/router';

const app = express();
const PORT = 8000;

app.use(cors({ origin: '*' }));

app.use('/images', express.static(path.join(__dirname, "..", "uploads")));

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
