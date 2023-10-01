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
import { useRecoilState } from 'recoil'
import { RepoState } from './recoil/repo'

function App () {
  //useState for local state
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [repos, setRepos] = useState<IRepo[]>([])

  //recoil for global state
  const [repoState, setRepoState] = useRecoilState(RepoState)

  // tracking of a change in input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setUsername(inputValue)
  }

  //fetching repositories
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
      .catch(err => {
        console.log(err.message)
      })
  }

  //fetching details from a specific repository
  const getRepoDetails = (repoName: string) => {
    setRepoState({
      ...repoState,
      loadingDetails: true
    })
    axios
      .get(`https://api.github.com/repos/${username}/${repoName}`)
      .then(res => {
        const data = res.data
        //recoil
        setRepoState({
          ...repoState,
          loadingDetails: false,
          details: data,
          open: true
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  // renders all repositories after fetching them
  const renderRepo = () => {
    return repos.map((repo: IRepo, index: number) => {
      return (
        <div className='single__repo' key={repo.id}>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography variant='h6'>
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

  // if any changes occur in an input field
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
        </Box>

        <Button
          type='submit'
          disabled={username === '' || repos.length !== 0}
          variant='contained'
          onClick={handleGetRepos}
        >
          Search
        </Button>
      </div>
      <div>{loading && <CircularProgress />}</div>
      <div className='container__result'> {renderRepo()} </div>
      <RepoDetails />
    </div>
  )
}

export default App
