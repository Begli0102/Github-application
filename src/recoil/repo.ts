import React from 'react'
import { atom } from 'recoil'
import { IRepo } from '../interface'

interface IRepoDetails {
  details: IRepo
  loadingDetails: boolean
  open: boolean
}

const initialState: IRepoDetails = {
  details: {
    id: '',
    owner: {
      avatar_url: '',
      login: ''
    },
    name: '',
    created_at: '',
    language: ''
  },

  loadingDetails: false,
  open: false
}

export const RepoState = atom({
  key: 'RepoState',
  default: initialState
})
