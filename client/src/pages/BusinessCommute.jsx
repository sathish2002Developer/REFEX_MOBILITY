import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './Home.css'
import './BusinessCommute.css'

// Import all client logos from refexclients folder
import Amazon from '../assets/refexclients/amazon.png'
import Ather from '../assets/refexclients/Ather-logo.svg.png'
import FairfieldMarriott from '../assets/refexclients/Fairfield_by_Marriott_logo.png'
import Flipkart from '../assets/refexclients/flipkart-logo-png-transparent.png'
import FourPoints from '../assets/refexclients/Four_Points_Logo_neu.svg.png'
import GrantThornton from '../assets/refexclients/grant-thornton.png'
import Hexaware from '../assets/refexclients/Hexa ware.png'
import JPMorgan from '../assets/refexclients/JP Morgan.png'
import LemonTree from '../assets/refexclients/lemon-tree-hotels.png'
import LondonStockExchange from '../assets/refexclients/london-stock-exchange-1-logo-black-and-white.png'
import Mindsprint from '../assets/refexclients/Mindsprint_Logo.png'
import Nestle from '../assets/refexclients/Nestle.png'
import PwC from '../assets/refexclients/pwc.png'
import RaintreeHotels from '../assets/refexclients/raintree.jpeg'
import Samsung from '../assets/refexclients/Samsung.png'
import SopraSteria from '../assets/refexclients/sopra_steria.png'
import TajHotels from '../assets/refexclients/Taj_Hotels_logo.svg.png'
import TCS from '../assets/refexclients/Tata_Consultancy_Services_old_logo.svg.png'
import Titan from '../assets/refexclients/titan-logo-hd.webp'
import Wipro from '../assets/refexclients/Wipro_Primary_Logo_Color_RGB.svg.png'



const refexclients = [
  {
    name: 'Amazon',
    image: Amazon
  },
  {
    name: 'Ather',
    image: Ather
  },
  {
    name: 'Fairfield by Marriott',
    image: FairfieldMarriott
  },
  {
    name: 'Flipkart',
    image: Flipkart
  },
  {
    name: 'Four Points',
    image: FourPoints
  },
  {
    name: 'Grant Thornton',
    image: GrantThornton
  },
  {
    name: 'Hexaware',
    image: Hexaware
  },
  {
    name: 'J.P. Morgan',
    image: JPMorgan
  },
  {
    name: 'Lemon Tree Hotels',
    image: LemonTree
  },
  {
    name: 'London Stock Exchange',
    image: LondonStockExchange
  },
  {
    name: 'MindSprint',
    image: Mindsprint
  },
  {
    name: 'Nestlé',
    image: Nestle
  },
  {
    name: 'PwC',
    image: PwC
  },
  {
    name: 'Raintree Hotels',
    image: RaintreeHotels
  },
  {
    name: 'Samsung',
    image: Samsung
  },
  {
    name: 'Sopra Steria',
    image: SopraSteria
  },
  {
    name: 'TAJ Hotels',
    image: TajHotels
  },
  {
    name: 'TCS',
    image: TCS
  },
  {
    name: 'Titan',
    image: Titan
  },
  {
    name: 'Wipro',
    image: Wipro
  }
]

const BusinessCommute = () => {
  const [openFaqs, setOpenFaqs] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://refexmobility.com'

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  useEffect(() => {
    // Add body classes from original HTML
    document.body.className = 'page-template-default page page-id-5464 page-two-column colors-light page-business-commute elementor-default elementor-kit-6330 elementor-page elementor-page-5464'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    // Add inline styles
    const style = document.createElement('style')
    style.id = 'business-commute-style-inline-css'
    style.textContent = `
      .iq-breadcrumb-one{
        padding-top: 30px !important;
        padding-bottom: 0px !important;
      }
      @media only screen and (max-width: 991px) {
        .iq-breadcrumb-one {
          padding-top: 0px !important;
          padding-bottom: 0px !important;
        }
      }
    `
    document.head.appendChild(style)

    // Add hero background styles
    const heroBgStyle = document.createElement('style')
    heroBgStyle.id = 'business-commute-hero-bg'
    heroBgStyle.textContent = `
      .elementor-5464 .elementor-element.elementor-element-b485948:not(.elementor-motion-effects-element-type-background),
      .elementor-5464 .elementor-element.elementor-element-b485948 > .elementor-motion-effects-container > .elementor-motion-effects-layer {
        --wpr-bg-822373e4-734c-4c2b-aff4-8d7474887c73: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
        background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .elementor-5464 .elementor-element.elementor-element-b485948 {
        background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        min-height: 600px;
        display: flex;
        align-items: center;
        position: relative;
        padding: 100px 0;
      }
      .elementor-5464 .elementor-element.elementor-element-b485948 .elementor-background-overlay {
        background-color: #000000;
        opacity: 0.5;
        transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
      }
      .elementor-5464 .elementor-element.elementor-element-c00bf29 .elementor-heading-title {
        color: #FFFFFF;
        font-family: "Poppins", Sans-serif;
        font-size: 56px;
        font-weight: 700;
        line-height: 1.2em;
      }
      .elementor-5464 .elementor-element.elementor-element-a11fdc0 {
        color: #FFFFFF;
        font-family: "Poppins", Sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 1.6em;
      }
      .elementor-5464 .elementor-element.elementor-element-a11fdc0 p {
        color: #FFFFFF;
      }
      .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button {
        background-color: #F4553B;
        font-family: "Poppins", Sans-serif;
        font-size: 18px;
        font-weight: 600;
        fill: #FFFFFF;
        color: #FFFFFF;
        border-radius: 50px 50px 50px 50px;
        padding: 15px 40px 15px 40px;
      }
      .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button:hover,
      .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button:focus {
        background-color: #4DAF40;
        color: #FFFFFF;
      }
      .elementor-5464 .elementor-element.elementor-element-234530b:not(.elementor-motion-effects-element-type-background),
      .elementor-5464 .elementor-element.elementor-element-234530b > .elementor-motion-effects-container > .elementor-motion-effects-layer {
        --wpr-bg-a27440ee-df27-4a53-b179-87b15267dae2: url('/wp-content/uploads/2025/07/bg-img.png');
        background-image: url('/wp-content/uploads/2025/07/bg-img.png');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      /* Extra Large Screens (1920px and above) */
      @media (min-width: 1920px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-2048x853.webp');
        }
      }
      
      /* Large Desktop (1550px - 1919px) */
      @media (min-width: 1550px) and (max-width: 1919px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
        }
      }
      
      /* Desktop and Large Tablets (1025px - 1549px) */
      @media (min-width: 1025px) and (max-width: 1549px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
        }
      }
      
      /* Tablets (768px - 1024px) */
      @media (min-width: 768px) and (max-width: 1024px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-2000x1200.webp');
          min-height: 550px;
          padding: 80px 0;
        }
        .elementor-5464 .elementor-element.elementor-element-c00bf29 .elementor-heading-title {
          font-size: 48px;
        }
        .elementor-5464 .elementor-element.elementor-element-a11fdc0 {
          font-size: 18px;
        }
        .elementor-5464 .elementor-element.elementor-element-b485948 .elementor-container {
          padding-top: 80px !important;
        }
      }
      
      /* Mobile Devices (480px - 767px) */
      @media (max-width: 767px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          background-image: url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp');
          min-height: 500px;
          padding: 60px 0;
          align-items: flex-start !important;
        }
        .elementor-5464 .elementor-element.elementor-element-b485948 .elementor-container {
          padding-top: 70px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        .elementor-5464 .elementor-element.elementor-element-c00bf29 .elementor-heading-title {
          font-size: 36px;
          text-align: center !important;
        }
        .elementor-5464 .elementor-element.elementor-element-a11fdc0 {
          font-size: 16px;
          text-align: center !important;
        }
        .elementor-5464 .elementor-element.elementor-element-a11fdc0 p {
          text-align: center !important;
        }
        .elementor-5464 .elementor-element.elementor-element-bc8f999 {
          text-align: center !important;
        }
        .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button {
          font-size: 16px;
          padding: 12px 30px;
          margin: 0 auto;
        }
        .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button-wrapper {
          display: flex;
          justify-content: center;
        }
      }
      
      /* Small Mobile (480px and below) */
      @media (max-width: 480px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          min-height: 450px;
          padding: 50px 0;
        }
        .elementor-5464 .elementor-element.elementor-element-b485948 .elementor-container {
          padding-top: 60px !important;
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        .elementor-5464 .elementor-element.elementor-element-c00bf29 .elementor-heading-title {
          font-size: 32px;
        }
        .elementor-5464 .elementor-element.elementor-element-a11fdc0 {
          font-size: 15px;
        }
        .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button {
          font-size: 14px;
          padding: 10px 25px;
        }
      }
      
      /* Very Small Mobile (360px and below) */
      @media (max-width: 360px) {
        .elementor-5464 .elementor-element.elementor-element-b485948 {
          min-height: 400px;
          padding: 40px 0;
        }
        .elementor-5464 .elementor-element.elementor-element-b485948 .elementor-container {
          padding-top: 50px !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
        .elementor-5464 .elementor-element.elementor-element-c00bf29 .elementor-heading-title {
          font-size: 28px;
        }
        .elementor-5464 .elementor-element.elementor-element-a11fdc0 {
          font-size: 14px;
        }
        .elementor-5464 .elementor-element.elementor-element-bc8f999 .elementor-button {
          font-size: 13px;
          padding: 10px 20px;
        }
      }
    `
    document.head.appendChild(heroBgStyle)

    // Load Choices.js CSS
    const choicesCSS = document.createElement('link')
    choicesCSS.rel = 'stylesheet'
    choicesCSS.href = 'https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/styles/choices.min.css'
    document.head.appendChild(choicesCSS)

    // Load external scripts
    const scripts = [
      '/wp-content/themes/enerzee/assets/js/bootstrap.min.js',
      '/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js',
      'https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/scripts/choices.min.js'
    ]

    scripts.forEach(src => {
      const script = document.createElement('script')
      script.src = src
      script.defer = true
      document.body.appendChild(script)
    })

    // Initialize Swiper carousels
    const initSwipers = () => {
      if (window.Swiper) {
        // Client logos carousel
        const clientLogosSwiper = document.querySelector('.business-commute .client-logos-swiper')
        if (clientLogosSwiper && !clientLogosSwiper.swiper) {
          new window.Swiper(clientLogosSwiper, {
            slidesPerView: 5,
            spaceBetween: 25,
            speed: 500,
            autoplay: {
              delay: 1000,
              disableOnInteraction: false,
            },
            loop: true,
            breakpoints: {
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              0: {
                slidesPerView: 3,
                spaceBetween: 0,
              }
            }
          })
        }

        // Why Choose Refex carousel
        const whyChooseSwiper = document.querySelector('.business-commute .why-choose-refex-swiper')
        if (whyChooseSwiper && !whyChooseSwiper.swiper) {
          const container = whyChooseSwiper.closest('.elementor-widget-container')
          new window.Swiper(whyChooseSwiper, {
            slidesPerView: 2,
            spaceBetween: 15,
            speed: 500,
            navigation: {
              nextEl: container?.querySelector('.elementor-swiper-button-next'),
              prevEl: container?.querySelector('.elementor-swiper-button-prev'),
            },
            pagination: {
              el: container?.querySelector('.swiper-pagination'),
              clickable: true,
              type: 'bullets',
            },
            breakpoints: {
              1920: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1550: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              }
            }
          })
        }
      } else {
        setTimeout(initSwipers, 100)
      }
    }

    let attempts = 0
    const tryInit = () => {
      attempts++
      if (window.Swiper || attempts > 50) {
        initSwipers()
      } else {
        setTimeout(tryInit, 100)
      }
    }
    setTimeout(tryInit, 500)

    // Store reCAPTCHA widget ID
    let recaptchaWidgetId = null

    // Load and initialize Google reCAPTCHA
    const loadRecaptcha = () => {
      // Check if script is already loaded
      if (window.grecaptcha && window.grecaptcha.render) {
        initializeRecaptcha()
        return
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="recaptcha"]')
      if (existingScript) {
        existingScript.addEventListener('load', initializeRecaptcha)
        return
      }

      // Create and load the script
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = initializeRecaptcha
      document.head.appendChild(script)
    }

    const initializeRecaptcha = () => {
      // Check if running on localhost - skip reCAPTCHA initialization
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost')
      
      if (isLocalhost) {
        console.log('Running on localhost - reCAPTCHA validation will be skipped')
        // Hide reCAPTCHA container on localhost
        const recaptchaContainer = document.querySelector('.g-recaptcha')
        if (recaptchaContainer && recaptchaContainer.parentElement) {
          recaptchaContainer.parentElement.style.display = 'none'
        }
        return
      }
      
      // Wait a bit for DOM to be fully ready
      setTimeout(() => {
        const recaptchaContainer = document.querySelector('.g-recaptcha')
        if (recaptchaContainer && window.grecaptcha && window.grecaptcha.render) {
          // Check if already rendered
          if (recaptchaContainer.dataset.recaptchaId || recaptchaWidgetId) {
            return
          }
          try {
            const recaptchaId = window.grecaptcha.render(recaptchaContainer, {
              'sitekey': '6Lcu4JIrAAAAAI6_Qg8PfbukWRTSwDH6tD9MWyTy',
              'theme': 'light',
              'callback': () => {
                console.log('reCAPTCHA verified')
              }
            })
            recaptchaContainer.dataset.recaptchaId = recaptchaId
            recaptchaWidgetId = recaptchaId
            console.log('reCAPTCHA initialized with ID:', recaptchaId)
          } catch (error) {
            console.error('Error initializing reCAPTCHA:', error)
            // Don't retry if it's a domain error - it's expected on localhost
            if (!error.message.includes('domain') && !error.message.includes('localhost')) {
              setTimeout(initializeRecaptcha, 500)
            }
          }
        } else if (!recaptchaContainer) {
          // Retry if container not found yet (but limit retries)
          const retryCount = initializeRecaptcha.retryCount || 0
          if (retryCount < 20) {
            initializeRecaptcha.retryCount = retryCount + 1
            setTimeout(initializeRecaptcha, 500)
          }
        }
      }, 100)
    }

    // Add form submission handler
    const form = document.getElementById('wpforms-form-4974')
    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Check if running on localhost (development mode)
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.includes('localhost')
        
        // Check reCAPTCHA - get widget ID from container or use stored ID
        const recaptchaContainer = document.querySelector('.g-recaptcha')
        const widgetId = recaptchaContainer?.dataset.recaptchaId || recaptchaWidgetId
        
        let recaptchaResponse = null
        if (!isLocalhost && window.grecaptcha && widgetId !== null && widgetId !== undefined) {
          try {
            recaptchaResponse = window.grecaptcha.getResponse(widgetId)
          } catch (error) {
            console.error('Error getting reCAPTCHA response:', error)
            // On error, if not localhost, still require it
            if (!isLocalhost) {
              alert('Please complete the "I\'m not a robot" verification before submitting the form.')
              return false
            }
          }
        }
        
        // Only require reCAPTCHA on production (not localhost)
        if (!isLocalhost && !recaptchaResponse) {
          alert('Please complete the "I\'m not a robot" verification before submitting the form.')
          return false
        }

        // Get form data
        const formData = new FormData(form)
        const name = (formData.get('wpforms[fields][6]') || '').trim()
        const companyName = (formData.get('wpforms[fields][7]') || '').trim()
        const email = (formData.get('wpforms[fields][8]') || '').trim()
        const department = (formData.get('wpforms[fields][10]') || '').trim()
        const numberOfEmployees = (formData.get('wpforms[fields][11]') || '').trim()
        const comment = (formData.get('wpforms[fields][12]') || '').trim()
        
        // Get phone number directly from the PhoneInput DOM element
        // PhoneInput component renders an input with class PhoneInputInput inside a PhoneInput container
        let currentPhoneNumber = ''
        const phoneInputContainer = document.querySelector('#wpforms-4974-field_16-container')
        if (phoneInputContainer) {
          const phoneInput = phoneInputContainer.querySelector('.PhoneInputInput') || 
                            phoneInputContainer.querySelector('input[type="tel"]')
          if (phoneInput && phoneInput.value) {
            currentPhoneNumber = phoneInput.value.trim()
          }
        }
        // Fallback to state if DOM value not found
        if (!currentPhoneNumber && phoneNumber) {
          currentPhoneNumber = phoneNumber.trim()
        }
        
        // Get regions - handle both Choices.js and native select
        const regionsSelect = document.getElementById('wpforms-4974-field_13')
        let regions = []
        
        if (regionsSelect) {
          // Check if Choices.js is initialized
          if (regionsSelect.choicesjs) {
            // Get values from Choices.js instance
            const choicesValue = regionsSelect.choicesjs.getValue(true) // true returns array
            regions = Array.isArray(choicesValue) ? choicesValue.filter(val => val && val.trim()) : []
          } else {
            // Fallback to native select
            regions = Array.from(regionsSelect.selectedOptions)
              .map(option => option.value)
              .filter(val => val && val.trim())
          }
        }

        // Validate required fields with specific error messages
        const missingFields = []
        if (!name) missingFields.push('Name')
        if (!companyName) missingFields.push('Company Name')
        if (!email) missingFields.push('Company Email')
        if (!currentPhoneNumber) missingFields.push('Phone Number')
        if (!department) missingFields.push('Department')
        if (!regions || regions.length === 0) missingFields.push('Regions')
        if (!numberOfEmployees) missingFields.push('No. of Employees')

        if (missingFields.length > 0) {
          alert(`Please fill in the following required fields:\n${missingFields.join(', ')}`)
          return false
        }

        // Disable submit button and show loading
        const submitButton = document.getElementById('wpforms-submit-4974')
        const spinner = form.querySelector('.wpforms-submit-spinner')
        const originalText = submitButton.textContent
        submitButton.disabled = true
        submitButton.textContent = 'Sending...'
        if (spinner) spinner.style.display = 'inline-block'

        try {
          // Submit to backend API
          const response = await fetch(`${API_BASE_URL}/api/business-commute/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              companyName,
              email,
              phone: currentPhoneNumber,
              department,
              regions,
              numberOfEmployees,
              comment,
              recaptchaToken: recaptchaResponse || (isLocalhost ? 'localhost-development' : null)
            })
          })

          const result = await response.json()

          if (result.success) {
            alert('Thank you! Your form has been submitted successfully. We will contact you soon.')
            form.reset()
            setPhoneNumber('')
            // Reset reCAPTCHA (only if not localhost and widget is initialized)
            const recaptchaContainerReset = document.querySelector('.g-recaptcha')
            const widgetIdReset = recaptchaContainerReset?.dataset.recaptchaId || recaptchaWidgetId
            const isLocalhostReset = window.location.hostname === 'localhost' || 
                                    window.location.hostname === '127.0.0.1' ||
                                    window.location.hostname.includes('localhost')
            if (!isLocalhostReset && window.grecaptcha && widgetIdReset !== null && widgetIdReset !== undefined) {
              try {
                window.grecaptcha.reset(widgetIdReset)
              } catch (error) {
                console.error('Error resetting reCAPTCHA:', error)
              }
            }
          } else {
            alert(result.message || 'Failed to submit form. Please try again.')
          }
        } catch (error) {
          console.error('Error submitting form:', error)
          alert('An error occurred while submitting the form. Please try again.')
        } finally {
          // Re-enable submit button
          submitButton.disabled = false
          submitButton.textContent = originalText
          if (spinner) spinner.style.display = 'none'
        }
      }
      
      form.addEventListener('submit', handleSubmit)
      
      // Store handleSubmit on form for cleanup
      form.handleSubmit = handleSubmit
    }

    // Load reCAPTCHA after a short delay to ensure DOM is ready
    setTimeout(loadRecaptcha, 1000)

    // Initialize Choices.js for Regions dropdown
    let choicesAttempts = 0
    const initChoicesJS = () => {
      choicesAttempts++
      const selectElement = document.querySelector('#wpforms-4974-field_13')
      
      if (typeof window.Choices !== 'undefined' && selectElement) {
        // Check if already initialized
        if (selectElement.choicesjs || selectElement.closest('.choices')) {
          return
        }
        
        try {
          const choicesInstance = new window.Choices(selectElement, {
            searchEnabled: true,
            removeItemButton: true,
            allowHTML: true,
            itemSelectText: '',
            shouldSort: false,
            placeholder: true,
            placeholderValue: 'Select regions',
            searchPlaceholderValue: 'Search regions'
          })
          selectElement.choicesjs = choicesInstance
        } catch (error) {
          console.error('Error initializing Choices.js:', error)
          if (choicesAttempts < 50) {
            setTimeout(initChoicesJS, 200)
          }
        }
      } else if (choicesAttempts < 100) {
        // Retry if Choices.js not loaded or element not found
        setTimeout(initChoicesJS, 100)
      }
    }

    // Try to initialize Choices.js after a delay to ensure library is loaded
    setTimeout(initChoicesJS, 1500)

    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
      const inlineStyle = document.getElementById('business-commute-style-inline-css')
      const heroBgStyle = document.getElementById('business-commute-hero-bg')
      if (inlineStyle) inlineStyle.remove()
      if (heroBgStyle) heroBgStyle.remove()
      
      // Cleanup form event listener
      const form = document.getElementById('wpforms-form-4974')
      if (form && form.handleSubmit) {
        form.removeEventListener('submit', form.handleSubmit)
        form.handleSubmit = null
      }
      
      // Cleanup Choices.js instance
      const selectElement = document.querySelector('#wpforms-4974-field_13')
      if (selectElement && selectElement.choicesjs) {
        try {
          selectElement.choicesjs.destroy()
        } catch (e) {
          console.error('Error destroying Choices.js:', e)
        }
        selectElement.choicesjs = null
      }

      // Cleanup reCAPTCHA
      const recaptchaContainer = document.querySelector('.g-recaptcha')
      if (recaptchaContainer && window.grecaptcha && recaptchaContainer.dataset.recaptchaId) {
        try {
          window.grecaptcha.reset(recaptchaContainer.dataset.recaptchaId)
        } catch (e) {
          console.error('Error resetting reCAPTCHA:', e)
        }
      }
    }
  }, [])

  const scrollToForm = (e) => {
    e.preventDefault()
    const formElement = document.getElementById('connect-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id="page" className="site business-commute">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article id="post-5464" className="enerzee-panel post-5464 page type-page status-publish hentry">
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" data-elementor-id="5464" className="elementor elementor-5464" data-elementor-post-type="page">
                        
                        {/* Hero Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-b485948 elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-top elementor-section-height-default"
                          data-id="b485948"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                          fetchPriority="high"
                          style={{
                            backgroundImage: "url('/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '600px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            position: 'relative',
                            width: '100vw',
                            maxWidth: '100vw',
                            marginLeft: 'calc(-50vw + 50%)',
                            marginRight: 'calc(-50vw + 50%)',
                            left: 0,
                            right: 0,
                            padding: '0 0 100px 0',
                            paddingTop: '0'
                          }}
                        >
                      
                        <div className="elementor-container elementor-column-gap-default" style={{position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 15px', width: '100%', boxSizing: 'border-box'}}>
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-cb3f33f" data-id="cb3f33f" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated" style={{textAlign: 'left'}}>
                                <div className="elementor-element elementor-element-c00bf29 elementor-widget__width-initial elementor-widget-tablet__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="c00bf29" data-element_type="widget" data-widget_type="heading.default">
                                  <div className="elementor-widget-container">
                                    <h2 className="elementor-heading-title elementor-size-default" style={{
                                      color: '#FFFFFF',
                                      fontFamily: '"Poppins", Sans-serif',
                                      fontSize: '56px',
                                      fontWeight: 700,
                                      lineHeight: '1.2em',
                                      marginBottom: '20px',
                                      textAlign: 'left'
                                    }}>
                                      Reliable, Sustainable Mobility for Your Business
                                    </h2>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-a11fdc0 elementor-widget__width-initial elementor-widget-laptop__width-initial elementor-widget elementor-widget-text-editor" data-id="a11fdc0" data-element_type="widget" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container" style={{textAlign: 'left'}}>
                                    <p style={{
                                      color: '#FFFFFF',
                                      fontFamily: '"Poppins", Sans-serif',
                                      fontSize: '20px',
                                      fontWeight: 400,
                                      lineHeight: '1.6em',
                                      marginBottom: '30px',
                                      textAlign: 'left'
                                    }}>Redefining corporate commutes with tailored mobility <br /> solutions for modern enterprises that truly care.</p>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-bc8f999 elementor-mobile-align-left elementor-widget elementor-widget-button" data-id="bc8f999" data-element_type="widget" data-widget_type="button.default">
                                  <div className="elementor-widget-container" style={{textAlign: 'left'}}>
                                    <div className="elementor-button-wrapper">
                                      <a className="elementor-button elementor-button-link elementor-size-sm" href="#connect-form" onClick={scrollToForm} style={{
                                        backgroundColor: '#F4553B',
                                        fontFamily: '"Poppins", Sans-serif',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: '#FFFFFF',
                                        borderRadius: '50px',
                                        padding: '15px 40px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease'
                                      }}>
                                        <span className="elementor-button-content-wrapper">
                                          <span className="elementor-button-text">Get Started</span>
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Client Logos Carousel Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-5db7e2b elementor-section-stretched elementor-section-full_width elementor-hidden-mobile elementor-section-height-default elementor-section-height-default"
                          data-id="5db7e2b"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-9dabb2f" data-id="9dabb2f" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div 
                                  className="elementor-element elementor-element-17d9bb5 elementor-skin-carousel elementor-widget elementor-widget-media-carousel" 
                                  data-id="17d9bb5" 
                                  data-element_type="widget" 
                                  data-settings='{"slides_per_view":"3","autoplay_speed":2000,"space_between":{"unit":"px","size":40,"sizes":[]},"slides_per_view_mobile":"1","space_between_mobile":{"unit":"px","size":20,"sizes":[]},"slides_per_view_tablet":"2","skin":"carousel","effect":"slide","speed":500,"autoplay":"yes","loop":"yes","space_between_laptop":{"unit":"px","size":30,"sizes":[]},"space_between_tablet":{"unit":"px","size":25,"sizes":[]}}'
                                  data-widget_type="media-carousel.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="elementor-swiper">
                                      <div className="elementor-main-swiper swiper client-logos-swiper" role="region" aria-roledescription="carousel" aria-label="Slides">
                                        <div className="swiper-wrapper">
                                          {refexclients.map((client, index) => (
                                            <div className="swiper-slide" key={index} role="group" aria-roledescription="slide">
                                              <div className="elementor-carousel-image" role="img" aria-label={client.name} style={{backgroundImage: `url(${client.image})`}}></div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Why Choose Refex for Business Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-d1b05c3 whychoose-sec bussiness elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                          data-id="d1b05c3"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched"}'
                        >
                          <div className="elementor-container elementor-column-gap-default" style={{maxWidth: "100%", width: "100%"}}>
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-01f0ea9" data-id="01f0ea9" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-85ebe70 elementor-widget__width-initial elementor-widget-laptop__width-initial elementor-widget elementor-widget-image-box" data-id="85ebe70" data-element_type="widget" data-widget_type="image-box.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image-box-wrapper">
                                      <div className="elementor-image-box-content">
                                        <h3 className="elementor-image-box-title">
                                          Why Choose <span style={{color: '#F4553B'}}>Refex For Business</span>
                                        </h3>
                                        <p className="elementor-image-box-description">
                                          Elevate your business travel experience with our service, offering transparent pricing, an easy booking experience, clean cabs, superior payment and invoicing.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-a2874ba elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                                  data-id="a2874ba"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-default" style={{maxWidth: "100%", width: "100%"}}>
                                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9503ae3" data-id="9503ae3" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div 
                                          className="elementor-element elementor-element-d4e5211 elementor-testimonial--layout-image_above elementor-testimonial--skin-default elementor-testimonial--align-center elementor-arrows-yes elementor-pagination-type-bullets elementor-widget elementor-widget-testimonial-carousel" 
                                          data-id="d4e5211" 
                                          data-element_type="widget" 
                                          data-settings='{"slides_per_view":"2","space_between":{"unit":"px","size":40,"sizes":[]},"slides_per_view_mobile":"1","space_between_mobile":{"unit":"px","size":15,"sizes":[]},"slides_per_view_tablet":"2","space_between_tablet":{"unit":"px","size":30,"sizes":[]},"slides_per_view_laptop":"2","space_between_laptop":{"unit":"px","size":30,"sizes":[]},"show_arrows":"yes","pagination":"bullets","speed":500}'
                                          data-widget_type="testimonial-carousel.default"
                                        >
                                          <div className="elementor-widget-container">
                                            <div className="elementor-swiper">
                                              <div className="elementor-main-swiper swiper why-choose-refex-swiper" role="region" aria-roledescription="carousel" aria-label="Slides">
                                                <div className="swiper-wrapper">
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Seamless User Management
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Effortless user onboarding including verified onboarding</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="196" 
                                                            height="196" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/seamless-icon.png" 
                                                            alt="Seamless user management"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Create Guest Booking
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Effortlessly book and manage guest reservations</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="196" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/booking-icon.png" 
                                                            alt="Create Guest Booking"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Get 24/7 Assistance
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Round the clock assistance available for all your needs</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="196" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/headphn.png" 
                                                            alt="24/7 Assistance"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Dedicated Enterprise Dashboard
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Centralised business control hub for optimized operations.</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="196" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/dashboard-icon.png" 
                                                            alt="Dedicated Enterprise Dashboard"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Flexible Payment Options
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Adaptable payment solutions for your convenience</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="197" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/payment-icon.png" 
                                                            alt="Flexible payment options"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Monthly MIS<br />Report
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Monthly insights report to track progress.</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="197" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/monthly-report.png" 
                                                            alt="Monthly MIS Report"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="swiper-slide" role="group" aria-roledescription="slide">
                                                    <div className="elementor-testimonial">
                                                      <div className="elementor-testimonial__content">
                                                        <div className="elementor-testimonial__text">
                                                          Luxuries &<br /> Amenities
                                                        </div>
                                                        <cite className="elementor-testimonial__cite">
                                                          <span className="elementor-testimonial__title">Premium comfort features for enhanced travel experience.</span>
                                                        </cite>
                                                      </div>
                                                      <div className="elementor-testimonial__footer">
                                                        <div className="elementor-testimonial__image">
                                                          <img 
                                                            width="197" 
                                                            height="197" 
                                                            decoding="async" 
                                                            src="/wp-content/uploads/2025/07/luxuries-icon.png" 
                                                            alt="Luxuries & Amenities"
                                                            loading="lazy"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="elementor-swiper-button elementor-swiper-button-prev" role="button" tabIndex="0" aria-label="Previous">
                                                  <i aria-hidden="true" className="eicon-chevron-left fa fa-chevron-left">
                                                    <svg 
                                                      style={{color: '#F4553B'}}
                                                    width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                  </i>
                                                </div>
                                                <div className="elementor-swiper-button elementor-swiper-button-next" role="button" tabIndex="0" aria-label="Next">
                                                  <i aria-hidden="true" className="eicon-chevron-right fa fa-chevron-right">
                                                    <svg
                                                     style={{color: '#F4553B'}}
                                                     width="20" height="20" viewBox="0 0 20 20" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                  </i>
                                                </div>
                                                <div className="swiper-pagination"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </section>


                        {/* Reliable Solution for every Industry Section - Desktop */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-ee11ef7 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="ee11ef7"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                          style={{
                            borderRadius: '48px 48px 48px 48px',
                            backgroundColor: '#FFF9F8',
                            display: 'block',
                            visibility: 'visible'
                          }}
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-3580e3e" data-id="3580e3e" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-e26d1c7 elementor-widget__width-initial elementor-widget-mobile__width-initial elementor-widget-tablet__width-initial elementor-widget-laptop__width-initial elementor-widget elementor-widget-image-box" data-id="e26d1c7" data-element_type="widget" data-widget_type="image-box.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image-box-wrapper">
                                      <div className="elementor-image-box-content">
                                        <h3 className="elementor-image-box-title">
                                          Reliable Solution <span style={{color: '#F4553B'}}>for every Industry</span>
                                        </h3>
                                        <p className="elementor-image-box-description">
                                          Whether it's getting employees to work, patients to care, students to campus, or guests to their destination—timely, reliable transportation makes all the difference. That's why top organisations across healthcare, education, hospitality, and more trust us to power seamless mobility for the people who matter most to their business.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-c425be2 every-industry elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                  data-id="c425be2"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-wide">
                                    <div className="elementor-column elementor-inner-column elementor-element elementor-element-ee6c819" data-id="ee6c819" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-2da40a0 elementor-position-top elementor-widget elementor-widget-image-box" data-id="2da40a0" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="144" 
                                                  height="145" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/user-m.png" 
                                                  className="attachment-full size-full wp-image-5926" 
                                                  alt="Corporates"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Corporates</h3>
                                                <p className="elementor-image-box-description">
                                                  Ensure your teams get to and from the office <b>seamlessly, safely,</b> and on <br />time—every time.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-718fa76" data-id="718fa76" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-1c4e028 elementor-position-top elementor-widget elementor-widget-image-box" data-id="1c4e028" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="150" 
                                                  height="150" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/heart-img.png" 
                                                  className="attachment-full size-full wp-image-6709" 
                                                  alt="Healthcare & Pharmaceuticals"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Healthcare & Pharmaceuticals</h3>
                                                <p className="elementor-image-box-description">
                                                  Provide reliable transportation for<b> patients and caregivers</b>—because timely care starts with timely rides.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-ccef5f4 every-industry elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                  data-id="ccef5f4"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-wide">
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-03137ba" data-id="03137ba" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-a02668d elementor-position-top elementor-widget elementor-widget-image-box" data-id="a02668d" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="144" 
                                                  height="144" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/graduation-icon.png" 
                                                  className="attachment-full size-full wp-image-5924" 
                                                  alt="Education & Ed-Tech"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Education & <br />Ed-Tech</h3>
                                                <p className="elementor-image-box-description">
                                                  Empower students and staff with <b>safe, efficient rides </b>that support learning beyond the classroom.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-e5e9188" data-id="e5e9188" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-d153232 elementor-position-top elementor-widget elementor-widget-image-box" data-id="d153232" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="144" 
                                                  height="144" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/cap-icon.png" 
                                                  className="attachment-full size-full wp-image-5925" 
                                                  alt="Hospitality"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Hospitality</h3>
                                                <p className="elementor-image-box-description">
                                                  Delight your guests with <b>dependable rides</b>—enhancing every step of their journey.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section 
                    
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-4e2da43 elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="4e2da43"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                          style={{
                            borderStyle: 'solid',
                            borderWidth: '2px 2px 2px 2px',
                            borderColor:"#FFF9F8",
                            borderRadius: '48px 48px 48px 48px',
                            marginTop: '40px',
                            background: '#FFF9F8'
                          }}
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-485cb03" data-id="485cb03" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-4e2da43-inner elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                  data-id="4e2da43-inner"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-default">
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-227e12f" data-id="227e12f" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-227e12f-img elementor-widget elementor-widget-image" data-id="227e12f-img" data-element_type="widget" data-widget_type="image.default">
                                          <div className="elementor-widget-container">
                                            <img 
                                              width="489" 
                                              height="610" 
                                              decoding="async" 
                                              src="/wp-content/uploads/elementor/thumbs/power-img-r8ej8v6dlibnyy4xedoz6t2xk0a7zoexu3iikyktg4.png" 
                                              className="attachment-full size-full wp-image-power" 
                                              alt="Powering Corporate Commutes" 
                                              loading="lazy"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-ee225d0" data-id="ee225d0" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-4e2da43-heading elementor-widget elementor-widget-image-box" data-id="4e2da43-heading" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">
                                                  Powering <span style={{color: '#F4553B'}}>Corporate Commutes</span>
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <section 
                                          data-particle_enable="false" 
                                          data-particle-mobile-disabled="false" 
                                          className="elementor-section elementor-inner-section elementor-element elementor-element-2cef8ef elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                          data-id="2cef8ef"
                                          data-element_type="section"
                                        >
                                          <div className="elementor-container elementor-column-gap-default">
                                            <div className="elementor-column elementor-inner-column elementor-element elementor-element-db9c8db" data-id="db9c8db" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-d08a723 number-sec elementor-widget elementor-widget-text-editor" data-id="d08a723" data-element_type="widget" data-widget_type="text-editor.default">
                                                  <div className="elementor-widget-container">
                                                    <p>1</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="elementor-column elementor-inner-column elementor-element elementor-element-9202232" data-id="9202232" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-f1ef916 elementor-widget elementor-widget-image-box" data-id="f1ef916" data-element_type="widget" data-widget_type="image-box.default">
                                                  <div className="elementor-widget-container">
                                                    <div className="elementor-image-box-wrapper">
                                                      <div className="elementor-image-box-content">
                                                        <h3 className="elementor-image-box-title">Smart Trip & Roster Management</h3>
                                                        <p className="elementor-image-box-description">Plan, schedule, and manage employee trips with automated routing and rostering.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <section 
                                          data-particle_enable="false" 
                                          data-particle-mobile-disabled="false" 
                                          className="elementor-section elementor-inner-section elementor-element elementor-element-494158e elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                          data-id="494158e"
                                          data-element_type="section"
                                        >
                                          <div className="elementor-container elementor-column-gap-default">
                                            <div className="elementor-column  elementor-inner-column elementor-element elementor-element-333c1ab" data-id="333c1ab" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-284df2a number-sec elementor-widget elementor-widget-text-editor" data-id="284df2a" data-element_type="widget" data-widget_type="text-editor.default">
                                                  <div className="elementor-widget-container">
                                                    <p>2</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-a4626f7" data-id="a4626f7" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-909ae83 elementor-widget elementor-widget-image-box" data-id="909ae83" data-element_type="widget" data-widget_type="image-box.default">
                                                  <div className="elementor-widget-container">
                                                    <div className="elementor-image-box-wrapper">
                                                      <div className="elementor-image-box-content">
                                                        <h3 className="elementor-image-box-title">Centralized Approvals</h3>
                                                        <p className="elementor-image-box-description">Handle leave, ad-hoc cab requests, shift/address changes from one place.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <section 
                                          data-particle_enable="false" 
                                          data-particle-mobile-disabled="false" 
                                          className="elementor-section elementor-inner-section elementor-element elementor-element-89b0148 elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                          data-id="89b0148"
                                          data-element_type="section"
                                        >
                                          <div className="elementor-container elementor-column-gap-default">
                                            <div className="elementor-column  elementor-inner-column elementor-element elementor-element-b3d0c2c" data-id="b3d0c2c" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-d2b023d number-sec elementor-widget elementor-widget-text-editor" data-id="d2b023d" data-element_type="widget" data-widget_type="text-editor.default">
                                                  <div className="elementor-widget-container">
                                                    <p>3</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-d76c196" data-id="d76c196" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-53bbc2a elementor-widget elementor-widget-image-box" data-id="53bbc2a" data-element_type="widget" data-widget_type="image-box.default">
                                                  <div className="elementor-widget-container">
                                                    <div className="elementor-image-box-wrapper">
                                                      <div className="elementor-image-box-content">
                                                        <h3 className="elementor-image-box-title">Real-Time Tracking & Safety</h3>
                                                        <p className="elementor-image-box-description">Live vehicle tracking, instant alerts, and escort options for female employees.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <section 
                                          data-particle_enable="false" 
                                          data-particle-mobile-disabled="false" 
                                          className="elementor-section elementor-inner-section elementor-element elementor-element-cbc34a1 elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                          data-id="cbc34a1"
                                          data-element_type="section"
                                        >
                                          <div className="elementor-container elementor-column-gap-default">
                                            <div className="elementor-column  elementor-inner-column elementor-element elementor-element-62ab4a7" data-id="62ab4a7" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-c4e1cad number-sec elementor-widget elementor-widget-text-editor" data-id="c4e1cad" data-element_type="widget" data-widget_type="text-editor.default">
                                                  <div className="elementor-widget-container">
                                                    <p>4</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-a1d44a0" data-id="a1d44a0" data-element_type="column">
                                              <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-f6d9652 elementor-widget elementor-widget-image-box" data-id="f6d9652" data-element_type="widget" data-widget_type="image-box.default">
                                                  <div className="elementor-widget-container">
                                                    <div className="elementor-image-box-wrapper">
                                                      <div className="elementor-image-box-content">
                                                        <h3 className="elementor-image-box-title">Project & Trip Sheet Management</h3>
                                                        <p className="elementor-image-box-description">Set up projects, manage teams, and verify trip sheets with ease.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-c4f9ffe elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="c4f9ffe"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e1c5167" data-id="e1c5167" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-7cd5fab elementor-widget__width-initial elementor-widget-laptop__width-initial elementor-widget elementor-widget-image-box" data-id="7cd5fab" data-element_type="widget" data-widget_type="image-box.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image-box-wrapper">
                                      <div className="elementor-image-box-content">
                                        <h3 className="elementor-image-box-title">
                                          Connect<span style={{color: '#F4553B'}}> with us</span>
                                        </h3>
                                        <p className="elementor-image-box-description">
                                          Looking to optimise your team's travel, boost productivity, or offer seamless mobility for your clients? Let us tailor a smart transportation solution that fits your organisation's unique needs.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>



                             {/* Powering Corporate Commutes Section with Background - Desktop */}
                             <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-234530b elementor-section-full_width elementor-section-height-min-height elementor-section-stretched elementor-hidden-mobile elementor-section-height-default elementor-section-items-middle"
                          data-id="234530b"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                          style={{
                            backgroundImage: "url('/wp-content/uploads/2025/07/bg-img.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            width: '100vw',
                            maxWidth: '100%',
                            marginLeft: 'calc(-50vw + 50%)',
                            marginRight: 'calc(-50vw + 50%)',
                            left: 0,
                            right: 0
                          }}
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e30dbde" data-id="e30dbde" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-6fb14df elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                  data-id="6fb14df"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-default">
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-2c3f27f" data-id="2c3f27f" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-8bb7ad7 elementor-widget elementor-widget-image" data-id="8bb7ad7" data-element_type="widget" data-widget_type="image.default">
                                          <div className="elementor-widget-container"
                                              
                                          >
                                     
                                            <img 
                                              width="300" 
                                              height="291" 
                                              decoding="async" 
                                              src="/wp-content/uploads/2025/07/busiiness-car-300x291.png" 
                                              className="attachment-medium size-medium wp-image-8627" 
                                              alt="Business Car"
                                              loading="lazy"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-4ba57f2" data-id="4ba57f2" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-7ad6f31 elementor-position-left elementor-vertical-align-middle elementor-widget elementor-widget-image-box" data-id="7ad6f31" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="144" 
                                                  height="144" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/clock-wall.png" 
                                                  className="attachment-full size-full wp-image-5556" 
                                                  alt="Quick Onboarding"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Quick Onboarding</h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="elementor-element elementor-element-2e09b12 elementor-position-left elementor-vertical-align-middle elementor-widget elementor-widget-image-box" data-id="2e09b12" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="144" 
                                                  height="148" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/custom-pricing.png" 
                                                  className="attachment-full size-full wp-image-5566" 
                                                  alt="Custom Pricing"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Custom Pricing</h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="elementor-element elementor-element-2b00761 elementor-position-left elementor-vertical-align-middle elementor-widget elementor-widget-image-box" data-id="2b00761" data-element_type="widget" data-widget_type="image-box.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-image-box-wrapper">
                                              <figure className="elementor-image-box-img">
                                                <img 
                                                  width="146" 
                                                  height="148" 
                                                  decoding="async" 
                                                  src="/wp-content/uploads/2025/07/support-icon.png" 
                                                  className="attachment-full size-full wp-image-5567" 
                                                  alt="Dedicated Account Support"
                                                  loading="lazy"
                                                />
                                              </figure>
                                              <div className="elementor-image-box-content">
                                                <h3 className="elementor-image-box-title">Dedicated Account Support</h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Powering Corporate Commutes Section - Desktop */}
                     


                   
                        {/* How to Get Started Section */}
                    

                        {/* Connect with us Section */}
                
                        {/* Contact Form Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-74f52db bussiness-form elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="74f52db"
                          data-element_type="section"
                          id="business-forms"
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-818293e" data-id="818293e" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-924c6f3 elementor-widget elementor-widget-text-editor" data-id="924c6f3" data-element_type="widget" id="connect-form" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container">
                                    <p>Fill out the form below and our team will be in touch within 24 hours.</p>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-4bbfda8 eael-wpforms-labels-yes eael-wpforms-form-button-custom elementor-widget elementor-widget-eael-wpforms" data-id="4bbfda8" data-element_type="widget" data-widget_type="eael-wpforms.default">
                                  <div className="elementor-widget-container">
                                    <div className="eael-contact-form eael-wpforms eael-wpforms-align-default">
                                      <div className="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-4974">
                                        <form id="wpforms-form-4974" className="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="4974" method="post" enctype="multipart/form-data" action="/business-commute/" data-token="dcc23f4a61bd9109aa78a7a8c7764255" data-token-time="1767334861">
                                          {/* <noscript className="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript> */}
                                          {/* <div className="wpforms-hidden" id="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</div> */}
                                          <div className="wpforms-field-container">
                                            {/* Row 1: Name (left) + Company Name (right) */}
                                            <div id="wpforms-4974-field_6-container" className="wpforms-field wpforms-field-name wpforms-one-half wpforms-first wpforms-mobile-full wpf-alpha-limit" data-field-id="6">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_6">Name <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <input type="text" id="wpforms-4974-field_6" className="wpforms-field-large wpforms-field-required" name="wpforms[fields][6]" placeholder="Enter your name" aria-errormessage="wpforms-4974-field_6-error" required />
                                            </div>
                                            <div id="wpforms-4974-field_7-container" className="wpforms-field wpforms-field-text wpforms-one-half wpforms-last wpforms-mobile-full" data-field-id="7">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_7">Company Name <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <input type="text" id="wpforms-4974-field_7" className="wpforms-field-large wpforms-field-required" name="wpforms[fields][7]" placeholder="Enter your company name" aria-errormessage="wpforms-4974-field_7-error" required />
                                            </div>
                                            {/* Row 2: Company Email (left) + Phone no. (right) */}
                                            <div id="wpforms-4974-field_8-container" className="wpforms-field wpforms-field-email wpforms-one-half wpforms-first wpforms-mobile-full" data-field-id="8">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_8">Company Email <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <input type="email" id="wpforms-4974-field_8" className="wpforms-field-large wpforms-field-required" name="wpforms[fields][8]" placeholder="Enter your company email" spellCheck="false" aria-errormessage="wpforms-4974-field_8-error" required />
                                            </div>
                                            <div id="wpforms-4974-field_16-container" className="wpforms-field wpforms-field-phone wpforms-one-half wpforms-last wpforms-mobile-full" data-field-id="16">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_16">Phone no. <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <PhoneInput
                                                international
                                                defaultCountry="IN"
                                                value={phoneNumber}
                                                onChange={setPhoneNumber}
                                                placeholder="Enter your phone no."
                                                className="business-phone-input"
                                                id="wpforms-4974-field_16"
                                                name="wpforms[fields][16]"
                                                required
                                              />
                                              <input type="hidden" name="wpforms[fields][16]" value={phoneNumber} />
                                            </div>
                                            {/* Row 3: Department (left) + Regions (right) */}
                                            <div id="wpforms-4974-field_10-container" className="wpforms-field wpforms-field-text wpforms-one-half wpforms-first wpforms-mobile-full" data-field-id="10">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_10">Department <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <input type="text" id="wpforms-4974-field_10" className="wpforms-field-large wpforms-field-required" name="wpforms[fields][10]" placeholder="Enter your department" aria-errormessage="wpforms-4974-field_10-error" required />
                                            </div>
                                            <div id="wpforms-4974-field_13-container" className="wpforms-field wpforms-field-select wpforms-one-half wpforms-last wpforms-mobile-full wpforms-field-select-style-modern" data-field-id="13">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_13">Regions <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <select id="wpforms-4974-field_13" className="wpforms-field-large wpforms-field-required choicesjs-select" data-size-class="wpforms-field-row wpforms-field-large" name="wpforms[fields][13][]" multiple required>
                                                <option value="" className="placeholder" disabled>Chennai</option>
                                                <option value="Chennai">Chennai</option>
                                                <option value="Bengaluru">Bengaluru</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Hyderabad">Hyderabad</option>
                                                <option value="Delhi NCR">Delhi NCR</option>
                                              </select>
                                            </div>
                                            {/* Row 4: No. of Employees (left) + empty (right) */}
                                            <div id="wpforms-4974-field_11-container" className="wpforms-field wpforms-field-number wpforms-one-half wpforms-first wpforms-mobile-full" data-field-id="11">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_11">No. of Employees <span className="wpforms-required-label" aria-hidden="true">*</span></label>
                                              <input type="number" id="wpforms-4974-field_11" className="wpforms-field-large wpforms-field-required" name="wpforms[fields][11]" placeholder="Enter no. of employees" required />
                                            </div>
                                            <div className="wpforms-one-half wpforms-last wpforms-mobile-full" style={{visibility: 'hidden', height: 0, margin: 0, padding: 0}}></div>
                                            {/* Comment field - full width */}
                                            <div id="wpforms-4974-field_12-container" className="wpforms-field wpforms-field-textarea" data-field-id="12">
                                              <label className="wpforms-field-label" htmlFor="wpforms-4974-field_12">Comment (optional)</label>
                                              <textarea id="wpforms-4974-field_12" className="wpforms-field-medium" name="wpforms[fields][12]" placeholder="Write comment" aria-errormessage="wpforms-4974-field_12-error"></textarea>
                                            </div>
                                          </div>
                                          <div 
                  className="flex justify-center"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-delay="350"
                >
                  <div 
                    className="g-recaptcha" 
                    data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    data-callback="onRecaptchaSuccess"
                  ></div>
                </div>

                                          <div className="wpforms-submit-container">
                                            <input type="hidden" name="wpforms[id]" value="4974" />
                                            <input type="hidden" name="page_title" value="Business Commute" />
                                            <input type="hidden" name="page_url" value="/business-commute/" />
                                            <input type="hidden" name="page_id" value="5464" />
                                            <input type="hidden" name="wpforms[post_id]" value="5464" />
                                            <button type="submit" name="wpforms[submit]" id="wpforms-submit-4974" className="wpforms-submit wp-forms-submit" data-alt-text="Sending..." data-submit-text="Submit Details" aria-live="assertive" value="wpforms-submit">Submit Details</button>
                                            <img decoding="async" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2026%2026'%3E%3C/svg%3E" className="wpforms-submit-spinner" style={{display: 'none'}} width="26" height="26" alt="Loading" />
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* FAQ Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-0f89ca7 faq-sec elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="0f89ca7"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-153bcb1" data-id="153bcb1" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-a431977 elementor-widget__width-initial elementor-widget elementor-widget-image-box" data-id="a431977" data-element_type="widget" data-widget_type="image-box.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image-box-wrapper">
                                      <div className="elementor-image-box-content">
                                        <h3 className="elementor-image-box-title">
                                          Frequently Asked <span style={{color: '#F4553B'}}>Questions</span>
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <section 
                                  data-particle_enable="false" 
                                  data-particle-mobile-disabled="false" 
                                  className="elementor-section elementor-inner-section elementor-element elementor-element-3dcc591 frequently-qus elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                  data-id="3dcc591"
                                  data-element_type="section"
                                >
                                  <div className="elementor-container elementor-column-gap-default">
                                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-ac4bea6" data-id="ac4bea6" data-element_type="column">
                                      <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-29e2157 elementor-widget elementor-widget-toggle" data-id="29e2157" data-element_type="widget" data-widget_type="toggle.default">
                                          <div className="elementor-widget-container">
                                            <div className="elementor-toggle">
                                              {/* FAQ Item 1 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4391" 
                                                  className={`elementor-tab-title ${openFaqs[1] ? 'active' : ''}`}
                                                  data-tab="1" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4391" 
                                                  aria-expanded={openFaqs[1] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(1)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    What are the benefits of onboarding refex as a mobility partner for our organisation?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4391" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[1] ? 'active' : ''}`}
                                                  data-tab="1" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4391"
                                                  style={{display: openFaqs[1] ? 'block' : 'none'}}
                                                >
                                                  <p><span style={{fontWeight: 400}}>As a Refex customer, you get several perks which include.</span></p>
                                                  <ul>
                                                    <li><span style={{fontWeight: 400}}> Dedicated enterprise dashboard for onboarding/off-boarding users</span></li>
                                                    <li><span style={{fontWeight: 400}}> Create, modify and track all your rides</span></li>
                                                    <li><span style={{fontWeight: 400}}> Detailed monthly ride and payment reports</span></li>
                                                    <li><span style={{fontWeight: 400}}> Payments and invoicing (e-invoices)</span></li>
                                                    <li><span style={{fontWeight: 400}}> and all this can also be done using end to end encrypted secure API integrations.</span></li>
                                                  </ul>
                                                </div>
                                              </div>

                                              {/* FAQ Item 2 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4392" 
                                                  className={`elementor-tab-title ${openFaqs[2] ? 'active' : ''}`}
                                                  data-tab="2" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4392" 
                                                  aria-expanded={openFaqs[2] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(2)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    Do I get any carbon savings certificate?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4392" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[2] ? 'active' : ''}`}
                                                  data-tab="2" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4392"
                                                  style={{display: openFaqs[2] ? 'block' : 'none'}}
                                                >
                                                  <p><span style={{fontWeight: 400}}>Yes, Refex Mobility provides carbon savings certificates to our business clients, recognizing your contributions to sustainable and eco-friendly transportation.</span></p>
                                                </div>
                                              </div>

                                              {/* FAQ Item 3 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4393" 
                                                  className={`elementor-tab-title ${openFaqs[3] ? 'active' : ''}`}
                                                  data-tab="3" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4393" 
                                                  aria-expanded={openFaqs[3] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(3)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    Who is responsible for ownership and maintains the fleet and drivers?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4393" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[3] ? 'active' : ''}`}
                                                  data-tab="3" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4393"
                                                  style={{display: openFaqs[3] ? 'block' : 'none'}}
                                                >
                                                  <p><span style={{fontWeight: 400}}>We at Refex ensure all fleet maintenance and driver training, maintaining high standards of safety, cleanliness, and reliability for every ride.</span></p>
                                                </div>
                                              </div>

                                              {/* FAQ Item 4 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4394" 
                                                  className={`elementor-tab-title ${openFaqs[4] ? 'active' : ''}`}
                                                  data-tab="4" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4394" 
                                                  aria-expanded={openFaqs[4] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(4)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    Can I book my travel in advance?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4394" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[4] ? 'active' : ''}`}
                                                  data-tab="4" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4394"
                                                  style={{display: openFaqs[4] ? 'block' : 'none'}}
                                                >
                                                  <p>Yes. Refex allows you to book travel within City, Airport &amp; Rentals 30 days in advance from our application and admin dashboard.</p>
                                                </div>
                                              </div>

                                              {/* FAQ Item 5 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4395" 
                                                  className={`elementor-tab-title ${openFaqs[5] ? 'active' : ''}`}
                                                  data-tab="5" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4395" 
                                                  aria-expanded={openFaqs[5] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(5)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    What happens if I do not board the cab from my scheduled time?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4395" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[5] ? 'active' : ''}`}
                                                  data-tab="5" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4395"
                                                  style={{display: openFaqs[5] ? 'block' : 'none'}}
                                                >
                                                  <p>Refex waits for 30 min. If you do not board the cab during this time, the driver partners will cancel the pickup and a NO SHOW charge as per your company policy. Employees then need to rebook the Refex Cab.</p>
                                                </div>
                                              </div>

                                              {/* FAQ Item 6 */}
                                              <div className="elementor-toggle-item">
                                                <div 
                                                  id="elementor-tab-title-4396" 
                                                  className={`elementor-tab-title ${openFaqs[6] ? 'active' : ''}`}
                                                  data-tab="6" 
                                                  role="button" 
                                                  aria-controls="elementor-tab-content-4396" 
                                                  aria-expanded={openFaqs[6] ? 'true' : 'false'}
                                                  onClick={() => toggleFaq(6)}
                                                  style={{cursor: 'pointer'}}
                                                >
                                                  <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                    <span className="elementor-toggle-icon-closed">
                                                      <i className="ion ion-plus"></i>
                                                    </span>
                                                    <span className="elementor-toggle-icon-opened">
                                                      <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                    </span>
                                                  </span>
                                                  <a className="elementor-toggle-title" tabIndex="0">
                                                    What to do in case of emergency?
                                                  </a>
                                                </div>
                                                <div 
                                                  id="elementor-tab-content-4396" 
                                                  className={`elementor-tab-content elementor-clearfix ${openFaqs[6] ? 'active' : ''}`}
                                                  data-tab="6" 
                                                  role="region" 
                                                  aria-labelledby="elementor-tab-title-4396"
                                                  style={{display: openFaqs[6] ? 'block' : 'none'}}
                                                >
                                                  <p>Press Panic button installed at the Left and right side of the car near the front seat belt. Refex representative will immediately call back for support. You can also contact them through 24*7 contact number on your Refex app too.</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </section>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BusinessCommute

