import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const artInfo = r => require.ensure([], () => r(require('../page/artInfo/artInfo')), 'artInfo');
const editArt = r => require.ensure([], () => r(require('../page/editArt/editArt')), 'editArt');
const useCenter = r => require.ensure([], () => r(require('../page/useCenter/useCenter')), 'useCenter');
const aboutMeArt = r => require.ensure([], () => r(require('../page/useCenter/aboutMeArt')), 'aboutMeArt');
const joinArt = r => require.ensure([], () => r(require('../page/useCenter/joinArt')), 'joinArt');
const myCollect = r => require.ensure([], () => r(require('../page/useCenter/myCollect')), 'myCollect');
const myNew = r => require.ensure([], () => r(require('../page/useCenter/myNew')), 'myNew');

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //文章详情
    {
      path: '/artInfo',
      component: artInfo
    },
    //新建文章
    {
      path: '/editArt',
      component: editArt
    },
      //登录
    {
      path: '/login',
      component: login
    },
    //个人中心
    {
      path: 'useCenter',
      component: useCenter,
    },
    {
      path: 'aboutMeArt',
      component: aboutMeArt
    },
    {
      path: 'joinArt',
      component: joinArt
    },
    {
      path: 'myCollect',
      component: myCollect
    },
    {
      path: 'myNew',
      component: myNew
    }


  ]
}]