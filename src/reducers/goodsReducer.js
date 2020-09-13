import {
  FETCH_GOODS_DETAILS_BEGIN,
  FETCH_GOODS_DETAILS_SUCCESS,
  FETCH_GOODS_DETAILS_FAILURE,
  SIGN_IN_SUCCESS,
} from "../action/index";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function goodsReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_GOODS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GOODS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.result,
      };
    case FETCH_GOODS_DETAILS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
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
