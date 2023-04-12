import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import { useCallback, useContext } from 'react'
import { ModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = ({ confirmToken, openModal }) => {
  const { t } = useTranslation()
  const { closeModal } = useContext(ModalContext)

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { response, error, loading } = useAxios({ service: serviceFunction })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  if (error && error.response.data.code === 'BAD_CONFIRM_TOKEN') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.badToken')}
          img={imgReject}
          style={styles}
          title={t('modals.emailNotConfirm')}
        />
        <Button onClick={closeModal} size='large' variant='contained'>
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }

  if (error && error.response.data.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.alreadyConfirmed')}
          img={imgReject}
          style={styles}
          title={t('modals.emailAlreadyConfirm')}
        />
        <Button onClick={openLoginDialog} size='large' variant='contained'>
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }

  if (response) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          img={imgSuccess}
          style={styles}
          title={t('modals.emailConfirm')}
        />
        <Button onClick={openLoginDialog} size='large' variant='contained'>
          {t('button.goToLogin')}
        </Button>
      </Box>
    )
  }
}

export default EmailConfirmModal
