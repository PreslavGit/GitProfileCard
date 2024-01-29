import { GithubService } from "./GithubService";
import { Repository, RepositoryLanguages, User } from "./types";

export class GithubServiceMock extends GithubService {
    public async getRepoLanguages(): Promise<RepositoryLanguages> {
        return { "Typescript": 123123, "C#": 92834, "CSS": 23234, "JSON": 234, "YAML": 212 }
    }

    public async getUserByUsername(): Promise<User | null> {
        return {
            avatar_url: "https://avatars.githubusercontent.com/u/115504848?s=400&v=4",
            login: "PreslavGit",
            html_url: "https://github.com/PreslavGit"
        }
    }

    public async getUserRepos(): Promise<Repository[]> {
        return [
            { name: "BRS-4", html_url: "https://github.com/PreslavGit/BRS-4", forks: 25, stargazers_count: 25 },
            { name: "BRS-3", html_url: "https://github.com/PreslavGit/BRS-4", forks: 10, stargazers_count: 15 }
        ]
    }
}