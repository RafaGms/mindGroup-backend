import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors({ origin: '*' }));

app.use(express.json());

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
