export type User = {
  avatar_url: string 
  html_url: string
  login: string
  
  repositories?: Repository[]
}

export type Repository = {
    name: string
    html_url: string
    forks: number
    stargazers_count: number
    
    languages?: RepositoryLanguages
}

export type RepositoryLanguages = {
    [key: string]: number
}

export type APIErrorMsg = {
  message: string,
  documentation_url: string
}