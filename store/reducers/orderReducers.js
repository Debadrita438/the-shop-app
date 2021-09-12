import { ADD_ORDER } from '../actions/orderAction';
import Order from '../../models/order';


const initialState = {
    orders: []
};

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(), 
                action.payload.items, 
                action.payload.amount, 
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state;
    }
}

export default OrderReducer;