import React from 'react';
import MainStackNavigator from '../navigation/MainStackNavigator';
import {ContextProvider} from '../data/store/Context';

function App(): React.JSX.Element {
  return (
    <>
      <AppState>
        <MainStackNavigator />
      </AppState>
    </>
  );
}

const AppState = ({children}: any) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default App;
