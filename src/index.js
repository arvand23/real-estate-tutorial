import React from 'react';
import AppNavigation from './AppNavigation';
import { NativeBaseProvider, extendTheme} from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = extendTheme ({
   components: {
    Button: {
        defaultProps: { colorScheme: "rose", size: "lg"},
    },
    Input: {
        defaultProps: {
            size: "lg",
            bg: "white",
            p: "3", //padding
            borderwidth: 0,
            _focus: {
                borderWidth: 1, bordercolor: "rose.400", bg: "white"
            },
        },
    },
   }, 
});

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={theme}>
                <AppNavigation/>
            </NativeBaseProvider>
        </QueryClientProvider>
    );
}