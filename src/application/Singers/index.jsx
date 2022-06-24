import React, { useEffect, useContext } from "react"
import Horizon from "../../baseUI/horizon-item"
import { categoryTypes, alphaTypes } from "../../api/config"
import { NavContainer, ListContainer, List, ListItem } from "./style"
import Loading from "../../baseUI/loading"
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators"
import Scroll from "./../../baseUI/scroll/index"
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from "./data"
import { connect } from "react-redux"
import LazyLoad, { forceCheck } from "react-lazyload"

function Singers(props) {
  const {
    getHotSingerDispatch,
    updateDispatch,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
    pageCount,
  } = props

  const { singerList } = props

  const singerListJs = singerList ? singerList.toJS() : []

  // 首先需要引入 useContext
  // 将之前的 useState 代码删除
  const { data, dispatch } = useContext(CategoryDataContext)
  // 拿到 category 和 alpha 的值
  const { category, alpha } = data.toJS()

  useEffect(() => {
    // 如果有数据就不发请求
    if (!singerList.size) {
      //TODO: 获取歌手数据
      getHotSingerDispatch()
    }
    //eslint-disable-next-line
  }, [])

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerListJs.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./singer.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  let handleUpdateAlpha = (val) => {
    dispatch({ type: CHANGE_ALPHA, data: val })
    updateDispatch(category, val)
  }

  let handleUpdateCatetory = (val) => {
    dispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"首字母:"}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {enterLoading ? <Loading></Loading> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)) //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)) //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0)) //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
