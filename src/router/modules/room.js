// 系统设置的路由配置
/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'

const roomRouter = {
  path: '/room',
  component: Layout,
  redirect: 'noredirect',
  name: 'room',
  meta: {
    title: '机房建设',
    icon: 'nested'
  },
  children: [
    {
      path: 'room',
      name: 'room',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '机房管理' }
    },
    {
      path: 'deviceType',
      name: 'deviceType',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '设备类型' }
    },
    {
      path: 'device',
      name: 'device',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '设备管理' }
    }
  ]
}

export default roomRouter
