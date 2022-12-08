import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    removeFromCart,
    selectCartItemsWithId,
} from "../features/cartSlice";

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectCartItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart({ id, name, description, price, image }));
    };

    const removeItemFromCart = () => {
        if (!items.length > 0) return;

        dispatch(removeFromCart({ id }));
    };

    return (
        <>
            <TouchableOpacity
                className={`bg-white border p-4 border-gray-200 ${
                    isPressed && "border-b-0"
                }`}
                onPress={() => setIsPressed(!isPressed)}
            >
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Currency quantity={price} currency="EUR" />
                        </Text>
                    </View>

                    <View>
                        <Image
                            source={{ uri: urlFor(image).url() }}
                            className="h-20 w-20 bg-gray-300 p-4"
                            style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity onPress={removeItemFromCart}>
                            <MinusCircleIcon
                                color={items.length > 0 ? "#00CCDD" : "gray"}
                                size={40}
                            />
                        </TouchableOpacity>

                        <Text>{items.length}</Text>

                        <TouchableOpacity onPress={addItemToCart}>
                            <PlusCircleIcon
                                // color={items.length > 0 ? "#00CCDD" : "gray"}
                                color="#00CCDD"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

export default DishRow;
