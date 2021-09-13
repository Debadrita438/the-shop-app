import { ADD_ORDER, SET_ORDERS } from '../actions/orderAction';
import Order from '../../models/order';


const initialState = {
    orders: []
};

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.payload.id, 
                action.payload.items, 
                action.payload.amount, 
                action.payload.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case SET_ORDERS:
            return {
                orders: action.orders
            }
        default:
            return state;
    }
}

export default OrderReducer;