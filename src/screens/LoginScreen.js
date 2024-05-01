import React, {useState} from "react";
import {Box, VStack, HStack, Heading, Text, Button, Pressable, Input, Icon} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { useLogin } from "../services/user";

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLogin();

    const onLogin = () => {
        loginMutation.mutate({email, password});
    }

    return (
        <Box h="100%" p={5} justifyContent="center">
            <VStack space={2} mb="20" alignSelf="center">
                <Icon as={AntDesign} name="home" size={12} color="rose.600" alignSelf="center"/>
                <Heading size="3xl" mr={2} color="rose.600">Real Estate</Heading>
            </VStack>

            <VStack space={2} mb="10">
                <Heading size="xl">Sign In</Heading>
                <Text fontSize="lg" mt="5" bold>
                    Email
                </Text>
                <Input type="text" rounded="xl" fontSize="lg" p={4} autoCapitalize="none" value={email} onChangeText={setEmail}/>
                <Text fontSize="lg" mt="5" bold>
                    Password
                </Text>
                <Input type="password" rounded="xl" fontSize="lg" p={4} autoCapitalize="none" value={password} onChangeText={setPassword}/>
            </VStack>

            <Button mt={5} rounded="3xl" _text={{fontWeight: "bold"}} onPress={onLogin} disabled={!email || !password} isLoading={loginMutation.isLoading}>LOGIN</Button>

            <HStack justifyContent="center" mt="5">
                <Text fontSize="lg">Don't have an account?</Text>
                <Pressable ml="2" onPress={() => navigation.push("Register")}>
                    <Text color="rose.600" fontSize="lg" bold underline>Sign Up</Text>
                </Pressable>
            </HStack>
       
        </Box>
    );
}