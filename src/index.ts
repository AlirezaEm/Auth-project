import express = require("express");
const app = express();
import login from './routs/login';
import home from './routs/home';
import highAuth from './routs/highAuth';
import lowauth from './routs/lowAuth';


app.use(express.json());
app.use('/api/home', home);
app.use('/api/login', login);
app.use('/api/lowauth', lowauth);
app.use('/api/highauth', highAuth);
app.listen(3000, () => console.log('listening on port 3000'));