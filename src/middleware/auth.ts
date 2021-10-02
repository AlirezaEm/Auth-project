import * as jwt from 'jsonwebtoken';
import * as mongo from 'mongodb';
import { Request, Response, NextFunction } from 'express';

const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const banneduser = (value:boolean)=>{    
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if(value)
            throw new Error("user is banned");
        
    }
}

export default class Auth {
    private _middleware =  (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('x-auth-token');
        if(!token) return res.status(400).send('no token in header');
        try{
            const tokenData = jwt.verify(token, 'secret') as jwt.JwtPayload;
            try{
                MongoClient.connect(url,  async (err, db) => {
                    if (err) throw new Error("DbConnectionErrore: " + err);
                    if (!db) throw new Error("db is undef");
                    const dbo = db.db('authDB');
                    const resault = await dbo.collection('users').find({ _id: tokenData.id }).toArray();
                    if ( resault.length <= 0)
                    throw new Error();
                    db.close();
                });
            }
            catch(er){
                return res.status(404).send(`user doesn't exist !!!`);
            }
        }
        catch(ex){
            return res.status(401).send('wrong token signiture');
        }
        next();
    };
    
    @banneduser(false)
    get middleware(){
        return this._middleware;
    }
};    