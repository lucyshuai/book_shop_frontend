import { UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAIL } from "../action/index";

const initialState = {
  isSuccess: false,
};

export default function searchItemReducers(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        isSuccess: true,
      };

    case UPDATE_ITEM_FAIL:
      return {
        ...state,
        isSuccess: false,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
