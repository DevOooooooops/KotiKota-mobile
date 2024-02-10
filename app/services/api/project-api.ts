import { apiBase } from "./base"
import { GetDonationsResult, GetProjectResult, GetProjectsResult } from "app/services/api/api.types"
import { Donation } from "app/models/entities/donation/Donation"

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

  async createDonation(
    accessToken: string,
    projectId: string,
    donation: Donation,
  ): Promise<GetDonationsResult> {
    const response = await apiBase.post(`projects/${projectId}/donations`, {
      headers: {
        Authorization: `EMAIL ${accessToken}`,
      },
      donation,
    })
    const donations = response.data
    return { donations: donations }
  }
}
