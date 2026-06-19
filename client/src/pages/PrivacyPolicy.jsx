import React from 'react'
import LegalCmsPage from '../components/LegalCmsPage'
import './Home.css'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => (
  <LegalCmsPage
    slug="privacy-policy"
    siteClass="privacy-policy"
    elementorClass="elementor-privacy-policy"
    bodyClass="page-template-default page page-privacy-policy elementor-default elementor-kit-6330 elementor-page elementor-page-privacy-policy"
    heroSectionClass="elementor-element-privacy-hero"
    contentSectionClass="elementor-element-privacy-content"
    contentWrapperClass=""
    contentInnerClass="privacy-policy-content"
  />
)

export default PrivacyPolicy
