/**
 * Created by admin on 2017/4/4.
 */
import {createStore,compose,applyMiddleware} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import DevTools from './Devtool';

const finalCreateStore=compose(
  applyMiddleware(ThunkMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  // const store=finalCreateStore(reducer,initialState);
  const store = finalCreateStore(rootReducer, initialState);
  return store;
}
