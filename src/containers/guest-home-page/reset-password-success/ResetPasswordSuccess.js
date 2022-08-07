import { useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { ModalContext } from '~/context/modal-context'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import info from '~/assets/img/guest-home-page/info.svg'

const style = {
  root: { m: { xs: '100px 10px', sm: '45px 20px 55px' } },
  img: { display: 'flex', margin: '0 auto' },
  wrapper: { maxWidth: '630px' },
  title: { typography: 'h5' },
  description: { typography: 'subtitle' },
  email: { fontWeight: 500 }
}


const ResetPasswordSuccess = ({ email }) => {
  const { t } = useTranslation()
  const { closeModal } = useContext(ModalContext)

  useEffect(() => {
    setTimeout(() => closeModal(), 5000)
  }, [closeModal])

  const description = (
    <>
      { t('login.weSentEmail') }
      <Typography component='span' sx={ style.email }>
        { email }
      </Typography>
      { t('login.emailArrive') }
    </>
  )

  return (
    <Box sx={ style.root }>
      <Box
        alt="info" component="img" src={ info }
        sx={ style.img }
      />

      <TitleWithDescription
        componentStyles={ style.wrapper }
        description={ description }
        descriptionStyles={ style.description }
        title={ t('login.passwordReset') }
        titleStyles={ style.title }
      />
    </Box>
  )
}

export default ResetPasswordSuccess