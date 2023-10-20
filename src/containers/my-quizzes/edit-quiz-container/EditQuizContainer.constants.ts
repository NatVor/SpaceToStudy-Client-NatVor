import { sortQuestions } from '~/components/question-editor/QuestionEditor.constants'

export const initialValues = {
  title: '',
  description: '',
  category: null,
  items: [],
  questionTitle: '',
  text: '',
  openAnswer: '',
  answers: [],
  questionCategory: null,
  type: sortQuestions[0].value
}