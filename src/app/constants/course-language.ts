// Language tracks a course/lecture package can be tagged with.
export type CourseLanguageCode = 'english' | 'spanish' | 'german';

export const COURSE_LANGUAGE_LABELS: Record<CourseLanguageCode, string> = {
  english: 'Angielski',
  spanish: 'Hiszpański',
  german: 'Niemiecki',
};

export function getCourseLanguageLabel(code?: string | null): string {
  if (!code) return '';
  return COURSE_LANGUAGE_LABELS[code as CourseLanguageCode] || code;
}
