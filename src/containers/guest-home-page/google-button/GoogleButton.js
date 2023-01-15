import { useCallback, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHref } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { googleAuth } from '~/redux/reducer'
import { ModalContext } from '~/context/modal-context'
import { SnackBarContext } from '~/context/snackbar-context'
import { scrollToHash } from '~/utils/hash-scroll'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/guest-home-page/google-button/GoogleButton.styles'

const GoogleButton = ({ role, route, buttonWidth, type }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const mediaQuery = useMediaQuery(theme.breakpoints.up('md')) ? 'md' : 'xs'
  const { closeModal } = useContext(ModalContext)
  const { setAlert } = useContext(SnackBarContext)
  const ref = useHref(route)

  const handleCredentialResponse = useCallback(
    async (token) => {
      try {
        await dispatch(googleAuth({ token, role })).unwrap()
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e}`
        })
        if (e === 'USER_NOT_FOUND') {
          closeModal()
          scrollToHash(ref)
        }
      }
    },
    [dispatch, role, closeModal, setAlert, ref]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id

    googleId.initialize({
      client_id: process.env.REACT_APP_GMAIL_CLIENT_ID,
      callback: handleCredentialResponse
    })

    googleId.renderButton(document.getElementById('googleButton'), {
      size: 'large',
      width: buttonWidth[mediaQuery],
      locale: 'en',
      text: `${type}_with`
    })
  }, [handleCredentialResponse, buttonWidth, type, mediaQuery])

  return <button id='googleButton' style={ styles.google } />
}

export default GoogleButton
