export default [
  { heading: 'Apps & Pages' },
  {
    title: 'Ecommerce',
    icon: { icon: 'tabler-shopping-cart-plus' },
    children: [
      {
        title: 'Dashboard',
        to: 'ui-apps-ecommerce-dashboard',
      },
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
          { title: 'List', to: 'ui-apps-ecommerce-customer-list' },
          { title: 'Details', to: { name: 'ui-apps-ecommerce-customer-details-id', params: { id: 478426 } } },
        ],
      },
      {
        title: 'Manage Review',
        to: 'ui-apps-ecommerce-manage-review',
      },
      {
        title: 'Referrals',
        to: 'ui-apps-ecommerce-referrals',
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
    icon: { icon: 'tabler-calendar' },
    to: 'ui-apps-calendar',
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
  {
    title: 'Pages',
    icon: { icon: 'tabler-file' },
    children: [
      { title: 'User Profile', to: { name: 'ui-pages-user-profile-tab', params: { tab: 'profile' } } },
      { title: 'Account Settings', to: { name: 'ui-pages-account-settings-tab', params: { tab: 'account' } } },
      { title: 'Pricing', to: 'ui-pages-pricing' },
      { title: 'FAQ', to: 'ui-pages-faq' },
      {
        title: 'Miscellaneous',
        children: [
          { title: 'Coming Soon', to: 'ui-pages-misc-coming-soon', target: '_blank' },
          { title: 'Under Maintenance', to: 'ui-pages-misc-under-maintenance', target: '_blank' },
          { title: 'Page Not Found - 404', to: { path: '/pages/ui/misc/not-found' }, target: '_blank' },
          { title: 'Not Authorized - 401', to: { path: '/pages/ui/misc/not-authorized' }, target: '_blank' },
        ],
      },
    ],
  },
  {
    title: 'Authentication',
    icon: { icon: 'tabler-lock' },
    children: [
      {
        title: 'Login',
        children: [
          { title: 'Login v1', to: 'ui-pages-authentication-login-v1', target: '_blank' },
          { title: 'Login v2', to: 'ui-pages-authentication-login-v2', target: '_blank' },
        ],
      },
      {
        title: 'Register',
        children: [
          { title: 'Register v1', to: 'ui-pages-authentication-register-v1', target: '_blank' },
          { title: 'Register v2', to: 'ui-pages-authentication-register-v2', target: '_blank' },
          { title: 'Register Multi-Steps', to: 'ui-pages-authentication-register-multi-steps', target: '_blank' },
        ],
      },
      {
        title: 'Verify Email',
        children: [
          { title: 'Verify Email v1', to: 'ui-pages-authentication-verify-email-v1', target: '_blank' },
          { title: 'Verify Email v2', to: 'ui-pages-authentication-verify-email-v2', target: '_blank' },
        ],
      },
      {
        title: 'Forgot Password',
        children: [
          { title: 'Forgot Password v1', to: 'ui-pages-authentication-forgot-password-v1', target: '_blank' },
          { title: 'Forgot Password v2', to: 'ui-pages-authentication-forgot-password-v2', target: '_blank' },
        ],
      },
      {
        title: 'Reset Password',
        children: [
          { title: 'Reset Password v1', to: 'ui-pages-authentication-reset-password-v1', target: '_blank' },
          { title: 'Reset Password v2', to: 'ui-pages-authentication-reset-password-v2', target: '_blank' },
        ],
      },
      {
        title: 'Two Steps',
        children: [
          { title: 'Two Steps v1', to: 'ui-pages-authentication-two-steps-v1', target: '_blank' },
          { title: 'Two Steps v2', to: 'ui-pages-authentication-two-steps-v2', target: '_blank' },
        ],
      },
    ],
  },
  {
    title: 'Wizard Examples',
    icon: { icon: 'tabler-forms' },
    children: [
      { title: 'Checkout', to: { name: 'ui-wizard-examples-checkout' } },
      { title: 'Property Listing', to: { name: 'ui-wizard-examples-property-listing' } },
      { title: 'Create Deal', to: { name: 'ui-wizard-examples-create-deal' } },
    ],
  },
  {
    title: 'Dialog Examples',
    icon: { icon: 'tabler-square' },
    to: 'ui-pages-dialog-examples',
  },
]
