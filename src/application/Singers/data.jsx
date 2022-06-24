// 用hook 模仿一个redux
import { createContext, useReducer } from "react"
import { fromJS } from "immutable"

// 1.创建一个context

export const CategoryDataContext = createContext({})

// 2. 定义action的type
export const CHANGE_CATEGORY = "singers/CHANGE_CATEGORY"

export const CHANGE_ALPHA = "singers/CHANGE_ALPHA"

// 3.写reducer函数

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set("category", action.data)
    case CHANGE_ALPHA:
      return state.set("alpha", action.data)
    default:
      return state
  }
}

//Provider 组件

export const Data = (props) => {
  // useReducer 第二个值传入初始值
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: "",
      alpha: "",
    })
  )
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  )
}
