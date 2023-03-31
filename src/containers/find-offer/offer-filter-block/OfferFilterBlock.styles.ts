export const styles = {
  root: (open: boolean)=> ({
    maxWidth: '240px',
    color: 'primary.700',
    whiteSpace: 'nowrap',
    p: open ? '16px' : '16px 0',
    width: open ? '100%': 0,
    overflow: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transition: 'all 0.3s',
    transformOrigin: 'left'
  }),
  switchWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  content: {
    variant: 'body2'
  },
  applyButton: {
    backgroundColor: 'primary.500',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}
