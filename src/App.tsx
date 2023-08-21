import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Button,
  TextField,
  Typography,
  Box,
  Badge,
  CircularProgress,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import axios from 'axios'
import RepoDetails from './components/repoDetails'
import { IRepo } from './interface'

function App () {
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [repos, setRepos] = useState<IRepo[]>([])
  const [details, setDetails] = useState<IRepo>()
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setUsername(inputValue)
  }

  const handleGetRepos = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    await axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        const data = res.data
        console.log(data)
        setLoading(false)
        setRepos(data)
      })
  }

  const getRepoDetails = async (repoName: string) => {
    setLoadingDetails(true)
    await axios
      .get(`https://api.github.com/repos/${username}/${repoName}`)
      .then(res => {
        const data = res.data
        console.log(data)
        setLoadingDetails(false)
        setDetails(data)
      })
    setOpen(true)
  }

  const renderRepo = () => {
    return repos.map((repo: IRepo, index: number) => {
      return (
        <div className='single__repo' key={repo.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant='h6' sx={{}}>
                {index + 1} - {repo.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' onClick={() => getRepoDetails(repo.name)}>
                Details
              </Button>
            </CardActions>
          </Card>
        </div>
      )
    })
  }

  useEffect(() => {
    setRepos([])
  }, [username])

  return (
    <div className='app'>
      <div className='app__container'>
        <Box component='form'>
          <Badge badgeContent={repos.length} color='primary'>
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '2rem',
                textAlign: 'left'
              }}
              variant='body1'
            >
              Github App
            </Typography>
          </Badge>

          <TextField
            id='outlined-error'
            label='Github username'
            value={username}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type='submit'
            disabled={username.length === 0}
            variant='contained'
            onClick={handleGetRepos}
          >
            Search
          </Button>
        </Box>
      </div>
      <div>{loading && <CircularProgress />}</div>
      <div className='container__result'> {renderRepo()} </div>
      <RepoDetails
        details={details}
        loadingDetails={loadingDetails}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default App
