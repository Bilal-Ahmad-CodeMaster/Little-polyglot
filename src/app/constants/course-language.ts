// Language tracks a course/lecture package can be tagged with.
export type CourseLanguageCode = 'american_english' | 'british_english' | 'polish';

export const COURSE_LANGUAGE_LABELS: Record<CourseLanguageCode, string> = {
  american_english: 'Amerykański angielski',
  british_english: 'Brytyjski angielski',
  polish: 'Polski',
};

export function getCourseLanguageLabel(code?: string | null): string {
  if (!code) return '';
  return COURSE_LANGUAGE_LABELS[code as CourseLanguageCode] || code;
}
