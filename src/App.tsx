import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.css';

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <div>sample</div>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
