import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { student } from '~/constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const UserIcons = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorRef = useRef(null)
  const { userRole } = useSelector((state) => state.appMain)

  const openMenu = () => setAnchorEl(anchorRef.current)
  const closeMenu = () => setAnchorEl(null)

  const menuList =
    userRole === student
      ? Object.values(studentRoutes.accountMenu).map((item) => {
          return (
            <MenuItem
              component={Link}
              key={item.path}
              onClick={closeMenu}
              sx={styles.menuItem}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </MenuItem>
          )
        })
      : Object.values(tutorRoutes.accountMenu).map((item) => {
          return (
            <MenuItem
              component={Link}
              key={item.path}
              onClick={closeMenu}
              sx={styles.menuItem}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </MenuItem>
          )
        })

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      <Tooltip arrow title={t('iconsTooltip.language')}>
        <IconButton size='large' sx={styles.langIcon}>
          <LanguageIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.messages')}>
        <IconButton sx={styles.studentIcons}>
          <MessageRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.bookmarks')}>
        <IconButton sx={styles.studentIcons}>
          <BookmarkIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.notifications')}>
        <IconButton sx={styles.studentIcons}>
          <NotificationsRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.account')}>
        <IconButton onClick={openMenu}>
          <AccountCircleOutlinedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.menu')}>
        <IconButton onClick={() => setIsSidebarOpen(true)} sx={styles.menuIcon}>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={closeMenu}
        open={!!anchorEl}
        sx={styles.accountMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {menuList}
      </Menu>
    </Box>
  )
}

export default UserIcons
