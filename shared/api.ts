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

/**
 * Content Section Types - Building blocks for lessons/labs
 */
export type ContentSectionType = "text" | "code" | "image" | "video" | "pdf" | "audio" | "note" | "challenge";

export interface ContentProtection {
  allowCopy: boolean;
  allowDownload: boolean;
  requiresPurchase: boolean;
  applyWatermark: boolean;
  viewableAfterPurchase: boolean;
}

export interface CodeBlock {
  language: string;
  code: string;
  fileName?: string;
}

export interface MediaFile {
  url: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  type: "image" | "video" | "pdf" | "audio";
}

export interface ContentSection {
  id: string;
  order: number;
  type: ContentSectionType;
  title: string;
  description?: string;

  // Text content
  content?: string;

  // Code content
  code?: CodeBlock;

  // Media content
  media?: MediaFile;

  // Challenge
  challenge?: {
    instructions: string;
    sampleInput?: string;
    expectedOutput?: string;
  };

  // Protection settings
  protection: ContentProtection;

  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  certification: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  courseIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseWithHierarchy {
  id: string;
  title: string;
  description: string;
  category: string;
  labIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LabWithContent {
  id: string;
  title: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  format: "manual" | "video" | "challenge" | "instructor-led";
  lessonIds: string[];
  status: "draft" | "pending_approval" | "approved" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonWithSections {
  id: string;
  title: string;
  description?: string;
  labId: string;
  courseId: string;
  order: number;
  sections: ContentSection[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}
