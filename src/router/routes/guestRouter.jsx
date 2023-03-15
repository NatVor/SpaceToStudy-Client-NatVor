import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { guestRoutes } from '../constants/guestRoutes'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))
const Subjects = lazy(()=> import('~/pages/subjects/Subjects'))
const Categories = lazy(()=> import('~/pages/categories/Categories'))
const FindOffers = lazy(()=> import('~/pages/find-offers/FindOffers'))

export const guestRouter = (
  <Route>
    <Route
      element={ <CookiePolicy /> }
      handle={ { crumb: { name: t('breadCrumbs.privacyPolicy'), path: guestRoutes.privacyPolicy.route } } }
      path={ guestRoutes.privacyPolicy.route }
    />
    <Route
      element={ <Categories /> } 
      handle={ { crumb: { name: t('breadCrumbs.categories'), path: guestRoutes.categories.route } } } 
      path={ guestRoutes.categories.route }
    />
    <Route
      element={ <Subjects /> } 
      handle={ { crumb: { name: t('breadCrumbs.subjects'), path: guestRoutes.subjects.route } } } 
      path={ guestRoutes.subjects.route }
    />
    <Route
      element={ <FindOffers /> } 
      handle={ { crumb: { name: t('breadCrumbs.findOffers'), path: guestRoutes.findOffers.route } } } 
      path={ guestRoutes.findOffers.route }
    />
  </Route>
)
