import Reflux from 'reflux';
let AddresslistActions = Reflux.createActions({
  'getList':{asyncResult:true},
  'deleteDialogShow':{asyncResult:true},
  'deleteAddress':{asyncResult:true}
  
});

export default AddresslistActions