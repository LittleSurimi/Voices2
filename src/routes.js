import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/HomePage';
import ThreeTest from './components/ThreeTest/ThreeTest';
import AudioTest from './components/AudioTest/AudioTest';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ThreeTest}/>
    <Route component={AudioTest} path="AudioTest"/>
    {/*<Route path="*" component={ NotFound } status={ 404 }/>*/}
  </Route>


);
