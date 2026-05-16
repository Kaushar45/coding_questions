export type QuestionType = 'mcq' | 'msq' | 'code' | 'drag-and-drop';

export interface Question {
  id: string;
  language: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ, MSQ
  correctAnswers?: string[]; // For MCQ, MSQ
  codeSnippet?: string; // Base code if needed
  blanks?: string[]; // For drag-and-drop
  expectedOutput?: string; // For code writing
  explanation: string;
}

export const questions: Question[] = [
  // HTML
  {
    id: "html-1",
    language: "HTML",
    type: "mcq",
    question: "Which tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<nav>"],
    correctAnswers: ["<a>"],
    explanation: "The <a> tag defines a hyperlink, which is used to link from one page to another."
  },
  {
    id: "html-2",
    language: "HTML",
    type: "drag-and-drop",
    question: "Complete the image tag to display 'logo.png' with alternate text 'Logo'.",
    codeSnippet: "<img ____='logo.png' ____='Logo'>",
    blanks: ["src", "alt"],
    options: ["src", "alt", "href", "title"], // Draggable options
    correctAnswers: ["src", "alt"],
    explanation: "The 'src' attribute specifies the path to the image, and 'alt' provides alternative text."
  },
  
  // CSS
  {
    id: "css-1",
    language: "CSS",
    type: "msq",
    question: "Which of the following are valid CSS color units? (Select all that apply)",
    options: ["hex", "rgb", "hsl", "hsb"],
    correctAnswers: ["hex", "rgb", "hsl"],
    explanation: "Hexadecimal, RGB, and HSL are valid CSS color units. HSB is not a standard CSS unit."
  },
  {
    id: "css-2",
    language: "CSS",
    type: "mcq",
    question: "How do you select an element with the class 'container' in CSS?",
    options: [".container", "#container", "container", "*container"],
    correctAnswers: [".container"],
    explanation: "A period (.) followed by the class name is used to select elements with a specific class."
  },

  // JS
  {
    id: "js-1",
    language: "JS",
    type: "mcq",
    question: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correctAnswers: ["const"],
    explanation: "The 'const' keyword creates a read-only reference to a value."
  },
  {
    id: "js-2",
    language: "JS",
    type: "code",
    question: "Write a function named 'add' that takes two parameters 'a' and 'b' and returns their sum.",
    expectedOutput: "function add(a, b) { return a + b; }",
    explanation: "The function needs to accept two parameters and use the 'return' keyword to output their sum."
  },

  // Python
  {
    id: "py-1",
    language: "Python",
    type: "drag-and-drop",
    question: "Complete the Python list comprehension to get squares of numbers 0 to 4.",
    codeSnippet: "squares = [x*x ____ x ____ range(5)]",
    options: ["for", "in", "while", "to"],
    correctAnswers: ["for", "in"],
    explanation: "The syntax for list comprehension is [expression for item in iterable]."
  },
  
  // C++
  {
    id: "cpp-1",
    language: "C++",
    type: "mcq",
    question: "Which operator is used for input stream in C++?",
    options: ["<<", ">>", "<>", "><"],
    correctAnswers: [">>"],
    explanation: "The >> operator is used with cin for input extraction in C++."
  },

  // C
  {
    id: "c-1",
    language: "C",
    type: "mcq",
    question: "What is the correct format specifier for an integer in C?",
    options: ["%d", "%f", "%c", "%s"],
    correctAnswers: ["%d"],
    explanation: "%d is used for signed decimal integers in C."
  }
];
