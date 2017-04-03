/**
 * Created by admin on 2017/4/2.
 */
import React from 'react';
import Reflux from 'reflux';
import reactMixin from 'react-mixin';
import ListStore from '../stores/ListStore';
import _ from 'lodash';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      list:'ricky'
    };
  }

  render() {
    var t = this;
    var data = t.state.list;
    return (<div>
      {data}
    </div>);
  }
}
reactMixin.onClass(Demo, Reflux.connect(ListStore));
