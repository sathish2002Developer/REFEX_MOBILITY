import React from 'react'
import LegalCmsPage from '../components/LegalCmsPage'
import './Home.css'
import './TermsAndConditions.css'

const TermsAndConditions = () => (
  <LegalCmsPage
    slug="terms-and-conditions"
    siteClass="terms-and-conditions"
    elementorClass="elementor-terms-and-conditions"
    bodyClass="page-template-default page page-terms-and-conditions elementor-default elementor-kit-6330 elementor-page elementor-page-terms-and-conditions"
    heroSectionClass="elementor-element-terms-hero"
    contentSectionClass="elementor-element-terms-content"
    contentWrapperClass="terms-content-wrapper"
  />
)

export default TermsAndConditions
