# Resume Generator

Professional ATS-friendly resume generator that converts resume JSON data to DOCX and PDF formats.

## Import

```tsx
import {
  downloadResume,
  generateResumeDocx,
  generateResumePdf,
  type ResumeData,
  type ResumeFormat,
  type Experience,
  type Education,
} from '@subbiah/reusable/lib/generateResume';
```

## downloadResume(format?: ResumeFormat): Promise<void>

Loads resume data from `/resume.json` and generates a downloadable resume document.

**Parameters:**
- `format` - `'docx'` or `'pdf'` (default: `'docx'`)

```tsx
// Download DOCX resume
await downloadResume('docx');

// Download PDF resume
await downloadResume('pdf');
```

## generateResumeDocx(resumeData: ResumeData): Promise<void>

Generates and downloads a DOCX resume from resume data.

```tsx
const resumeData: ResumeData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '555-0100',
  summary: 'Experienced software engineer...',
  skills: {
    'Frontend': ['React', 'TypeScript'],
    'Backend': ['Node.js', 'Python']
  },
  experience: [{
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    position: 'Senior Engineer',
    startDate: '2020-01',
    endDate: 'Present',
    achievements: ['Built scalable systems', 'Led team of 5']
  }],
  education: [{
    institution: 'University',
    degree: 'BS Computer Science',
    dates: '2016-2020'
  }]
};

await generateResumeDocx(resumeData);
```

## generateResumePdf(resumeData: ResumeData): Promise<void>

Generates and downloads a PDF resume from resume data.

```tsx
await generateResumePdf(resumeData);
```

## TypeScript Types

```tsx
type ResumeFormat = 'docx' | 'pdf';

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
  startDate: string; // Format: 'YYYY-MM'
  endDate: string; // Format: 'YYYY-MM' or 'Present'
  achievements: string[];
  companyDescription?: string;
}

interface Education {
  institution: string;
  degree: string;
  dates: string;
}
```

## Notes

- Requires `resume.json` in public folder when using `downloadResume()`
- Generates ATS-friendly formatting with proper sections and styling
- Uses Arial font at 10-20pt sizes for readability
- DOCX generated via `docx` library, PDF via `pdfmake`
- Automatically downloads file to user's browser
