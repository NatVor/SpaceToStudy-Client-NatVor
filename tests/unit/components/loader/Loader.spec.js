import { screen } from '@testing-library/react'

import Loader from '~/components/loader/Loader'
import { renderWithProviders } from '~tests/test-utils'

describe('Loader test', () => {
  it('should render loader', () => {
    renderWithProviders(<Loader size={ 70 } />)
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})