import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/HomePage';
import ThreeTest from './components/ThreeTest';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ThreeTest}/>
    {/*<Route path="*" component={ NotFound } status={ 404 }/>*/}
  </Route>
);
