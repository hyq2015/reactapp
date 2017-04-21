import React,{Component} from 'react';
import '../static/styles/searchopage.less';
import CONFIG from '../static/js/request';
import MallSearchbar from './MallSearchbar';
import RecentSearch from './RecentSearch';
import _ from 'lodash';
import 'babel-polyfill';
import SearchpageActions from '../actions/SearchpageActions';
import SearchpageStore from '../stores/SearchpageStore';
import AppActions from '../actions/AppActions';
export default class Searchpage extends Component{
    constructor(props){
        super(props);
        this.state={
            hotSearchKeys:[]
        }
        this._loadHotSearch=this._loadHotSearch.bind(this);
    }
    componentWillMount(){
        AppActions.disableLoading();
    }
    componentDidMount(){
        console.log(this.props.location);
        this.unsubscribe = SearchpageStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        this._loadHotSearch();
        // this._loadData(this.props.location.query.id)
        // setTimeout(function(){
        //     AppActions.loaded();
        // },1000)
        
    }
    _loadHotSearch(){
        if(window.sessionStorage.hotSearchKeys){
            this.setState({
                hotSearchKeys:JSON.parse(window.sessionStorage.hotSearchKeys)
            })
        }else{
            SearchpageActions.loadHotFromServer();
        }
    }
    render(){
        return(
            <div id="searchContainer">
                <MallSearchbar canInput={true}/>
                <RecentSearch hotsearch={this.state.hotSearchKeys}/>
            </div>
        )
    }
}