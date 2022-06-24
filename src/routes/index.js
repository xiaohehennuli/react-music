import React from 'react';
import {Redirect} from 'react-router-dom'
import Home from "../application/Home"
import Recommend from "../application/Recommend"
import Singers from "../application/Singers"
import Rank from "../application/Rank"


const routes = [
    {
        path:'/',
        component:Home,
        routes:[
            {
                path:'/',
                exact:true,//是否严格匹配
                render:() => (
                    <Redirect to={"/recommend"}></Redirect>
                )
            },
            {
                path:'/recommend',
                component:Recommend
            },
            {
                path:'/singers',
                component:Singers
            },
            {
                path:'/rank',
                component:Rank
            }
        ]
    }
]


export default routes


