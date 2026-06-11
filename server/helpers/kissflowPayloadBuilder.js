const { getRequestMeta, phoneToDigitsOnly } = require('./requestMeta');
const { WEBSITE_AGENT_ID } = require('../config/siteConfig');

const KISSFLOW_DEFAULT_AGENT_ID = '6a055602285bce8bb13c28de';

function normalizeRegions(regions) {
  const list = Array.isArray(regions) ? regions : regions ? [regions] : [];
  return list.map((v) => String(v).trim()).filter(Boolean);
}

function normalizeServices(service) {
  const list = Array.isArray(service) ? service : service ? [service] : [];
  return list.map((v) => String(v).trim()).filter(Boolean);
}

function buildMessage(comment, department) {
  const parts = [];
  if (department) {
    parts.push(`Department: ${department}`);
  }
  if (comment) {
    parts.push(comment);
  }
  return parts.join(parts.length > 1 ? '\n\n' : '') || '';
}

/**
 * Business commute / contact enquiry — matches Kissflow reference payload shape.
 * Wrapper fields (submissionId, websiteName, formName, Website_and_form) are added in kissflowWebhook.js
 */
function buildBusinessCommuteKissflowPayload(req, form) {
  const {
    name,
    companyName,
    email,
    phone,
    service,
    department,
    regions,
    numberOfEmployees,
    comment,
  } = form;

  const meta = getRequestMeta(req);
  const phoneDigits = phoneToDigitsOnly(phone);
  const regionList = normalizeRegions(regions);
  const city = regionList.join(', ');
  const serviceList = normalizeServices(service);
  const serviceJoined = serviceList.join(', ');

  return {
    name,
    email,
    Phone_Number: phoneDigits,
    agentid: WEBSITE_AGENT_ID || KISSFLOW_DEFAULT_AGENT_ID,
    company: companyName,
    city,
    cityname: city,
    statename: '',
    service: serviceJoined,
    Product: serviceJoined,
    message: buildMessage(comment, department),
    companySize: String(numberOfEmployees ?? ''),
    no_of_employees: String(numberOfEmployees ?? ''),
    timestamp: meta.timestamp,
    dateTime: meta.dateTime,
    date: meta.date,
    time: meta.time,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    deviceType: meta.deviceType,
    browser: meta.browser,
    countryCode: meta.countryCode,
    referer: meta.referer,
    source: meta.source,
  };
}

/**
 * Simpler contact-form payload (subset of reference fields).
 */
function buildContactFormKissflowPayload(req, form) {
  const { name, email, phone, company, message } = form;
  const meta = getRequestMeta(req);
  const phoneDigits = phoneToDigitsOnly(phone);

  return {
    name,
    email,
    Phone_Number: phoneDigits,
    agentid: WEBSITE_AGENT_ID || KISSFLOW_DEFAULT_AGENT_ID,
    company: company || '',
    city: '',
    cityname: '',
    statename: '',
    service: '',
    Product: '',
    message: message || '',
    companySize: '',
    timestamp: meta.timestamp,
    dateTime: meta.dateTime,
    date: meta.date,
    time: meta.time,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    deviceType: meta.deviceType,
    browser: meta.browser,
    countryCode: meta.countryCode,
    referer: meta.referer,
    source: meta.source,
  };
}

module.exports = {
  buildBusinessCommuteKissflowPayload,
  buildContactFormKissflowPayload,
  normalizeRegions,
};
