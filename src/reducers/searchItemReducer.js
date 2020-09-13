import { SEARCH_ITEM_SUCCESS } from "../action/index";

const initialState = {
  item: {},
};

export default function searchItemReducers(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload.result,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
