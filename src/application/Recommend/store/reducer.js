// 存放reducer 函数，和初始化state
import * as actionTypes from "./constants"
import { fromJS } from "immutable"

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
})

const recommendActionFunction = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set("bannerList", action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.data)
    default:
      return state
  }
}

export default recommendActionFunction
