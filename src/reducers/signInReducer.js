import { SIGN_IN_SUCCESS } from "../action/index";

const initialState = {
  isSuccess: false,
};

export default function goodsReducers(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
