import { apiBase } from "./base"
import { GetProjectResult, GetProjectsResult } from "app/services/api/api.types"

export class ProjectApi {
  async getProjects(accessToken: string, params?: any): Promise<GetProjectsResult> {
    const response = await apiBase.get("projects", {
      params: params,
      headers: {
        Authorization: `EMAIL ${accessToken}`,
      },
    })
    const projects = response.data
    return { projects: projects }
  }

  async getProjectById(accessToken: string, projectId: string): Promise<GetProjectResult> {
    const response = await apiBase.get(`projects/${projectId}`, {
      headers: {
        Authorization: `EMAIL ${accessToken}`,
      },
    })
    const project = response.data
    return { project: project }
  }

  async getProjectCommentsById(accessToken: string, projectId: string): Promise<GetProjectResult> {
    const response = await apiBase.get(`projects/${projectId}/comments`, {
      headers: {
        Authorization: `EMAIL ${accessToken}`,
      },
    })
    const project = response.data
    return { project: project }
  }
}
