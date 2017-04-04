/**
 * Created by admin on 2017/4/4.
 */
export const LOAD_ARTICLES='LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS='LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_ERROR='LOAD_ARTICLES_ERROR';
export function loadArticles() {
  return{
    type:LOAD_ARTICLES
  }
}
export function Load() {
  return (dispatch, getState) => {
    
    //获取state对象中的counter属性值
    const { counter } = getState();
    //偶数则返回
    // if (counter % 2 === 0) {
    //   return
    // }
    //没有返回就执行加一
    dispatch(loadArticles())
  }
}
