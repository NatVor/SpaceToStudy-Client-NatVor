import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import AppButton from '~/components/app-button/AppButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import OfferFilterList from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  FindOffersFilters,
  FindOffersFiltersActions,
  UserRoleEnum
} from '~/types'

import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.styles'

interface OfferFilterBlockProps {
  filters: FindOffersFilters
  filterActions: FindOffersFiltersActions<FindOffersFilters>
  onToggleTutorOffers: () => void
  closeFilters: () => void
  open: boolean
  activeFilterCount?: number
}

const OfferFilterBlock: FC<OfferFilterBlockProps> = ({
  filters,
  filterActions,
  onToggleTutorOffers,
  activeFilterCount,
  closeFilters,
  open
}) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()
  const { updateFilter, resetFilters, updateQueryParams } = filterActions
  const showingTutorOffers = filters.authorRole === UserRoleEnum.Student

  const switchOptions = {
    left: {
      text: showingTutorOffers
        ? t('findOffers.topMenu.studentsRequests')
        : t('findOffers.topMenu.tutorsOffers')
    }
  }
  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const updateFilterByKey =
    <K extends keyof FindOffersFilters>(key: K) =>
    (value: FindOffersFilters[K]) =>
      updateFilter(value, key)
  const handleApplyFilters = () => {
    updateQueryParams()
    !isDesktop && closeFilters()
  }

  const mobileFields = !isDesktop && (
    <>
      <FiltersToggle chosenFiltersQty={activeFilterCount} />
      <Divider />
      <AppContentSwitcher
        active={showingTutorOffers}
        onChange={onToggleTutorOffers}
        styles={styles.switchWrapper}
        switchOptions={switchOptions}
        typographyVariant={'subtitle2'}
      />
      <AppSelect
        fields={sortOptions}
        fullWidth
        selectTitle={t('common.labels.sortBy')}
        setValue={updateFilterByKey('sort')}
        size='small'
        sx={styles.selectWrapper}
        value={filters.sort}
      />
    </>
  )

  return (
    <Stack spacing={2} sx={styles.root(open)}>
      {mobileFields}
      <OfferFilterList
        filters={filters}
        updateFilter={updateFilter}
        updateFilterByKey={updateFilterByKey}
      />
      <AppButton onClick={handleApplyFilters} sx={styles.applyButton}>
        {t('button.applyFilters')}
      </AppButton>
      <AppButton onClick={resetFilters} variant='tonal'>
        {t('button.clearFilters')}
      </AppButton>
    </Stack>
  )
}

export default OfferFilterBlock