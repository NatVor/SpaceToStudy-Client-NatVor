import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { GetUsersParams, UserResponse, UserRole } from '~/types'

export const userService = {
  getUsers: async (
    params: GetUsersParams
  ): Promise<AxiosResponse<UserResponse[]>> => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getUserById: (
    userId: string,
    userRole: UserRole
  ): Promise<AxiosResponse<UserResponse>> => {
    return axiosClient.get(`${URLs.users.get}/${userId}?role=${userRole}`)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds: string): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}