import React, {Component, PropTypes} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux';


@connect(
  (state, ownProps)=>({}),
  {}
)
export default class App extends Component {

  componentWillMount() {
  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(props) {
  }

  static propTypes = {
  };

  render() {
    return (
      <div>
        Home page
      </div>
    );
  }
}
