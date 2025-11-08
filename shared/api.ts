/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Navbar configuration response
 */
export interface NavbarConfig {
  position: "top" | "side";
  visible: boolean;
  pagesEnabled: {
    freWebinars: boolean;
    liveEvents: boolean;
    instructorResources: boolean;
    instructorLedTraining: boolean;
    onDemandVideo: boolean;
    careerAssistance: boolean;
    examVoucher: boolean;
  };
  logoText: string;
  logoUrl?: string;
}
