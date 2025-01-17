import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import BookmarkedOffers from '~/pages/bookmarked-offers/BookmarkedOffers'

import {
  mockAxiosClient,
  renderWithProviders,
  TestSnackbar
} from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { offersMock } from '~tests/unit/pages/bookmarked-offers/BookmarkedOffers.constants'
import * as sortValues from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'

const mockNavigate = vi.fn()
let mockSearchParams = new URLSearchParams()
const mockSetSearchParams = vi.fn()
const mockScrollIntoView = vi.fn()
const mockT = (str) => str

window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams]
  }
})

vi.mock('react-i18next', () => ({
  Trans: ({ i18nKey }) => i18nKey,
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: mockT
  })
}))

const testText = 'test text'
const mockUserId = '66b0aecdadd1fe775238c7d5'
const preloadedState = { appMain: { userId: mockUserId } }
const getBookmarksUrl = `${createUrlPath(URLs.users.get, mockUserId)}${
  URLs.users.bookmarks
}`
const mockError = { code: 'mockErrorCode', message: 'test error' }

const sortTranslationKeysMock = [
  { title: 'newest', value: 'createdAt' },
  { title: 'rating', value: 'rating' },
  { title: 'priceAsc', value: 'priceAsc' },
  { title: 'priceDesc', value: 'priceDesc' }
]

vi.spyOn(sortValues, 'sortTranslationKeys', 'get').mockReturnValue(
  sortTranslationKeysMock
)

describe('BookmarkedOffers page with offers', () => {
  beforeEach(async () => {
    mockAxiosClient
      .onGet(getBookmarksUrl)
      .reply(200, { items: offersMock, count: offersMock.length })

    await waitFor(() => {
      renderWithProviders(<BookmarkedOffers />, { preloadedState })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the page with offers', async () => {
    const offer1Title = await screen.findByText(offersMock[0].title)
    const offer2Title = screen.getByText(offersMock[1].title)

    expect(offer1Title).toBeInTheDocument()
    expect(offer2Title).toBeInTheDocument()
  })

  it('should change the page number and scroll to the top', async () => {
    const pageNumber = 2
    const goToPageBtn = await screen.findByText(`${pageNumber}`, {
      selector: 'button'
    })

    fireEvent.click(goToPageBtn)

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ page: pageNumber })
    )
    expect(mockScrollIntoView).toHaveBeenCalled()
  })

  it('should add title to URL search params', async () => {
    const searchInput = await screen.findByLabelText('bookmarkedOffers.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: testText } })
    fireEvent.submit(searchInput)

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining(new URLSearchParams({ page: 1, title: testText }))
    )
  })

  it('should add sortBy to URL search params', async () => {
    const sortBySelect = await screen.findByText(
      sortTranslationKeysMock[0].title
    )
    fireEvent.mouseDown(sortBySelect)

    const secondOption = await screen.findByText(
      sortTranslationKeysMock[1].title
    )
    fireEvent.click(secondOption)

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining(
        new URLSearchParams({
          page: 1,
          title: testText,
          sort: sortTranslationKeysMock[1].value
        })
      )
    )
  })
})

describe('BookmarkedOffers page without offers', () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(getBookmarksUrl).reply(200, { items: [], count: 0 })

    await waitFor(() => {
      renderWithProviders(<BookmarkedOffers />, { preloadedState })
    })
  })

  it('should render the page without offers', async () => {
    const pageDescription = await screen.findByText(
      'bookmarkedOffers.notFound.description'
    )

    expect(pageDescription).toBeInTheDocument()
  })
})

describe("BookmarkedOffers page couldn't load offers", () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(getBookmarksUrl).reply(400, mockError)

    await waitFor(() => {
      renderWithProviders(
        <TestSnackbar>
          <BookmarkedOffers />
        </TestSnackbar>,
        { preloadedState }
      )
    })
  })

  it('should show a snackbar with an error text', async () => {
    const snackbar = await screen.findByText('bookmarkedOffers.loadingError')

    expect(snackbar).toBeInTheDocument()
  })
})
