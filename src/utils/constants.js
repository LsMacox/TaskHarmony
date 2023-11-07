export const COOKIE_MAX_AGE_1_YEAR = 365 * 24 * 60 * 60

export const ROLES = [
  {
    title: 'Super Admin',
    value: 'Super Admin',
  },
  {
    title: 'Employee',
    value: 'Employee',
  },
]

export const GROUP_PERMISSIONS = [
  'create',
]

export const WORKFLOW_STATES = [
  'in_progress',
  'returned',
  'approved',
  'rejected',
]

export const MODERATE_STATUSES = {
  'pending': 0,
  'approved': 1,
  'rejected': 2,
  'postponed': 3,
}
