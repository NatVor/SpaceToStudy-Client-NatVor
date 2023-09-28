import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'
import QuestionsList from '~/containers/questions-list/QuestionsList'
import AddQuestions from '~/containers/my-resources/add-questions/AddQuestions'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { myResourcesPath } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.constants'
import { styles } from '~/containers/my-quizzes/edit-quiz-container/EditQuizContainer.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  Question,
  SizeEnum,
  TextFieldVariantEnum
} from '~/types'

const EditQuizContainer = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [questions, setQuestions] = useState<Question[]>([])

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.currentTarget.value)
  }

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.currentTarget.value)
  }

  const onAddQuestions = (attachments: Question[]) => {
    setQuestions(attachments)
  }

  const onOpenAddQuestionsModal = () => {
    openModal({
      component: (
        <AddQuestions onAddQuestions={onAddQuestions} questions={questions} />
      )
    })
  }

  return (
    <PageWrapper sx={styles.container}>
      <Box component={ComponentEnum.Form} sx={styles.root}>
        <AppTextField
          InputLabelProps={styles.titleLabel(title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewTitle')}
          onChange={(e) => handleTitleChange(e)}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(description)}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewDescription')}
          onChange={(e) => handleDescriptionChange(e)}
          variant={TextFieldVariantEnum.Standard}
        />
        <Divider sx={styles.divider} />

        <QuestionsList items={questions} setItems={setQuestions} />

        <Box sx={styles.functionalButtons}>
          <AppButton
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('myResourcesPage.quizzes.createNewQuestion')}
            <EditIcon fontSize={SizeEnum.Small} />
          </AppButton>
          <AppButton
            onClick={onOpenAddQuestionsModal}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('myResourcesPage.quizzes.addQuestion')}
            <AddIcon fontSize={SizeEnum.Small} />
          </AppButton>
        </Box>
        <Box sx={styles.buttons}>
          <AppButton
            component={Link}
            size={SizeEnum.ExtraLarge}
            to={myResourcesPath}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton size={SizeEnum.ExtraLarge} type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditQuizContainer
