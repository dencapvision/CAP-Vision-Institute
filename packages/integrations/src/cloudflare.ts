export interface R2PublicAsset {
  bucket: string;
  key: string;
  publicUrl: string;
  contentType?: string;
  size?: number;
}

export interface CloudflareRuntimeConfig {
  accountId: string;
  r2Bucket: string;
  mediaBaseUrl: string;
  turnstileSiteKey?: string;
}

export const toMediaUrl = (baseUrl: string, key: string) =>
  `${baseUrl.replace(/\/$/, '')}/${key.replace(/^\//, '')}`;
