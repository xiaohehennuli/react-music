import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import Scroll from "../scroll/index"
import style from "../../assets/global-style"
// 由于基础组件样式较少，直接写在 index.js 中
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizon(props) {
  const Category = useRef(null)
  const { list, oldVal, title, handleClick } = props

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current
    let tagElems = categoryDOM.querySelectorAll("span")
    let totalWidth = 0
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])

  return (
    <>
      <Scroll direction={"horizontal"}>
        <div ref={Category}>
          <List>
            <span>{title}</span>
            {list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? "selected" : ""}`}
                  onClick={() => handleClick(item.key)}
                >
                  {item.name}
                </ListItem>
              )
            })}
          </List>
        </div>
      </Scroll>
    </>
  )
}

Horizon.defaultProps = {
  // 横向滚动的列表
  list: [],
  // 当前选中的元素
  oldVal: "",
  // 列表左边的标题
  title: "",
  // 点击列表元素的参数的回调函数
  handleClick: null,
}

export default React.memo(Horizon)
