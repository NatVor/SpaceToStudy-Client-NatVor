import { useCallback, useEffect } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import {
  useParams,
  useLocation,
  useSearchParams,
  useMatch
} from 'react-router-dom'

import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'
import {
  profileItemsTutor,
  profileItemsStudent
} from '~/components/profile-item/complete-profile.constants'

import ProfileInfo from '~/containers/user-profile/profile-info/ProfileInfo'
import AboutTutorBlock from '~/containers/user-profile/about-user-block/AboutTutorBlock'
import AboutStudentBlock from '~/containers/user-profile/about-user-block/AboutStudentBlock'
import VideoPresentation from '~/containers/user-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'

import { UserRoleEnum } from '~/types'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import videoImgProfile from '~/assets/img/user-profile-page/presentationVideoImg.png'

import { responseMock } from '~/pages/user-profile/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { scrollToHash } from '~/utils/hash-scroll'

const UserProfile = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const paramsRole = searchParams.get('role')
  const { user } = responseMock
  const { reviews } = user.reviewStats || {}

  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      scrollToHash(`${pathname}${hash}`)
    }
  }, [pathname, hash])

  const preferredRole = paramsRole || userRole
  const preferredId = id || userId
  const isMyProfile = useMatch(authRoutes.myProfile.path)

  const getUserData = useCallback(
    () => userService.getUserById(preferredId, preferredRole),
    [preferredId, preferredRole]
  )

  const { loading, response } = useAxios({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.array
  })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  const isTutor = preferredRole === UserRoleEnum.Tutor
  const isStudent = preferredRole === UserRoleEnum.Student

  const shouldShowPresentation =
    (isTutor && isMyProfile) ||
    (!isTutor && response.videoLink?.student) ||
    (!isMyProfile && response.videoLink?.tutor)
  const VideoPresentationComponent = (
    <VideoPresentation
      video={response?.videoLink?.[preferredRole]}
      videoMock={videoImgProfile}
      videoPreview={loading || !response?.videoLink?.[preferredRole]}
    />
  )

  return (
    <PageWrapper>
      <ProfileInfo myRole={userRole} userData={response} />
      {isMyProfile && (
        <CompleteProfileBlock
          data={response}
          openAccordion={!!hash}
          profileItems={
            preferredRole === UserRoleEnum.Student
              ? profileItemsStudent
              : profileItemsTutor
          }
        />
      )}
      {response.professionalBlock && (
        <AboutTutorBlock data={response.professionalBlock} />
      )}
      {isStudent && <AboutStudentBlock />}
      {shouldShowPresentation && VideoPresentationComponent}
      <CommentsWithRatingBlock
        averageRating={user.reviewStats.averageRating}
        reviewsCount={reviews}
        totalReviews={user.reviewStats.totalReviews}
        userRole={preferredRole}
      />
    </PageWrapper>
  )
}

export default UserProfile
