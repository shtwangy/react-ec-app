import * as Actions from './actions';
import initialState from "../store/initialState";

export const ProductsReducer= (state = initialState.products, action) => {
    switch (action.type) {
        case Actions.DELETE_PRODUCT:
            return {
                ...state,
                list: [...action.payload] // コンポーネントに変更を検知させるために新しい配列とする（保持するメモリが別になる）
            };
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload] // コンポーネントに変更を検知させるために新しい配列とする（保持するメモリが別になる）
            };
        default:
            return state
    }
};
