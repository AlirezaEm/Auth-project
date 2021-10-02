import {Router, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import * as mongo from 'mongodb';

const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const router = Router();

router.post('/', (req: Request, res: Response) => {
    MongoClient.connect(url, (err, db)=>{
        if (err) throw new Error("DbConnectionErrore: " + err);
        if (!db) throw new Error("db is undef");
        const dbo = db.db('authDB');
        dbo.collection('users').findOne({username : req.body.username, password : req.body.password}, (err,resault)=>{
            if (err) throw err;
            if (!resault) {
                res.status(400).send('invalid username or password')
            }
            else{
                const token = jwt.sign({ id : resault._id}, 'secret');
                res.header('x-auth-token', token).send(resault);
            }
            db.close(); 
        });
    });
});
export default router;


