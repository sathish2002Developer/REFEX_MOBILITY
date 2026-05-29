const emailService = require('../services/email_service');
const { responseStatus } = require('../helpers/response');
const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');
const { buildBusinessCommuteKissflowPayload } = require('../helpers/kissflowPayloadBuilder');
const { assertRecaptchaForSubmit } = require('../helpers/recaptcha');
const {
  WEBSITE_NAME,
  BUSINESS_FORM_NAME,
  KISSFLOW_CONTACT_WEBHOOK_URL,
} = require('../config/siteConfig');

const submitBusinessCommuteForm = async (req, res) => {
  try {
    const captcha = await assertRecaptchaForSubmit(req);
    if (!captcha.ok) {
      return res.status(400).json({
        success: false,
        message: captcha.message,
        errorMessages: [captcha.message],
        errors: [{ path: 'recaptcha', msg: captcha.message }],
      });
    }

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
    } = req.body;

    const ipAddress =
      req.headers['x-forwarded-for']?.split?.(',')[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      '';

    const formData = {
      name,
      companyName,
      email,
      phone,
      service: Array.isArray(service) ? service : service ? [service] : [],
      department,
      regions: Array.isArray(regions) ? regions : regions ? [regions] : [],
      numberOfEmployees,
      comment: comment || '',
      ipAddress,
    };

    const webhookData = buildBusinessCommuteKissflowPayload(req, formData);
    sendToKissflowWebhook(
      WEBSITE_NAME,
      BUSINESS_FORM_NAME,
      webhookData,
      KISSFLOW_CONTACT_WEBHOOK_URL
    );

    let emailSent = false;
    try {
      const result = await emailService.sendBusinessCommuteEmail(formData);
      emailSent = Boolean(result?.success);
    } catch (emailErr) {
      console.error('[BusinessCommute] Staff email failed', { message: emailErr?.message });
    }

    return responseStatus(res, 200, 'Thank you! Our team will reach out shortly.', {
      emailSent,
    });
  } catch (error) {
    console.error('[BusinessCommute] submit error', { message: error?.message });
    return responseStatus(res, 500, 'Failed to submit form. Please try again later.');
  }
};

module.exports = {
  submitBusinessCommuteForm,
};
