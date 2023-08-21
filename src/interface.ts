interface IOwner {
  avatar_url: string
  login: string
}

export interface IRepo {
  id: string | number
  owner: IOwner
  name: string
  created_at: string
  language: null | string
}
