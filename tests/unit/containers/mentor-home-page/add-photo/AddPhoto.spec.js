import { render, screen, fireEvent } from '@testing-library/react'
import AddPhoto from '~/containers/tutor-home-page/add-photo/AddPhoto'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('AddPhoto test', () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(() => 'image/png')
    render(
      <ModalProvider>
        <StepProvider>
          <AddPhoto btnsBox={ btnsBox } stepLabel={ 'photo' } />
        </StepProvider>
      </ModalProvider>
    )
  })

  it('should render placeholder', () => {
    const placeholder = screen.getByText('becomeTutor.photo.placeholder')

    expect(placeholder).toBeInTheDocument()
  })

  it('should render description', () => {
    const text = screen.getByText('becomeTutor.photo.description')

    expect(text).toBeInTheDocument()
  })

  it('should render back and next buttons', () => {
    const buttonBack = screen.getByText('back')
    const buttonNext = screen.getByText('next')

    expect(buttonBack).toBeInTheDocument()
    expect(buttonNext).toBeInTheDocument()
  })

  it('should render error text after add wrong file type', async () => {
    const fakeFile = new File(['photo'], 'test-file.pdf', { type: 'application/pdf' })

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = await screen.findByText('becomeTutor.photo.typeError')

    expect(error).toBeInTheDocument()
  })
})
