/** Website + admin API base URL. Dev uses Vite proxy (/api → localhost:3008) when unset. */
const envUrl = import.meta.env.VITE_API_BASE_URL
export const API_BASE_URL =
  envUrl !== undefined && String(envUrl).trim() !== ''
    ? String(envUrl).replace(/\/$/, '')
    : import.meta.env.DEV
      ? ''
      : 'https://refexmobility.com'
