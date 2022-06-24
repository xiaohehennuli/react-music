import React from "react"
import { Provider } from "react-redux"
import { IconStyle } from "./assets/iconfont/iconfont"
import { GlobalStyle } from "./style"
import { renderRoutes } from "react-router-config" //renderRoutes 可以读取路由配置
import routes from "./routes/index"
import store from "./store/index"
import { Data } from "./application/Singers/data"
import { HashRouter } from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  )
}

export default App
