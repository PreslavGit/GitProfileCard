import { User, Repository } from "./types"

export const userMock = {
  avatar_url: "https://avatars.githubusercontent.com/u/115504848?s=400&v=4",
  login: "PreslavGit",
  html_url: "https://github.com/PreslavGit"
} as User

export const reposMock = [
  { name: "BRS-4", html_url: "https://github.com/PreslavGit/BRS-4" , forks: 25, stargazers_count: 25 },
  { name: "BRS-3", html_url: "https://github.com/PreslavGit/BRS-4", forks: 10, stargazers_count: 15 }
] as Repository[]

export const langsMock = { "Typescript": 123123, "C#": 92834, "CSS": 23234, "JSON": 234, "YAML": 212}

