import shortid from 'shortid';
import layout from '@/views/_layout/default';
const f403 = r => require.ensure([], () => r(require('@/views/_layout/403.vue')), '403');

export default {
  name: '权限管理',
  path: '/',
  component: layout,
  meta: {
    key: shortid.generate()
  },
  children: [{name: 'f403', path: '/f403', component: f403, meta: { uid: util.generate('/f403') }}]
};
