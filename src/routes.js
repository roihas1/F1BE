

const routes = [
    {
        path: '/',
        name:'main',
        component: () => import('./pages/HomePage.vue')
    },
    {
        path:'/drivers',
        name:'drivers',
        component: () => import('./pages/DriverPage.vue')
    },
    {
        path:'/driverInfo/:driver',
        name:'driver',
        component: () => import('./pages/DriverInfo.vue'),
        props:true,
    },
]

export default routes;