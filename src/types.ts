export type User = {
  avatar_url: string 
  events_url:string 
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number 
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  siteadmin: boolean
  starred_url: string
  subscriptions_url: string
  type: "User" | "Organization" 
  url: string
  
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