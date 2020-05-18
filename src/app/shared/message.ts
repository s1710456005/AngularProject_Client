import {User} from "./user";
export {User} from "./user";

export class Message {
    constructor(public id:number,
                public user_id: number,
                public user:User,
                public messagetext:string,
                public created_at: Date
    ){}

}
