export const styles = {
  container: {
    flex: 1,
    textAlign: 'right',
    pb: '80px'
  },
  categoryInput: {
    width: '100%',
    maxWidth: { sm: '160px', md: '220px' },
    mr: '30px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  titleWithDescription: {
    wrapper: {
      mb: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  }
}