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
  TabStopPosition,
  TabStopType,
  BorderStyle,
  Packer,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Set up fonts for pdfMake
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts;

export type ResumeFormat = 'docx' | 'pdf';

interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  github?: string;
  linkedin?: string;
  website?: string;
  visaStatus?: string;
  preferredLocations?: string[];
  summary: string;
  skills: Record<string, string[]>;
  experience: Experience[];
  education: Education[];
}

interface Experience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  companyDescription?: string;
}

interface Education {
  institution: string;
  degree: string;
  dates: string;
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
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: `${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`,
          font: 'Arial',
          size: 40, // 20pt = 40 half-points
          bold: true,
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
          font: 'Arial',
          size: 20, // 10pt = 20 half-points
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
        font: 'Arial',
        size: 20,
      })
    );
  }

  // Phone
  if (data.phone) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.phone,
        font: 'Arial',
        size: 20,
      })
    );
  }

  // Email
  if (data.email) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: data.email,
        font: 'Arial',
        size: 20,
      })
    );
  }

  // GitHub
  if (data.github) {
    addSeparator();
    contactChildren.push(
      new TextRun({
        text: '🔗 ',
        font: 'Arial',
        size: 14, // 7pt = 14 half-points
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'GitHub',
            font: 'Arial',
            size: 20,
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
        font: 'Arial',
        size: 14,
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'LinkedIn',
            font: 'Arial',
            size: 20,
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
        font: 'Arial',
        size: 14,
      })
    );
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'Portfolio',
            font: 'Arial',
            size: 20,
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
        font: 'Arial',
        size: 20,
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
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
    spacing: { before: 200, after: 120 },
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
        font: 'Arial',
        size: 32, // 16pt = 32 half-points
        bold: true,
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
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: summary,
          font: 'Arial',
          size: 20,
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
          indent: { left: 144 }, // 0.1 inches = 144 twips
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `● ${category}: `,
              font: 'Arial',
              size: 20,
              bold: true,
            }),
            new TextRun({
              text: skillsList.join(', '),
              font: 'Arial',
              size: 20,
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

  experience.forEach((exp, idx) => {
    const location = exp.location || 'Remote';
    const dateRange = formatDateRange(exp.startDate, exp.endDate);

    // Line 1: Company (left, bold) | Location (right, bold)
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: idx > 0 ? 240 : 0,
          after: 20,
        },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        children: [
          new TextRun({
            text: exp.company,
            font: 'Arial',
            size: 20,
            bold: true,
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: location,
            font: 'Arial',
            size: 20,
            bold: true,
          }),
        ],
      })
    );

    // Line 2: Position (left, italic) | Date range (right, italic)
    paragraphs.push(
      new Paragraph({
        spacing: { after: 80 },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        children: [
          new TextRun({
            text: exp.position,
            font: 'Arial',
            size: 20,
            italics: true,
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: dateRange,
            font: 'Arial',
            size: 20,
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
          indent: { left: 144 },
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `● ${exp.companyDescription}`,
              font: 'Arial',
              size: 20,
            }),
          ],
        })
      );
    }

    // Achievements
    exp.achievements.forEach((achievement) => {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { left: 144 },
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `● ${achievement}`,
              font: 'Arial',
              size: 20,
            }),
          ],
        })
      );
    });
  });

  return paragraphs;
}

/**
 * Create education section
 */
function createEducation(education: Education[]): Paragraph[] {
  const paragraphs: Paragraph[] = [createSectionHeader('EDUCATION')];

  education.forEach((edu) => {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 40 },
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        children: [
          new TextRun({
            text: `${edu.degree}, `,
            font: 'Arial',
            size: 20,
            bold: true,
          }),
          new TextRun({
            text: edu.institution,
            font: 'Arial',
            size: 20,
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: edu.dates,
            font: 'Arial',
            size: 20,
            bold: true,
          }),
        ],
      })
    );
  });

  return paragraphs;
}

/**
 * Generate resume DOCX from JSON data
 */
export async function generateResumeDocx(resumeData: ResumeData): Promise<void> {
  try {
    // Build all sections
    const sections: Paragraph[] = [
      ...createHeader(resumeData),
      ...createSummary(resumeData.summary),
      ...createSkills(resumeData.skills),
      ...createExperience(resumeData.experience),
      ...createEducation(resumeData.education),
    ];

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inches = 720 twips
                bottom: 720,
                left: 720,
                right: 720,
              },
            },
          },
          children: sections,
        },
      ],
    });

    // Generate blob and download
    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Subbiah_Chandramouli_Resume.docx');

    console.log('✅ Resume DOCX generated successfully');
  } catch (error) {
    console.error('❌ Error generating resume:', error);
    throw error;
  }
}

/**
 * Generate resume PDF from JSON data with same formatting as DOCX using pdfmake
 */
export async function generateResumePdf(resumeData: ResumeData): Promise<void> {
  try {
    // Build contact line
    const contactParts: string[] = [];
    if (resumeData.preferredLocations && resumeData.preferredLocations.length > 0) {
      contactParts.push(resumeData.preferredLocations[0]);
    }
    if (resumeData.phone) contactParts.push(resumeData.phone);
    if (resumeData.email) contactParts.push(resumeData.email);
    if (resumeData.github) contactParts.push('GitHub');
    if (resumeData.linkedin) contactParts.push('LinkedIn');
    if (resumeData.website) contactParts.push('Portfolio');
    if (resumeData.visaStatus) contactParts.push(resumeData.visaStatus);

    // Build skills section
    const skillsContent: Record<string, unknown>[] = [];
    for (const [category, skillsList] of Object.entries(resumeData.skills)) {
      if (skillsList && skillsList.length > 0) {
        skillsContent.push({
          text: [{ text: `${category}: `, bold: true }, { text: skillsList.join(', ') }],
          fontSize: 10,
          margin: [0, 0, 0, 2],
        });
      }
    }

    // Wrap skills in a list
    const skillsList =
      skillsContent.length > 0
        ? {
            ul: skillsContent,
            margin: [10, 0, 0, 0], // 10pt left indent for bullet list
          }
        : null;

    // Build experience section
    const experienceContent: Record<string, unknown>[] = [];
    for (const exp of resumeData.experience) {
      const location = exp.location || 'Remote';
      const dateRange = formatDateRange(exp.startDate, exp.endDate);

      // Company and location
      experienceContent.push({
        columns: [
          { text: exp.company, bold: true, fontSize: 10 },
          { text: location, bold: true, fontSize: 10, alignment: 'right' },
        ],
        margin: [0, 10, 0, 1],
      });

      // Position and dates
      experienceContent.push({
        columns: [
          { text: exp.position, italics: true, fontSize: 10 },
          { text: dateRange, italics: true, fontSize: 10, alignment: 'right' },
        ],
        margin: [0, 0, 0, 4],
      });

      // Build list items for this experience
      const expItems: Record<string, unknown>[] = [];

      // Company description
      if (exp.companyDescription) {
        expItems.push({
          text: exp.companyDescription,
          fontSize: 10,
          alignment: 'justify',
        });
      }

      // Achievements
      for (const achievement of exp.achievements) {
        expItems.push({
          text: achievement,
          fontSize: 10,
          alignment: 'justify',
        });
      }

      // Add as unordered list
      if (expItems.length > 0) {
        experienceContent.push({
          ul: expItems,
          margin: [10, 0, 0, 3], // 10pt left indent for bullet list
        });
      }
    }

    // Build education section
    const educationContent: Record<string, unknown>[] = [];
    for (const edu of resumeData.education) {
      educationContent.push({
        columns: [
          {
            text: [{ text: `${edu.degree}, `, bold: true }, { text: edu.institution }],
            fontSize: 10,
          },
          { text: edu.dates, bold: true, fontSize: 10, alignment: 'right' },
        ],
        margin: [0, 0, 0, 2],
      });
    }

    // Define document structure
    const docDefinition: Record<string, unknown> = {
      pageSize: 'LETTER',
      pageMargins: [36, 36, 36, 36], // 0.5 inches = 36 points
      defaultStyle: {
        font: 'Roboto',
      },
      content: [
        // Name
        {
          text: `${resumeData.firstName.toUpperCase()} ${resumeData.lastName.toUpperCase()}`,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 4],
        },
        // Contact
        {
          text: contactParts.join(' | '),
          fontSize: 10,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        // Professional Summary
        {
          text: 'PROFESSIONAL SUMMARY',
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
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
          margin: [0, 0, 0, 6],
        },
        {
          text: resumeData.summary,
          fontSize: 10,
          alignment: 'justify',
          margin: [0, 0, 0, 8],
        },
        // Skills
        {
          text: 'SKILLS',
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
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
          margin: [0, 0, 0, 6],
        },
        skillsList,
        // Professional Experience
        {
          text: 'PROFESSIONAL EXPERIENCE',
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
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
          margin: [0, 0, 0, 6],
        },
        ...experienceContent,
        // Education
        {
          text: 'EDUCATION',
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
          pageBreak: experienceContent.length > 10 ? 'before' : undefined,
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
          margin: [0, 0, 0, 6],
        },
        ...educationContent,
      ].filter((item) => item !== null),
    };

    // Generate and download PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfMake.createPdf(docDefinition as any).download('Subbiah_Chandramouli_Resume.pdf');
    console.log('✅ Resume PDF generated successfully');
  } catch (error) {
    console.error('❌ Error generating PDF resume:', error);
    throw error;
  }
}

/**
 * Load resume data from public folder and generate document in specified format
 */
export async function downloadResume(format: ResumeFormat = 'docx'): Promise<void> {
  try {
    const response = await fetch('/resume.json');
    if (!response.ok) {
      throw new Error('Failed to load resume.json');
    }

    const resumeData: ResumeData = await response.json();

    // Remove metadata fields if present
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (resumeData as any).uploadedAt;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (resumeData as any).lastModified;

    if (format === 'pdf') {
      await generateResumePdf(resumeData);
    } else {
      await generateResumeDocx(resumeData);
    }
  } catch (error) {
    console.error('Failed to download resume:', error);
    throw error;
  }
}
