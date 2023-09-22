import { AddDocuments } from '~/types'

export const validationData: AddDocuments = {
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  fileSizeError: 'common.fileSizeError',
  allFilesSizeError: 'common.allFilesSizeError',
  typeError: 'common.typeError',
  maxQuantityFiles: 7
}