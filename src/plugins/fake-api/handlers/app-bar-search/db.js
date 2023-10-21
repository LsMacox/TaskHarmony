export const db = {
  searchItems: [
    {
      title: 'Dashboards',
      category: 'dashboards',
      children: [
        {
          url: { name: 'ui-dashboards-analytics' },
          icon: 'tabler-timeline',
          title: 'Analytics Dashboard',
        },
        {
          url: { name: 'ui-dashboards-crm' },
          icon: 'tabler-file-analytics',
          title: 'CRM Dashboard',
        },
        {
          url: { name: 'ui-dashboards-ecommerce' },
          icon: 'tabler-shopping-cart',
          title: 'ECommerce Dashboard',
        },
        {
          url: { name: 'ui-dashboards-academy' },
          icon: 'tabler-book',
          title: 'Academy Dashboard',
        },
        {
          url: { name: 'ui-dashboards-logistics' },
          icon: 'tabler-truck',
          title: 'Logistics Dashboard',
        },
      ],
    },
    {
      title: 'Front Pages',
      category: 'frontPages',
      children: [
        {
          url: { name: 'ui-front-pages-landing-page' },
          icon: 'tabler-file-description',
          title: 'Landing Front',
        },
        {
          url: { name: 'ui-front-pages-pricing' },
          icon: 'tabler-file-description',
          title: 'Pricing Front',
        },
        {
          url: { name: 'ui-front-pages-payment' },
          icon: 'tabler-file-description',
          title: 'Payment Front',
        },
        {
          url: { name: 'ui-front-pages-checkout' },
          icon: 'tabler-file-description',
          title: 'Checkout Front',
        },
        {
          url: { name: 'ui-front-pages-help-center' },
          icon: 'tabler-file-description',
          title: 'Help Center Front',
        },
      ],
    },
    {
      title: 'Apps & Pages',
      category: 'appsPages',
      children: [
        {
          url: { name: 'ui-apps-email' },
          icon: 'tabler-mail',
          title: 'Email',
        },
        {
          url: { name: 'ui-apps-chat' },
          icon: 'tabler-message',
          title: 'Chat',
        },
        {
          url: { name: 'ui-apps-calendar' },
          icon: 'tabler-calendar',
          title: 'Calendar',
        },
        {
          url: { name: 'ui-apps-ecommerce-dashboard' },
          icon: 'tabler-shopping-cart',
          title: 'ECommerce Dashboard',
        },
        {
          url: { name: 'ui-apps-ecommerce-product-list' },
          icon: 'tabler-list',
          title: 'Ecommerce - Product List',
        },
        {
          url: { name: 'ui-apps-ecommerce-product-add' },
          icon: 'tabler-circle-plus',
          title: 'Ecommerce - Add Product',
        },
        {
          url: { name: 'ui-apps-ecommerce-product-category-list' },
          icon: 'tabler-list',
          title: 'Ecommerce - Category List',
        },
        {
          url: { name: 'ui-apps-ecommerce-order-list' },
          icon: 'tabler-list',
          title: 'Ecommerce - Order List',
        },
        {
          url: { name: 'ui-apps-ecommerce-order-details-id', params: { id: '9042' } },
          icon: 'tabler-list-check',
          title: 'Ecommerce - Order Details',
        },
        {
          url: { name: 'ui-apps-ecommerce-customer-list' },
          icon: 'tabler-user',
          title: 'Ecommerce - Customer List',
        },
        {
          url: { name: 'ui-apps-ecommerce-customer-details-id', params: { id: '478426', tab: 'security' } },
          icon: 'tabler-list',
          title: 'Ecommerce - Customer Details',
        },
        {
          url: { name: 'ui-apps-ecommerce-manage-review' },
          icon: 'tabler-quote',
          title: 'Ecommerce - Manage Review',
        },
        {
          url: { name: 'ui-apps-ecommerce-referrals' },
          icon: 'tabler-users-group',
          title: 'Ecommerce - Referrals',
        },
        {
          url: { name: 'ui-apps-ecommerce-settings' },
          icon: 'tabler-settings',
          title: 'Ecommerce - Settings',
        },
        {
          url: { name: 'ui-apps-academy-dashboard' },
          icon: 'tabler-book',
          title: 'Academy - Dashboard',
        },
        {
          url: { name: 'ui-apps-academy-my-course' },
          icon: 'tabler-list',
          title: 'Academy - My Courses',
        },
        {
          url: { name: 'ui-apps-academy-course-details' },
          icon: 'tabler-list',
          title: 'Academy - Course Details',
        },
        {
          url: { name: 'ui-apps-logistics-dashboard' },
          icon: 'tabler-book',
          title: 'Logistics - Dashboard',
        },
        {
          url: { name: 'ui-apps-logistics-fleet' },
          icon: 'tabler-car',
          title: 'Logistics - fleet',
        },
        {
          url: { name: 'ui-apps-invoice-list' },
          icon: 'tabler-list',
          title: 'Invoice List',
        },
        {
          url: { name: 'ui-apps-invoice-preview-id', params: { id: '5036' } },
          icon: 'tabler-file-description',
          title: 'Invoice Preview',
        },
        {
          url: { name: 'ui-apps-invoice-edit-id', params: { id: '5036' } },
          icon: 'tabler-file-pencil',
          title: 'Invoice Edit',
        },
        {
          url: { name: 'ui-apps-invoice-add' },
          icon: 'tabler-file-plus',
          title: 'Invoice Add',
        },
        {
          url: { name: 'ui-apps-user-list' },
          icon: 'tabler-users-group',
          title: 'User List',
        },
        {
          url: { name: 'ui-apps-user-view-id', params: { id: 21 } },
          icon: 'tabler-eye',
          title: 'User View',
        },
        {
          url: { name: 'ui-pages-user-profile-tab', params: { tab: 'profile' } },
          icon: 'tabler-user-circle',
          title: 'User Profile - Profile',
        },
        {
          url: { name: 'ui-pages-account-settings-tab', params: { tab: 'account' } },
          icon: 'tabler-user-circle',
          title: 'Account Settings - Account',
        },
        {
          url: { name: 'ui-pages-account-settings-tab', params: { tab: 'security' } },
          icon: 'tabler-lock-open',
          title: 'Account Settings - Security',
        },
        {
          url: { name: 'ui-pages-account-settings-tab', params: { tab: 'billing-plans' } },
          icon: 'tabler-currency-dollar',
          title: 'Account Settings - Billing',
        },
        {
          url: { name: 'ui-pages-account-settings-tab', params: { tab: 'notification' } },
          icon: 'tabler-bell',
          title: 'Account Settings - Notifications',
        },
        {
          url: { name: 'ui-pages-account-settings-tab', params: { tab: 'connection' } },
          icon: 'tabler-link',
          title: 'Account Settings - Connections',
        },
        {
          url: { name: 'ui-pages-pricing' },
          icon: 'tabler-currency-dollar',
          title: 'Pricing',
        },
        {
          url: { name: 'ui-pages-faq' },
          icon: 'tabler-help-circle',
          title: 'FAQ',
        },
        {
          url: { name: 'ui-pages-misc-coming-soon' },
          icon: 'tabler-clock',
          title: 'Coming Soon',
        },
        {
          url: { name: 'ui-pages-misc-under-maintenance' },
          icon: 'tabler-settings',
          title: 'Under Maintenance',
        },
        {
          url: { path: '/pages/ui/misc/page-not-found' },
          icon: 'tabler-alert-circle',
          title: 'Page Not Found - 404',
        },
        {
          url: { name: 'ui-pages-misc-not-authorized' },
          icon: 'tabler-user-x',
          title: 'Not Authorized - 401',
        },
        {
          url: { name: 'ui-pages-authentication-login-v1' },
          icon: 'tabler-login',
          title: 'Login V1',
        },
        {
          url: { name: 'ui-pages-authentication-login-v2' },
          icon: 'tabler-login',
          title: 'Login V2',
        },
        {
          url: { name: 'ui-pages-authentication-register-v1' },
          icon: 'tabler-user-plus',
          title: 'Register V1',
        },
        {
          url: { name: 'ui-pages-authentication-register-v2' },
          icon: 'tabler-user-plus',
          title: 'Register V2',
        },
        {
          icon: 'tabler-mail',
          title: 'Verify Email V1',
          url: { name: 'pages-authentication-verify-email-v1' },
        },
        {
          icon: 'tabler-mail',
          title: 'Verify Email V2',
          url: { name: 'pages-authentication-verify-email-v2' },
        },
        {
          url: { name: 'ui-pages-authentication-forgot-password-v1' },
          icon: 'tabler-lock-exclamation',
          title: 'Forgot Password V1',
        },
        {
          url: { name: 'ui-pages-authentication-forgot-password-v2' },
          icon: 'tabler-lock-exclamation',
          title: 'Forgot Password V2',
        },
        {
          url: { name: 'ui-pages-authentication-reset-password-v1' },
          icon: 'tabler-help-circle',
          title: 'Reset Password V1',
        },
        {
          url: { name: 'ui-pages-authentication-reset-password-v2' },
          icon: 'tabler-help-circle',
          title: 'Reset Password V2',
        },
        {
          icon: 'tabler-devices',
          title: 'Two Steps V1',
          url: { name: 'ui-pages-authentication-two-steps-v1' },
        },
        {
          icon: 'tabler-devices',
          title: 'Two Steps V2',
          url: { name: 'ui-pages-authentication-two-steps-v2' },
        },
        {
          url: { name: 'ui-pages-dialog-examples' },
          icon: 'tabler-square',
          title: 'Dialog Examples',
        },
        {
          url: { name: 'ui-pages-authentication-register-multi-steps' },
          icon: 'tabler-user-plus',
          title: 'Register Multi-Steps',
        },
        {
          url: { name: 'ui-wizard-examples-checkout' },
          icon: 'tabler-shopping-cart',
          title: 'Wizard - Checkout',
        },
        {
          url: { name: 'ui-wizard-examples-create-deal' },
          icon: 'tabler-gift',
          title: 'Wizard - create deal',
        },
        {
          url: { name: 'ui-wizard-examples-property-listing' },
          icon: 'tabler-home',
          title: 'Wizard - Property Listing',
        },
        {
          url: { name: 'ui-apps-roles' },
          icon: 'tabler-shield-checkered',
          title: 'Roles',
        },
        {
          url: { name: 'ui-apps-permissions' },
          icon: 'tabler-shield-checkered',
          title: 'Permissions',
        },
      ],
    },
    {
      title: 'User Interface',
      category: 'userInterface',
      children: [
        {
          url: { name: 'ui-pages-typography' },
          icon: 'tabler-letter-case',
          title: 'Typography',
        },
        {
          url: { name: 'ui-pages-icons' },
          icon: 'tabler-icons',
          title: 'Icons',
        },
        {
          url: { name: 'ui-pages-cards-card-basic' },
          icon: 'tabler-square',
          title: 'Card Basic',
        },
        {
          url: { name: 'ui-pages-cards-card-advance' },
          icon: 'tabler-square-plus',
          title: 'Card Advance',
        },
        {
          url: { name: 'ui-pages-cards-card-statistics' },
          icon: 'tabler-chart-bar',
          title: 'Card Statistics',
        },
        {
          url: { name: 'ui-pages-cards-card-widgets' },
          icon: 'tabler-chart-bar',
          title: 'Card widgets',
        },
        {
          url: { name: 'ui-pages-cards-card-gamification' },
          icon: 'tabler-id',
          title: 'Card Gamification',
        },
        {
          url: { name: 'ui-pages-cards-card-actions' },
          icon: 'tabler-square-plus',
          title: 'Card Actions',
        },
        {
          url: { name: 'ui-components-alert' },
          icon: 'tabler-alert-triangle',
          title: 'Alerts',
        },
        {
          url: { name: 'ui-components-avatar' },
          icon: 'tabler-user-circle',
          title: 'Avatars',
        },
        {
          url: { name: 'ui-components-badge' },
          icon: 'tabler-badge',
          title: 'Badges',
        },
        {
          url: { name: 'ui-components-button' },
          icon: 'tabler-circle-plus',
          title: 'Buttons',
        },
        {
          url: { name: 'ui-components-chip' },
          icon: 'tabler-square',
          title: 'Chips',
        },
        {
          url: { name: 'ui-components-dialog' },
          icon: 'tabler-square',
          title: 'Dialogs',
        },
        {
          url: { name: 'ui-components-list' },
          icon: 'tabler-list',
          title: 'List',
        },
        {
          url: { name: 'ui-components-menu' },
          icon: 'tabler-menu-2',
          title: 'Menu',
        },
        {
          url: { name: 'ui-components-pagination' },
          icon: 'tabler-skip-forward',
          title: 'Pagination',
        },
        {
          url: { name: 'ui-components-progress-circular' },
          icon: 'tabler-progress',
          title: 'Progress Circular',
        },
        {
          url: { name: 'ui-components-progress-linear' },
          icon: 'tabler-progress',
          title: 'Progress Linear',
        },
        {
          url: { name: 'ui-components-expansion-panel' },
          icon: 'tabler-align-center',
          title: 'Expansion Panel',
        },
        {
          url: { name: 'ui-components-snackbar' },
          icon: 'tabler-message-dots',
          title: 'Snackbar',
        },
        {
          url: { name: 'ui-components-tabs' },
          icon: 'tabler-app-window',
          title: 'Tabs',
        },
        {
          url: { name: 'ui-components-timeline' },
          icon: 'tabler-timeline',
          title: 'Timeline',
        },
        {
          url: { name: 'ui-components-tooltip' },
          icon: 'tabler-message-2',
          title: 'Tooltip',
        },
        {
          url: { name: 'ui-extensions-tour' },
          icon: 'tabler-box',
          title: 'Tour',
        },
        {
          url: { name: 'ui-extensions-swiper' },
          icon: 'tabler-photo',
          title: 'Swiper',
        },
      ],
    },
    {
      title: 'Forms & Tables',
      category: 'formsTables',
      children: [
        {
          url: { name: 'ui-forms-textfield' },
          icon: 'tabler-text-caption',
          title: 'TextField',
        },
        {
          url: { name: 'ui-forms-select' },
          icon: 'tabler-list-check',
          title: 'Select',
        },
        {
          url: { name: 'ui-forms-checkbox' },
          icon: 'tabler-square-check',
          title: 'Checkbox',
        },
        {
          url: { name: 'ui-forms-radio' },
          icon: 'tabler-circle-dot-filled',
          title: 'Radio',
        },
        {
          url: { name: 'ui-forms-combobox' },
          icon: 'tabler-square-check',
          title: 'Combobox',
        },
        {
          url: { name: 'ui-forms-date-time-picker' },
          icon: 'tabler-calendar',
          title: 'Date Time picker',
        },
        {
          url: { name: 'ui-forms-textarea' },
          icon: 'tabler-notes',
          title: 'Textarea',
        },
        {
          url: { name: 'ui-forms-switch' },
          icon: 'tabler-toggle-right',
          title: 'Switch',
        },
        {
          url: { name: 'ui-forms-file-input' },
          icon: 'tabler-upload',
          title: 'File Input',
        },
        {
          url: { name: 'ui-forms-editors' },
          icon: 'tabler-file-pencil',
          title: 'Editors',
        },
        {
          url: { name: 'ui-forms-rating' },
          icon: 'tabler-star',
          title: 'Form Rating',
        },
        {
          url: { name: 'ui-forms-slider' },
          icon: 'tabler-hand-move',
          title: 'Slider',
        },
        {
          url: { name: 'ui-forms-range-slider' },
          icon: 'tabler-adjustments-horizontal',
          title: 'Range Slider',
        },
        {
          url: { name: 'ui-forms-form-layouts' },
          icon: 'tabler-box',
          title: 'Form Layouts',
        },
        {
          url: { name: 'ui-forms-form-validation' },
          icon: 'tabler-circle-check',
          title: 'Form Validation',
        },
        {
          url: { name: 'ui-forms-custom-input' },
          icon: 'tabler-list-details',
          title: 'Custom Input',
        },
        {
          url: { name: 'ui-forms-autocomplete' },
          icon: 'tabler-align-left',
          title: 'Autocomplete',
        },
        {
          url: { name: 'ui-tables-data-table' },
          icon: 'tabler-table',
          title: 'Data Table',
        },
        {
          url: { name: 'ui-tables-simple-table' },
          icon: 'tabler-table',
          title: 'Simple Table',
        },
        {
          url: { name: 'ui-forms-form-wizard-numbered' },
          icon: 'tabler-align-center',
          title: 'Form Wizard Numbered',
        },
        {
          url: { name: 'ui-forms-form-wizard-icons' },
          icon: 'tabler-align-center',
          title: 'Form Wizard Icons',
        },
      ],
    },
    {
      title: 'Chart & Misc',
      category: 'chartsMisc',
      children: [
        {
          url: { name: 'ui-charts-apex-chart' },
          icon: 'tabler-chart-area-line',
          title: 'Apex Charts',
        },
        {
          url: { name: 'ui-charts-chartjs' },
          icon: 'tabler-chart-histogram',
          title: 'ChartJS',
        },
        {
          url: { name: 'ui-access-control' },
          icon: 'tabler-shield',
          title: 'Access Control (ACL)',
        },
      ],
    },
  ],
}
