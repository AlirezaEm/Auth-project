import * as jwt from 'jsonwebtoken';
import * as mongo from'mongodb';
import { Request, Response, NextFunction } from 'express';
const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
export default function (req: Request, res: Response, next: NextFunction){
    const token = req.header('x-auth-token') as string;
    const tokenData = jwt.verify(token, 'secret') as jwt.JwtPayload;
    MongoClient.connect(url, async (err, db) => {
        if (err) throw new Error("DbConnectionErrore: " + err);
        if (!db) throw new Error("db is undef");
        const dbo = db.db('authDB');
        const resault = await dbo.collection('users').find({ _id: tokenData.id, isAdmin: true }).toArray();
        if (resault.length <= 0) return res.status(403).send(`you dont have permission`);
        db.close();
    }); 
    next();
}