import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
    removeFromCart,
    selectCartItems,
    selectCartTotal,
} from "../features/cartSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const CartScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems);
    }, [items]);

    return (
        <SafeAreaView
            style={style.androidSafeTopArea}
            className="flex-1 bg-white"
        >
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">
                            Cart
                        </Text>
                        <Text className="text-center text-gray-400">
                            {restaurant.title}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full gb-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" size={50} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{ uri: "https://links.papareact.com/wru" }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Livraison dans 50-75 minutes</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Modifier</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="divide-y divide-gray-200 mb-2">
                    {Object.entries(groupedItemsInCart).map(([key, items]) => (
                        <View
                            key={key}
                            className="flex-row items-center space-x-3 bg-white py-2 px-5"
                        >
                            <Text className="text-[#00CCBB]">
                                {items.length} x
                            </Text>
                            <Image
                                source={{ uri: urlFor(items[0]?.image).url() }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>

                            <Text className="text-gray-600">
                                <Currency
                                    quantity={items[0]?.price}
                                    currency="EUR"
                                />
                            </Text>

                            <TouchableOpacity>
                                <Text
                                    className="text-[#00CCBB] text-xs"
                                    onPress={() =>
                                        dispatch(removeFromCart({ id: key }))
                                    }
                                >
                                    Supprimer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View className="bg-white p-5 mt5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Sous-total</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={cartTotal} currency="EUR" />
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">
                            Frais de livraison
                        </Text>
                        <Text className="text-gray-400">
                            <Currency quantity={5.99} currency="EUR" />
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-extrabold">Total</Text>
                        <Text className="font-extrabold">
                            <Currency
                                quantity={cartTotal + 5.99}
                                currency="EUR"
                            />
                        </Text>
                    </View>

                    <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
                        <Text className="text-center text-white text-lg font-bold">
                            Commander
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    androidSafeTopArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    androidSafeBottomArea: {
        paddingBottom: Platform.OS === "android" ? 124 : 0,
    },
});

export default CartScreen;
