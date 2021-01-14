import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {route} from './config/route';
import {Issues} from './pages/issues';

type Props = Record<string, unknown>;

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Switch>
          <Route exact path={route.issues} component={Issues} />
          <Route render={() => <Redirect to={route.issues} />} />
        </Switch>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
