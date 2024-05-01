import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { useFetchUser } from "./services/user";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const { data: user} = useFetchUser();

    return (
        <NavigationContainer>
            {!user ? (
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                            <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitle:""}} />
                        </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
            ) }

        </NavigationContainer>
    );
}