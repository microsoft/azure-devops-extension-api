/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as TfsCore from "../Core/Core";
import * as Git from "../Git/Git";
import * as Policy from "../Policy/Policy";
import * as WebApi from "../WebApi/WebApi";

export class GitRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "4e080c62-fa21-4fbc-8fef-2a10a2b38049";

    /**
     * Create an annotated tag.
     * 
     * @param tagObject - Object containing details of tag to be created.
     * @param project - Project ID or project name
     * @param repositoryId - ID or name of the repository.
     */
    public async createAnnotatedTag(
        tagObject: Git.GitAnnotatedTag,
        project: string,
        repositoryId: string
        ): Promise<Git.GitAnnotatedTag> {

        return this.beginRequest<Git.GitAnnotatedTag>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/annotatedTags/{objectId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: tagObject
        });
    }

    /**
     * Get an annotated tag.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - ID or name of the repository.
     * @param objectId - ObjectId (Sha1Id) of tag to get.
     */
    public async getAnnotatedTag(
        project: string,
        repositoryId: string,
        objectId: string
        ): Promise<Git.GitAnnotatedTag> {

        return this.beginRequest<Git.GitAnnotatedTag>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/annotatedTags/{objectId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                objectId: objectId
            }
        });
    }

    /**
     * Get a single blob.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param sha1 - SHA1 hash of the file. You can get the SHA1 of a file using the "Git/Items/Get Item" endpoint.
     * @param project - Project ID or project name
     * @param download - If true, prompt for a download rather than rendering in a browser. Note: this value defaults to true if $format is zip
     * @param fileName - Provide a fileName to use for a download.
     * @param resolveLfs - If true, try to resolve a blob to its LFS contents, if it's an LFS pointer file. Only compatible with octet-stream Accept headers or $format types
     */
    public async getBlob(
        repositoryId: string,
        sha1: string,
        project?: string,
        download?: boolean,
        fileName?: string,
        resolveLfs?: boolean
        ): Promise<Git.GitBlobRef> {

        const queryValues: any = {
            download: download,
            fileName: fileName,
            resolveLfs: resolveLfs
        };

        return this.beginRequest<Git.GitBlobRef>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Blobs/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                sha1: sha1
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a single blob.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param sha1 - SHA1 hash of the file. You can get the SHA1 of a file using the "Git/Items/Get Item" endpoint.
     * @param project - Project ID or project name
     * @param download - If true, prompt for a download rather than rendering in a browser. Note: this value defaults to true if $format is zip
     * @param fileName - Provide a fileName to use for a download.
     * @param resolveLfs - If true, try to resolve a blob to its LFS contents, if it's an LFS pointer file. Only compatible with octet-stream Accept headers or $format types
     */
    public async getBlobContent(
        repositoryId: string,
        sha1: string,
        project?: string,
        download?: boolean,
        fileName?: string,
        resolveLfs?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            download: download,
            fileName: fileName,
            resolveLfs: resolveLfs
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Blobs/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                sha1: sha1
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets one or more blobs in a zip file download.
     * 
     * @param blobIds - Blob IDs (SHA1 hashes) to be returned in the zip file.
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param filename - 
     */
    public async getBlobsZip(
        blobIds: string[],
        repositoryId: string,
        project?: string,
        filename?: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            filename: filename
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Blobs/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            body: blobIds
        });
    }

    /**
     * Get a single blob.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param sha1 - SHA1 hash of the file. You can get the SHA1 of a file using the "Git/Items/Get Item" endpoint.
     * @param project - Project ID or project name
     * @param download - If true, prompt for a download rather than rendering in a browser. Note: this value defaults to true if $format is zip
     * @param fileName - Provide a fileName to use for a download.
     * @param resolveLfs - If true, try to resolve a blob to its LFS contents, if it's an LFS pointer file. Only compatible with octet-stream Accept headers or $format types
     */
    public async getBlobZip(
        repositoryId: string,
        sha1: string,
        project?: string,
        download?: boolean,
        fileName?: string,
        resolveLfs?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            download: download,
            fileName: fileName,
            resolveLfs: resolveLfs
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Blobs/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                sha1: sha1
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve statistics about a single branch.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param name - Name of the branch.
     * @param project - Project ID or project name
     * @param baseVersionDescriptor - Identifies the commit or branch to use as the base.
     */
    public async getBranch(
        repositoryId: string,
        name: string,
        project?: string,
        baseVersionDescriptor?: Git.GitVersionDescriptor
        ): Promise<Git.GitBranchStats> {

        const queryValues: any = {
            name: name,
            baseVersionDescriptor: baseVersionDescriptor
        };

        return this.beginRequest<Git.GitBranchStats>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/stats/branches",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve statistics about all branches within a repository.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param baseVersionDescriptor - Identifies the commit or branch to use as the base.
     */
    public async getBranches(
        repositoryId: string,
        project?: string,
        baseVersionDescriptor?: Git.GitVersionDescriptor
        ): Promise<Git.GitBranchStats[]> {

        const queryValues: any = {
            baseVersionDescriptor: baseVersionDescriptor
        };

        return this.beginRequest<Git.GitBranchStats[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/stats/branches",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param searchCriteria - 
     * @param repositoryId - 
     * @param project - Project ID or project name
     */
    public async getBranchStatsBatch(
        searchCriteria: Git.GitQueryBranchStatsCriteria,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitBranchStats[]> {

        return this.beginRequest<Git.GitBranchStats[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/stats/branches",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: searchCriteria
        });
    }

    /**
     * Retrieve changes for a particular commit.
     * 
     * @param commitId - The id of the commit.
     * @param repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param project - Project ID or project name
     * @param top - The maximum number of changes to return.
     * @param skip - The number of changes to skip.
     */
    public async getChanges(
        commitId: string,
        repositoryId: string,
        project?: string,
        top?: number,
        skip?: number
        ): Promise<Git.GitCommitChanges> {

        const queryValues: any = {
            top: top,
            skip: skip
        };

        return this.beginRequest<Git.GitCommitChanges>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/commits/{commitId}/Changes",
            routeValues: {
                project: project,
                commitId: commitId,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve one conflict for a cherry pick by ID
     * 
     * @param repositoryId - 
     * @param cherryPickId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async getCherryPickConflict(
        repositoryId: string,
        cherryPickId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                cherryPickId: cherryPickId,
                conflictId: conflictId
            }
        });
    }

    /**
     * Retrieve all conflicts for a cherry pick
     * 
     * @param repositoryId - 
     * @param cherryPickId - 
     * @param project - Project ID or project name
     * @param continuationToken - 
     * @param top - 
     * @param excludeResolved - 
     * @param onlyResolved - 
     * @param includeObsolete - 
     */
    public async getCherryPickConflicts(
        repositoryId: string,
        cherryPickId: number,
        project?: string,
        continuationToken?: string,
        top?: number,
        excludeResolved?: boolean,
        onlyResolved?: boolean,
        includeObsolete?: boolean
        ): Promise<Git.GitConflict[]> {

        const queryValues: any = {
            continuationToken: continuationToken,
            '$top': top,
            excludeResolved: excludeResolved,
            onlyResolved: onlyResolved,
            includeObsolete: includeObsolete
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                cherryPickId: cherryPickId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Git.GitConflict[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Update merge conflict resolution
     * 
     * @param conflict - 
     * @param repositoryId - 
     * @param cherryPickId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async updateCherryPickConflict(
        conflict: Git.GitConflict,
        repositoryId: string,
        cherryPickId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                cherryPickId: cherryPickId,
                conflictId: conflictId
            },
            body: conflict
        });
    }

    /**
     * Update multiple merge conflict resolutions
     * 
     * @param conflictUpdates - 
     * @param repositoryId - 
     * @param cherryPickId - 
     * @param project - Project ID or project name
     */
    public async updateCherryPickConflicts(
        conflictUpdates: Git.GitConflict[],
        repositoryId: string,
        cherryPickId: number,
        project?: string
        ): Promise<Git.GitConflictUpdateResult[]> {

        return this.beginRequest<Git.GitConflictUpdateResult[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                cherryPickId: cherryPickId
            },
            body: conflictUpdates
        });
    }

    /**
     * Given a commitId, returns a list of commits that are in the same cherry-pick family.
     * 
     * @param repositoryNameOrId - 
     * @param commitId - 
     * @param project - Project ID or project name
     * @param includeLinks - 
     */
    public async getCherryPickRelationships(
        repositoryNameOrId: string,
        commitId: string,
        project?: string,
        includeLinks?: boolean
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/cherryPickRelationships/{commitId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId,
                commitId: commitId
            },
            queryParams: queryValues
        });
    }

    /**
     * Cherry pick a specific commit or commits that are associated to a pull request into a new branch.
     * 
     * @param cherryPickToCreate - 
     * @param project - Project ID or project name
     * @param repositoryId - ID of the repository.
     */
    public async createCherryPick(
        cherryPickToCreate: Git.GitAsyncRefOperationParameters,
        project: string,
        repositoryId: string
        ): Promise<Git.GitCherryPick> {

        return this.beginRequest<Git.GitCherryPick>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: cherryPickToCreate
        });
    }

    /**
     * Retrieve information about a cherry pick operation by cherry pick Id.
     * 
     * @param project - Project ID or project name
     * @param cherryPickId - ID of the cherry pick.
     * @param repositoryId - ID of the repository.
     */
    public async getCherryPick(
        project: string,
        cherryPickId: number,
        repositoryId: string
        ): Promise<Git.GitCherryPick> {

        return this.beginRequest<Git.GitCherryPick>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}",
            routeValues: {
                project: project,
                cherryPickId: cherryPickId,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * Retrieve information about a cherry pick operation for a specific branch. This operation is expensive due to the underlying object structure, so this API only looks at the 1000 most recent cherry pick operations.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - ID of the repository.
     * @param refName - The GitAsyncRefOperationParameters generatedRefName used for the cherry pick operation.
     */
    public async getCherryPickForRefName(
        project: string,
        repositoryId: string,
        refName: string
        ): Promise<Git.GitCherryPick> {

        const queryValues: any = {
            refName: refName
        };

        return this.beginRequest<Git.GitCherryPick>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/cherryPicks/{cherryPickId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Find the closest common commit (the merge base) between base and target commits, and get the diff between either the base and target commits or common and target commits.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param diffCommonCommit - If true, diff between common and target commits. If false, diff between base and target commits.
     * @param top - Maximum number of changes to return. Defaults to 100.
     * @param skip - Number of changes to skip
     * @param baseVersionDescriptor - Descriptor for base commit.
     * @param targetVersionDescriptor - Descriptor for target commit.
     */
    public async getCommitDiffs(
        repositoryId: string,
        project?: string,
        diffCommonCommit?: boolean,
        top?: number,
        skip?: number,
        baseVersionDescriptor?: Git.GitBaseVersionDescriptor,
        targetVersionDescriptor?: Git.GitTargetVersionDescriptor
        ): Promise<Git.GitCommitDiffs> {

        const queryValues: any = {
            diffCommonCommit: diffCommonCommit,
            '$top': top,
            '$skip': skip,
        };
        if (baseVersionDescriptor) {
            queryValues.baseVersionType = baseVersionDescriptor.versionType;
            queryValues.baseVersion = baseVersionDescriptor.version;
            queryValues.baseVersionOptions = baseVersionDescriptor.versionOptions;
        }
        if (targetVersionDescriptor) {
            queryValues.targetVersionType = targetVersionDescriptor.versionType;
            queryValues.targetVersion = targetVersionDescriptor.version;
            queryValues.targetVersionOptions = targetVersionDescriptor.versionOptions;
        }

        return this.beginRequest<Git.GitCommitDiffs>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/diffs/commits",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a particular commit.
     * 
     * @param commitId - The id of the commit.
     * @param repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param project - Project ID or project name
     * @param changeCount - The number of changes to include in the result.
     */
    public async getCommit(
        commitId: string,
        repositoryId: string,
        project?: string,
        changeCount?: number
        ): Promise<Git.GitCommit> {

        const queryValues: any = {
            changeCount: changeCount
        };

        return this.beginRequest<Git.GitCommit>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Commits/{commitId}",
            routeValues: {
                project: project,
                commitId: commitId,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve git commits for a project
     * 
     * @param repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param searchCriteria - 
     * @param project - Project ID or project name
     */
    public async getCommits(
        repositoryId: string,
        searchCriteria: Git.GitQueryCommitsCriteria,
        project?: string
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            searchCriteria: searchCriteria
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Commits/{commitId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a list of commits associated with a particular push.
     * 
     * @param repositoryId - The id or friendly name of the repository. To use the friendly name, projectId must also be specified.
     * @param pushId - The id of the push.
     * @param project - Project ID or project name
     * @param top - The maximum number of commits to return ("get the top x commits").
     * @param skip - The number of commits to skip.
     * @param includeLinks - Set to false to avoid including REST Url links for resources. Defaults to true.
     */
    public async getPushCommits(
        repositoryId: string,
        pushId: number,
        project?: string,
        top?: number,
        skip?: number,
        includeLinks?: boolean
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            pushId: pushId,
            top: top,
            skip: skip,
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Commits/{commitId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve git commits for a project matching the search criteria
     * 
     * @param searchCriteria - Search options
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param skip - Number of commits to skip.
     * @param top - Maximum number of commits to return.
     * @param includeStatuses - True to include additional commit status information.
     */
    public async getCommitsBatch(
        searchCriteria: Git.GitQueryCommitsCriteria,
        repositoryId: string,
        project?: string,
        skip?: number,
        top?: number,
        includeStatuses?: boolean
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            '$skip': skip,
            '$top': top,
            includeStatuses: includeStatuses
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/CommitsBatch",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            body: searchCriteria
        });
    }

    /**
     * Retrieve deleted git repositories.
     * 
     * @param project - Project ID or project name
     */
    public async getDeletedRepositories(
        project: string
        ): Promise<Git.GitDeletedRepository[]> {

        return this.beginRequest<Git.GitDeletedRepository[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/DeletedRepositories",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Get the file diffs for each of the specified files
     * 
     * @param fileDiffsCriteria - List of file parameters objects
     * @param project - Project ID or project name
     * @param repositoryId - The name or ID of the repository
     */
    public async getFileDiffs(
        fileDiffsCriteria: Git.FileDiffsCriteria,
        project: string,
        repositoryId: string
        ): Promise<Git.FileDiff[]> {

        return this.beginRequest<Git.FileDiff[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/FileDiffs",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: fileDiffsCriteria
        });
    }

    /**
     * Retrieve all forks of a repository in the collection.
     * 
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param collectionId - Team project collection ID.
     * @param project - Project ID or project name
     * @param includeLinks - True to include links.
     */
    public async getForks(
        repositoryNameOrId: string,
        collectionId: string,
        project?: string,
        includeLinks?: boolean
        ): Promise<Git.GitRepositoryRef[]> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitRepositoryRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/forks/{collectionId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId,
                collectionId: collectionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Request that another repository's refs be fetched into this one. It syncs two existing forks. To create a fork, please see the \<a href="https://docs.microsoft.com/en-us/rest/api/vsts/git/repositories/create?view=azure-devops-rest-5.1"\> repositories endpoint\</a\>
     * 
     * @param syncParams - Source repository and ref mapping.
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param includeLinks - True to include links
     */
    public async createForkSyncRequest(
        syncParams: Git.GitForkSyncRequestParameters,
        repositoryNameOrId: string,
        project?: string,
        includeLinks?: boolean
        ): Promise<Git.GitForkSyncRequest> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitForkSyncRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/forkSyncRequests/{forkSyncOperationId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId
            },
            queryParams: queryValues,
            body: syncParams
        });
    }

    /**
     * Get a specific fork sync operation's details.
     * 
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param forkSyncOperationId - OperationId of the sync request.
     * @param project - Project ID or project name
     * @param includeLinks - True to include links.
     */
    public async getForkSyncRequest(
        repositoryNameOrId: string,
        forkSyncOperationId: number,
        project?: string,
        includeLinks?: boolean
        ): Promise<Git.GitForkSyncRequest> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitForkSyncRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/forkSyncRequests/{forkSyncOperationId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId,
                forkSyncOperationId: forkSyncOperationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve all requested fork sync operations on this repository.
     * 
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param includeAbandoned - True to include abandoned requests.
     * @param includeLinks - True to include links.
     */
    public async getForkSyncRequests(
        repositoryNameOrId: string,
        project?: string,
        includeAbandoned?: boolean,
        includeLinks?: boolean
        ): Promise<Git.GitForkSyncRequest[]> {

        const queryValues: any = {
            includeAbandoned: includeAbandoned,
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitForkSyncRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/forkSyncRequests/{forkSyncOperationId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create an import request.
     * 
     * @param importRequest - The import request to create.
     * @param project - Project ID or project name
     * @param repositoryId - The name or ID of the repository.
     */
    public async createImportRequest(
        importRequest: Git.GitImportRequest,
        project: string,
        repositoryId: string
        ): Promise<Git.GitImportRequest> {

        return this.beginRequest<Git.GitImportRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/importRequests/{importRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: importRequest
        });
    }

    /**
     * Retrieve a particular import request.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - The name or ID of the repository.
     * @param importRequestId - The unique identifier for the import request.
     */
    public async getImportRequest(
        project: string,
        repositoryId: string,
        importRequestId: number
        ): Promise<Git.GitImportRequest> {

        return this.beginRequest<Git.GitImportRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/importRequests/{importRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                importRequestId: importRequestId
            }
        });
    }

    /**
     * Retrieve import requests for a repository.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - The name or ID of the repository.
     * @param includeAbandoned - True to include abandoned import requests in the results.
     */
    public async queryImportRequests(
        project: string,
        repositoryId: string,
        includeAbandoned?: boolean
        ): Promise<Git.GitImportRequest[]> {

        const queryValues: any = {
            includeAbandoned: includeAbandoned
        };

        return this.beginRequest<Git.GitImportRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/importRequests/{importRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retry or abandon a failed import request.
     * 
     * @param importRequestToUpdate - The updated version of the import request. Currently, the only change allowed is setting the Status to Queued or Abandoned.
     * @param project - Project ID or project name
     * @param repositoryId - The name or ID of the repository.
     * @param importRequestId - The unique identifier for the import request to update.
     */
    public async updateImportRequest(
        importRequestToUpdate: Git.GitImportRequest,
        project: string,
        repositoryId: string,
        importRequestId: number
        ): Promise<Git.GitImportRequest> {

        return this.beginRequest<Git.GitImportRequest>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/importRequests/{importRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                importRequestId: importRequestId
            },
            body: importRequestToUpdate
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content, which is always returned as a download.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param path - The item path.
     * @param project - Project ID or project name
     * @param scopePath - The path scope.  The default is null.
     * @param recursionLevel - The recursion level of this request. The default is 'none', no recursion.
     * @param includeContentMetadata - Set to true to include content metadata.  Default is false.
     * @param latestProcessedChange - Set to true to include the latest changes.  Default is false.
     * @param download - Set to true to download the response as a file.  Default is false.
     * @param versionDescriptor - Version descriptor.  Default is the default branch for the repository.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     * @param resolveLfs - Set to true to resolve Git LFS pointer files to return actual content from Git LFS.  Default is false.
     * @param sanitize - Set to true to sanitize an svg file and return it as image. Useful only if requested for svg file. Default is false.
     */
    public async getItem(
        repositoryId: string,
        path: string,
        project?: string,
        scopePath?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContentMetadata?: boolean,
        latestProcessedChange?: boolean,
        download?: boolean,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean,
        resolveLfs?: boolean,
        sanitize?: boolean
        ): Promise<Git.GitItem> {

        const queryValues: any = {
            path: path,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeContentMetadata: includeContentMetadata,
            latestProcessedChange: latestProcessedChange,
            download: download,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent,
            resolveLfs: resolveLfs,
            sanitize: sanitize
        };

        return this.beginRequest<Git.GitItem>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Items/{*path}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content, which is always returned as a download.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param path - The item path.
     * @param project - Project ID or project name
     * @param scopePath - The path scope.  The default is null.
     * @param recursionLevel - The recursion level of this request. The default is 'none', no recursion.
     * @param includeContentMetadata - Set to true to include content metadata.  Default is false.
     * @param latestProcessedChange - Set to true to include the latest changes.  Default is false.
     * @param download - Set to true to download the response as a file.  Default is false.
     * @param versionDescriptor - Version descriptor.  Default is the default branch for the repository.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     * @param resolveLfs - Set to true to resolve Git LFS pointer files to return actual content from Git LFS.  Default is false.
     * @param sanitize - Set to true to sanitize an svg file and return it as image. Useful only if requested for svg file. Default is false.
     */
    public async getItemContent(
        repositoryId: string,
        path: string,
        project?: string,
        scopePath?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContentMetadata?: boolean,
        latestProcessedChange?: boolean,
        download?: boolean,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean,
        resolveLfs?: boolean,
        sanitize?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            path: path,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeContentMetadata: includeContentMetadata,
            latestProcessedChange: latestProcessedChange,
            download: download,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent,
            resolveLfs: resolveLfs,
            sanitize: sanitize
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Items/{*path}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a collection of items. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param scopePath - The path scope.  The default is null.
     * @param recursionLevel - The recursion level of this request. The default is 'none', no recursion.
     * @param includeContentMetadata - Set to true to include content metadata.  Default is false.
     * @param latestProcessedChange - Set to true to include the latest changes.  Default is false.
     * @param download - Set to true to download the response as a file.  Default is false.
     * @param includeLinks - Set to true to include links to items.  Default is false.
     * @param versionDescriptor - Version descriptor.  Default is the default branch for the repository.
     * @param zipForUnix - Set to true to keep the file permissions for unix (and POSIX) systems like executables and symlinks
     */
    public async getItems(
        repositoryId: string,
        project?: string,
        scopePath?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContentMetadata?: boolean,
        latestProcessedChange?: boolean,
        download?: boolean,
        includeLinks?: boolean,
        versionDescriptor?: Git.GitVersionDescriptor,
        zipForUnix?: boolean
        ): Promise<Git.GitItem[]> {

        const queryValues: any = {
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeContentMetadata: includeContentMetadata,
            latestProcessedChange: latestProcessedChange,
            download: download,
            includeLinks: includeLinks,
            versionDescriptor: versionDescriptor,
            zipForUnix: zipForUnix
        };

        return this.beginRequest<Git.GitItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Items/{*path}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content, which is always returned as a download.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param path - The item path.
     * @param project - Project ID or project name
     * @param scopePath - The path scope.  The default is null.
     * @param recursionLevel - The recursion level of this request. The default is 'none', no recursion.
     * @param includeContentMetadata - Set to true to include content metadata.  Default is false.
     * @param latestProcessedChange - Set to true to include the latest changes.  Default is false.
     * @param download - Set to true to download the response as a file.  Default is false.
     * @param versionDescriptor - Version descriptor.  Default is the default branch for the repository.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     * @param resolveLfs - Set to true to resolve Git LFS pointer files to return actual content from Git LFS.  Default is false.
     * @param sanitize - Set to true to sanitize an svg file and return it as image. Useful only if requested for svg file. Default is false.
     */
    public async getItemText(
        repositoryId: string,
        path: string,
        project?: string,
        scopePath?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContentMetadata?: boolean,
        latestProcessedChange?: boolean,
        download?: boolean,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean,
        resolveLfs?: boolean,
        sanitize?: boolean
        ): Promise<string> {

        const queryValues: any = {
            path: path,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeContentMetadata: includeContentMetadata,
            latestProcessedChange: latestProcessedChange,
            download: download,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent,
            resolveLfs: resolveLfs,
            sanitize: sanitize
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Items/{*path}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content, which is always returned as a download.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param path - The item path.
     * @param project - Project ID or project name
     * @param scopePath - The path scope.  The default is null.
     * @param recursionLevel - The recursion level of this request. The default is 'none', no recursion.
     * @param includeContentMetadata - Set to true to include content metadata.  Default is false.
     * @param latestProcessedChange - Set to true to include the latest changes.  Default is false.
     * @param download - Set to true to download the response as a file.  Default is false.
     * @param versionDescriptor - Version descriptor.  Default is the default branch for the repository.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     * @param resolveLfs - Set to true to resolve Git LFS pointer files to return actual content from Git LFS.  Default is false.
     * @param sanitize - Set to true to sanitize an svg file and return it as image. Useful only if requested for svg file. Default is false.
     */
    public async getItemZip(
        repositoryId: string,
        path: string,
        project?: string,
        scopePath?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContentMetadata?: boolean,
        latestProcessedChange?: boolean,
        download?: boolean,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean,
        resolveLfs?: boolean,
        sanitize?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            path: path,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeContentMetadata: includeContentMetadata,
            latestProcessedChange: latestProcessedChange,
            download: download,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent,
            resolveLfs: resolveLfs,
            sanitize: sanitize
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Items/{*path}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Post for retrieving a creating a batch out of a set of items in a repo / project given a list of paths or a long path
     * 
     * @param requestData - Request data attributes: ItemDescriptors, IncludeContentMetadata, LatestProcessedChange, IncludeLinks. ItemDescriptors: Collection of items to fetch, including path, version, and recursion level. IncludeContentMetadata: Whether to include metadata for all items LatestProcessedChange: Whether to include shallow ref to commit that last changed each item. IncludeLinks: Whether to include the _links field on the shallow references.
     * @param repositoryId - The name or ID of the repository
     * @param project - Project ID or project name
     */
    public async getItemsBatch(
        requestData: Git.GitItemRequestData,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitItem[][]> {

        return this.beginRequest<Git.GitItem[][]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/ItemsBatch",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: requestData
        });
    }

    /**
     * Find the merge bases of two commits, optionally across forks. If otherRepositoryId is not specified, the merge bases will only be calculated within the context of the local repositoryNameOrId.
     * 
     * @param repositoryNameOrId - ID or name of the local repository.
     * @param commitId - First commit, usually the tip of the target branch of the potential merge.
     * @param otherCommitId - Other commit, usually the tip of the source branch of the potential merge.
     * @param project - Project ID or project name
     * @param otherCollectionId - The collection ID where otherCommitId lives.
     * @param otherRepositoryId - The repository ID where otherCommitId lives.
     */
    public async getMergeBases(
        repositoryNameOrId: string,
        commitId: string,
        otherCommitId: string,
        project?: string,
        otherCollectionId?: string,
        otherRepositoryId?: string
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            otherCommitId: otherCommitId,
            otherCollectionId: otherCollectionId,
            otherRepositoryId: otherRepositoryId
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/commits/{commitId}/mergeBases",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId,
                commitId: commitId
            },
            queryParams: queryValues
        });
    }

    /**
     * Request a git merge operation. Currently we support merging only 2 commits.
     * 
     * @param mergeParameters - Parents commitIds and merge commit messsage.
     * @param project - Project ID or project name
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param includeLinks - True to include links
     */
    public async createMergeRequest(
        mergeParameters: Git.GitMergeParameters,
        project: string,
        repositoryNameOrId: string,
        includeLinks?: boolean
        ): Promise<Git.GitMerge> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitMerge>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/merges/{mergeOperationId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId
            },
            queryParams: queryValues,
            body: mergeParameters
        });
    }

    /**
     * Get a specific merge operation's details.
     * 
     * @param project - Project ID or project name
     * @param repositoryNameOrId - The name or ID of the repository.
     * @param mergeOperationId - OperationId of the merge request.
     * @param includeLinks - True to include links
     */
    public async getMergeRequest(
        project: string,
        repositoryNameOrId: string,
        mergeOperationId: number,
        includeLinks?: boolean
        ): Promise<Git.GitMerge> {

        const queryValues: any = {
            includeLinks: includeLinks
        };

        return this.beginRequest<Git.GitMerge>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryNameOrId}/merges/{mergeOperationId}",
            routeValues: {
                project: project,
                repositoryNameOrId: repositoryNameOrId,
                mergeOperationId: mergeOperationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Attach a new file to a pull request.
     * 
     * @param content - Content to upload
     * @param fileName - The name of the file.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async createAttachment(
        content: any,
        fileName: string,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.Attachment> {

        return this.beginRequest<Git.Attachment>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/attachments/{fileName}",
            routeValues: {
                project: project,
                fileName: fileName,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * Delete a pull request attachment.
     * 
     * @param fileName - The name of the attachment to delete.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async deleteAttachment(
        fileName: string,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/attachments/{fileName}",
            routeValues: {
                project: project,
                fileName: fileName,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Get the file content of a pull request attachment.
     * 
     * @param fileName - The name of the attachment.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getAttachmentContent(
        fileName: string,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/attachments/{fileName}",
            routeValues: {
                project: project,
                fileName: fileName,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Get a list of files attached to a given pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getAttachments(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.Attachment[]> {

        return this.beginRequest<Git.Attachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/attachments/{fileName}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Get the file content of a pull request attachment.
     * 
     * @param fileName - The name of the attachment.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getAttachmentZip(
        fileName: string,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/attachments/{fileName}",
            routeValues: {
                project: project,
                fileName: fileName,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Add a like on a comment.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - The ID of the thread that contains the comment.
     * @param commentId - The ID of the comment.
     * @param project - Project ID or project name
     */
    public async createLike(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}/likes",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            }
        });
    }

    /**
     * Delete a like on a comment.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - The ID of the thread that contains the comment.
     * @param commentId - The ID of the comment.
     * @param project - Project ID or project name
     */
    public async deleteLike(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}/likes",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            }
        });
    }

    /**
     * Get likes for a comment.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - The ID of the thread that contains the comment.
     * @param commentId - The ID of the comment.
     * @param project - Project ID or project name
     */
    public async getLikes(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<WebApi.IdentityRef[]> {

        return this.beginRequest<WebApi.IdentityRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}/likes",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            }
        });
    }

    /**
     * Get the commits for the specified iteration of a pull request.
     * 
     * @param repositoryId - ID or name of the repository.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the iteration from which to get the commits.
     * @param project - Project ID or project name
     * @param top - Maximum number of commits to return. The maximum number of commits that can be returned per batch is 500.
     * @param skip - Number of commits to skip.
     */
    public async getPullRequestIterationCommits(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string,
        top?: number,
        skip?: number
        ): Promise<Git.GitCommitRef[]> {

        const queryValues: any = {
            top: top,
            skip: skip
        };

        return this.beginRequest<Git.GitCommitRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/commits",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the commits for the specified pull request.
     * 
     * @param repositoryId - ID or name of the repository.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getPullRequestCommits(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitCommitRef[]> {

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/commits",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            returnRawResponse: true
        }).then(async response => {
            const body = <Git.GitCommitRef[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Retrieve one conflict for a pull request by ID
     * 
     * @param repositoryId - 
     * @param pullRequestId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async getPullRequestConflict(
        repositoryId: string,
        pullRequestId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                conflictId: conflictId
            }
        });
    }

    /**
     * Retrieve all conflicts for a pull request
     * 
     * @param repositoryId - The repository of the Pull Request.
     * @param pullRequestId - The pull request ID.
     * @param project - Project ID or project name
     * @param skip - Conflicts to skip.
     * @param top - Conflicts to return after skip.
     * @param includeObsolete - Includes obsolete conflicts.
     * @param excludeResolved - Excludes conflicts already resolved.
     * @param onlyResolved - Returns only the conflicts that are resolved.
     */
    public async getPullRequestConflicts(
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        skip?: number,
        top?: number,
        includeObsolete?: boolean,
        excludeResolved?: boolean,
        onlyResolved?: boolean
        ): Promise<Git.GitConflict[]> {

        const queryValues: any = {
            '$skip': skip,
            '$top': top,
            includeObsolete: includeObsolete,
            excludeResolved: excludeResolved,
            onlyResolved: onlyResolved
        };

        return this.beginRequest<Git.GitConflict[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update merge conflict resolution
     * 
     * @param conflict - 
     * @param repositoryId - 
     * @param pullRequestId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async updatePullRequestConflict(
        conflict: Git.GitConflict,
        repositoryId: string,
        pullRequestId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                conflictId: conflictId
            },
            body: conflict
        });
    }

    /**
     * Update multiple merge conflict resolutions
     * 
     * @param conflictUpdates - 
     * @param repositoryId - 
     * @param pullRequestId - 
     * @param project - Project ID or project name
     */
    public async updatePullRequestConflicts(
        conflictUpdates: Git.GitConflict[],
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitConflictUpdateResult[]> {

        return this.beginRequest<Git.GitConflictUpdateResult[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: conflictUpdates
        });
    }

    /**
     * Retrieve the changes made in a pull request between two iterations.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration. \<br /\> Iteration one is the head of the source branch at the time the pull request is created and subsequent iterations are created when there are pushes to the source branch. Allowed values are between 1 and the maximum iteration on this pull request.
     * @param project - Project ID or project name
     * @param top - Optional. The number of changes to retrieve.  The default value is 100 and the maximum value is 2000.
     * @param skip - Optional. The number of changes to ignore.  For example, to retrieve changes 101-150, set top 50 and skip to 100.
     * @param compareTo - ID of the pull request iteration to compare against.  The default value is zero which indicates the comparison is made against the common commit between the source and target branches
     */
    public async getPullRequestIterationChanges(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string,
        top?: number,
        skip?: number,
        compareTo?: number
        ): Promise<Git.GitPullRequestIterationChanges> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip,
            '$compareTo': compareTo
        };

        return this.beginRequest<Git.GitPullRequestIterationChanges>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/changes",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the specified iteration for a pull request.
     * 
     * @param repositoryId - ID or name of the repository.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration to return.
     * @param project - Project ID or project name
     */
    public async getPullRequestIteration(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string
        ): Promise<Git.GitPullRequestIteration> {

        return this.beginRequest<Git.GitPullRequestIteration>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            }
        });
    }

    /**
     * Get the list of iterations for the specified pull request.
     * 
     * @param repositoryId - ID or name of the repository.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     * @param includeCommits - If true, include the commits associated with each iteration in the response.
     */
    public async getPullRequestIterations(
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        includeCommits?: boolean
        ): Promise<Git.GitPullRequestIteration[]> {

        const queryValues: any = {
            includeCommits: includeCommits
        };

        return this.beginRequest<Git.GitPullRequestIteration[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a pull request status on the iteration. This operation will have the same result as Create status on pull request with specified iteration ID in the request body.
     * 
     * @param status - Pull request status to create.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration.
     * @param project - Project ID or project name
     */
    public async createPullRequestIterationStatus(
        status: Git.GitPullRequestStatus,
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus> {

        return this.beginRequest<Git.GitPullRequestStatus>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            },
            body: status
        });
    }

    /**
     * Delete pull request iteration status.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration.
     * @param statusId - ID of the pull request status.
     * @param project - Project ID or project name
     */
    public async deletePullRequestIterationStatus(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        statusId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId,
                statusId: statusId
            }
        });
    }

    /**
     * Get the specific pull request iteration status by ID. The status ID is unique within the pull request across all iterations.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration.
     * @param statusId - ID of the pull request status.
     * @param project - Project ID or project name
     */
    public async getPullRequestIterationStatus(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        statusId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus> {

        return this.beginRequest<Git.GitPullRequestStatus>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId,
                statusId: statusId
            }
        });
    }

    /**
     * Get all the statuses associated with a pull request iteration.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration.
     * @param project - Project ID or project name
     */
    public async getPullRequestIterationStatuses(
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus[]> {

        return this.beginRequest<Git.GitPullRequestStatus[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            }
        });
    }

    /**
     * Update pull request iteration statuses collection. The only supported operation type is \`remove\`.
     * 
     * @param patchDocument - Operations to apply to the pull request statuses in JSON Patch format.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param iterationId - ID of the pull request iteration.
     * @param project - Project ID or project name
     */
    public async updatePullRequestIterationStatuses(
        patchDocument: WebApi.JsonPatchDocument,
        repositoryId: string,
        pullRequestId: number,
        iterationId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/iterations/{iterationId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                iterationId: iterationId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: patchDocument
        });
    }

    /**
     * Create a label for a specified pull request. The only required field is the name of the new label.
     * 
     * @param label - Label to assign to the pull request.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     * @param projectId - Project ID or project name.
     */
    public async createPullRequestLabel(
        label: TfsCore.WebApiCreateTagRequestData,
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        projectId?: string
        ): Promise<TfsCore.WebApiTagDefinition> {

        const queryValues: any = {
            projectId: projectId
        };

        return this.beginRequest<TfsCore.WebApiTagDefinition>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/labels/{labelIdOrName}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues,
            body: label
        });
    }

    /**
     * Removes a label from the set of those assigned to the pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param labelIdOrName - The name or ID of the label requested.
     * @param project - Project ID or project name
     * @param projectId - Project ID or project name.
     */
    public async deletePullRequestLabels(
        repositoryId: string,
        pullRequestId: number,
        labelIdOrName: string,
        project?: string,
        projectId?: string
        ): Promise<void> {

        const queryValues: any = {
            projectId: projectId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/labels/{labelIdOrName}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                labelIdOrName: labelIdOrName
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieves a single label that has been assigned to a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param labelIdOrName - The name or ID of the label requested.
     * @param project - Project ID or project name
     * @param projectId - Project ID or project name.
     */
    public async getPullRequestLabel(
        repositoryId: string,
        pullRequestId: number,
        labelIdOrName: string,
        project?: string,
        projectId?: string
        ): Promise<TfsCore.WebApiTagDefinition> {

        const queryValues: any = {
            projectId: projectId
        };

        return this.beginRequest<TfsCore.WebApiTagDefinition>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/labels/{labelIdOrName}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                labelIdOrName: labelIdOrName
            },
            queryParams: queryValues
        });
    }

    /**
     * Get all the labels assigned to a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     * @param projectId - Project ID or project name.
     */
    public async getPullRequestLabels(
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        projectId?: string
        ): Promise<TfsCore.WebApiTagDefinition[]> {

        const queryValues: any = {
            projectId: projectId
        };

        return this.beginRequest<TfsCore.WebApiTagDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/labels/{labelIdOrName}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get external properties of the pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getPullRequestProperties(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/properties",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Create or update pull request external properties. The patch operation can be \`add\`, \`replace\` or \`remove\`. For \`add\` operation, the path can be empty. If the path is empty, the value must be a list of key value pairs. For \`replace\` operation, the path cannot be empty. If the path does not exist, the property will be added to the collection. For \`remove\` operation, the path cannot be empty. If the path does not exist, no action will be performed.
     * 
     * @param patchDocument - Properties to add, replace or remove in JSON Patch format.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async updatePullRequestProperties(
        patchDocument: WebApi.JsonPatchDocument,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/properties",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: patchDocument
        });
    }

    /**
     * This API is used to find what pull requests are related to a given commit.  It can be used to either find the pull request that created a particular merge commit or it can be used to find all pull requests that have ever merged a particular commit.  The input is a list of queries which each contain a list of commits. For each commit that you search against, you will get back a dictionary of commit -\> pull requests.
     * 
     * @param queries - The list of queries to perform.
     * @param repositoryId - ID of the repository.
     * @param project - Project ID or project name
     */
    public async getPullRequestQuery(
        queries: Git.GitPullRequestQuery,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitPullRequestQuery> {

        return this.beginRequest<Git.GitPullRequestQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/PullRequestQuery",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: queries
        });
    }

    /**
     * Add a reviewer to a pull request or cast a vote.
     * 
     * @param reviewer - Reviewer's vote.\<br /\>If the reviewer's ID is included here, it must match the reviewerID parameter.\<br /\>Reviewers can set their own vote with this method.  When adding other reviewers, vote must be set to zero.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param reviewerId - ID of the reviewer.
     * @param project - Project ID or project name
     */
    public async createPullRequestReviewer(
        reviewer: Git.IdentityRefWithVote,
        repositoryId: string,
        pullRequestId: number,
        reviewerId: string,
        project?: string
        ): Promise<Git.IdentityRefWithVote> {

        return this.beginRequest<Git.IdentityRefWithVote>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                reviewerId: reviewerId
            },
            body: reviewer
        });
    }

    /**
     * Add reviewers to a pull request.
     * 
     * @param reviewers - Reviewers to add to the pull request.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async createPullRequestReviewers(
        reviewers: WebApi.IdentityRef[],
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.IdentityRefWithVote[]> {

        return this.beginRequest<Git.IdentityRefWithVote[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: reviewers
        });
    }

    /**
     * Add an unmaterialized identity to the reviewers of a pull request.
     * 
     * @param reviewer - Reviewer to add to the pull request.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async createUnmaterializedPullRequestReviewer(
        reviewer: Git.IdentityRefWithVote,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.IdentityRefWithVote> {

        return this.beginRequest<Git.IdentityRefWithVote>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: reviewer
        });
    }

    /**
     * Remove a reviewer from a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param reviewerId - ID of the reviewer to remove.
     * @param project - Project ID or project name
     */
    public async deletePullRequestReviewer(
        repositoryId: string,
        pullRequestId: number,
        reviewerId: string,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                reviewerId: reviewerId
            }
        });
    }

    /**
     * Retrieve information about a particular reviewer on a pull request
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param reviewerId - ID of the reviewer.
     * @param project - Project ID or project name
     */
    public async getPullRequestReviewer(
        repositoryId: string,
        pullRequestId: number,
        reviewerId: string,
        project?: string
        ): Promise<Git.IdentityRefWithVote> {

        return this.beginRequest<Git.IdentityRefWithVote>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                reviewerId: reviewerId
            }
        });
    }

    /**
     * Retrieve the reviewers for a pull request
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getPullRequestReviewers(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.IdentityRefWithVote[]> {

        return this.beginRequest<Git.IdentityRefWithVote[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Edit a reviewer entry. These fields are patchable: isFlagged, hasDeclined
     * 
     * @param reviewer - Reviewer data.\<br /\>If the reviewer's ID is included here, it must match the reviewerID parameter.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param reviewerId - ID of the reviewer.
     * @param project - Project ID or project name
     */
    public async updatePullRequestReviewer(
        reviewer: Git.IdentityRefWithVote,
        repositoryId: string,
        pullRequestId: number,
        reviewerId: string,
        project?: string
        ): Promise<Git.IdentityRefWithVote> {

        return this.beginRequest<Git.IdentityRefWithVote>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                reviewerId: reviewerId
            },
            body: reviewer
        });
    }

    /**
     * Reset the votes of multiple reviewers on a pull request.  NOTE: This endpoint only supports updating votes, but does not support updating required reviewers (use policy) or display names.
     * 
     * @param patchVotes - IDs of the reviewers whose votes will be reset to zero
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request
     * @param project - Project ID or project name
     */
    public async updatePullRequestReviewers(
        patchVotes: Git.IdentityRefWithVote[],
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/reviewers/{reviewerId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: patchVotes
        });
    }

    /**
     * Retrieve a pull request.
     * 
     * @param pullRequestId - The ID of the pull request to retrieve.
     * @param project - Project ID or project name
     */
    public async getPullRequestById(
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitPullRequest> {

        return this.beginRequest<Git.GitPullRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Retrieve all pull requests matching a specified criteria.
     * 
     * @param project - Project ID or project name
     * @param searchCriteria - Pull requests will be returned that match this search criteria.
     * @param maxCommentLength - Not used.
     * @param skip - The number of pull requests to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     * @param top - The number of pull requests to retrieve.
     */
    public async getPullRequestsByProject(
        project: string,
        searchCriteria: Git.GitPullRequestSearchCriteria,
        maxCommentLength?: number,
        skip?: number,
        top?: number
        ): Promise<Git.GitPullRequest[]> {

        const queryValues: any = {
            searchCriteria: searchCriteria,
            maxCommentLength: maxCommentLength,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Git.GitPullRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/pullRequests",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a pull request.
     * 
     * @param gitPullRequestToCreate - The pull request to create.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param project - Project ID or project name
     * @param supportsIterations - If true, subsequent pushes to the pull request will be individually reviewable. Set this to false for large pull requests for performance reasons if this functionality is not needed.
     */
    public async createPullRequest(
        gitPullRequestToCreate: Git.GitPullRequest,
        repositoryId: string,
        project?: string,
        supportsIterations?: boolean
        ): Promise<Git.GitPullRequest> {

        const queryValues: any = {
            supportsIterations: supportsIterations
        };

        return this.beginRequest<Git.GitPullRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            body: gitPullRequestToCreate
        });
    }

    /**
     * Retrieve a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - The ID of the pull request to retrieve.
     * @param project - Project ID or project name
     * @param maxCommentLength - Not used.
     * @param skip - Not used.
     * @param top - Not used.
     * @param includeCommits - If true, the pull request will be returned with the associated commits.
     * @param includeWorkItemRefs - If true, the pull request will be returned with the associated work item references.
     */
    public async getPullRequest(
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        maxCommentLength?: number,
        skip?: number,
        top?: number,
        includeCommits?: boolean,
        includeWorkItemRefs?: boolean
        ): Promise<Git.GitPullRequest> {

        const queryValues: any = {
            maxCommentLength: maxCommentLength,
            '$skip': skip,
            '$top': top,
            includeCommits: includeCommits,
            includeWorkItemRefs: includeWorkItemRefs
        };

        return this.beginRequest<Git.GitPullRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve all pull requests matching a specified criteria.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param searchCriteria - Pull requests will be returned that match this search criteria.
     * @param project - Project ID or project name
     * @param maxCommentLength - Not used.
     * @param skip - The number of pull requests to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     * @param top - The number of pull requests to retrieve.
     */
    public async getPullRequests(
        repositoryId: string,
        searchCriteria: Git.GitPullRequestSearchCriteria,
        project?: string,
        maxCommentLength?: number,
        skip?: number,
        top?: number
        ): Promise<Git.GitPullRequest[]> {

        const queryValues: any = {
            searchCriteria: searchCriteria,
            maxCommentLength: maxCommentLength,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Git.GitPullRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a pull request
     * 
     * @param gitPullRequestToUpdate - The pull request content that should be updated.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request to update.
     * @param project - Project ID or project name
     */
    public async updatePullRequest(
        gitPullRequestToUpdate: Git.GitPullRequest,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitPullRequest> {

        return this.beginRequest<Git.GitPullRequest>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: gitPullRequestToUpdate
        });
    }

    /**
     * Sends an e-mail notification about a specific pull request to a set of recipients
     * 
     * @param userMessage - 
     * @param repositoryId - ID of the git repository.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async sharePullRequest(
        userMessage: Git.ShareNotificationContext,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/share",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: userMessage
        });
    }

    /**
     * Create a pull request status.
     * 
     * @param status - Pull request status to create.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async createPullRequestStatus(
        status: Git.GitPullRequestStatus,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus> {

        return this.beginRequest<Git.GitPullRequestStatus>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: status
        });
    }

    /**
     * Delete pull request status.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param statusId - ID of the pull request status.
     * @param project - Project ID or project name
     */
    public async deletePullRequestStatus(
        repositoryId: string,
        pullRequestId: number,
        statusId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                statusId: statusId
            }
        });
    }

    /**
     * Get the specific pull request status by ID. The status ID is unique within the pull request across all iterations.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param statusId - ID of the pull request status.
     * @param project - Project ID or project name
     */
    public async getPullRequestStatus(
        repositoryId: string,
        pullRequestId: number,
        statusId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus> {

        return this.beginRequest<Git.GitPullRequestStatus>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                statusId: statusId
            }
        });
    }

    /**
     * Get all the statuses associated with a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getPullRequestStatuses(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitPullRequestStatus[]> {

        return this.beginRequest<Git.GitPullRequestStatus[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Update pull request statuses collection. The only supported operation type is \`remove\`.
     * 
     * @param patchDocument - Operations to apply to the pull request statuses in JSON Patch format.
     * @param repositoryId - The repository ID of the pull request’s target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async updatePullRequestStatuses(
        patchDocument: WebApi.JsonPatchDocument,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/statuses/{statusId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: patchDocument
        });
    }

    /**
     * Create a comment on a specific thread in a pull request (up to 500 comments can be created per thread).
     * 
     * @param comment - The comment to create. Comments can be up to 150,000 characters.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread that the desired comment is in.
     * @param project - Project ID or project name
     */
    public async createComment(
        comment: Git.Comment,
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        project?: string
        ): Promise<Git.Comment> {

        return this.beginRequest<Git.Comment>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId
            },
            body: comment
        });
    }

    /**
     * Delete a comment associated with a specific thread in a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread that the desired comment is in.
     * @param commentId - ID of the comment.
     * @param project - Project ID or project name
     */
    public async deleteComment(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            }
        });
    }

    /**
     * Retrieve a comment associated with a specific thread in a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread that the desired comment is in.
     * @param commentId - ID of the comment.
     * @param project - Project ID or project name
     */
    public async getComment(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<Git.Comment> {

        return this.beginRequest<Git.Comment>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            }
        });
    }

    /**
     * Retrieve all comments associated with a specific thread in a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread.
     * @param project - Project ID or project name
     */
    public async getComments(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        project?: string
        ): Promise<Git.Comment[]> {

        return this.beginRequest<Git.Comment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId
            }
        });
    }

    /**
     * Update a comment associated with a specific thread in a pull request.
     * 
     * @param comment - The comment content that should be updated. Comments can be up to 150,000 characters.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread that the desired comment is in.
     * @param commentId - ID of the comment to update.
     * @param project - Project ID or project name
     */
    public async updateComment(
        comment: Git.Comment,
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        commentId: number,
        project?: string
        ): Promise<Git.Comment> {

        return this.beginRequest<Git.Comment>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}/comments/{commentId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId,
                commentId: commentId
            },
            body: comment
        });
    }

    /**
     * Create a thread in a pull request.
     * 
     * @param commentThread - The thread to create. Thread must contain at least one comment.
     * @param repositoryId - Repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async createThread(
        commentThread: Git.GitPullRequestCommentThread,
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<Git.GitPullRequestCommentThread> {

        return this.beginRequest<Git.GitPullRequestCommentThread>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            body: commentThread
        });
    }

    /**
     * Retrieve a thread in a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread.
     * @param project - Project ID or project name
     * @param iteration - If specified, thread position will be tracked using this iteration as the right side of the diff.
     * @param baseIteration - If specified, thread position will be tracked using this iteration as the left side of the diff.
     */
    public async getPullRequestThread(
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        project?: string,
        iteration?: number,
        baseIteration?: number
        ): Promise<Git.GitPullRequestCommentThread> {

        const queryValues: any = {
            '$iteration': iteration,
            '$baseIteration': baseIteration
        };

        return this.beginRequest<Git.GitPullRequestCommentThread>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve all threads in a pull request.
     * 
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     * @param iteration - If specified, thread positions will be tracked using this iteration as the right side of the diff.
     * @param baseIteration - If specified, thread positions will be tracked using this iteration as the left side of the diff.
     */
    public async getThreads(
        repositoryId: string,
        pullRequestId: number,
        project?: string,
        iteration?: number,
        baseIteration?: number
        ): Promise<Git.GitPullRequestCommentThread[]> {

        const queryValues: any = {
            '$iteration': iteration,
            '$baseIteration': baseIteration
        };

        return this.beginRequest<Git.GitPullRequestCommentThread[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a thread in a pull request.
     * 
     * @param commentThread - The thread content that should be updated.
     * @param repositoryId - The repository ID of the pull request's target branch.
     * @param pullRequestId - ID of the pull request.
     * @param threadId - ID of the thread to update.
     * @param project - Project ID or project name
     */
    public async updateThread(
        commentThread: Git.GitPullRequestCommentThread,
        repositoryId: string,
        pullRequestId: number,
        threadId: number,
        project?: string
        ): Promise<Git.GitPullRequestCommentThread> {

        return this.beginRequest<Git.GitPullRequestCommentThread>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/threads/{threadId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId,
                threadId: threadId
            },
            body: commentThread
        });
    }

    /**
     * Retrieve a list of work items associated with a pull request.
     * 
     * @param repositoryId - ID or name of the repository.
     * @param pullRequestId - ID of the pull request.
     * @param project - Project ID or project name
     */
    public async getPullRequestWorkItemRefs(
        repositoryId: string,
        pullRequestId: number,
        project?: string
        ): Promise<WebApi.ResourceRef[]> {

        return this.beginRequest<WebApi.ResourceRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pullRequests/{pullRequestId}/workitems",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pullRequestId: pullRequestId
            }
        });
    }

    /**
     * Push changes to the repository.
     * 
     * @param push - 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     */
    public async createPush(
        push: Git.GitPush,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitPush> {

        return this.beginRequest<Git.GitPush>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pushes/{pushId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: push
        });
    }

    /**
     * Retrieves a particular push.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param pushId - ID of the push.
     * @param project - Project ID or project name
     * @param includeCommits - The number of commits to include in the result.
     * @param includeRefUpdates - If true, include the list of refs that were updated by the push.
     */
    public async getPush(
        repositoryId: string,
        pushId: number,
        project?: string,
        includeCommits?: number,
        includeRefUpdates?: boolean
        ): Promise<Git.GitPush> {

        const queryValues: any = {
            includeCommits: includeCommits,
            includeRefUpdates: includeRefUpdates
        };

        return this.beginRequest<Git.GitPush>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pushes/{pushId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                pushId: pushId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieves pushes associated with the specified repository.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param skip - Number of pushes to skip.
     * @param top - Number of pushes to return.
     * @param searchCriteria - Search criteria attributes: fromDate, toDate, pusherId, refName, includeRefUpdates or includeLinks. fromDate: Start date to search from. toDate: End date to search to. pusherId: Identity of the person who submitted the push. refName: Branch name to consider. includeRefUpdates: If true, include the list of refs that were updated by the push. includeLinks: Whether to include the _links field on the shallow references.
     */
    public async getPushes(
        repositoryId: string,
        project?: string,
        skip?: number,
        top?: number,
        searchCriteria?: Git.GitPushSearchCriteria
        ): Promise<Git.GitPush[]> {

        const queryValues: any = {
            '$skip': skip,
            '$top': top,
            searchCriteria: searchCriteria
        };

        return this.beginRequest<Git.GitPush[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/pushes/{pushId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Destroy (hard delete) a soft-deleted Git repository.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - The ID of the repository.
     */
    public async deleteRepositoryFromRecycleBin(
        project: string,
        repositoryId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/recycleBin/repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * Retrieve soft-deleted git repositories from the recycle bin.
     * 
     * @param project - Project ID or project name
     */
    public async getRecycleBinRepositories(
        project: string
        ): Promise<Git.GitDeletedRepository[]> {

        return this.beginRequest<Git.GitDeletedRepository[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/recycleBin/repositories/{repositoryId}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Recover a soft-deleted Git repository. Recently deleted repositories go into a soft-delete state for a period of time before they are hard deleted and become unrecoverable.
     * 
     * @param repositoryDetails - 
     * @param project - Project ID or project name
     * @param repositoryId - The ID of the repository.
     */
    public async restoreRepositoryFromRecycleBin(
        repositoryDetails: Git.GitRecycleBinRepositoryDetails,
        project: string,
        repositoryId: string
        ): Promise<Git.GitRepository> {

        return this.beginRequest<Git.GitRepository>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/recycleBin/repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: repositoryDetails
        });
    }

    /**
     * Queries the provided repository for its refs and returns them.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param filter - [optional] A filter to apply to the refs (starts with).
     * @param includeLinks - [optional] Specifies if referenceLinks should be included in the result. default is false.
     * @param includeStatuses - [optional] Includes up to the first 1000 commit statuses for each ref. The default value is false.
     * @param includeMyBranches - [optional] Includes only branches that the user owns, the branches the user favorites, and the default branch. The default value is false. Cannot be combined with the filter parameter.
     * @param latestStatusesOnly - [optional] True to include only the tip commit status for each ref. This option requires \`includeStatuses\` to be true. The default value is false.
     * @param peelTags - [optional] Annotated tags will populate the PeeledObjectId property. default is false.
     * @param filterContains - [optional] A filter to apply to the refs (contains).
     */
    public async getRefs(
        repositoryId: string,
        project?: string,
        filter?: string,
        includeLinks?: boolean,
        includeStatuses?: boolean,
        includeMyBranches?: boolean,
        latestStatusesOnly?: boolean,
        peelTags?: boolean,
        filterContains?: string
        ): Promise<Git.GitRef[]> {

        const queryValues: any = {
            filter: filter,
            includeLinks: includeLinks,
            includeStatuses: includeStatuses,
            includeMyBranches: includeMyBranches,
            latestStatusesOnly: latestStatusesOnly,
            peelTags: peelTags,
            filterContains: filterContains
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/refs/{*filter}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Git.GitRef[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Lock or Unlock a branch.
     * 
     * @param newRefInfo - The ref update action (lock/unlock) to perform
     * @param repositoryId - The name or ID of the repository.
     * @param filter - The name of the branch to lock/unlock
     * @param project - Project ID or project name
     * @param projectId - ID or name of the team project. Optional if specifying an ID for repository.
     */
    public async updateRef(
        newRefInfo: Git.GitRefUpdate,
        repositoryId: string,
        filter: string,
        project?: string,
        projectId?: string
        ): Promise<Git.GitRef> {

        const queryValues: any = {
            filter: filter,
            projectId: projectId
        };

        return this.beginRequest<Git.GitRef>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/refs/{*filter}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            body: newRefInfo
        });
    }

    /**
     * Creating, updating, or deleting refs(branches).
     * 
     * @param refUpdates - List of ref updates to attempt to perform
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     * @param projectId - ID or name of the team project. Optional if specifying an ID for repository.
     */
    public async updateRefs(
        refUpdates: Git.GitRefUpdate[],
        repositoryId: string,
        project?: string,
        projectId?: string
        ): Promise<Git.GitRefUpdateResult[]> {

        const queryValues: any = {
            projectId: projectId
        };

        return this.beginRequest<Git.GitRefUpdateResult[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/refs/{*filter}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues,
            body: refUpdates
        });
    }

    /**
     * Creates a ref favorite
     * 
     * @param favorite - The ref favorite to create.
     * @param project - Project ID or project name
     */
    public async createFavorite(
        favorite: Git.GitRefFavorite,
        project: string
        ): Promise<Git.GitRefFavorite> {

        return this.beginRequest<Git.GitRefFavorite>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/favorites/refs/{favoriteId}",
            routeValues: {
                project: project
            },
            body: favorite
        });
    }

    /**
     * Deletes the refs favorite specified
     * 
     * @param project - Project ID or project name
     * @param favoriteId - The Id of the ref favorite to delete.
     */
    public async deleteRefFavorite(
        project: string,
        favoriteId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/favorites/refs/{favoriteId}",
            routeValues: {
                project: project,
                favoriteId: favoriteId
            }
        });
    }

    /**
     * Gets the refs favorite for a favorite Id.
     * 
     * @param project - Project ID or project name
     * @param favoriteId - The Id of the requested ref favorite.
     */
    public async getRefFavorite(
        project: string,
        favoriteId: number
        ): Promise<Git.GitRefFavorite> {

        return this.beginRequest<Git.GitRefFavorite>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/favorites/refs/{favoriteId}",
            routeValues: {
                project: project,
                favoriteId: favoriteId
            }
        });
    }

    /**
     * Gets the refs favorites for a repo and an identity.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - The id of the repository.
     * @param identityId - The id of the identity whose favorites are to be retrieved. If null, the requesting identity is used.
     */
    public async getRefFavorites(
        project: string,
        repositoryId?: string,
        identityId?: string
        ): Promise<Git.GitRefFavorite[]> {

        const queryValues: any = {
            repositoryId: repositoryId,
            identityId: identityId
        };

        return this.beginRequest<Git.GitRefFavorite[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/favorites/refs/{favoriteId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a git repository in a team project.
     * 
     * @param gitRepositoryToCreate - Specify the repo name, team project and/or parent repository. Team project information can be omitted from gitRepositoryToCreate if the request is project-scoped (i.e., includes project Id).
     * @param project - Project ID or project name
     * @param sourceRef - [optional] Specify the source refs to use while creating a fork repo
     */
    public async createRepository(
        gitRepositoryToCreate: Git.GitRepositoryCreateOptions,
        project?: string,
        sourceRef?: string
        ): Promise<Git.GitRepository> {

        const queryValues: any = {
            sourceRef: sourceRef
        };

        return this.beginRequest<Git.GitRepository>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: gitRepositoryToCreate
        });
    }

    /**
     * Delete a git repository
     * 
     * @param repositoryId - The ID of the repository.
     * @param project - Project ID or project name
     */
    public async deleteRepository(
        repositoryId: string,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * Retrieve git repositories.
     * 
     * @param project - Project ID or project name
     * @param includeLinks - [optional] True to include reference links. The default value is false.
     * @param includeAllUrls - [optional] True to include all remote URLs. The default value is false.
     * @param includeHidden - [optional] True to include hidden repositories. The default value is false.
     */
    public async getRepositories(
        project?: string,
        includeLinks?: boolean,
        includeAllUrls?: boolean,
        includeHidden?: boolean
        ): Promise<Git.GitRepository[]> {

        const queryValues: any = {
            includeLinks: includeLinks,
            includeAllUrls: includeAllUrls,
            includeHidden: includeHidden
        };

        return this.beginRequest<Git.GitRepository[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a git repository.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param project - Project ID or project name
     */
    public async getRepository(
        repositoryId: string,
        project?: string
        ): Promise<Git.GitRepository> {

        return this.beginRequest<Git.GitRepository>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * Retrieve a git repository.
     * 
     * @param repositoryId - The name or ID of the repository.
     * @param includeParent - True to include parent repository. Only available in authenticated calls.
     * @param project - Project ID or project name
     */
    public async getRepositoryWithParent(
        repositoryId: string,
        includeParent: boolean,
        project?: string
        ): Promise<Git.GitRepository> {

        const queryValues: any = {
            includeParent: includeParent
        };

        return this.beginRequest<Git.GitRepository>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates the Git repository with either a new repo name or a new default branch.
     * 
     * @param newRepositoryInfo - Specify a new repo name or a new default branch of the repository
     * @param repositoryId - The ID of the repository.
     * @param project - Project ID or project name
     */
    public async updateRepository(
        newRepositoryInfo: Git.GitRepository,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitRepository> {

        return this.beginRequest<Git.GitRepository>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/Repositories/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: newRepositoryInfo
        });
    }

    /**
     * Retrieve one conflict for a revert by ID
     * 
     * @param repositoryId - 
     * @param revertId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async getRevertConflict(
        repositoryId: string,
        revertId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                revertId: revertId,
                conflictId: conflictId
            }
        });
    }

    /**
     * Retrieve all conflicts for a revert
     * 
     * @param repositoryId - 
     * @param revertId - 
     * @param project - Project ID or project name
     * @param continuationToken - 
     * @param top - 
     * @param excludeResolved - 
     * @param onlyResolved - 
     * @param includeObsolete - 
     */
    public async getRevertConflicts(
        repositoryId: string,
        revertId: number,
        project?: string,
        continuationToken?: string,
        top?: number,
        excludeResolved?: boolean,
        onlyResolved?: boolean,
        includeObsolete?: boolean
        ): Promise<Git.GitConflict[]> {

        const queryValues: any = {
            continuationToken: continuationToken,
            '$top': top,
            excludeResolved: excludeResolved,
            onlyResolved: onlyResolved,
            includeObsolete: includeObsolete
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                revertId: revertId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Git.GitConflict[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Update merge conflict resolution
     * 
     * @param conflict - 
     * @param repositoryId - 
     * @param revertId - 
     * @param conflictId - 
     * @param project - Project ID or project name
     */
    public async updateRevertConflict(
        conflict: Git.GitConflict,
        repositoryId: string,
        revertId: number,
        conflictId: number,
        project?: string
        ): Promise<Git.GitConflict> {

        return this.beginRequest<Git.GitConflict>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                revertId: revertId,
                conflictId: conflictId
            },
            body: conflict
        });
    }

    /**
     * Update multiple merge conflict resolutions
     * 
     * @param conflictUpdates - 
     * @param repositoryId - 
     * @param revertId - 
     * @param project - Project ID or project name
     */
    public async updateRevertConflicts(
        conflictUpdates: Git.GitConflict[],
        repositoryId: string,
        revertId: number,
        project?: string
        ): Promise<Git.GitConflictUpdateResult[]> {

        return this.beginRequest<Git.GitConflictUpdateResult[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}/conflicts/{conflictId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                revertId: revertId
            },
            body: conflictUpdates
        });
    }

    /**
     * Starts the operation to create a new branch which reverts changes introduced by either a specific commit or commits that are associated to a pull request.
     * 
     * @param revertToCreate - 
     * @param project - Project ID or project name
     * @param repositoryId - ID of the repository.
     */
    public async createRevert(
        revertToCreate: Git.GitAsyncRefOperationParameters,
        project: string,
        repositoryId: string
        ): Promise<Git.GitRevert> {

        return this.beginRequest<Git.GitRevert>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            body: revertToCreate
        });
    }

    /**
     * Retrieve information about a revert operation by revert Id.
     * 
     * @param project - Project ID or project name
     * @param revertId - ID of the revert operation.
     * @param repositoryId - ID of the repository.
     */
    public async getRevert(
        project: string,
        revertId: number,
        repositoryId: string
        ): Promise<Git.GitRevert> {

        return this.beginRequest<Git.GitRevert>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}",
            routeValues: {
                project: project,
                revertId: revertId,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * Retrieve information about a revert operation for a specific branch.
     * 
     * @param project - Project ID or project name
     * @param repositoryId - ID of the repository.
     * @param refName - The GitAsyncRefOperationParameters generatedRefName used for the revert operation.
     */
    public async getRevertForRefName(
        project: string,
        repositoryId: string,
        refName: string
        ): Promise<Git.GitRevert> {

        const queryValues: any = {
            refName: refName
        };

        return this.beginRequest<Git.GitRevert>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/reverts/{revertId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create Git commit status.
     * 
     * @param gitCommitStatusToCreate - Git commit status object to create.
     * @param commitId - ID of the Git commit.
     * @param repositoryId - ID of the repository.
     * @param project - Project ID or project name
     */
    public async createCommitStatus(
        gitCommitStatusToCreate: Git.GitStatus,
        commitId: string,
        repositoryId: string,
        project?: string
        ): Promise<Git.GitStatus> {

        return this.beginRequest<Git.GitStatus>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/commits/{commitId}/Statuses",
            routeValues: {
                project: project,
                commitId: commitId,
                repositoryId: repositoryId
            },
            body: gitCommitStatusToCreate
        });
    }

    /**
     * Get statuses associated with the Git commit.
     * 
     * @param commitId - ID of the Git commit.
     * @param repositoryId - ID of the repository.
     * @param project - Project ID or project name
     * @param top - Optional. The number of statuses to retrieve. Default is 1000.
     * @param skip - Optional. The number of statuses to ignore. Default is 0. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     * @param latestOnly - The flag indicates whether to get only latest statuses grouped by \`Context.Name\` and \`Context.Genre\`.
     */
    public async getStatuses(
        commitId: string,
        repositoryId: string,
        project?: string,
        top?: number,
        skip?: number,
        latestOnly?: boolean
        ): Promise<Git.GitStatus[]> {

        const queryValues: any = {
            top: top,
            skip: skip,
            latestOnly: latestOnly
        };

        return this.beginRequest<Git.GitStatus[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/commits/{commitId}/Statuses",
            routeValues: {
                project: project,
                commitId: commitId,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a pull request suggestion for a particular repository or team project.
     * 
     * @param repositoryId - ID of the git repository.
     * @param project - Project ID or project name
     */
    public async getSuggestions(
        repositoryId: string,
        project?: string
        ): Promise<Git.GitSuggestion[]> {

        return this.beginRequest<Git.GitSuggestion[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/suggestions",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            }
        });
    }

    /**
     * The Tree endpoint returns the collection of objects underneath the specified tree. Trees are folders in a Git repository.
     * 
     * @param repositoryId - Repository Id.
     * @param sha1 - SHA1 hash of the tree object.
     * @param project - Project ID or project name
     * @param projectId - Project Id.
     * @param recursive - Search recursively. Include trees underneath this tree. Default is false.
     * @param fileName - Name to use if a .zip file is returned. Default is the object ID.
     */
    public async getTree(
        repositoryId: string,
        sha1: string,
        project?: string,
        projectId?: string,
        recursive?: boolean,
        fileName?: string
        ): Promise<Git.GitTreeRef> {

        const queryValues: any = {
            projectId: projectId,
            recursive: recursive,
            fileName: fileName
        };

        return this.beginRequest<Git.GitTreeRef>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Trees/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                sha1: sha1
            },
            queryParams: queryValues
        });
    }

    /**
     * The Tree endpoint returns the collection of objects underneath the specified tree. Trees are folders in a Git repository.
     * 
     * @param repositoryId - Repository Id.
     * @param sha1 - SHA1 hash of the tree object.
     * @param project - Project ID or project name
     * @param projectId - Project Id.
     * @param recursive - Search recursively. Include trees underneath this tree. Default is false.
     * @param fileName - Name to use if a .zip file is returned. Default is the object ID.
     */
    public async getTreeZip(
        repositoryId: string,
        sha1: string,
        project?: string,
        projectId?: string,
        recursive?: boolean,
        fileName?: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            projectId: projectId,
            recursive: recursive,
            fileName: fileName
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/git/repositories/{repositoryId}/Trees/{sha1}",
            routeValues: {
                project: project,
                repositoryId: repositoryId,
                sha1: sha1
            },
            queryParams: queryValues
        });
    }

}
