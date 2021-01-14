import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {route} from './config/route';
import {Issues} from './pages/issues';

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={route.issues} component={Issues} />
        <Route render={() => <Redirect to={route.issues} />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
