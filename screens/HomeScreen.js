import {
    View,
    Text,
    SafeAreaView,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    AdjustmentsVerticalIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient
            .fetch(
                `
            *[_type == "featured"] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }
            `
            )
            .then((data) => {
                setFeaturedCategories(data);
            });
    }, []);

    return (
        <SafeAreaView
            style={style.androidSafeTopArea}
            className="bg-white pt-5"
        >
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{ uri: "https://links.papareact.com/wru" }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">
                        Deliver Now!
                    </Text>
                    <View className="flex-row items-center">
                        <Text className="font-bold text-xl">
                            Current location
                        </Text>
                        <ChevronDownIcon size={20} color="#00CCDD" />
                    </View>
                </View>

                <UserIcon size={35} color="#00CCDD" />
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 items-center">
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput
                        placeholder="Restaurants and cuisines"
                        keyboardType="default"
                    />
                </View>

                <AdjustmentsVerticalIcon color="#00CCDD" />
            </View>

            {/* Content */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={style.androidSafeBottomArea}
            >
                {/* Categories */}
                <Categories />

                {/* Featured */}
                {featuredCategories?.map((category) => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
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

export default HomeScreen;
