import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'

import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import { ResourcesTabsEnum as ResourcesTypes } from '~/types'

const mockedLessonData = [
  {
    _id: '1',
    title: 'Lesson1',
    author: 'some author',
    content: 'Content',
    description: 'Description',
    attachments: [],
    category: null,
    resourceType: ResourcesTypes.Lessons
  },
  {
    _id: '2',
    title: 'Lesson2',
    author: 'new author',
    content: 'Content',
    description: 'Description',
    attachments: [],
    category: null,
    resourceType: ResourcesTypes.Lessons
  }
]

const mockedSetResources = vi.fn()

describe('new course section RescourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourcesList
        items={mockedLessonData}
        setResources={mockedSetResources}
      />
    )
  })

  it('should render resources list with gragBtn', async () => {
    const resourceTitle1 = await screen.findByText(mockedLessonData[0].title)
    const resourceTitle2 = screen.getByText(mockedLessonData[1].title)

    expect(resourceTitle1).toBeInTheDocument()
    expect(resourceTitle2).toBeInTheDocument()
  })
})