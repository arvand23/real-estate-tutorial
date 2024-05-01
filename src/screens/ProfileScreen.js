import React from 'react';
import {Box, Heading, Button, Avatar} from 'native-base';
import { useFetchUser, useLogout } from "../services/user";

export default function ProfileScreen() {
    const {data} = useFetchUser(); //fetch user from db and put it in this object
    const logoutMutation = useLogout();

    const onLogout = async() => {
        logoutMutation.mutate();
    }
    return (
        <Box h="100%" p={5}>
            <Avatar bg="black" alignSelf="center" size="xl" mb={5}>
                {data?.email.slice(0,2).toUpperCase()}
            </Avatar>
            <Heading size="xl" mb={5} alignSelf="center">
                {data?.email}
            </Heading>
            <Box position="absolute" bottom={10} left={0} right={0}>
                <Button m={5} rounded="3xl" _text={{ fontWeight: "bold"}} onPress={onLogout}>Sign Out</Button>
            </Box>
        </Box>
    )
}