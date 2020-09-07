import orders from "../store/reducers/orders";
import moment from "moment";

class Order {
    constructor(id,items, totalAmmount, date){
        this.id = id,
        this.items = items,
        this.totalAmmount = totalAmmount,
        this.date = date
    }

    get readableDate(){
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;