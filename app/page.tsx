import Link from "next/link";
import {
  Code2,
  FileJson,
  Layers,
  MonitorPlay,
  TerminalSquare,
  Cpu,
} from "lucide-react";

const languages = [
  {
    name: "HTML",
    icon: <MonitorPlay size={40} className="text-orange-500" />,
    path: "/play/html",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "CSS",
    icon: <Layers size={40} className="text-blue-500" />,
    path: "/play/css",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "JS",
    icon: <FileJson size={40} className="text-yellow-400" />,
    path: "/play/js",
    color: "from-yellow-300 to-yellow-500",
  },
  {
    name: "Python",
    icon: <TerminalSquare size={40} className="text-blue-300" />,
    path: "/play/python",
    color: "from-blue-300 to-yellow-300",
  },
  {
    name: "C++",
    icon: <Cpu size={40} className="text-indigo-500" />,
    path: "/play/cpp",
    color: "from-indigo-400 to-indigo-700",
  },
  {
    name: "C",
    icon: <Code2 size={40} className="text-gray-500" />,
    path: "/play/c",
    color: "from-gray-400 to-gray-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          CodeQuest Arcade
        </h1>
        <p className="text-xl text-zinc-400">
          Choose your language and level up your skills!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {languages.map((lang) => (
          <Link href={lang.path} key={lang.name}>
            <div
              className={`relative group overflow-hidden rounded-2xl bg-zinc-800 border-2 border-zinc-700 hover:border-zinc-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-${lang.name.toLowerCase()}-500/20 cursor-pointer`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br min-h-full w-full object-cover z-0"></div>
              <div
                className={`h-2 w-full bg-gradient-to-r ${lang.color}`}
              ></div>
              <div className="p-8 flex flex-col items-center justify-center relative z-10">
                <div className="bg-zinc-900 p-4 rounded-full mb-4 shadow-inner border border-zinc-700 group-hover:scale-110 transition-transform duration-300">
                  {lang.icon}
                </div>
                <h2 className="text-2xl font-bold">{lang.name}</h2>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold tracking-wider text-zinc-300 uppercase">
                  Start Practice &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
