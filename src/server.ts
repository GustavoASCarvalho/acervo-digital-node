import cors from 'cors';
import express from 'express';
import { router } from './routes/index.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3333, () => {
	console.log('Server started on port http://localhost:3333 !');
});
