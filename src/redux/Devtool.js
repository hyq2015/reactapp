/**
 * Created by admin on 2017/4/4.
 */
import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
const DevTools=createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-k'
               changePositionKey='ctrl-q'
  >
    <LogMonitor theme='tomorrow'/>
  </DockMonitor>
);
export default DevTools;
