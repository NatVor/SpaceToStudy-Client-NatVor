import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Button, IconButton, List, ListItem  } from '@mui/material'

import Logo from '~/containers/logo/Logo'
import Sidebar from '~/containers/sidebar/Sidebar'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import { style } from '~/containers/navbar/navbar.style'
import PropTypes from 'prop-types'

const Navbar = ({ navigationItems, children }) => {

  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarActive = () => setIsSidebarOpen(!isSidebarOpen)

  const navigationList = navigationItems.map(item => {

    return (
      <ListItem key={ item.label } sx={ style.navItem }>
        <Typography
          component={ Link }
          sx={ style.navItemText }
          to={ item.route }
          variant="subtitle2"
        >
          { t(`header.guestNavBar.${ item.label }`) }
        </Typography>
      </ListItem>)
  })

  return (
    <Box sx={ style.header }>
      <Button
        component={ Link }
        size='small' sx={ style.logoButton }
        to={ routes.home.route }
      >
        <Logo />
      </Button>
      
      <List sx={ style.navList }>
        { navigationList }
      </List>

      <Box sx={ style.iconBox }>
        <IconButton size='large' sx={ style.langIcon }>
          <LanguageIcon color='primary' />
        </IconButton>
        { children }
        <IconButton onClick={ sidebarActive } size='large' sx={ style.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Box>
      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } sidebarActive={ sidebarActive } />
    </Box>
  )
}

export default Navbar

Navbar.propTypes = {
  navigationItems: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
}
