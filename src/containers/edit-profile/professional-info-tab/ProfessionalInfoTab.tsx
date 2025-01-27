import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'

import {
  ButtonVariantEnum,
  ComponentEnum,
  MainUserRole,
  OpenProfessionalCategoryModalHandler,
  ProfessionalBlock,
  UserRoleEnum
} from '~/types'

import {
  deleteCategory,
  setField,
  updateValidityStatus
} from '~/redux/features/editProfileSlice'

import { useDebounce } from '~/hooks/use-debounce'
import useForm from '~/hooks/use-form'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import ProfessionalCategoryList from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList'
import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import AboutStudentAccordion from '~/containers/edit-profile/professional-info-tab/about-student-accordion/AboutStudentAccordion'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { scrollToAndHighlight } from '~/utils/scroll-and-highlight'
import { aboutStudentData } from '~/containers/user-profile/about-user-block/about-user-block.constants'

import { styles } from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab.styles'
import { highlightElem } from '~/containers/edit-profile/common.styles'

const ProfessionalInfoTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { categories, professionalBlock } = useAppSelector(
    (state) => state.editProfile
  )

  const { openModal, closeModal } = useModalContext()

  const { isValid, data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues: professionalBlock
  })

  const debouncedProfessionalBlockData = useDebounce(() => {
    dispatch(setField({ field: 'professionalBlock', value: data }))
  }, 300)

  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      scrollToAndHighlight(`${pathname}${hash}`)
    }
  }, [pathname, hash])

  useEffect(() => {
    debouncedProfessionalBlockData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleDeleteCategory = (categoryId: string) => {
    const userRoleToDeleteCategory = userRole as MainUserRole
    dispatch(
      deleteCategory({ id: categoryId, userRole: userRoleToDeleteCategory })
    )
  }

  useEffect(() => {
    dispatch(
      updateValidityStatus({ tab: 'professionalInfoTab', value: isValid })
    )
  }, [isValid, dispatch])

  const openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler = (
    initialValues,
    isEdit
  ) => {
    openModal({
      component: (
        <AddProfessionalCategoryModal
          {...{ initialValues, closeModal, isEdit }}
          blockedCategoriesOptions={categories[userRole as MainUserRole]}
          isDeletionBlocked={initialValues?.isDeletionBlocked}
        />
      ),
      paperProps: {
        sx: styles.createCategoryButton
      }
    })
  }

  const TutorInfo = (
    <Box component='section' id='education'>
      <Box sx={highlightElem}></Box>
      <TitleWithDescription
        description={t(
          `editProfilePage.profile.professionalTab.${userRole}AboutDescription`
        )}
        isHighlighted
        style={styles.titleWithDescription}
        title={t(
          `editProfilePage.profile.professionalTab.${userRole}AboutTitle`
        )}
      />
      <Box sx={styles.accordionContainer}>
        {userRole === UserRoleEnum.Tutor ? (
          <AboutTutorAccordion
            data={data}
            handleInputChange={handleInputChange}
          />
        ) : (
          <AboutStudentAccordion data={aboutStudentData} />
        )}
      </Box>
    </Box>
  )

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.professionalTab.mainDescription'
        )}
        style={styles.mainTitleWithDescription}
        title={t('editProfilePage.profile.professionalTab.mainTitle')}
      />
      <Box component={ComponentEnum.Section} id='category'>
        <Box sx={highlightElem}></Box>
        <TitleWithDescription
          description={t(
            `editProfilePage.profile.professionalTab.categoriesDescription.${userRole}`
          )}
          isHighlighted
          style={styles.titleWithDescription}
          title={t('editProfilePage.profile.professionalTab.categoriesTitle')}
        />
        <Box sx={styles.createBtnContainer}>
          <AppButton
            onClick={() => openProfessionalCategoryModal()}
            startIcon={<AddIcon />}
            variant={ButtonVariantEnum.Contained}
          >
            {t('editProfilePage.profile.professionalTab.addCategoryBtn')}
          </AppButton>
        </Box>
        <ProfessionalCategoryList
          handleDeleteCategory={handleDeleteCategory}
          items={categories[userRole as MainUserRole]}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
      {TutorInfo}
    </Box>
  )
}

export default ProfessionalInfoTab
