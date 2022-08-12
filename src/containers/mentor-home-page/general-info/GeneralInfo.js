import { useTranslation } from 'react-i18next'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

import AppTextField from '~/components/app-text-field/AppTextField'

import img from '~/assets/img/mentor-home-page/become-tutor/general-info.png'
import { styles } from './general-info.styles'

const GeneralInfo = ({ data, handleChange, handleBlur, errors, btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.container }>
      <Box component="img" src={ img } sx={ styles.img } />
      <Box component="form"  sx={ styles.form }>
        <Box>
          <Typography mb='30px'>
            { t('becomeTutor.generalInfo.title') }
          </Typography>
          <AppTextField
            autoFocus
            errorMsg={ t(errors.firstName) }
            fullWidth
            label={ t('common.labels.firstName') }
            onBlur={ handleBlur('firstName') }
            onChange={ handleChange('firstName') }
            required
            type="text"
            value={ data.firstName }
          />
          <AppTextField
            errorMsg={ t(errors.lastName) }
            fullWidth
            label={ t('common.labels.lastName') }
            onBlur={ handleBlur('lastName') }
            onChange={ handleChange('lastName') }
            required
            type="text"
            value={ data.lastName }
          />
          <AppTextField
            errorMsg={ t(errors.country) }
            fullWidth
            label={ t('common.labels.country') }
            onBlur={ handleBlur('country') }
            onChange={ handleChange('country') }
            required
            type="text"
            value={ data.country }
          />
          <AppTextField
            errorMsg={ t(errors.city) }
            fullWidth
            label={ t('common.labels.city') }
            onBlur={ handleBlur('city') }
            onChange={ handleChange('city') }
            required
            type="text"
            value={ data.city }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={ data.confirmAge }
                onChange={ handleChange('confirmAge') }
              />
            }
            label={ t('becomeTutor.generalInfo.checkboxLabel') }
          />
        </Box>
        { btnsBox }
      </Box>
        
    </Box>
  )
}

export default GeneralInfo