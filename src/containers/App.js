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
    children: PropTypes.element
  };

  render() {
    return (
      <div>
        <div style={{height: 800, width: 600}}>
          {/* Content goes here*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}
