export default [
  {
    title: 'Forms',
    icon: { icon: 'tabler-forms' },
    children: [
      {
        title: 'Form Elements',
        icon: { icon: 'tabler-copy' },
        children: [
          {
            title: 'Autocomplete',
            to: 'ui-forms-autocomplete',
          },
          {
            title: 'Checkbox',
            to: 'ui-forms-checkbox',
          },
          {
            title: 'Combobox',
            to: 'ui-forms-combobox',
          },
          {
            title: 'Date Time Picker',
            to: 'ui-forms-date-time-picker',
          },
          {
            title: 'Editors',
            to: 'ui-forms-editors',
          },
          {
            title: 'File Input',
            to: 'ui-forms-file-input',
          },
          {
            title: 'Radio',
            to: 'ui-forms-radio',
          },
          {
            title: 'Custom Input',
            to: 'ui-forms-custom-input',
          },
          {
            title: 'Range Slider',
            to: 'ui-forms-range-slider',
          },
          {
            title: 'Rating',
            to: 'ui-forms-rating',
          },
          {
            title: 'Select',
            to: 'ui-forms-select',
          },
          { title: 'Slider', to: 'ui-forms-slider' },
          {
            title: 'Switch',
            to: 'ui-forms-switch',
          },
          {
            title: 'Textarea',
            to: 'ui-forms-textarea',
          },
          {
            title: 'Textfield',
            to: 'ui-forms-textfield',
          },
        ],
      },
      {
        title: 'Form Layouts',
        icon: { icon: 'tabler-circle-check' },
        to: 'ui-forms-form-layouts',
      },
      {
        title: 'Form Wizard',
        icon: { icon: 'tabler-align-center' },
        children: [
          { title: 'Numbered', to: 'ui-forms-form-wizard-numbered' },
          { title: 'Icons', to: 'ui-forms-form-wizard-icons' },
        ],
      },
      {
        title: 'Form Validation',
        icon: { icon: 'tabler-circle-check' },
        to: 'ui-forms-form-validation',
      },
    ],
  },
]
