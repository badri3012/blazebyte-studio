export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
    });
  } else {
    // Analytics not initialized or blocked
    console.debug("[Tracking] " + eventName, params);
  }
};

export const trackPageView = (url: string) => {
  trackEvent("page_view", { page_path: url });
};

export const trackContactClick = (method: "whatsapp" | "email" | "phone", label?: string) => {
  trackEvent("contact_click", { method, label });
};

export const trackConfiguratorStep = (stepName: string, stepIndex: number, service: string) => {
  trackEvent("configurator_step", { step_name: stepName, step_index: stepIndex, service });
};

export const trackLeadGen = (service: string, packageId?: string) => {
  trackEvent("generate_lead", { service, package_id: packageId });
};

export const trackPurchase = (transactionId: string, amount: number, currency: string = "INR") => {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: amount,
    currency: currency,
  });
};
