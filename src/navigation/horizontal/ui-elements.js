export default [
  {
    title: 'User Interface',
    icon: { icon: 'tabler-color-swatch' },
    children: [
      {
        title: 'Icons',
        icon: { icon: 'tabler-brand-tabler' },
        to: 'ui-ui-pages-icons',
      },
      {
        title: 'Typography',
        icon: { icon: 'tabler-square-letter-t' },
        to: 'ui-pages-typography',
      },
      {
        title: 'Cards',
        icon: { icon: 'tabler-id' },
        children: [
          { title: 'Basic', to: 'ui-pages-cards-card-basic' },
          { title: 'Advance', to: 'ui-pages-cards-card-advance' },
          { title: 'Statistics', to: 'ui-pages-cards-card-statistics' },
          { title: 'Widgets', to: 'ui-pages-cards-card-widgets' },
          { title: 'Actions', to: 'ui-pages-cards-card-actions' },
        ],
      },
      {
        title: 'Components',
        icon: { icon: 'tabler-toggle-left' },
        children: [
          { title: 'Alert', to: 'ui-components-alert' },
          { title: 'Avatar', to: 'ui-components-avatar' },
          { title: 'Badge', to: 'ui-components-badge' },
          { title: 'Button', to: 'ui-components-button' },
          { title: 'Chip', to: 'ui-components-chip' },
          { title: 'Dialog', to: 'ui-components-dialog' },
          { title: 'Expansion Panel', to: 'ui-components-expansion-panel' },
          { title: 'List', to: 'ui-components-list' },
          { title: 'Menu', to: 'ui-components-menu' },
          { title: 'Pagination', to: 'ui-components-pagination' },
          { title: 'Progress Circular', to: 'ui-components-progress-circular' },
          { title: 'Progress Linear', to: 'ui-components-progress-linear' },
          { title: 'Snackbar', to: 'ui-components-snackbar' },
          { title: 'Tabs', to: 'ui-components-tabs' },
          { title: 'Timeline', to: 'ui-components-timeline' },
          { title: 'Tooltip', to: 'ui-components-tooltip' },
        ],
      },
      {
        title: 'Extensions',
        icon: { icon: 'tabler-box' },
        children: [
          { title: 'Tour', to: 'ui-extensions-tour' },
          { title: 'Swiper', to: 'ui-extensions-swiper' },
        ],
      },
    ],
  },
]
