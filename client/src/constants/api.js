/** Website + admin API base URL. Set VITE_API_BASE_URL (e.g. https://refexmobility.com). Dev proxy is used when unset. */
const envUrl = import.meta.env.VITE_API_BASE_URL
export const API_BASE_URL =
  envUrl !== undefined && String(envUrl).trim() !== ''
    ? String(envUrl).replace(/\/$/, '')
    : import.meta.env.DEV
      ? ''
      : 'https://refexmobility.com'
