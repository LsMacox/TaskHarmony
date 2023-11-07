export default [
  {
    title: 'Workflows',
    icon: { icon: 'tabler-tornado' },
    to: { name: 'workflows' },
    subject: 'UserWorkflow',
    action: 'viewAny',
  },
  {
    title: 'Groups',
    icon: { icon: 'tabler-box-multiple' },
    to: { name: 'groups' },
    subject: 'UserGroup',
    action: 'create',
  },
  {
    title: 'Archive',
    icon: { icon: 'tabler-archive' },
    to: { name: 'archive' },
    subject: 'UserArchive',
    action: 'view',
  },
]
