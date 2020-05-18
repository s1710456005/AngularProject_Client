import {Shoppingitem, Unit} from "./shoppingitem";
export {Shoppingitem, Unit} from "./shoppingitem";
import {Status} from "./status";
export {Status} from "./status";
import {Bill} from "./bill";
export {Bill} from "./bill";
import {Message} from "./message";
export {Message} from "./message";
import {User} from "./user";
export {User} from "./user";

export class Shoppinglist {
    constructor(
        public id: number,
        public user_id: number,
        public user: User,
        public title: string,
        public deadline: Date,
        public total_amount: number,
        public status: Status,
        public shoppingitems: Shoppingitem[],
        public bills?: Bill[],
        public messages?: Message[],
        public volunteer?: User
    ){}

}
