export default [
  {
    title: 'Apps',
    icon: { icon: 'tabler-layout-grid-add' },
    children: [
      {
        title: 'Ecommerce',
        icon: { icon: 'tabler-shopping-cart-plus' },
        children: [
          {
            title: 'Product',
            children: [
              { title: 'List', to: 'ui-apps-ecommerce-product-list' },
              { title: 'Add', to: 'ui-apps-ecommerce-product-add' },
              { title: 'Category', to: 'ui-apps-ecommerce-product-category-list' },
            ],
          },
          {
            title: 'Order',
            children: [
              { title: 'List', to: 'ui-apps-ecommerce-order-list' },
              { title: 'Details', to: { name: 'ui-apps-ecommerce-order-details-id', params: { id: '9042' } } },
            ],
          },
          {
            title: 'Customer',
            children: [
              {
                title: 'List',
                to: 'ui-apps-ecommerce-customer-list',
              },
            ],
          },
          {
            title: 'Settings',
            to: 'ui-apps-ecommerce-settings',
          },
        ],
      },
      {
        title: 'Academy',
        icon: { icon: 'tabler-book' },
        children: [
          { title: 'Dashboard', to: 'ui-apps-academy-dashboard' },
          { title: 'My Course', to: 'ui-apps-academy-my-course' },
          { title: 'Course Details', to: 'ui-apps-academy-course-details' },
        ],
      },
      {
        title: 'Logistics',
        icon: { icon: 'tabler-truck' },
        children: [
          { title: 'Dashboard', to: 'ui-apps-logistics-dashboard' },
          { title: 'Fleet', to: 'ui-apps-logistics-fleet' },
        ],
      },
      {
        title: 'Email',
        icon: { icon: 'tabler-mail' },
        to: 'ui-apps-email',
      },
      {
        title: 'Chat',
        icon: { icon: 'tabler-message-circle' },
        to: 'ui-apps-chat',
      },
      {
        title: 'Calendar',
        to: 'ui-apps-calendar',
        icon: { icon: 'tabler-calendar' },
      },
      {
        title: 'Invoice',
        icon: { icon: 'tabler-file-dollar' },
        children: [
          { title: 'List', to: 'ui-apps-invoice-list' },
          { title: 'Preview', to: { name: 'ui-apps-invoice-preview-id', params: { id: '5036' } } },
          { title: 'Edit', to: { name: 'ui-apps-invoice-edit-id', params: { id: '5036' } } },
          { title: 'Add', to: 'ui-apps-invoice-add' },
        ],
      },
      {
        title: 'User',
        icon: { icon: 'tabler-users' },
        children: [
          { title: 'List', to: 'ui-apps-user-list' },
          { title: 'View', to: { name: 'ui-apps-user-view-id', params: { id: 21 } } },
        ],
      },
      {
        title: 'Roles & Permissions',
        icon: { icon: 'tabler-settings' },
        children: [
          { title: 'Roles', to: 'ui-apps-roles' },
          { title: 'Permissions', to: 'ui-apps-permissions' },
        ],
      },
    ],
  },
]
