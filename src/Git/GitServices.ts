import { GitRepository } from "../Git/Git";

/**
 * Contribution ids of Azure Pipelines services which can be obtained from DevOps.getService
 */
export enum GitServiceIds {
    VersionControlRepositoryService = "ms.vss-code-web.vc-repository-service"
}

/**
 * Host service for accessing repository information.
 */
export interface IVersionControlRepositoryService {
    /**
     * Gets the currently selected Git repository. Returns null if a Git repository is not currently selected.
     */
    getCurrentGitRepository(): Promise<GitRepository | null>;
}