import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            let tempItems = [...state.items];

            if (index >= 0) {
                tempItems.splice(index, 1);
            }

            state.items = tempItems;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsWithId = (state, id) =>
    state.cart.items.filter((item) => item.id === id);

export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.price), 0);

export default cartSlice.reducer;
