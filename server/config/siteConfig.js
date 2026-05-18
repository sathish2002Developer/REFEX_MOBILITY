/** Brand / Kissflow settings — override via env (never commit secrets). */
const WEBSITE_NAME = process.env.WEBSITE_NAME || 'Refex Mobility';
const WEBSITE_SLUG = process.env.WEBSITE_SLUG || 'refexmobility';
const BUSINESS_FORM_NAME = process.env.BUSINESS_FORM_NAME || 'Business commute form';
const CONTACT_FORM_NAME = process.env.CONTACT_FORM_NAME || 'Contact form';

const WEBSITE_AGENT_ID =
  process.env.WEBSITE_AGENT_ID ||
  process.env.REFEX_MOBILITY_AGENT_ID ||
  '';

/** Contact / business enquiry form → Refex Mobility Kissflow integration */
const KISSFLOW_CONTACT_WEBHOOK_URL =
  process.env.KISSFLOW_CONTACT_WEBHOOK_URL ||
  'https://refexgroup.kissflow.com/integration/2/AcCMptlq60zH/webhook/F51DqkQt8HoYqlSALpUWU8-uPOXxdSINKjZmtzXphM6Ujk-hJLw6lgZBW8NrIyyvXSmmZS9MwwaWdTmahBLNxQ';

/** Legacy / alternate webhook (optional override) */
const KISSFLOW_BUSINESS_WEBHOOK_URL =
  process.env.KISSFLOW_BUSINESS_WEBHOOK_URL ||
  process.env.KISSFLOW_WEBHOOK_URL ||
  KISSFLOW_CONTACT_WEBHOOK_URL;

const ALLOWED_BUSINESS_SERVICES = [
  'Corporate Commute',
  'Airport Transfers',
  'Hourly Rentals',
  'Outstation Rides',
];

const ALLOWED_REGIONS = [
  'Chennai',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
  'Delhi NCR',
];

module.exports = {
  WEBSITE_NAME,
  WEBSITE_SLUG,
  BUSINESS_FORM_NAME,
  CONTACT_FORM_NAME,
  WEBSITE_AGENT_ID,
  KISSFLOW_CONTACT_WEBHOOK_URL,
  KISSFLOW_BUSINESS_WEBHOOK_URL,
  ALLOWED_BUSINESS_SERVICES,
  ALLOWED_REGIONS,
};
