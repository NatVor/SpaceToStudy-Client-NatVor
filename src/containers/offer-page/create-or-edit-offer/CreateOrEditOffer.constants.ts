import { emptyField, numberField, textField } from '~/utils/validations/common'
import { Offer, StatusEnum } from '~/types'

export const getInitialValues = (offer: Offer | null) => ({
  category: offer?.category._id ?? '',
  subject: offer?.subject._id ?? '',
  proficiencyLevel: offer?.proficiencyLevel ?? [],
  languages: offer?.languages ?? [],
  title: offer?.title ?? '',
  description: offer?.description ?? '',
  price: offer?.price.toString() ?? '',
  status: offer?.status ?? StatusEnum.Active,
  FAQ: offer?.FAQ ?? [{ question: '', answer: '' }]
})

export const validations = {
  languages: (value: string[] | string) =>
    emptyField(value?.toString(), 'offerPage.errorMessages.languages'),
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  price: (value: string) => numberField(value, 'offerPage.errorMessages.price'),
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(20, 1000)(value)
    ),
  title: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.title',
      textField(0, 100)(value)
    ),
  proficiencyLevel: (value: string[] | string) =>
    emptyField(value?.toString(), 'offerPage.errorMessages.proficiencyLevel')
}