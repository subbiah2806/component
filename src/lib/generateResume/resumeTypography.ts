/**
 * Resume Typography Constants System
 *
 * Centralized typography configuration for consistent formatting across DOCX and PDF resume generation.
 * All font sizes are defined in points (pt) as the source of truth.
 * Conversion utilities handle format-specific units (half-points for DOCX, twips for margins).
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Text type identifiers used throughout resume generation
 */
export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'normal'
  | 'line'
  | 'ul'
  | 'li'
  | 'icon'
  | 'contact'
  | 'position';

/**
 * Typography configuration for a specific text type
 */
export interface TypographyConfig {
  /** Font size in points (pt) */
  fontSize: number;
  /** Font family name */
  font: string;
  /** Whether text should be bold */
  bold: boolean;
  /** Whether text should be italicized */
  italic: boolean;
  /** Margin configuration in points */
  margin: MarginConfig;
}

/**
 * Margin configuration (top, right, bottom, left) in points
 */
export interface MarginConfig {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Complete resume typography configuration object
 */
export interface ResumeTypographyConfig {
  h1: TypographyConfig; // Resume name (20pt, bold)
  h2: TypographyConfig; // Section headers like "PROFESSIONAL SUMMARY" (16pt, bold)
  h3: TypographyConfig; // Subsection headers, company names (12pt, bold)
  normal: TypographyConfig; // Regular body text (10pt, normal)
  line: TypographyConfig; // Horizontal separator line
  ul: TypographyConfig; // Unordered list container
  li: TypographyConfig; // List item text (10pt, normal)
  icon: TypographyConfig; // Icons in contact info (7pt, normal)
  contact: TypographyConfig; // Contact information (10pt, normal)
  position: TypographyConfig; // Position title and date range line (10pt, italic)
}

// ============================================================================
// Conversion Utilities
// ============================================================================

/**
 * Convert points to half-points (used by DOCX library)
 *
 * The docx library uses half-points for font sizing.
 * Formula: 1 point = 2 half-points
 *
 * @param points - Font size in points
 * @returns Font size in half-points
 *
 * @example
 * pointsToHalfPoints(10) // Returns 20 (10pt = 20 half-points)
 * pointsToHalfPoints(16) // Returns 32 (16pt = 32 half-points)
 */
export function pointsToHalfPoints(points: number): number {
  return points * 2;
}

/**
 * Convert points to twips (used for DOCX margins and spacing)
 *
 * Twips (twentieth of a point) are used for margins, indents, and spacing in DOCX.
 * Formula: 1 point = 20 twips
 * Common conversions:
 * - 1 inch = 72 points = 1440 twips
 * - 0.5 inches = 36 points = 720 twips
 * - 0.1 inches = 7.2 points = 144 twips
 *
 * @param points - Measurement in points
 * @returns Measurement in twips
 *
 * @example
 * pointsToTwips(36)   // Returns 720 (0.5 inches margin)
 * pointsToTwips(7.2)  // Returns 144 (0.1 inches indent)
 * pointsToTwips(10)   // Returns 200 (section spacing)
 */
export function pointsToTwips(points: number): number {
  return points * 20;
}

/**
 * Convert half-points to points (inverse of pointsToHalfPoints)
 *
 * @param halfPoints - Font size in half-points
 * @returns Font size in points
 *
 * @example
 * halfPointsToPoints(40) // Returns 20 (40 half-points = 20pt)
 */
export function halfPointsToPoints(halfPoints: number): number {
  return halfPoints / 2;
}

/**
 * Convert twips to points (inverse of pointsToTwips)
 *
 * @param twips - Measurement in twips
 * @returns Measurement in points
 *
 * @example
 * twipsToPoints(720) // Returns 36 (720 twips = 36pt = 0.5 inches)
 */
export function twipsToPoints(twips: number): number {
  return twips / 20;
}

/**
 * Convert margin configuration to array format [top, right, bottom, left]
 * Used primarily for PDF generation with pdfmake
 *
 * @param margin - Margin configuration object
 * @returns Margin array in [top, right, bottom, left] format
 *
 * @example
 * marginToArray({ top: 10, right: 0, bottom: 0, left: 0 }) // Returns [10, 0, 0, 0]
 */
export function marginToArray(margin: MarginConfig): [number, number, number, number] {
  return [margin.left, margin.top, margin.right, margin.bottom];
}

// ============================================================================
// Typography Constants
// ============================================================================

/**
 * Complete typography configuration for resume generation
 *
 * All values are based on analysis of existing DOCX and PDF generation code.
 * Font sizes match current visual output:
 * - Name: 20pt (40 half-points)
 * - Section Headers: 16pt (32 half-points)
 * - Body Text: 10pt (20 half-points)
 * - Icons: 7pt (14 half-points)
 *
 * Margins are defined in points for consistency and converted as needed.
 */
export const ResumeTypography: Readonly<ResumeTypographyConfig> = {
  /**
   * H1: Resume name (centered, bold, 20pt)
   * Used for: Candidate's full name at top of resume
   */
  h1: {
    fontSize: 20,
    font: 'Arial',
    bold: true,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 4, // 80 twips spacing after name
      left: 0,
    },
  },

  /**
   * H2: Section headers (bold, 16pt)
   * Used for: "PROFESSIONAL SUMMARY", "SKILLS", "PROFESSIONAL EXPERIENCE", "EDUCATION"
   */
  h2: {
    fontSize: 16,
    font: 'Arial',
    bold: true,
    italic: false,
    margin: {
      top: 10, // 200 twips spacing before section
      right: 0,
      bottom: 0, // 120 twips spacing after section (includes line margin)
      left: 0,
    },
  },

  /**
   * H3: Subsection headers (bold, 12pt)
   * Used for: Company names, skill category labels, position titles
   */
  h3: {
    fontSize: 10,
    font: 'Arial',
    bold: true,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 0, // 40 twips
      left: 0,
    },
  },

  /**
   * Normal: Regular body text (10pt)
   * Used for: Summary paragraphs, achievements, descriptions
   */
  normal: {
    fontSize: 10,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },

  /**
   * Line: Horizontal separator under section headers
   * Used for: Visual separation between section header and content
   */
  line: {
    fontSize: 0, // Lines don't have font size
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 6, // Spacing after line (part of h2's total bottom margin)
      left: 0,
    },
  },

  /**
   * UL: Unordered list container
   * Used for: Skills lists, achievement lists
   */
  ul: {
    fontSize: 10,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0, // List top margin
      right: 0,
      bottom: 8,
      left: 8, // 144 twips = 0.1 inches indent
    },
  },

  /**
   * LI: List item text (10pt)
   * Used for: Individual bullets in skills, achievements
   */
  li: {
    fontSize: 10,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 0, // 60 twips spacing between list items
      left: 0, // 144 twips = 0.1 inches indent
    },
  },

  /**
   * Icon: Small icons in contact info (7pt)
   * Used for: Link emoji icons (🔗) next to GitHub, LinkedIn, Portfolio
   */
  icon: {
    fontSize: 7,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },

  /**
   * Contact: Contact information text (10pt)
   * Used for: Phone, email, location, visa status in header
   */
  contact: {
    fontSize: 10,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 0, // 200 twips spacing after contact section
      left: 0,
    },
  },

  /**
   * Position: Position title and date range line (10pt, italic)
   * Used for: Second line in experience section showing position title and employment dates
   */
  position: {
    fontSize: 10,
    font: 'Arial',
    bold: false,
    italic: false,
    margin: {
      top: 0,
      right: 0,
      bottom: 4, // 80 twips spacing after position line
      left: 0,
    },
  },
} as const;

// ============================================================================
// Page Layout Constants
// ============================================================================

/**
 * Page layout configuration
 * All measurements in points
 */
export const PageLayout = {
  /**
   * Page margins (0.5 inches = 36 points = 720 twips)
   */
  margins: {
    top: 36,
    right: 36,
    bottom: 36,
    left: 36,
  },

  /**
   * Page size
   */
  pageSize: 'LETTER' as const,

  /**
   * Font families
   */
  fonts: {
    docx: 'Arial',
    pdf: 'Roboto',
  },

  /**
   * Line height multiplier
   */
  lineHeight: 1.15,
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get typography configuration for a specific text type
 *
 * @param type - Text type identifier
 * @returns Typography configuration object
 *
 * @example
 * const h1Config = getTypography('h1');
 * console.log(h1Config.fontSize); // 20
 */
export function getTypography(type: TextType): TypographyConfig {
  return ResumeTypography[type];
}

/**
 * Get font size in half-points for DOCX generation
 *
 * @param type - Text type identifier
 * @returns Font size in half-points
 *
 * @example
 * const nameSize = getFontSizeHalfPoints('h1'); // Returns 40 (20pt * 2)
 */
export function getFontSizeHalfPoints(type: TextType): number {
  return pointsToHalfPoints(ResumeTypography[type].fontSize);
}

/**
 * Get margin configuration as twips array for DOCX [top, right, bottom, left]
 *
 * @param type - Text type identifier
 * @returns Margin configuration in twips
 *
 * @example
 * const h1Margins = getMarginTwips('h1');
 * // Returns { top: 0, right: 0, bottom: 80, left: 0 }
 */
export function getMarginTwips(type: TextType): MarginConfig {
  const margin = ResumeTypography[type].margin;
  return {
    top: pointsToTwips(margin.top),
    right: pointsToTwips(margin.right),
    bottom: pointsToTwips(margin.bottom),
    left: pointsToTwips(margin.left),
  };
}

/**
 * Get margin configuration as points array for PDF generation [top, right, bottom, left]
 *
 * @param type - Text type identifier
 * @returns Margin array in points
 *
 * @example
 * const h2Margins = getMarginArray('h2'); // Returns [10, 0, 6, 0]
 */
export function getMarginArray(type: TextType): [number, number, number, number] {
  return marginToArray(ResumeTypography[type].margin);
}

// ============================================================================
// Exports Summary
// ============================================================================

/**
 * Main exports:
 * - ResumeTypography: Complete typography configuration object
 * - PageLayout: Page layout constants (margins, fonts, etc.)
 * - Conversion utilities: pointsToHalfPoints, pointsToTwips, etc.
 * - Helper functions: getTypography, getFontSizeHalfPoints, getMarginTwips, getMarginArray
 *
 * Usage in DOCX generation:
 * ```typescript
 * import { getFontSizeHalfPoints, getMarginTwips } from './resumeTypography';
 *
 * new TextRun({
 *   text: 'Section Header',
 *   size: getFontSizeHalfPoints('h2'),
 * });
 * ```
 *
 * Usage in PDF generation:
 * ```typescript
 * import { ResumeTypography, getMarginArray } from './resumeTypography';
 *
 * {
 *   text: 'Section Header',
 *   fontSize: ResumeTypography.h2.fontSize,
 *   bold: ResumeTypography.h2.bold,
 *   margin: getMarginArray('h2'),
 * }
 * ```
 */
