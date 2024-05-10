import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import AppTextField from '~/components/app-text-field/AppTextField'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useForm from '~/hooks/use-form'

import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'
import { confirmPassword, password } from '~/utils/validations/login'
import { ButtonVariantEnum, InputEnum, SizeEnum } from '~/types'
import { FormValues } from '~/types/editTutorProfile/interfaces/securityBlockForm.interfaces'
import { useTranslation } from 'react-i18next'

const PasswordSecurityTab = () => {
  const { t } = useTranslation()
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)

  const { data, handleInputChange, errors, handleBlur, resetData } =
    useForm<FormValues>({
      initialValues: {
        currentPassword: '',
        password: '',
        confirmPassword: ''
      },
      validations: { password, confirmPassword }
    })

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.passwordSecurityTab.description'
        )}
        style={styles.titleAndDescription}
        title={t('editProfilePage.profile.passwordSecurityTab.title')}
      />
      <Box>
        <Typography sx={styles.subtitle}>
          {t('editProfilePage.profile.passwordSecurityTab.changePassword')}
        </Typography>
        <AppTextField
          fullWidth
          label={t(
            'editProfilePage.profile.passwordSecurityTab.currentPassword'
          )}
          onChange={handleInputChange('currentPassword')}
          type={InputEnum.Password}
          value={data.currentPassword}
        />
        <AppTextField
          errorMsg={t(errors.password)}
          fullWidth
          label={t('editProfilePage.profile.passwordSecurityTab.newPassword')}
          onBlur={handleBlur('password')}
          onChange={handleInputChange('password')}
          type={InputEnum.Password}
          value={data.password}
        />
        <AppTextField
          errorMsg={t(errors.confirmPassword)}
          fullWidth
          label={t(
            'editProfilePage.profile.passwordSecurityTab.retypePassword'
          )}
          onBlur={handleBlur('confirmPassword')}
          onChange={handleInputChange('confirmPassword')}
          type={InputEnum.Password}
          value={data.confirmPassword}
        />
        <Box sx={styles.passwordButtonsContainer}>
          <AppButton
            onClick={() => {}}
            size={SizeEnum.Medium}
            variant={ButtonVariantEnum.Contained}
          >
            {t('editProfilePage.profile.passwordSecurityTab.savePassword')}
          </AppButton>
          <AppButton
            onClick={() => resetData()}
            size={SizeEnum.Medium}
            sx={styles.discardButton}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.discard')}
          </AppButton>
        </Box>
        <Divider />
        <AppButton
          onClick={() => setIsConfirmOpen(!isConfirmOpen)}
          size={SizeEnum.Large}
          sx={styles.deactivateButton}
          variant={ButtonVariantEnum.Contained}
        >
          {t('editProfilePage.profile.passwordSecurityTab.deactivateAccount')}
        </AppButton>
        <ConfirmDialog
          cancelButton={t('common.cancel')}
          confirmButton={t(
            'editProfilePage.profile.passwordSecurityTab.deactivateBtn'
          )}
          message={t(
            'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
          )}
          onConfirm={() => {}}
          onDismiss={() => setIsConfirmOpen(!isConfirmOpen)}
          open={isConfirmOpen}
          revertButtons
          title={t(
            'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
          )}
        />
      </Box>
    </Box>
  )
}

export default PasswordSecurityTab