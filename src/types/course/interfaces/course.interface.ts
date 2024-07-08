import {
  RequestParams,
  CommonEntityFields,
  CategoryInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum,
  UserResponse,
  Quiz,
  Attachment,
  Lesson,
  CourseResource
} from '~/types'

export interface Course extends CommonEntityFields {
  title: string
  description: string
  author: Pick<UserResponse, '_id'>
  sections: CourseSection[]
  category: CategoryInterface | null
  subject: SubjectNameInterface | null
  proficiencyLevel: ProficiencyLevelEnum[]
}

export interface CourseForm
  extends Omit<
    Course,
    'category' | 'subject' | 'sections' | keyof CommonEntityFields
  > {
  category: string | null
  subject: string | null
  sections: CourseSection[]
}

export interface Activities {
  resource: CourseResource
  resourceType: string
}

export interface CourseSection {
  _id?: string
  id: string
  title: string
  description: string
  lessons: Lesson[]
  quizzes: Quiz[]
  attachments: Attachment[]
  order?: string[]
  activities?: Activities[]
}

export interface CourseFilters extends Pick<Course, 'proficiencyLevel'> {
  category: string
  subject: string
  title: string
  page?: string | number
}

export interface GetCoursesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface CourseExtendedAutocompleteOptions {
  name: string
  _id: string
  title: string
}
