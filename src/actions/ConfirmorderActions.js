import Reflux from 'reflux';
let ConfirmorderActions = Reflux.createActions({
    'loadData':{asyncResult:true},
    'checkAddress':{asyncResult:true},
    'createOrder':{asyncResult:true}

});

export default ConfirmorderActions