import {Unit} from "./unit";
export {Unit} from "./unit";

export class Shoppingitem {
    constructor(
        public id: number,
        public title: string,
        public quantity: number,
        public unit: Unit,
        public price?: number
    ){}
}
