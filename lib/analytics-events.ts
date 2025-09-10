// Analytics event constants and helper functions
import * as gtag from './gtag'

// Event categories
export const ANALYTICS_CATEGORIES = {
  USER_INTERACTION: 'user_interaction',
  CAR_CUSTOMIZATION: 'car_customization',
  FORM_SUBMISSION: 'form_submission',
  NAVIGATION: 'navigation',
  ERROR: 'error',
} as const

// Event actions
export const ANALYTICS_ACTIONS = {
  // Car customization
  IMAGE_UPLOADED: 'image_uploaded',
  MODIFICATION_GENERATED: 'modification_generated',
  REFERENCE_IMAGE_ADDED: 'reference_image_added',
  
  // Form interactions
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // Navigation
  PAGE_VIEWED: 'page_viewed',
  LINK_CLICKED: 'link_clicked',
  
  // User interactions
  BUTTON_CLICKED: 'button_clicked',
  MODAL_OPENED: 'modal_opened',
  MODAL_CLOSED: 'modal_closed',
} as const

// Helper functions for common tracking scenarios
export const trackCarImageUpload = (imageType: 'original' | 'reference') => {
  gtag.trackCustomEvent(ANALYTICS_ACTIONS.IMAGE_UPLOADED, {
    event_category: ANALYTICS_CATEGORIES.CAR_CUSTOMIZATION,
    event_label: imageType,
  })
}

export const trackModificationGenerated = (prompt: string, hasReference: boolean) => {
  gtag.trackCustomEvent(ANALYTICS_ACTIONS.MODIFICATION_GENERATED, {
    event_category: ANALYTICS_CATEGORIES.CAR_CUSTOMIZATION,
    prompt_length: prompt.length,
    has_reference_image: hasReference,
  })
}

export const trackContactFormSubmission = (success: boolean, errorMessage?: string) => {
  gtag.trackCustomEvent(
    success ? ANALYTICS_ACTIONS.CONTACT_FORM_SUBMITTED : ANALYTICS_ACTIONS.CONTACT_FORM_ERROR,
    {
      event_category: ANALYTICS_CATEGORIES.FORM_SUBMISSION,
      event_label: success ? 'success' : errorMessage,
    }
  )
}

export const trackButtonClick = (buttonName: string, location: string) => {
  gtag.trackCustomEvent(ANALYTICS_ACTIONS.BUTTON_CLICKED, {
    event_category: ANALYTICS_CATEGORIES.USER_INTERACTION,
    event_label: `${buttonName}_${location}`,
  })
}

export const trackPageView = (pageName: string) => {
  gtag.trackCustomEvent(ANALYTICS_ACTIONS.PAGE_VIEWED, {
    event_category: ANALYTICS_CATEGORIES.NAVIGATION,
    event_label: pageName,
  })
}
