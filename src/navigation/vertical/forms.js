export default [
  { heading: 'Forms & Tables' },
  {
    title: 'Form Elements',
    icon: { icon: 'tabler-toggle-left' },
    children: [
      { title: 'Autocomplete', to: 'ui-forms-autocomplete' },
      { title: 'Checkbox', to: 'ui-forms-checkbox' },
      { title: 'Combobox', to: 'ui-forms-combobox' },
      { title: 'Date Time Picker', to: 'ui-forms-date-time-picker' },
      { title: 'Editors', to: 'ui-forms-editors' },
      { title: 'File Input', to: 'ui-forms-file-input' },
      { title: 'Radio', to: 'ui-forms-radio' },
      { title: 'Custom Input', to: 'ui-forms-custom-input' },
      { title: 'Range Slider', to: 'ui-forms-range-slider' },
      { title: 'Rating', to: 'ui-forms-rating' },
      { title: 'Select', to: 'ui-forms-select' },
      { title: 'Slider', to: 'ui-forms-slider' },
      { title: 'Switch', to: 'ui-forms-switch' },
      { title: 'Textarea', to: 'ui-forms-textarea' },
      { title: 'Textfield', to: 'ui-forms-textfield' },
    ],
  },
  {
    title: 'Form Layouts',
    icon: { icon: 'tabler-layout-navbar' },
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
    icon: { icon: 'tabler-checkbox' },
    to: 'ui-forms-form-validation',
  },
  {
    title: 'Tables',
    icon: { icon: 'tabler-table' },
    children: [
      { title: 'Simple Table', to: 'ui-tables-simple-table' },
      { title: 'Data Table', to: 'ui-tables-data-table' },
    ],
  },
]
