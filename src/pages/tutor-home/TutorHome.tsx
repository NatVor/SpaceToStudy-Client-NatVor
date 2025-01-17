import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import FindBlock from '~/components/find-block/FindBlock'
import ActiveStudentsBlock from '~/components/active-students/ActiveStudentsBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import Calendar from '~/components/calendar/Calendar'
import TutorSchedule from '~/components/tutor-schedule/TutorSchedule'
import QuantityLessonsCard from '~/components/quantity-lessons-card/QuantityLessonsCard'
import { Box } from '@mui/material'
import StudentsInCategories from '~/components/students-in-categories/StudentsInCategories'

const TutorHome = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
      <Box sx={styles.scheduleAndCalendarContainer}>
        <TutorSchedule />
        <Calendar />
      </Box>
      <StudentsInCategories />
      <QuantityLessonsCard />
      <ActiveStudentsBlock />
      <PopularCategories
        description={t('tutorHomePage.popularCategories.description')}
        title={t('tutorHomePage.popularCategories.title')}
      />
    </PageWrapper>
  )
}

export default TutorHome
