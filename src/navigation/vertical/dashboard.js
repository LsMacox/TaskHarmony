export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Analytics',
        to: 'ui-dashboards-analytics',
      },
      {
        title: 'CRM',
        to: 'ui-dashboards-crm',
      },
      {
        title: 'Ecommerce',
        to: 'ui-dashboards-ecommerce',
      },
      {
        title: 'Academy',
        to: 'ui-dashboards-academy',
      },
      {
        title: 'Logistics',
        to: 'ui-dashboards-logistics',
      },
    ],
    badgeContent: '3',
    badgeClass: 'bg-global-primary',
  },
  {
    title: 'Front Pages',
    icon: { icon: 'tabler-files' },
    children: [
      {
        title: 'Landing',
        to: 'ui-front-pages-landing-page',
        target: '_blank',
      },
      {
        title: 'Pricing',
        to: 'ui-front-pages-pricing',
        target: '_blank',
      },
      {
        title: 'Payment',
        to: 'ui-front-pages-payment',
        target: '_blank',
      },
      {
        title: 'Checkout',
        to: 'ui-front-pages-checkout',
        target: '_blank',
      },
      {
        title: 'Help Center',
        to: 'ui-front-pages-help-center',
        target: '_blank',
      },
    ],
  },
]
