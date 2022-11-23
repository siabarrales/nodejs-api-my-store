import express from 'express';
import routerApi from './routes/index.js';
import cors from 'cors';

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/error.handler.js';

const app = express();
const port = 4000;

app.use(express.json());

const whiteList = ['http://127.0.0.1:5500', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(options));
routerApi(app);

//Los middlewares van despues del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
