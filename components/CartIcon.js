import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cartSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const CartIcon = () => {
    const items = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const navigation = useNavigation();

    if (items.length === 0) return;

    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity
                className="bg-[#00CCDD] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
                onPress={() => navigation.navigate("Cart")}
            >
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
                    {items.length}
                </Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">
                    View Cart
                </Text>
                <Text className="text-lg text-white font-extrabold">
                    <Currency quantity={cartTotal} currency="EUR" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CartIcon;
