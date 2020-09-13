import { UPDATE_CART } from "../action/index";

const initialState = {
  count: 0,
  cost: 0,
};

export default function cartCountReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      console.log(action.payload);
      return {
        ...state,
        count: state.count + action.payload.result.count,
        cost: state.cost + action.payload.result.cost,
      };
    default:
      return state;
  }
}
