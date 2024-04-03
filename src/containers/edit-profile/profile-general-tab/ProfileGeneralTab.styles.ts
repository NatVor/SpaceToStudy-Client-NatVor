import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum, VisibilityEnum } from '~/types'
import { rootContainer } from '~/containers/edit-profile/common.style'

const { Subtitle1, Body2, Caption, H6 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: 'left' },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: 'primary.500' }
}

export const styles = {
  root: {
    ...rootContainer
  },
  headerTitleWithDesc: { ...titleWithDescription, title: { typography: H6 } },
  avatar: {
    root: { display: 'flex', columnGap: '34px', my: '20px' },
    img: { width: '108px', height: '108px' },
    textWithButtons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    titleWithDesc: {
      ...titleWithDescription,
      description: { typography: Caption, color: 'primary.500' }
    },
    buttons: { display: 'flex', columnGap: '10px', height: '40px' }
  },
  section: { display: 'flex', flexDirection: 'column', rowGap: '15px' },
  sectionsTitleWithDesc: { ...titleWithDescription },
  dividedInputs: { display: 'flex', columnGap: '10px' },
  professionalSummaryLabel: (text: string) => ({
    color: palette.primary[400],
    top: '-2px',
    ...(text && { visibility: VisibilityEnum.Hidden })
  }),
  languageInput: { maxWidth: '300px', width: '100%', mb: '20px' },
  linkAdornment: { '& > p': { color: 'primary.500' } }
}