import { FC } from 'react'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { styles } from '~/components/loader/Loader.styles'

interface LoaderProps {
  size: number
  sx?: SxProps
  pageLoad?: boolean
}

const Loader: FC<LoaderProps> = ({ size, sx, pageLoad = false }) => {
  return (
    <Box data-testid='loader' sx={styles.container(pageLoad)}>
      <CircularProgress size={size} sx={{ ...sx, ...styles.loader }} />
    </Box>
  )
}
export default Loader