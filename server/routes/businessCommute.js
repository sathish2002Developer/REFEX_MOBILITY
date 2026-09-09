const express = require('express');
const { body, validationResult } = require('express-validator');
const businessCommuteController = require('../controllers/businessCommute');
const { isValidInternationalPhone } = require('../helpers/phoneValidation');
const { validateBusinessEmail } = require('../helpers/businessEmail');
const rateLimitBusinessCommute = require('../middlewares/rateLimitBusinessCommute');
const {
  ALLOWED_BUSINESS_SERVICES,
  ALLOWED_REGIONS,
} = require('../config/siteConfig');

const router = express.Router();

const formatValidationErrorResponse = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return true;
  }
  const arr = errors.array();
  const errorMessages = arr.map((e) => e.msg);
  return res.status(400).json({
    success: false,
    message: errorMessages.join(' '),
    errorMessages,
    errors: arr,
  });
};

router.post(
  '/submit',
  rateLimitBusinessCommute,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('name is required')
      .bail()
      .isLength({ min: 2, max: 120 })
      .withMessage('name is invalid')
      .bail()
      .matches(/^[\p{L}\p{M}\s'.-]+$/u)
      .withMessage('name is invalid'),
    body('companyName')
      .trim()
      .notEmpty()
      .withMessage('company name is required')
      .bail()
      .isLength({ min: 1, max: 200 })
      .withMessage('company name is invalid')
      .bail()
      .matches(/^[\p{L}\p{M}\d\s&'.,()+\/-]+$/u)
      .withMessage('company name is invalid'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .bail()
      .custom((value) => {
        const result = validateBusinessEmail(value);
        if (!result.ok) {
          throw new Error(result.error || 'email is invalid');
        }
        return true;
      }),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('phone number is required')
      .bail()
      .custom((value) => {
        if (!isValidInternationalPhone(value)) {
          throw new Error('phone number is invalid');
        }
        return true;
      }),
    body('service').custom((value) => {
      if (value === undefined || value === null) {
        throw new Error('service is required');
      }
      const list = Array.isArray(value) ? value : value ? [value] : [];
      const cleaned = list.map((v) => String(v).trim()).filter(Boolean);
      if (cleaned.length === 0) {
        throw new Error('service is required');
      }
      const invalid = cleaned.filter((s) => !ALLOWED_BUSINESS_SERVICES.includes(s));
      if (invalid.length > 0) {
        throw new Error('service is invalid');
      }
      return true;
    }),
    body('department')
      .trim()
      .notEmpty()
      .withMessage('department is required')
      .bail()
      .isLength({ max: 200 })
      .withMessage('department is invalid')
      .bail()
      .matches(/^[\p{L}\p{M}\d\s&'.,()+\/-]+$/u)
      .withMessage('department is invalid'),
    body('regions').custom((value) => {
      if (value === undefined || value === null) {
        throw new Error('regions is required');
      }
      const list = Array.isArray(value) ? value : value ? [value] : [];
      const cleaned = list.map((v) => String(v).trim()).filter(Boolean);
      if (cleaned.length === 0) {
        throw new Error('regions is required');
      }
      const invalid = cleaned.filter((r) => !ALLOWED_REGIONS.includes(r));
      if (invalid.length > 0) {
        throw new Error('regions is invalid');
      }
      return true;
    }),
    body('numberOfEmployees').custom((value) => {
      const s = value === undefined || value === null ? '' : String(value).trim();
      if (!s) {
        throw new Error('number of employees is required');
      }
      return true;
    }),
    body('comment')
      .optional({ values: 'falsy' })
      .isString()
      .isLength({ max: 5000 })
      .custom((value) => {
        if (value && /<\s*\/?\s*script\b/i.test(String(value))) {
          throw new Error('comment is invalid');
        }
        return true;
      }),
  ],
  (req, res, next) => {
    if (formatValidationErrorResponse(req, res) !== true) {
      return;
    }
    next();
  },
  businessCommuteController.submitBusinessCommuteForm
);

module.exports = router;
