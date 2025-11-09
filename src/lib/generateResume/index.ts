/**
 * ATS-Approved Resume Generator (DOCX & PDF)
 * TypeScript port of Python generate_resume.py
 * Converts resume.json to professional, ATS-friendly DOCX or PDF format
 */

import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  TabStopType,
  BorderStyle,
  Packer,
  ExternalHyperlink,
} from 'docx';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {
  getFontSizeHalfPoints,
  getMarginTwips,
  PageLayout,
  pointsToTwips,
  ResumeTypography,
  getMarginArray,
} from './resumeTypography';

// Set up fonts for pdfMake
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts;

export type ResumeFormat = 'docx' | 'pdf';

export interface ResumeData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  visaStatus?: string;
  preferredLocations?: string[];
  openToRemote?: boolean;
  summary?: string;
  skills?: Record<string, string[]>;
  experience?: Experience[];
  education?: Education[];
}

export interface Experience {
  company?: string;
  location?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  achievements?: string[];
  companyDescription?: string;
}

export interface Education {
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Format date range for experience
 */
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + '-01');
  const startStr = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (endDate.toLowerCase() === 'present') {
    return `${startStr} - Present`;
  }

  const end = new Date(endDate + '-01');
  const endStr = end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return `${startStr} - ${endStr}`;
}

/**
 * Create header section with name and contact info
 */
function createHeader(data: ResumeData): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Name (centered, bold, 20pt)
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: getMarginTwips('h1').bottom },
      children: [
        new TextRun({
          text: `${(data.firstName || '').toUpperCase()} ${(data.lastName || '').toUpperCase()}`,
          font: ResumeTypography.h1.font,
          size: getFontSizeHalfPoints('h1'),
          bold: ResumeTypography.h1.bold,
        }),
      ],
    })
  );

  // Contact information (centered, 10pt)
  const contactChildren: (TextRun | ExternalHyperlink)[] = [];
  let firstItem = true;

  const addSeparator = () => {
    if (!firstItem) {
      contactChildren.push(
        new TextRun({
          text: ' | ',
          font: ResumeTypography.contact.font,
          size: getFontSizeHalfPoints('contact'),
        })
      );
    }
    firstItem = false;
  };

  // Location
  if (data.preferredLocations && data.preferredLocations.length > 0) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.preferredLocations[0],
        font: ResumeTypography.contact.font,
        size: getFontSizeHalfPoints('contact'),
      })
    );
  }

  // Phone
  if (data.phone) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.phone,
        font: ResumeTypography.contact.font,
        size: getFontSizeHalfPoints('contact'),
      })
    );
  }

  // Email
  if (data.email) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.email,
        font: ResumeTypography.contact.font,
        size: getFontSizeHalfPoints('contact'),
      })
    );
  }

  // GitHub
  if (data.github) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: '🔗 ',
        font: ResumeTypography.icon.font,
        size: getFontSizeHalfPoints('icon'),
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'GitHub',
            font: ResumeTypography.contact.font,
            size: getFontSizeHalfPoints('contact'),
            style: 'Hyperlink',
          }),
        ],
        link: data.github,
      })
    );
  }

  // LinkedIn
  if (data.linkedin) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: '🔗 ',
        font: ResumeTypography.icon.font,
        size: getFontSizeHalfPoints('icon'),
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'LinkedIn',
            font: ResumeTypography.contact.font,
            size: getFontSizeHalfPoints('contact'),
            style: 'Hyperlink',
          }),
        ],
        link: data.linkedin,
      })
    );
  }

  // Portfolio
  if (data.website) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: '🔗 ',
        font: ResumeTypography.icon.font,
        size: getFontSizeHalfPoints('icon'),
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'Portfolio',
            font: ResumeTypography.contact.font,
            size: getFontSizeHalfPoints('contact'),
            style: 'Hyperlink',
          }),
        ],
        link: data.website,
      })
    );
  }

  // Visa Status
  if (data.visaStatus) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.visaStatus,
        font: ResumeTypography.contact.font,
        size: getFontSizeHalfPoints('contact'),
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: getMarginTwips('contact').bottom },
      children: contactChildren,
    })
  );

  return paragraphs;
}

/**
 * Create section header with bottom border
 */
function createSectionHeader(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: getMarginTwips('h2').top, after: getMarginTwips('line').bottom },
    border: {
      bottom: {
        color: '000000',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 2,
      },
    },
    children: [
      new TextRun({
        text: title,
        font: ResumeTypography.h2.font,
        size: getFontSizeHalfPoints('h2'),
        bold: ResumeTypography.h2.bold,
      }),
    ],
  });
}

/**
 * Create professional summary section
 */
function createSummary(summary: string): Paragraph[] {
  return [
    createSectionHeader('PROFESSIONAL SUMMARY'),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: getMarginTwips('normal').bottom, before: getMarginTwips('normal').top },
      children: [
        new TextRun({
          text: summary,
          font: ResumeTypography.normal.font,
          size: getFontSizeHalfPoints('normal'),
        }),
      ],
    }),
  ];
}

/**
 * Create skills section
 */
function createSkills(skills: Record<string, string[]>): Paragraph[] {
  const paragraphs: Paragraph[] = [createSectionHeader('SKILLS')];

  for (const [category, skillsList] of Object.entries(skills)) {
    if (skillsList && skillsList.length > 0) {
      paragraphs.push(
        new Paragraph({
          indent: { left: getMarginTwips('ul').left },
          spacing: { after: getMarginTwips('h3').bottom },
          children: [
            new TextRun({
              text: `● ${category}: `,
              font: ResumeTypography.h3.font,
              size: getFontSizeHalfPoints('normal'),
              bold: ResumeTypography.h3.bold,
            }),
            new TextRun({
              text: skillsList.join(', '),
              font: ResumeTypography.normal.font,
              size: getFontSizeHalfPoints('normal'),
            }),
          ],
        })
      );
    }
  }

  return paragraphs;
}

/**
 * Create professional experience section
 */
function createExperience(experience: Experience[]): Paragraph[] {
  const paragraphs: Paragraph[] = [createSectionHeader('PROFESSIONAL EXPERIENCE')];

  // Calculate right tab stop position in twips
  // Page width (8.5") - left margin (0.5") - right margin (0.5") = 7.5" = 540 points = 10800 twips
  const rightTabPosition = pointsToTwips(540);

  experience.forEach((exp, idx) => {
    if (!exp.company || !exp.position || !exp.startDate || !exp.endDate) {
      return; // Skip incomplete experience entries
    }

    const location = exp.location || 'Remote';
    const dateRange = formatDateRange(exp.startDate, exp.endDate);

    // Line 1: Company (left, bold) | Location (right, bold)
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: idx > 0 ? getMarginTwips('ul').bottom : 0,
        },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: rightTabPosition,
          },
        ],
        children: [
          new TextRun({
            text: exp.company,
            font: ResumeTypography.h3.font,
            size: getFontSizeHalfPoints('normal'),
            bold: ResumeTypography.h3.bold,
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: location,
            font: ResumeTypography.h3.font,
            size: getFontSizeHalfPoints('h3'),
            bold: ResumeTypography.h3.bold,
          }),
        ],
      })
    );

    // Line 2: Position (left, italic) | Date range (right, italic)
    paragraphs.push(
      new Paragraph({
        spacing: { after: getMarginTwips('position').bottom },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: rightTabPosition,
          },
        ],
        children: [
          new TextRun({
            text: exp.position,
            font: ResumeTypography.position.font,
            size: getFontSizeHalfPoints('position'),
            italics: true,
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: dateRange,
            font: ResumeTypography.position.font,
            size: getFontSizeHalfPoints('position'),
            italics: true,
          }),
        ],
      })
    );

    // Company description
    if (exp.companyDescription) {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { left: getMarginTwips('ul').left },
          spacing: { before: getMarginTwips('li').top, after: getMarginTwips('li').bottom },
          children: [
            new TextRun({
              text: `● ${exp.companyDescription}`,
              font: ResumeTypography.normal.font,
              size: getFontSizeHalfPoints('normal'),
            }),
          ],
        })
      );
    }

    // Achievements
    if (exp.achievements && exp.achievements.length > 0) {
      exp.achievements.forEach((achievement) => {
        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: getMarginTwips('ul').left },
            spacing: { before: getMarginTwips('li').top, after: getMarginTwips('li').bottom },
            children: [
              new TextRun({
                text: `● ${achievement}`,
                font: ResumeTypography.normal.font,
                size: getFontSizeHalfPoints('normal'),
              }),
            ],
          })
        );
      });
    }
  });

  return paragraphs;
}

/**
 * Create education section
 */
function createEducation(education: Education[]): Paragraph[] {
  const paragraphs: Paragraph[] = [createSectionHeader('EDUCATION')];

  // Calculate right tab stop position in twips
  // Page width (8.5") - left margin (0.5") - right margin (0.5") = 7.5" = 540 points = 10800 twips
  const rightTabPosition = pointsToTwips(540);

  education.forEach((edu) => {
    if (!edu.institution || !edu.degree || !edu.startDate || !edu.endDate) {
      return; // Skip incomplete education entries
    }

    const dateRange = formatDateRange(edu.startDate, edu.endDate);

    paragraphs.push(
      new Paragraph({
        spacing: { after: getMarginTwips('h3').bottom },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: rightTabPosition,
          },
        ],
        children: [
          new TextRun({
            text: `${edu.degree}, `,
            font: ResumeTypography.h3.font,
            size: getFontSizeHalfPoints('normal'),
            bold: ResumeTypography.h3.bold,
          }),
          new TextRun({
            text: edu.institution,
            font: ResumeTypography.normal.font,
            size: getFontSizeHalfPoints('normal'),
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: dateRange,
            font: ResumeTypography.h3.font,
            size: getFontSizeHalfPoints('normal'),
            bold: ResumeTypography.h3.bold,
          }),
        ],
      })
    );
  });

  return paragraphs;
}

/**
 * Generate resume DOCX from JSON data and return blob
 */
export async function generateResumeDocx(resumeData: ResumeData): Promise<Blob> {
  try {
    // Build all sections
    const sections: Paragraph[] = [
      ...createHeader(resumeData),
      ...(resumeData.summary ? createSummary(resumeData.summary) : []),
      ...(resumeData.skills ? createSkills(resumeData.skills) : []),
      ...(resumeData.experience ? createExperience(resumeData.experience) : []),
      ...(resumeData.education ? createEducation(resumeData.education) : []),
    ];

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: pointsToTwips(PageLayout.margins.top),
                bottom: pointsToTwips(PageLayout.margins.bottom),
                left: pointsToTwips(PageLayout.margins.left),
                right: pointsToTwips(PageLayout.margins.right),
              },
            },
          },
          children: sections,
        },
      ],
    });

    // Generate blob and return
    const blob = await Packer.toBlob(doc);
    console.log('✅ Resume DOCX generated successfully');
    return blob;
  } catch (error) {
    console.error('❌ Error generating resume:', error);
    throw error;
  }
}

/**
 * Download resume in specified format (for browser use)
 * Convenience wrapper that calls the appropriate generator based on format
 */
export async function downloadResume(
  resumeData: ResumeData,
  format: ResumeFormat = 'docx'
): Promise<void> {
  let blob;
  if (format === 'pdf') {
    blob = await generateResumePdf(resumeData);
  } else {
    blob = await generateResumeDocx(resumeData);
  }
  const { saveAs } = await import('file-saver');
  saveAs(blob, `Subbiah_Chandramouli_Resume.${format}`);
}

const headingMargin = getMarginArray('h2');
const lineMargin = getMarginArray('line');
const textMargin = getMarginArray('normal');
const listMargin = getMarginArray('ul');
const h1Margin = getMarginArray('h1');
const h3Margin = getMarginArray('h3');
const liMargin = getMarginArray('li');
const positionMargin = getMarginArray('position');

/**
 * Generate resume PDF from JSON data and return blob
 */
export async function generateResumePdf(resumeData: ResumeData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Build contact line with clickable links
      const contactParts: Array<{ text: string; link?: string }> = [];
      if (resumeData.preferredLocations && resumeData.preferredLocations.length > 0) {
        contactParts.push({ text: resumeData.preferredLocations[0] });
      }
      if (resumeData.phone) contactParts.push({ text: resumeData.phone });
      if (resumeData.email) {
        contactParts.push({ text: resumeData.email, link: `mailto:${resumeData.email}` });
      }
      if (resumeData.github) {
        contactParts.push({ text: 'GitHub', link: resumeData.github });
      }
      if (resumeData.linkedin) {
        contactParts.push({ text: 'LinkedIn', link: resumeData.linkedin });
      }
      if (resumeData.website) {
        contactParts.push({ text: 'Portfolio', link: resumeData.website });
      }
      if (resumeData.visaStatus) contactParts.push({ text: resumeData.visaStatus });

      // Create contact text array with separators
      const contactTextArray: Array<{ text: string; link?: string }> = [];
      contactParts.forEach((part, idx) => {
        if (idx > 0) {
          contactTextArray.push({ text: ' | ' });
        }
        contactTextArray.push(part);
      });

      // Build skills section
      const skillsContent: Record<string, unknown>[] = [];
      if (resumeData.skills) {
        for (const [category, skillsList] of Object.entries(resumeData.skills)) {
          if (skillsList && skillsList.length > 0) {
            skillsContent.push({
              text: [{ text: `${category}: `, bold: true }, { text: skillsList.join(', ') }],
              fontSize: ResumeTypography.normal.fontSize,
              margin: liMargin,
            });
          }
        }
      }

      // Wrap skills in a list
      const skillsList =
        skillsContent.length > 0
          ? {
              ul: skillsContent,
              margin: [...listMargin.slice(0, -1), 0],
            }
          : null;

      // Build experience section
      const experienceContent: Record<string, unknown>[] = [];
      resumeData.experience?.forEach((exp, index) => {
        if (!exp.company || !exp.position || !exp.startDate || !exp.endDate) {
          return; // Skip incomplete experience entries
        }

        const location = exp.location || 'Remote';
        const dateRange = formatDateRange(exp.startDate, exp.endDate);
        const isLastExperience = index === (resumeData.experience?.length ?? 0) - 1;

        // Company and location
        experienceContent.push({
          columns: [
            { text: exp.company, bold: true, fontSize: ResumeTypography.normal.fontSize },
            {
              text: location,
              bold: true,
              fontSize: ResumeTypography.normal.fontSize,
              alignment: 'right',
            },
          ],
          margin: h3Margin,
        });

        // Position and dates
        experienceContent.push({
          columns: [
            { text: exp.position, italics: true, fontSize: ResumeTypography.position.fontSize },
            {
              text: dateRange,
              italics: true,
              fontSize: ResumeTypography.position.fontSize,
              alignment: 'right',
            },
          ],
          margin: positionMargin,
        });

        // Build list items for this experience
        const expItems: Record<string, unknown>[] = [];

        // Company description
        if (exp.companyDescription) {
          expItems.push({
            text: exp.companyDescription,
            fontSize: ResumeTypography.normal.fontSize,
            alignment: 'justify',
          });
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
          for (const achievement of exp.achievements) {
            expItems.push({
              text: achievement,
              fontSize: ResumeTypography.normal.fontSize,
              alignment: 'justify',
            });
          }
        }

        // Add as unordered list
        if (expItems.length > 0) {
          experienceContent.push({
            ul: expItems,
            margin: isLastExperience ? [...listMargin.slice(0, -1), 0] : listMargin,
          });
        }
      });

      // Build education section
      const educationContent: Record<string, unknown>[] = [];
      if (resumeData.education) {
        for (const edu of resumeData.education) {
          if (!edu.institution || !edu.degree || !edu.startDate || !edu.endDate) {
            continue; // Skip incomplete education entries
          }

          const dateRange = formatDateRange(edu.startDate, edu.endDate);

          educationContent.push({
            columns: [
              {
                text: [{ text: `${edu.degree}, `, bold: true }, { text: edu.institution }],
                fontSize: ResumeTypography.normal.fontSize,
              },
              {
                text: dateRange,
                bold: true,
                fontSize: ResumeTypography.normal.fontSize,
                alignment: 'right',
              },
            ],
            margin: h3Margin,
          });
        }
      }

      // Define document structure
      const docDefinition: Record<string, unknown> = {
        pageSize: 'LETTER',
        pageMargins: [
          PageLayout.margins.top,
          PageLayout.margins.right,
          PageLayout.margins.bottom,
          PageLayout.margins.left,
        ],
        defaultStyle: {
          font: PageLayout.fonts.pdf,
        },
        content: [
          // Name
          {
            text: `${(resumeData.firstName || '').toUpperCase()} ${(resumeData.lastName || '').toUpperCase()}`,
            fontSize: ResumeTypography.h1.fontSize,
            bold: true,
            alignment: 'center',
            margin: h1Margin,
          },
          // Contact
          {
            text: contactTextArray,
            fontSize: ResumeTypography.contact.fontSize,
            alignment: 'center',
            margin: textMargin,
          },
          // Professional Summary
          {
            text: 'PROFESSIONAL SUMMARY',
            fontSize: ResumeTypography.h2.fontSize,
            bold: true,
            margin: headingMargin,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 3,
                x2: 540,
                y2: 3,
                lineWidth: 0.5,
              },
            ],
            margin: lineMargin,
          },
          {
            text: resumeData.summary,
            fontSize: ResumeTypography.normal.fontSize,
            alignment: 'justify',
            margin: textMargin,
          },
          // Skills
          {
            text: 'SKILLS',
            fontSize: ResumeTypography.h2.fontSize,
            bold: true,
            margin: headingMargin,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 3,
                x2: 540,
                y2: 3,
                lineWidth: 0.5,
              },
            ],
            margin: lineMargin,
          },
          skillsList,
          // Professional Experience
          {
            text: 'PROFESSIONAL EXPERIENCE',
            fontSize: ResumeTypography.h2.fontSize,
            bold: true,
            margin: headingMargin,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 3,
                x2: 540,
                y2: 3,
                lineWidth: 0.5,
              },
            ],
            margin: lineMargin,
          },
          ...experienceContent,
          // Education
          {
            text: 'EDUCATION',
            fontSize: ResumeTypography.h2.fontSize,
            bold: true,
            margin: headingMargin,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 3,
                x2: 540,
                y2: 3,
                lineWidth: 0.5,
              },
            ],
            margin: lineMargin,
          },
          ...educationContent,
        ].filter((item) => item !== null),
      };

      // Generate PDF and return as blob
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfMake.createPdf(docDefinition as any).getBlob((blob: Blob) => {
        console.log('✅ Resume PDF generated successfully');
        resolve(blob);
      });
    } catch (error) {
      console.error('❌ Error generating PDF resume:', error);
      reject(error);
    }
  });
}
