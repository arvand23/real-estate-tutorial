import {useQuery} from 'react-query';
import * as SecureStore from 'expo-secure-store';

export const TOKEN_QUERY_KEY = "token";

export default function useToken() {
    const {data: token} = useQuery(
        TOKEN_QUERY_KEY,
        () => SecureStore.getItemAsync(TOKEN_QUERY_KEY),
        {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    );

    return token;
}