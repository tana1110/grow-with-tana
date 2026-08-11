/**
 * إعدادات المنصّة والدورات — الملف المركزي للمحتوى.
 *
 * لإضافة أو تعديل دورة أو درس، عدّل هذا الملف فقط.
 * - `videoPath` يجب أن يشير إلى ملف MP4 داخل `public/videos/`
 *   (مثال: ضع `intro.mp4` في `public/videos/ai-video/` واستخدم "/videos/ai-video/intro.mp4").
 * - الدروس تُفتح بالتسلسل داخل كل دورة: الدرس N يُفتح بعد إكمال الدرس N-1.
 */

export const PLATFORM_NAME = 'Grow with Tana'
export const PLATFORM_TAGLINE = 'هنا تكبر المهارات'
export const PLATFORM_DESCRIPTION =
  'دروس فيديو قصيرة وممتعة تأخذ الصغار خطوة بخطوة إلى عالم الذكاء الاصطناعي والتقنية.'

export interface LessonResource {
  title: string
  url: string
  description: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoPath: string
  /**
   * اختياري: لتشغيل مقطع محدد من ملف فيديو طويل (بالثواني).
   * عدة دروس يمكن أن تشارك نفس `videoPath` بأزمنة مختلفة.
   */
  startTime?: number
  endTime?: number
  /** اختياري: اسم الوحدة — الدروس المتتالية بنفس الوحدة تُجمَّع تحت عنوانها. */
  unit?: string
  resources: LessonResource[]
}

/** لون بطاقة الدورة — درجات مستوحاة من تطبيقات تعليم الأطفال. */
export type CourseColor = 'coral' | 'periwinkle' | 'grape' | 'leaf' | 'navy'

export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: 'مبتدئ' | 'متوسط' | 'متقدم'
  duration: string
  color: CourseColor
  emoji: string
  lessons: Lesson[]
}

export const courses: Course[] = [
  {
    id: 'ai-kids',
    title: 'دورة الذكاء الاصطناعي',
    description:
      'أساسيات الذكاء الاصطناعي للأطفال في 5 وحدات: نتعرّف خطوة بخطوة على عالم الذكاء الاصطناعي بأسلوب مبسّط وممتع.',
    category: 'الذكاء الاصطناعي',
    level: 'مبتدئ',
    duration: '5 وحدات',
    color: 'coral',
    emoji: '🤖',
    // الوحدة الأولى: كل حصة ملف فيديو مقصوص بدقة حسب المونتاج
    lessons: [
      {
        id: 'intro',
        title: 'مقدمة الدورة',
        description:
          'مقدمة تعريفية بالدورة: ماذا سنتعلّم في الوحدات الخمس، وكيف ننتقل من حصة إلى حصة.',
        videoPath: '/videos/ai-kids/intro.mp4',
        unit: 'المقدمة',
        resources: [],
      },
      {
        id: 'u1-c1',
        title: 'الحصة الأولى',
        description: 'الوحدة الأولى — الحصة الأولى من دورة أساسيات الذكاء الاصطناعي.',
        videoPath: '/videos/ai-kids/u1-c1.mp4',
        unit: 'الوحدة الأولى',
        resources: [],
      },
      {
        id: 'u1-c2',
        title: 'الحصة الثانية',
        description: 'الوحدة الأولى — الحصة الثانية من دورة أساسيات الذكاء الاصطناعي.',
        videoPath: '/videos/ai-kids/u1-c2.mp4',
        unit: 'الوحدة الأولى',
        resources: [],
      },
      {
        id: 'u1-c3',
        title: 'الحصة الثالثة',
        description: 'الوحدة الأولى — الحصة الثالثة من دورة أساسيات الذكاء الاصطناعي.',
        videoPath: '/videos/ai-kids/u1-c3.mp4',
        unit: 'الوحدة الأولى',
        resources: [],
      },
      {
        id: 'u1-c4',
        title: 'الحصة الرابعة',
        description: 'الوحدة الأولى — الحصة الرابعة من دورة أساسيات الذكاء الاصطناعي.',
        videoPath: '/videos/ai-kids/u1-c4.mp4',
        unit: 'الوحدة الأولى',
        resources: [],
      },
      {
        id: 'u1-c5',
        title: 'الحصة الخامسة',
        description: 'الوحدة الأولى — الحصة الخامسة من دورة أساسيات الذكاء الاصطناعي.',
        videoPath: '/videos/ai-kids/u1-c5.mp4',
        unit: 'الوحدة الأولى',
        resources: [
          {
            title: 'Gemini من المتصفح 🌐',
            url: 'https://gemini.google.com',
            description: 'افتح Gemini مباشرة من المتصفح بدون تحميل أي تطبيق.',
          },
          {
            title: 'Gemini على أندرويد 🤖',
            url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.bard',
            description: 'حمّل تطبيق Gemini من متجر Google Play.',
          },
          {
            title: 'Gemini على آيفون وآيباد 🍎',
            url: 'https://apps.apple.com/app/google-gemini/id6477489729',
            description: 'حمّل تطبيق Gemini من App Store.',
          },
        ],
      },
      {
        id: 'u1-c6',
        title: 'الحصة السادسة',
        description: 'الوحدة الأولى — الحصة السادسة والأخيرة من الوحدة الأولى.',
        videoPath: '/videos/ai-kids/u1-c6.mp4',
        unit: 'الوحدة الأولى',
        resources: [],
      },
      // الوحدات 2–5: أضف حصصها هنا عند توفّر فيديوهاتها
    ],
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export function getLesson(courseId: string, lessonId: string): Lesson | undefined {
  return getCourseById(courseId)?.lessons.find((lesson) => lesson.id === lessonId)
}

export function getLessonIndex(courseId: string, lessonId: string): number {
  return getCourseById(courseId)?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1
}
