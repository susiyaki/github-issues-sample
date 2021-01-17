import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Header} from '@components/organisms';
import {Issues} from '@pages/issues';
import {Issue} from '@pages/issues/_number';

type Props = Record<string, unknown>;

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/issues/:number" component={Issue} />
          <Route exact path="/issues" component={Issues} />
          <Route render={() => <Redirect to="/issues" />} />
        </Switch>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
