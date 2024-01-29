import { APIErrorMsg, Repository, RepositoryLanguages, User } from "./types"

export class GithubService {
  private URL = 'https://api.github.com'
  
  public async getUserByUsername(username: string){
    let user: User | null = null 
    try {
      user = await this.fetchRequest<User>(`/users/${username}`)
    } catch (e) {
      this.handleError(e)
    }
    
    return user;
  }
  
  public async getUserRepos(username: string){
    let repos: Repository[] = []
    try {
      repos = await this.fetchRequest<Repository[]>(`/users/${username}/repos`)
    } catch (e) {
      this.handleError(e)
    }
    
    return repos;
  }

  public async getRepoLanguages(username: string, repository: string){
    let langs: RepositoryLanguages = {}
    try {
      langs = await this.fetchRequest<RepositoryLanguages>(`/repos/${username}/${repository}/languages`)
    } catch (e) {
      this.handleError(e)
    }
    
    return langs;
  }

  private async fetchRequest<T>(route: string): Promise<T> {
    const res = await fetch(this.URL + route)

    if (res.status >= 400) {
      const err = await res.json() as APIErrorMsg
      throw new Error(err.message)
    }

    const json = await res.json() as T
    return json
  }

  private handleError(err: unknown){
    alert(err)
  }
}