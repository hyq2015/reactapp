import Reflux from 'reflux';
let MyorderActions = Reflux.createActions({
    'init':{},
    'loadData':{asyncResult:true},
    'deleteOrder':{asyncResult:true}
});

export default MyorderActions