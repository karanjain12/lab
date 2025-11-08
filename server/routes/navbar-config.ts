import { RequestHandler } from "express";
import { NavbarConfig } from "@shared/api";

// In-memory store for navbar configuration
// In production, this would be stored in a database
let navbarConfig: NavbarConfig = {
  position: "top",
  visible: true,
  pagesEnabled: {
    freWebinars: true,
    liveEvents: true,
    instructorResources: true,
    instructorLedTraining: true,
    onDemandVideo: true,
    careerAssistance: true,
    examVoucher: true,
  },
  logoText: "Skills Enhance",
};

/**
 * GET /api/navbar-config
 * Retrieve current navbar configuration
 */
export const getNavbarConfig: RequestHandler = (_req, res) => {
  res.json(navbarConfig);
};

/**
 * PUT /api/navbar-config
 * Update navbar configuration (admin only in production)
 */
export const updateNavbarConfig: RequestHandler = (req, res) => {
  const { position, visible, pagesEnabled, logoText, logoUrl } = req.body;

  // Validate input
  if (position && !["top", "side"].includes(position)) {
    return res.status(400).json({ error: "Invalid position value" });
  }

  // Update configuration
  if (position !== undefined) navbarConfig.position = position;
  if (visible !== undefined) navbarConfig.visible = visible;
  if (pagesEnabled) {
    navbarConfig.pagesEnabled = {
      ...navbarConfig.pagesEnabled,
      ...pagesEnabled,
    };
  }
  if (logoText) navbarConfig.logoText = logoText;
  if (logoUrl !== undefined) navbarConfig.logoUrl = logoUrl;

  res.json({
    success: true,
    config: navbarConfig,
  });
};
