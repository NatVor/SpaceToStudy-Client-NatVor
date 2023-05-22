import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'

import { render, screen } from '@testing-library/react'

const mockedCoop = {
  offer: {
    description:
      'Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... ',
    subject: { _id: 'id', name: 'Quantum Mechanics' }
  },
  user: {
    firstName: 'Kathryn',
    lastName: 'Murphy',
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  price: 1800,
  requiredProficiencyLevel: 'Beginner',
  status: 'pending',
  createdAt: '2023-05-13T13:44:25.716Z'
}

describe('CooperationCard component ', () => {
  it('should render card', () => {
    render(<CooperationCard cooperation={mockedCoop} />)

    const level = screen.getByText(mockedCoop.requiredProficiencyLevel)

    expect(level).toBeInTheDocument()
  })
})