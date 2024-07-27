import React from 'react';
import {MainStack} from './navigation/Main';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
