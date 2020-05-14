import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/',
    redirect: '/index',
  },

  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index'),
    meta: {
      title: 'financial manager',
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录',
    }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index'),
    meta: {
      title: '注册',
    }
  },

  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index'),
    redirect: '/home/portal',
    children: [
      {
        path: '/home/portal',
        name: 'home-portal',
        component: () => import('@/views/home/portal'),
        meta: {
          title: 'home',
        }
      },
      {
        path: '/home/data',
        name: 'data',
        component: () => import('@/views/home/data'),
        meta: {
          title: '数据统计',
        }
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import('@/views/plan/index'),
        redirect: '/plan/list',
        children: [
          {
            path: 'list',
            name: 'plan-list',
            component: () => import('@/views/plan/list'),
            meta: {
              title: '计划列表',
            }
          },
          {
            path: 'create',
            name: 'plan-create',
            component: () => import('@/views/plan/create'),
            meta: {
              title: '创建计划',
            }
          },
          {
            path: 'info/:id',
            name: 'plan-info',
            component: () => import('@/views/plan/info'),
            meta: {
              title: '计划详情',
            }
          },
          {
            path: 'update/:id',
            name: 'plan-update',
            component: () => import('@/views/plan/update'),
            meta: {
              title: '更新计划',
            }
          },
        ]
      },
      {
        path: '/financial/create',
        name: 'financial-create',
        component: () => import('@/views/financial/create'),
        meta: {
          title: '创建',
        }
      },
      {
        path: '/deal/create',
        name: 'deal-create',
        component: () => import('@/views/financial/deal/create'),
        meta: {
          title: '交易信息创建',
        }
      },
      {
        path: '/deal/group/create',
        name: 'group-create',
        component: () => import('@/views/financial/deal-group/create'),
        meta: {
          title: '交易组创建',
        }
      },
      {
        path: '/financial/show',
        name: 'financial-show',
        component: () => import('@/views/financial/show/index'),
        redirect: '/financial/show/portal',
        children: [
          {
            path: 'portal',
            name: 'financial-show-portal',
            component: () => import('@/views/financial/show/default'),
            meta: {
              title: '信息',
            },
          },
          {
            path: '/deal/list',
            name: 'deal-list',
            component: () => import('@/views/financial/deal/list'),
            meta: {
              title: '交易信息',
            },
          },
          {
            path: '/deal/group/list',
            name: 'deal-group-list',
            component: () => import('@/views/financial/deal-group/list'),
            meta: {
              title: '交易组列表',
            },
          },
        ]
      },
      {
        path: '/family',
        name: 'family',
        component: () => import('@/views/family/info/index'),
        redirect: '/family/portal',
        children: [
          {
            path: 'portal',
            name: 'family-portal',
            component: () => import('@/views/family/info/portal'),
            meta: {
              title: '我的家庭',
            }
          },
          {
            path: 'create',
            name: 'family-create',
            component: () => import('@/views/family/create'),
            meta: {
              title: '创建家庭',
            },
          },
          {
            path: 'info',
            name: 'family-info',
            component: () => import('@/views/family/info/info'),
            meta: {
              title: '家庭信息',
            },
          },
          {
            path: 'deals',
            name: 'family-deals',
            component: () => import('@/views/family/info/deals'),
            meta: {
              title: '所有交易记录',
            },
          },
          {
            path: 'plans',
            name: 'family-plans',
            component: () => import('@/views/family/info/plans'),
            meta: {
              title: '所有计划信息',
            },
          },
          {
            path: 'update',
            name: 'family-update',
            component: () => import('@/views/family/update'),
            meta: {
              title: '家庭更新',
            },
          },
          {
            path: 'delete',
            name: 'family-delete',
            component: () => import('@/views/family/delete'),
            meta: {
              title: '家庭解散',
            },
          },
          {
            path: 'exit',
            name: 'family-exit',
            component: () => import('@/views/family/exit'),
            meta: {
              title: '退出家庭',
            },
          },
          {
            path: 'join',
            name: 'family-join',
            component: () => import('@/views/family/join'),
            meta: {
              title: '加入家庭',
            },
          },
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user/index'),
        redirect: '/profile/info',
        children: [
          {
            path: 'info',
            name: 'profile-info',
            component: () => import('@/views/user/info'),
            meta: {
              title: '个人信息'
            }
          },
          {
            path: 'update',
            name: 'profile-update',
            component: () => import('@/views/user/update'),
            meta: {
              title: '修改个人信息'
            }
          },
          {
            path: 'password',
            name: 'profile-password',
            component: () => import('@/views/user/updatePassword'),
            meta: {
              title: '修改密码'
            }
          },
        ]
      },
    ]
  },

  {
    path: '/404',
    name: 'not-fount',
    component: () => import('@/views/404'),
    meta: {
      title: 'not fount',
    }
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
];

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

export default router
