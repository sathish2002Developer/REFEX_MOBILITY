const express = require('express');
const { body, validationResult } = require('express-validator');

const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');
const { buildContactFormKissflowPayload } = require('../helpers/kissflowPayloadBuilder');
const {
  WEBSITE_NAME,
  CONTACT_FORM_NAME,
  KISSFLOW_CONTACT_WEBHOOK_URL,
} = require('../config/siteConfig');
const { isValidInternationalPhone } = require('../helpers/phoneValidation');
const { getSpamRejection } = require('../helpers/spamFilter');

const router = express.Router();

// Practical email format (local@domain.tld)
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

router.post(
  '/contact-form',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('name is required')
      .isLength({ min: 2, max: 120 })
      .withMessage('name must be between 2 and 120 characters')
      .matches(/^[\p{L}\p{M}\s'.-]+$/u)
      .withMessage('name contains invalid characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .matches(EMAIL_REGEX)
      .withMessage('valid email is required'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('phone is required')
      .custom((value) => {
        if (!isValidInternationalPhone(value)) {
          throw new Error('phone is invalid');
        }
        return true;
      }),
    body('company').optional().isString().isLength({ max: 200 }),
    body('message').trim().notEmpty().withMessage('message is required').isLength({ max: 5000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const arr = errors.array();
      const fieldLabels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        message: 'Message',
      };
      const errorMessages = arr.map((e) => {
        const label = fieldLabels[e.path] || e.path;
        return `${label}: ${e.msg}`;
      });
      return res.status(400).json({
        success: false,
        message: errorMessages.join(' '),
        errorMessages,
        errors: arr,
      });
    }

    const spam = getSpamRejection(req.body || {});
    if (spam) {
      console.warn('[ContactForm] Ignored spam submission', spam);
      return res.json({
        success: true,
        message: 'Contact form submitted successfully',
        emailSent: false,
        ignored: true,
      });
    }

    const { name, email, phone, company, message } = req.body || {};

    const webhookData = buildContactFormKissflowPayload(req, {
      name,
      email,
      phone,
      company,
      message,
    });

    sendToKissflowWebhook(
      WEBSITE_NAME,
      CONTACT_FORM_NAME,
      webhookData,
      KISSFLOW_CONTACT_WEBHOOK_URL
    );

    const emailSent = false;

    return res.json({
      success: true,
      message: 'Contact form submitted successfully',
      emailSent,
    });
  }
);

module.exports = router;
