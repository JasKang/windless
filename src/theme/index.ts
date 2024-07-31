export type AliasColor = 'primary' | 'success' | 'warning' | 'danger'

export function createFocusStyle(mode: 'ring' | 'outline', color: AliasColor = 'primary') {
  return mode === 'ring'
    ? ` focus-visible:ring-2 focus-visible:ring-offset-2 ${
        {
          primary: 'focus-visible:ring-primary',
          success: 'focus-visible:ring-success',
          warning: 'focus-visible:ring-warning',
          danger: 'focus-visible:ring-danger',
        }[color]
      }
    `
    : ` focus-visible:outline-2 focus-visible:outline-offset-2 ${
        {
          primary: 'focus-visible:outline-primary',
          success: 'focus-visible:outline-success',
          warning: 'focus-visible:outline-warning',
          danger: 'focus-visible:outline-danger',
        }[color]
      }`
}
