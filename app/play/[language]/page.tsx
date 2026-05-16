import { questions } from "../../../data/questions";
import PlayGame from "./PlayGame";

export async function generateStaticParams() {
  return [
    { language: "html" },
    { language: "css" },
    { language: "js" },
    { language: "python" },
    { language: "cpp" },
    { language: "c" },
  ];
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  // Filter questions for the selected language
  // Language mappings: html -> HTML, css -> CSS, js -> JS, python -> Python, cpp -> C++, c -> C
  const langMap: Record<string, string> = {
    html: "HTML",
    css: "CSS",
    js: "JS",
    python: "Python",
    cpp: "C++",
    c: "C",
  };

  const mappedLanguage = langMap[language.toLowerCase()];

  if (!mappedLanguage) {
    return (
      <div className="text-white p-10 text-center">Language not found.</div>
    );
  }

  const langQuestions = questions.filter((q) => q.language === mappedLanguage);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans selection:bg-green-500/30">
      <PlayGame initialQuestions={langQuestions} language={mappedLanguage} />
    </div>
  );
}
