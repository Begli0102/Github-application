import React from 'react'
import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { IRepo } from '../interface'
import '../App.css'

interface IRepoDetails {
  details: IRepo | undefined
  loadingDetails: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RepoDetails = ({
  details,
  loadingDetails,
  open,
  setOpen
}: IRepoDetails) => {
  const handleClose = () => {
    setOpen(false)
  }

  if (loadingDetails) {
    return <CircularProgress />
  }

  return (
    <div className='repo__details__dialog'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className='dialog__content__header'>
            <Avatar alt='Username' src={details?.owner.avatar_url} />
            <Typography gutterBottom> {details?.owner.login}</Typography>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 4
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='dialog__content__body'>
            <Typography gutterBottom>
              <span>Repository name : </span> {details?.name}
            </Typography>
            <Typography gutterBottom>
              <span>Created at :</span> {details?.created_at}
            </Typography>
            <Typography gutterBottom variant='body1'>
              <span>Language : </span>
              {details?.language === null ? ' no data' : details?.language}
            </Typography>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RepoDetails
