import { Box, Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import useConfirm from '~/hooks/use-confirm'
import useBreakpoints from '~/hooks/use-breakpoints'
import { style } from '~/components/popup-dialog/popup-dialog.style'

const PopupDialog = ({ content, closeModal }) => {
  const { checkConfirmation } = useConfirm()
  const size = useBreakpoints()

  const onClose = async () => {
    const confirmed = await checkConfirmation({
      message: 'questions.confirmation',
      title: 'titles.confirmTitle' 
    })
    if (confirmed) closeModal()
  }
 
  return (
    <Dialog
      data-testid='popup'
      fullScreen={ (size === 'mobile') }
      maxWidth="xl"
      onClose={ onClose }
      open
    >
      <Box sx={ style.box }>
        <IconButton onClick={ onClose } sx={ style.icon }>
          <CloseIcon />
        </IconButton>
        <Box>
          { content }
        </Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
