import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const Register = () => import('@/views/Register')
const Login = () => import('@/views/Login')
const UserInfo = () => import('@/views/UserInfo')
const Edit = () => import('@/views/Edit')
const Article = () => import('@/views/Article')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        meta:{
            keepalive:true
        }
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/userinfo',
        component: UserInfo,
        meta:{
            istoken:true
        }
    },
    {
        path: '/edit',
        component: Edit,
        meta:{
            istoken:true
        }
    },
    {
        path: '/article/:id',
        component: Article
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router

router.beforeEach((to,from,next) => {
    if(!localStorage.getItem('id')
     && !localStorage.getItem('token')
     && to.meta.istoken
     ){
        router.push('/login')
    }else{
        next()
    }
    
})