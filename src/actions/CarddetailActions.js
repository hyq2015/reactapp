import Reflux from 'reflux';
let CarddetailActions = Reflux.createActions({
    'loadData':{asyncResult:true},
    'updateCount':{asyncResult:true},
    'checkCardUsed':{asyncResult:true}
});

export default CarddetailActions