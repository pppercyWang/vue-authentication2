import _ from 'lodash'
export const dynamicRoutes = {
    'routes': [{
            path: '/user',
            component: () => import('@/views/Layout.vue'),
            name: '用户管理',
            redirect: '/user/index',
            icon: 'el-icon-user-solid',
            children: [{
                    path: 'index',
                    component: () => import('@/views/user/Index.vue'),
                    name: '用户列表',
                    meta: {
                        roles: ['super_admin', 'admin']
                    },
                },
                {
                    path: 'detail',
                    component: () => import('@/views/user/UserDetail.vue'),
                    name: '用户详情',
                    meta: {
                        roles: ['super_admin']
                    },
                },
            ]
        },
        {
            path: '/ip',
            component: () => import('@/views/Layout.vue'),
            name: 'IP管理',
            redirect: '/ip/index',
            icon: 'el-icon-s-promotion',
            children: [{
                path: 'index',
                component: () => import('@/views/ip/Index.vue'),
                name: 'IP列表',
                meta: {
                    roles: ['super_admin', 'admin', 'ip_admin']
                },
            }, ]
        },
        {
            path: '/bill',
            component: () => import('@/views/Layout.vue'),
            name: '财务管理',
            redirect: '/bill/index',
            icon: 'el-icon-s-order',
            children: [{
                path: 'index',
                component: () => import('@/views/bill/Index.vue'),
                name: '账单列表',
                meta: {
                    roles: ['admin', 'super_admin']
                },
            }, ]
        },
        {
            path: '/auth',
            component: () => import('@/views/Layout.vue'),
            name: '权限管理',
            redirect: '/auth/index',
            icon: 'el-icon-s-platform',
            children: [{
                    path: 'index',
                    component: () => import('@/views/auth/Index.vue'),
                    name: '角色列表',
                    meta: {
                        roles: ['super_admin']
                    },
                },
                {
                    path: 'menu',
                    component: () => import('@/views/auth/Menu.vue'),
                    name: '菜单管理',
                    meta: {
                        roles: ['super_admin']
                    },
                },
            ]
        },
    ],
    '404': {
        path: "*",
        component: () => import('@/views/404.vue'),
    }
}
export function generateRoutes(role, commit) {
    let routes = _.cloneDeep(dynamicRoutes['routes']);
    routes.forEach(route => {
        if (route.children && route.children.length !== 0) {
            route.children = route.children.filter(each => {
                if (!each.meta || !each.meta.roles) {
                    return true
                }
                return each.meta.roles.includes(role) === true
            })
        }
    });
    commit('SET_MENU_DATA', routes.filter(route => route.children && route.children.length !== 0)) // 菜单数据是不需要404的
    return new Array(...routes, dynamicRoutes['404'])
}


export function authentication(to, from, next, store, router) {
    let token = sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next({
            path: '/login'
        })
        return
    }
    const isAuth = sessionStorage.getItem('isAuthentication')
    if (!isAuth || isAuth === '0') {
        store.dispatch('getValidRoutes', JSON.parse(sessionStorage.getItem('user')).role).then(validRoutes => {
            router.addRoutes(validRoutes)
            sessionStorage.setItem('isAuthentication', '1')
        })
    }
    next();
}