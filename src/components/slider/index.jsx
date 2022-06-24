/*
 * @Description: **轮播组件**
 * @Author: henanjie
 * @Date: 2022-6-10 09:00:00
 * @LastEditTime: 2022-6-10 09:00:00
 */
import React, { useEffect, useState } from "react"
import "swiper/dist/css/swiper.css"
import Swiper from "swiper"
import { SliderContainer } from "./style"

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  // 获取轮播图片数据
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const newSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination" },
      })
      setSliderSwiper(newSwiper)
    }
  }, [bannerList.length, sliderSwiper])
  return (
    <>
      <SliderContainer>
        <div className="before"></div>
        <div className="slider-container">
          <div className="swiper-wrapper">
            {bannerList.map((slider) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img
                      src={slider.imageUrl}
                      width="100%"
                      height="100%"
                      alt="推荐"
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </SliderContainer>
    </>
  )
}

export default React.memo(Slider)
