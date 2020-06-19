import shortid from 'shortid';
import layout from '@/views/_layout/default';
const demo = r => require.ensure([], () => r(require('@/views/demo/index.vue')), 'demo');
const list = r => require.ensure([], () => r(require('@/views/demo/list.vue')), 'demo');

export default {
  name: '权限管理',
  path: '/',
  component: layout,
  meta: {
    key: shortid.generate()
  },
  children: [
    {name: 'demo', path: '/demo', component: demo, meta: { uid: util.generate('/demo') }},
    {name: 'demo_list', path: '/demo/list', component: list, meta: { uid: util.generate('/demo/list') }}
  ]
};
