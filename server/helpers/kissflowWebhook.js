const { WEBSITE_SLUG, KISSFLOW_CONTACT_WEBHOOK_URL } = require('../config/siteConfig');

const QUEUE_DELAY_MS = Number(process.env.KISSFLOW_QUEUE_DELAY_MS || 3500);
const REQUEST_TIMEOUT_MS = Number(process.env.KISSFLOW_TIMEOUT_MS || 15000);

const queue = [];
let isProcessing = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugifyWebsiteName(name) {
  return (
    String(name ?? '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || WEBSITE_SLUG
  );
}

function randomString() {
  return Math.random().toString(36).slice(2, 10);
}

async function postJson(url, payload) {
  const fetchFn =
    typeof fetch === 'function'
      ? fetch
      : (await import('node-fetch')).default;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetchFn(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) continue;

      const { websiteName, formName, formData, webhookUrl } = item;
      const targetUrl = webhookUrl || KISSFLOW_CONTACT_WEBHOOK_URL;
      const websiteSlug = slugifyWebsiteName(websiteName);
      const submissionId = `${websiteSlug}-${Date.now()}-${randomString()}`;
      const websiteAndForm = `${websiteName} - ${formName}`;

      const payload = {
        ...(formData || {}),
        submissionId,
        websiteName,
        formName,
        Website_and_form: websiteAndForm,
      };

      try {
        const res = await postJson(targetUrl, payload);
        if (res && res.ok) {
          console.log(`[Kissflow] Webhook sent: ${submissionId}`);
        } else {
          const status = res?.status;
          console.warn('[Kissflow] Webhook non-2xx', { status, submissionId });
        }
      } catch (err) {
        console.warn('[Kissflow] Webhook failed', {
          submissionId,
          message: err?.message,
        });
      }

      await sleep(QUEUE_DELAY_MS);
    }
  } finally {
    isProcessing = false;
  }
}

/**
 * Queue a Kissflow webhook (fire-and-forget).
 * @param {string} websiteName
 * @param {string} formName
 * @param {object} formData - field payload (name, email, phone, etc.)
 * @param {string} [webhookUrl] - defaults to KISSFLOW_CONTACT_WEBHOOK_URL
 */
function sendToKissflowWebhook(websiteName, formName, formData, webhookUrl) {
  try {
    console.log('Sending to Kissflow webhook', { websiteName, formName, formData, webhookUrl });
    queue.push({
      websiteName,
      formName,
      formData: formData || {},
      webhookUrl: webhookUrl || KISSFLOW_CONTACT_WEBHOOK_URL,
    });
    processQueue();
  } catch (err) {
    console.error('[Kissflow] Failed to enqueue webhook', { message: err?.message });
  }
}

module.exports = {
  sendToKissflowWebhook,
  KISSFLOW_CONTACT_WEBHOOK_URL,
};
