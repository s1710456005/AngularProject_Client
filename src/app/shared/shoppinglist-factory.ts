import {Shoppinglist} from "./shoppinglist";
import {Unit} from "./unit";

export class ShoppinglistFactory {

    /**
     *  delivers an empty shoppinglist
     *  is used while data are loaded
     *  meanwhile shoppinglist ist loaded and this returned empty shoppinglist will be overwritten
     */
    static empty(): Shoppinglist{
        return new Shoppinglist(null, null,null,'', new Date(), null,null,[],[], [],null);
    }

    /**
     * returns the shoppinglist with existing rawdata
     * @param rawShoppinglist
     */
    static fromObject(rawShoppinglist: any): Shoppinglist{
        return new Shoppinglist(
            rawShoppinglist.id,
            rawShoppinglist.user_id,
            rawShoppinglist.user,
            rawShoppinglist.title,
            typeof(rawShoppinglist.deadline) === 'string'? new Date(rawShoppinglist.deadline) : rawShoppinglist.deadline,
            rawShoppinglist.total_amount,
            rawShoppinglist.status,
            rawShoppinglist.shoppingitems,
            rawShoppinglist.bills,
            rawShoppinglist.messages,
            rawShoppinglist.volunteer
        )
    }


}
