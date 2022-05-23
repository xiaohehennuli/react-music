import React from 'react';
import {IconStyle} from "../src/assets/iconfont/iconfont"
import { GlobalStyle } from './style';

function App () {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;