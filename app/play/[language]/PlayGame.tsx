"use client";

import { useState } from "react";
import { Question } from "../../../data/questions";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Trophy,
  Code2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function PlayPractice({
  initialQuestions,
  language,
}: {
  initialQuestions: Question[];
  language: string;
}) {
  const [questions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [codeAnswer, setCodeAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [PracticeOver, setPracticeOver] = useState(false);

  // For Drag and Drop
  const [dndItems, setDndItems] = useState<string[]>([]);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle size={60} className="text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold mb-4">No questions found!</h2>
        <Link
          href="/"
          className="px-6 py-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  // Initialize DND items when question changes
  if (
    currentQuestion.type === "drag-and-drop" &&
    dndItems.length === 0 &&
    !isSubmitted &&
    currentQuestion.options
  ) {
    setDndItems([...currentQuestion.options].sort(() => Math.random() - 0.5));
  }

  const handleSelect = (option: string) => {
    if (isSubmitted) return;

    if (currentQuestion.type === "mcq") {
      setSelectedAnswers([option]);
    } else if (currentQuestion.type === "msq") {
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers(selectedAnswers.filter((a) => a !== option));
      } else {
        setSelectedAnswers([...selectedAnswers, option]);
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correct = false;

    if (currentQuestion.type === "mcq" || currentQuestion.type === "msq") {
      const correctAns = currentQuestion.correctAnswers || [];
      correct =
        selectedAnswers.length === correctAns.length &&
        selectedAnswers.every((a) => correctAns.includes(a));
    } else if (currentQuestion.type === "code") {
      // Very basic validation - in a real app, you'd run this through a sandbox
      const normalizedInput = codeAnswer.replace(/\s+/g, "").toLowerCase();
      const normalizedExpected = (currentQuestion.expectedOutput || "")
        .replace(/\s+/g, "")
        .toLowerCase();
      correct = normalizedInput === normalizedExpected;
    } else if (currentQuestion.type === "drag-and-drop") {
      // Check if the order matches
      const correctAns = currentQuestion.correctAnswers || [];
      correct = true;
      for (let i = 0; i < correctAns.length; i++) {
        if (dndItems[i] !== correctAns[i]) {
          correct = false;
          break;
        }
      }
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setIsSubmitted(false);
      setSelectedAnswers([]);
      setCodeAnswer("");
      setIsCorrect(false);
      setDndItems([]);
    } else {
      setPracticeOver(true);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setDndItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (PracticeOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-zinc-800 p-10 rounded-3xl border-4 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 text-center max-w-lg w-full"
        >
          <Trophy size={80} className="mx-auto text-yellow-400 mb-6" />
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Level Complete!
          </h1>
          <p className="text-2xl text-zinc-300 mb-8">
            You scored <span className="font-bold text-white">{score}</span> /{" "}
            {questions.length * 10}
          </p>
          <div className="w-full bg-zinc-900 rounded-full h-4 mb-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / (questions.length * 10)) * 100}%` }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            />
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            <Code2 className="mr-2" /> Play Another Language
          </Link>
        </motion.div>
      </div>
    );
  }

  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col pt-12">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-8 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            {language[0]}
          </div>
          <div>
            <h2 className="font-bold text-xl">{language} Quest</h2>
            <p className="text-zinc-400 text-sm">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-zinc-900 px-6 py-2 rounded-full border border-zinc-700">
          <Trophy className="text-yellow-500 mr-2" size={20} />
          <span className="font-bold text-xl font-mono">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-800 rounded-full h-2 mb-10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{
            width: `${((currentIndex - 1) / questions.length) * 100}%`,
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="flex-1"
        >
          <div className="bg-zinc-800 rounded-3xl p-8 border border-zinc-700 shadow-2xl">
            <div className="flex items-center space-x-2 mb-6">
              <span className="px-3 py-1 bg-zinc-700 text-xs font-bold uppercase tracking-wider rounded-md text-zinc-300">
                {currentQuestion.type === "mcq"
                  ? "Single Choice"
                  : currentQuestion.type === "msq"
                    ? "Multiple Choice"
                    : currentQuestion.type === "drag-and-drop"
                      ? "Drag & Drop"
                      : "Code Challenge"}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
              {currentQuestion.question}
            </h3>

            {/* MCQ / MSQ Options */}
            {(currentQuestion.type === "mcq" ||
              currentQuestion.type === "msq") && (
              <div className="space-y-4">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedAnswers.includes(option);
                  const isCorrectAns =
                    currentQuestion.correctAnswers?.includes(option);

                  let stateClass =
                    "bg-zinc-900 border-zinc-700 hover:border-blue-500";
                  if (isSelected && !isSubmitted) {
                    stateClass =
                      "bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50";
                  } else if (isSubmitted) {
                    if (isCorrectAns) {
                      stateClass =
                        "bg-green-500/20 border-green-500 text-green-300";
                    } else if (isSelected && !isCorrectAns) {
                      stateClass = "bg-red-500/20 border-red-500 text-red-300";
                    } else {
                      stateClass = "bg-zinc-900 border-zinc-800 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                      onClick={() => handleSelect(option)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${stateClass}`}
                    >
                      <span className="font-mono text-lg">{option}</span>
                      {isSubmitted && isCorrectAns && (
                        <CheckCircle className="text-green-500" />
                      )}
                      {isSubmitted && isSelected && !isCorrectAns && (
                        <XCircle className="text-red-500" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Code Input */}
            {currentQuestion.type === "code" && (
              <div className="space-y-4">
                <textarea
                  value={codeAnswer}
                  onChange={(e) => setCodeAnswer(e.target.value)}
                  disabled={isSubmitted}
                  className="w-full h-40 bg-black text-green-400 font-mono p-4 rounded-xl border border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Write your code here..."
                  spellCheck="false"
                />
              </div>
            )}

            {/* Drag and Drop */}
            {currentQuestion.type === "drag-and-drop" && (
              <div className="space-y-8">
                <div className="p-6 bg-black rounded-xl font-mono text-lg border border-zinc-700 text-zinc-300">
                  {currentQuestion.codeSnippet
                    ?.split("____")
                    .map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="inline-block w-20 h-8 bg-zinc-800 border border-zinc-600 rounded mx-2 align-middle align-text-bottom">
                            <span className="flex items-center justify-center w-full h-full text-sm text-yellow-400 font-bold">
                              {isSubmitted
                                ? currentQuestion.correctAnswers?.[i]
                                : `[Slot ${i + 1}]`}
                            </span>
                          </span>
                        )}
                      </span>
                    ))}
                </div>

                {!isSubmitted && (
                  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <p className="text-sm text-zinc-400 mb-4 uppercase tracking-widest font-bold">
                      Sort in order of slots
                    </p>
                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={dndItems}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="flex flex-col gap-3">
                          {dndItems.map((id) => (
                            <SortableItem key={id} id={id} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Area & Feedback */}
      <div className="mt-8 flex flex-col items-center">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={
              (currentQuestion.type === "mcq" &&
                selectedAnswers.length === 0) ||
              (currentQuestion.type === "msq" &&
                selectedAnswers.length === 0) ||
              (currentQuestion.type === "code" && codeAnswer.trim() === "")
            }
            className="w-full max-w-sm py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Submit Answer
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full p-6 rounded-2xl border ${isCorrect ? "bg-green-900/20 border-green-500/50" : "bg-red-900/20 border-red-500/50"}`}
          >
            <div className="flex items-start">
              <div className="mt-1 mr-4">
                {isCorrect ? (
                  <CheckCircle className="text-green-400" size={32} />
                ) : (
                  <XCircle className="text-red-400" size={32} />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`text-xl font-bold mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}
                >
                  {isCorrect ? "Awesome! Correct Answer." : "Not quite right."}
                </h4>
                <p className="text-zinc-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                  >
                    Next Question <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Draggable item component
function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-zinc-800 border border-zinc-600 rounded-lg cursor-grab active:cursor-grabbing hover:bg-zinc-700 transition-colors font-mono shadow-md flex items-center"
    >
      <div className="mr-3 text-zinc-500">⋮⋮</div>
      {props.id}
    </div>
  );
}
