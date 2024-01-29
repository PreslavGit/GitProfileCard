import { GithubService } from './GithubService';
import { langsMock, reposMock, userMock } from './mocks';
import './style.css'
import { Repository } from './types';

const USE_MOCKS = true

window.addEventListener('load', async () => {
  const cardElements = getCardElements()

  const service = new GithubService()
  const username = "PreslavGit"
  const user = USE_MOCKS ? userMock : await service.getUserByUsername(username)
  const repos = USE_MOCKS ? reposMock : await service.getUserRepos(username)

  for (const repo of repos) {
    const repoLangs = USE_MOCKS ? langsMock : await service.getRepoLanguages(username, repo.name)
    repo.languages = repoLangs
  }

  if (!user) return

  cardElements.avatar.src = user.avatar_url
  cardElements.username.innerText = user.login
  cardElements.username.href = user.html_url

  repos.forEach(r => {
    const template = document.createElement('template')
    template.innerHTML = createRepo(r)
    const repoHTML = template.content.firstElementChild

    if (repoHTML) {
      cardElements.repos?.appendChild(repoHTML)
    }
  })

})

function getCardElements() {
  const avatar = document.getElementById('avatar') as HTMLImageElement
  const username = document.getElementById('username') as HTMLAnchorElement
  const repos = document.getElementById('repos')

  return {
    avatar,
    username,
    repos,
  }
}

function createRepo(repo: Repository) {
  
  if(repo.languages == null){
    repo.languages = {}
  }
  const languages = Object.keys(repo.languages)
  const langsByteSum = languages.reduce((prev, curr) => {
    const acc = repo.languages?.[curr] ?? 0
    return prev + acc
  }, 0)


  return `
    <div class="repo">
      <div>
        <a class="repoName" target="_blank" href="${repo.html_url}">
          ${repo.name} 
        </a>
        <span>
          <svg viewBox="0 0 16 16" version="1.1" width="14">
            <path stroke="#fcba03" fill="#fcba03" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
          </svg>
          ${repo.stargazers_count} 
          <svg viewBox="0 0 16 16" version="1.1" width="14">
            <path stroke="#a3a3a3" fill="#a3a3a3" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
          ${repo.forks}
        </span>
      </div>
      <div class="repoLangs">
        ${languages.map((l, i) => {
          if(i < 3){
            return `<div class="repoLang">${l} - ${displayPercentage(langsByteSum, (repo.languages?.[l] ?? 0))}%</div>`
          }else if(i ===3){
            return `<div class="repoLangsMore">+ ${languages.length - 3} more</div>`
          }
        }).join('')}
      </div>
    </div>
  `
}

function displayPercentage(sum: number, part: number){
  return (part / sum * 100).toFixed() 
}