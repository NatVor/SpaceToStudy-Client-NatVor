import { useCallback, useEffect, useRef, useState } from 'react'
import { AxiosError } from 'axios'

import { ErrorResponse, ServiceFunction } from '~/types'

export interface UseAxiosProps<
  Response,
  Params = undefined,
  TransformedResponse = Response
> {
  service: ServiceFunction<Response, Params>
  defaultResponse?: TransformedResponse
  fetchOnMount?: boolean
  transform?: (params: Response) => TransformedResponse
  onResponse?: (responseData: TransformedResponse) => Promise<void> | void
  onResponseError?: (error: ErrorResponse) => void
}

interface UseAxiosReturn<TransformedResponse, Params> {
  response: TransformedResponse
  error: ErrorResponse | null
  loading: boolean
  fetchData: (params?: Params) => Promise<void>
}

const useAxios = <
  Response,
  Params = undefined,
  TransformedResponse = Response
>({
  service,
  defaultResponse = {} as TransformedResponse,
  fetchOnMount = true,
  transform,
  onResponse,
  onResponseError
}: UseAxiosProps<Response, Params, TransformedResponse>): UseAxiosReturn<
  TransformedResponse,
  Params
> => {
  const [response, setResponse] = useState<TransformedResponse>(defaultResponse)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const isRequestInProgress = useRef<boolean>(false)

  const fetchData = useCallback(
    async (params?: Params) => {
      if (isRequestInProgress.current) return
      isRequestInProgress.current = true

      try {
        setLoading(true)
        const res = await service(params)
        const responseData = transform ? transform(res.data) : res.data
        setResponse(responseData as TransformedResponse)
        setError(null)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        onResponse && onResponse(responseData as TransformedResponse)?.catch()
      } catch (e) {
        const error = e as AxiosError<ErrorResponse>
        if (error.response) {
          setError(error.response.data)
          onResponseError && onResponseError(error.response.data)
        }
      } finally {
        setLoading(false)
        isRequestInProgress.current = false
      }
    },
    [service, transform, onResponse, onResponseError]
  )

  useEffect(() => {
    if (fetchOnMount) {
      void fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, error, loading, fetchData }
}

export default useAxios
