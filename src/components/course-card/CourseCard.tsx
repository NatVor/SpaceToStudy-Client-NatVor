import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Divider from '@mui/material/Divider'

import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { styles } from '~/components/course-card/CourseCard.styles'
import { getFormattedDate } from '~/utils/helper-functions'
import { Course } from '~/types'
import { useTranslation } from 'react-i18next'

interface CourseCardProps {
  course: Course
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const { t } = useTranslation()

  const {
    title,
    description,
    category,
    subject,
    proficiencyLevel,
    sections = [{}],
    createdAt
  } = course

  const date = getFormattedDate({ date: createdAt })

  return (
    <Box sx={styles.card}>
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.description}>{description}</Typography>
        <SubjectLevelChips
          color={category.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject.name}
          sx={styles.chipContainer}
        />
        <Typography sx={styles.secondaryText}>
          {`${sections.length} ${
            sections.length > 1 ? t('course.sections') : t('course.section')
          }`}
        </Typography>
      </Box>
      <Box>
        <Divider sx={styles.line} />
        <Box sx={styles.dateContainer}>
          <Typography sx={styles.secondaryText}>{date}</Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCard