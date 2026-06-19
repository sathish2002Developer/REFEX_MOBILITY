import React from 'react'
import LegalCmsPage from '../components/LegalCmsPage'
import './Home.css'
import './RefundsAndCancellation.css'

const RefundsAndCancellation = () => (
  <LegalCmsPage
    slug="refunds-and-cancellation-policy"
    siteClass="refunds-and-cancellation"
    elementorClass="elementor-refunds-and-cancellation"
    bodyClass="page-template-default page page-refunds-and-cancellation-policy elementor-default elementor-kit-6330 elementor-page elementor-page-refunds-and-cancellation-policy"
    heroSectionClass="elementor-element-refunds-hero"
    contentSectionClass="elementor-element-refunds-content"
    contentWrapperClass="refunds-content-wrapper"
  />
)

export default RefundsAndCancellation
