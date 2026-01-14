/**
 * Canva API Client
 * Handles authenticated requests to the Canva Connect API
 */

const CANVA_API_BASE = 'https://api.canva.com/rest/v1';

export interface CanvaClientConfig {
  accessToken: string;
}

export class CanvaClient {
  private accessToken: string;

  constructor(config: CanvaClientConfig) {
    this.accessToken = config.accessToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${CANVA_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Canva API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  // Design Management
  async createDesign(params: { design_type?: string; title?: string; width?: number; height?: number }) {
    return this.request('/designs', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getDesign(designId: string) {
    return this.request(`/designs/${designId}`, {
      method: 'GET',
    });
  }

  async listDesigns(params?: { limit?: number; continuation?: string }) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request(`/designs?${queryParams}`, {
      method: 'GET',
    });
  }

  // Export Management
  async exportDesign(designId: string, params: { format: string; quality?: string; pages?: number[] }) {
    return this.request(`/designs/${designId}/export`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getExportJob(exportId: string) {
    return this.request(`/exports/${exportId}`, {
      method: 'GET',
    });
  }

  // Asset Management
  async uploadAsset(params: { type: string; name?: string; parent_folder_id?: string }) {
    return this.request('/assets/upload', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getAsset(assetId: string) {
    return this.request(`/assets/${assetId}`, {
      method: 'GET',
    });
  }

  async listAssets(params?: { limit?: number; continuation?: string; folder_id?: string }) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request(`/assets?${queryParams}`, {
      method: 'GET',
    });
  }

  // Folder Management
  async createFolder(params: { name: string; parent_folder_id?: string }) {
    return this.request('/folders', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async listFolders(params?: { limit?: number; continuation?: string }) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request(`/folders?${queryParams}`, {
      method: 'GET',
    });
  }

  // Brand Templates
  async getBrandTemplate(templateId: string) {
    return this.request(`/brand-templates/${templateId}`, {
      method: 'GET',
    });
  }

  async listBrandTemplates(params?: { limit?: number; continuation?: string }) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request(`/brand-templates?${queryParams}`, {
      method: 'GET',
    });
  }

  async createDesignFromBrandTemplate(templateId: string, params?: { title?: string }) {
    return this.request(`/brand-templates/${templateId}/designs`, {
      method: 'POST',
      body: JSON.stringify(params || {}),
    });
  }
}
