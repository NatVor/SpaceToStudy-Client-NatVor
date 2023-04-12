import Box from '@mui/material/Box'

import AppHeader from '~/containers/layout/app-header/AppHeader'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import AppMain from '../layout/app-main/AppMain'

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
}

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={styles.content}>
      <AppHeader />
      <AppBreadCrumbs />
      <ScrollToTop />
      <AppMain />
    </Box>
  )
}

export default AppContent
