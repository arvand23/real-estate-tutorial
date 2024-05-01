import {useToast} from 'native-base';
import { QueryClient, useMutation, useQueryClient, useQuery} from 'react-query';
import {axiosInstance} from '../utils/axiosInstance';
import * as SecureStore from "expo-secure-store";
import useToken, { TOKEN_QUERY_KEY } from "../hooks/useToken";

export const FETCH_USER_QUERY_KEY = "fetch_user";

export function useLogin() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        ({email, password}) => axiosInstance.post("/users/sign_in.json", { user: {email, password}}),
        {
            onSuccess: async (data) => {
                const token = data.headers.authorization;
                await SecureStore.setItemAsync(TOKEN_QUERY_KEY, token);

                queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
                queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);

                toast.show({title: JSON.stringify(data?.data)});
            },
            onError: (e) => {
                toast.show({title: e.message});
            }
        }
    );
}

export function useRegister() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        ({email, password}) => axiosInstance.post("/users.json", { user: {email, password}}),
        {
            onSuccess: async (data) => {
                const token = data.headers.authorization;
                await SecureStore.setItemAsync(TOKEN_QUERY_KEY, token);

                queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
                queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);

                toast.show({title: "Register Success"});
            },
            onError: (e) => {
                toast.show({title: e.message});
            }
        }
    );
}

export function useFetchUser() {
    const token = useToken(); //grabs token value from local value and stores it in this variable

    return useQuery(
        [FETCH_USER_QUERY_KEY, token],
        () => 
            axiosInstance.post("/users/sign_in.json", null, { 
                headers: {authorization: token},
            }), 
        {
            enabled: !!token,
            staleTime: Infinity,
            cacheTime: Infinity,
            select: (data) => data?.data,
        }
    );
}

export function useLogout() {
    const token = useToken();
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        () => 
        axiosInstance.delete("/users/sign_out.json", null, { 
            headers: {authorization: token},
        }), //sign out the user with this token
        {
            onSuccess: async (data) => {
                await SecureStore.setItemAsync(TOKEN_QUERY_KEY, ""); //on success set the token to blank (quotes)

                queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
                queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);

                toast.show({title: "Logout Successful"});
            },
            onError: (e) => {
                toast.show({title: e.message});
            }
        }
    );
}