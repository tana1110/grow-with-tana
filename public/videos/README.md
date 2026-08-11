# فيديوهات الدورات / Course Videos

كل دورة لها مجلد فرعي هنا، والملفات بالأسماء المحددة في `src/data/coursesData.ts`.

## دورة الذكاء الاصطناعي (ai-kids)

```
public/videos/ai-kids/intro.mp4   ← مقدمة الدورة
public/videos/ai-kids/u1-c1.mp4  ← الوحدة الأولى، الحصة 1
…
public/videos/ai-kids/u1-c6.mp4  ← الوحدة الأولى، الحصة 6
```

الملف الأصلي الكامل للوحدة الأولى محفوظ خارج الموقع في `video-source/unit1.mp4`.

## إضافة وحدة جديدة (2–5)

1. ضع فيديو الوحدة الكامل في `video-source/`.
2. قصّه إلى حصص (ffmpeg متوفر عبر `@ffmpeg-installer/ffmpeg`) وضع المقاطع هنا
   بأسماء مثل `u2-c1.mp4`.
3. أضف الحصص في `src/data/coursesData.ts` — مكان الإضافة معلَّم بتعليق داخل الدورة.
