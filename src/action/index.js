import axios from "axios";
/*
 * action types
 */
export const FETCH_GOODS_DETAILS_BEGIN = "FETCH_GOODS_DETAILS_BEGIN";
export const FETCH_GOODS_DETAILS_SUCCESS = "FETCH_GOODS_DETAILS_SUCCESS";
export const FETCH_GOODS_DETAILS_FAILURE = "FETCH_GOODS_DETAILS_FAILURE";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const UPDATE_CART = "UPDATE_CART";
export const SEARCH_ITEM_SUCCESS = "SEARCH_ITEM";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const UPDATE_ITEM_FAIL = "UPDATE_ITEM_FAIL";

/*
 * action creators
 */
export const fetchProductsBegin = () => ({
  type: FETCH_GOODS_DETAILS_BEGIN,
});

export const fetchProductsSuccess = (result) => ({
  type: FETCH_GOODS_DETAILS_SUCCESS,
  payload: { result },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_GOODS_DETAILS_FAILURE,
  payload: { error },
});

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
});

export const updateCartSuccess = (result) => {
  return {
    type: UPDATE_CART,
    payload: { result },
  };
};

export const searchItemSuccess = (result) => {
  return {
    type: SEARCH_ITEM_SUCCESS,
    payload: { result },
  };
};

export const updateItemSuccess = () => {
  return {
    type: UPDATE_ITEM_SUCCESS,
  };
};
export const updateItemFail = () => {
  return {
    type: UPDATE_ITEM_FAIL,
  };
};

export const fetchGoodsDetails = () => {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    return axios
      .get("http://localhost:1300/goodsDetails")
      .then((result) => {
        dispatch(fetchProductsSuccess(result.data));
      })
      .catch((error) => {
        console.log("Error in fetching goods: ", error);
        dispatch(fetchProductsFailure(error));
      });
  };
};

export const signInUser = (username, password) => {
  return (dispatch) => {
    return axios
      .get("http://localhost:1300/userSignin", {
        headers: {
          "Content-Type": "application/json",
          username,
          password,
        },
      })
      .then((result) => {
        if (result.data === "SUCCESS") {
          dispatch(signInSuccess());
        }
      })
      .catch((error) => {
        console.log("Error in sign in: " + error);
      });
  };
};

export const searchItem = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:1300/goodsDetails/${id}`)
      .then((result) => dispatch(searchItemSuccess(result.data)))
      .catch((error) => console.log("Error in search item: ", error));
  };
};

export const updateItem = (id, body) => {
  return (dispatch) => {
    return axios
      .post(`http://localhost:1300/updateGoods/${id}`, {
        ...body,
      })
      .then((result) => {
        console.log("update succ  -->", result);
        if (result.data === "SUCCESS") {
          dispatch(updateItemSuccess());
        }
      })
      .catch((error) => {
        console.log("Error in update item: ", error);
        dispatch(updateItemFail());
      });
  };
};
