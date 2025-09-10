export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Check if GA is available and configured
const isGAAvailable = (): boolean => {
  return typeof window !== "undefined" && !!GA_MEASUREMENT_ID;
};

export const pageview = (url: string) => {
  if (isGAAvailable()) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  params,
}: {
  action: string;
  params: { [key: string]: any };
}) => {
  if (isGAAvailable()) {
    window.gtag("event", action, params);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  pageview(url);
};

// Track custom events
export const trackCustomEvent = (eventName: string, parameters: { [key: string]: any }) => {
  event({
    action: eventName,
    params: parameters,
  });
};

// Contact form tracking
export const trackContactFormSubmit = () => {
  event({
    action: 'contact_form_submit',
    params: {
      event_category: 'engagement',
      event_label: 'Contact Form',
    },
  });
};
