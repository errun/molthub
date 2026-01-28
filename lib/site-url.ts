const LOCALHOST_URL = "http://localhost:3000";

const hasProtocol = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export const getBaseUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) {
    return hasProtocol(siteUrl) ? siteUrl : `https://${siteUrl}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return LOCALHOST_URL;
};
