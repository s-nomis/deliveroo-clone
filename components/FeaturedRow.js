import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient
            .fetch(
                `
                *[_type == "featured" && _id == $id] {
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type-> {
                            name
                        }
                    },
                }[0]
                `,
                { id }
            )
            .then((data) => {
                setRestaurants(data?.restaurants);
            });
    }, [id]);

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4 pb-2">
                <View>
                    <Text className="font-bold text-lg">{title}</Text>
                    <Text className="text-xs text-gray-500">{description}</Text>
                </View>

                <ArrowRightIcon color="#00CCBB" />
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {/* RestaurantsCards */}
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
