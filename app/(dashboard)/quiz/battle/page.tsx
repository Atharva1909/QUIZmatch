"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Timer, 
  User, 
  CheckCircle, 
  X as XIcon, 
  AlertTriangle,
  ArrowRight,
  BarChart3
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Sample quiz data - would come from Firebase in a real app
const quizData = {
  javascript: {
    title: "JavaScript Fundamentals",
    questions: [
      {
        id: "js1",
        question: "Which of the following is NOT a primitive type in JavaScript?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Number" },
          { id: "c", text: "Object" },
          { id: "d", text: "Boolean" }
        ],
        correctAnswer: "c"
      },
      {
        id: "js2",
        question: "What does the '===' operator do in JavaScript?",
        options: [
          { id: "a", text: "Checks for equality with type conversion" },
          { id: "b", text: "Checks for equality without type conversion" },
          { id: "c", text: "Assigns a value to a variable" },
          { id: "d", text: "Checks if a variable is defined" }
        ],
        correctAnswer: "b"
      },
      {
        id: "js3",
        question: "Which method is used to add an element to the end of an array?",
        options: [
          { id: "a", text: "push()" },
          { id: "b", text: "pop()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" }
        ],
        correctAnswer: "a"
      },
      {
        id: "js4",
        question: "What is the output of: console.log(typeof [])?",
        options: [
          { id: "a", text: "array" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "null" }
        ],
        correctAnswer: "b"
      },
      {
        id: "js5",
        question: "Which function is used to parse a string to an integer in JavaScript?",
        options: [
          { id: "a", text: "Integer.parse()" },
          { id: "b", text: "parseInteger()" },
          { id: "c", text: "parseInt()" },
          { id: "d", text: "Number.toInteger()" }
        ],
        correctAnswer: "c"
      }
    ]
  },
  react: {
    title: "React Fundamentals",
    questions: [
      {
        id: "react1",
        question: "What is JSX in React?",
        options: [
          { id: "a", text: "JavaScript XML - A syntax extension for JavaScript" },
          { id: "b", text: "A JavaScript library for building user interfaces" },
          { id: "c", text: "JavaScript Extension - A programming language" },
          { id: "d", text: "A database query language for React" }
        ],
        correctAnswer: "a"
      },
      {
        id: "react2",
        question: "Which hook is used to perform side effects in a function component?",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useEffect" },
          { id: "c", text: "useContext" },
          { id: "d", text: "useReducer" }
        ],
        correctAnswer: "b"
      },
      {
        id: "react3",
        question: "What is the correct way to update state in React?",
        options: [
          { id: "a", text: "Directly modify the state variable" },
          { id: "b", text: "Use the state setter function from useState" },
          { id: "c", text: "Use the this.state property" },
          { id: "d", text: "Use document.getElementById to find and update elements" }
        ],
        correctAnswer: "b"
      },
      {
        id: "react4",
        question: "What is the virtual DOM in React?",
        options: [
          { id: "a", text: "A direct copy of the browser's DOM" },
          { id: "b", text: "A lightweight copy of the DOM used for performance optimization" },
          { id: "c", text: "A DOM that only exists in virtual reality" },
          { id: "d", text: "The DOM API provided by the browser" }
        ],
        correctAnswer: "b"
      },
      {
        id: "react5",
        question: "Which of the following is NOT a React Hook?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useState" },
          { id: "c", text: "useHistory" },
          { id: "d", text: "useComponent" }
        ],
        correctAnswer: "d"
      }
    ]
  },
  css: {
    title: "CSS & Layouts",
    questions: [
      {
        id: "css1",
        question: "Which CSS property is used to control the spacing between elements?",
        options: [
          { id: "a", text: "spacing" },
          { id: "b", text: "margin" },
          { id: "c", text: "padding" },
          { id: "d", text: "gap" }
        ],
        correctAnswer: "b"
      },
      {
        id: "css2",
        question: "What does CSS stand for?",
        options: [
          { id: "a", text: "Creative Style Sheets" },
          { id: "b", text: "Computer Style Sheets" },
          { id: "c", text: "Cascading Style Sheets" },
          { id: "d", text: "Colorful Style Sheets" }
        ],
        correctAnswer: "c"
      },
      {
        id: "css3",
        question: "Which property is used to change the background color?",
        options: [
          { id: "a", text: "color" },
          { id: "b", text: "bgcolor" },
          { id: "c", text: "background-color" },
          { id: "d", text: "background" }
        ],
        correctAnswer: "c"
      },
      {
        id: "css4",
        question: "Which CSS property is used to make text bold?",
        options: [
          { id: "a", text: "font-weight" },
          { id: "b", text: "text-weight" },
          { id: "c", text: "font-style" },
          { id: "d", text: "text-style" }
        ],
        correctAnswer: "a"
      },
      {
        id: "css5",
        question: "Which value of the display property makes an element a flex container?",
        options: [
          { id: "a", text: "block" },
          { id: "b", text: "inline" },
          { id: "c", text: "flex" },
          { id: "d", text: "grid" }
        ],
        correctAnswer: "c"
      }
    ]
  }
};

export default function QuizBattlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const topicId = searchParams.get("topic") || "javascript";
  const quiz = quizData[topicId as keyof typeof quizData] || quizData.javascript;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Opponent data (simulated)
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    if (quizComplete || isAnswerSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswerSubmitted, quizComplete]);
  
  // Simulate opponent progress
  useEffect(() => {
    if (quizComplete) return;
    
    const opponentTimer = setInterval(() => {
      // Randomly decide if opponent answers a question
      if (Math.random() > 0.7) {
        setOpponentProgress((prev) => {
          const newProgress = Math.min(prev + 1, quiz.questions.length);
          
          // Randomly decide if opponent gets the answer correct
          if (Math.random() > 0.3) {
            setOpponentScore((prevScore) => prevScore + 1);
          }
          
          return newProgress;
        });
      }
    }, 3000);
    
    return () => clearInterval(opponentTimer);
  }, [quizComplete, quiz.questions.length]);
  
  // Handle time up for current question
  const handleTimeUp = () => {
    setIsAnswerSubmitted(true);
    toast({
      title: "Time's up!",
      description: "You didn't answer in time",
      variant: "destructive",
    });
    
    // Move to next question after a delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };
  
  // Submit answer
  const submitAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnswerSubmitted(true);
    
    // Check if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      toast({
        title: "Correct!",
        description: "You got the right answer",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentQuestion.options.find(
          (opt) => opt.id === currentQuestion.correctAnswer
        )?.text}`,
        variant: "destructive",
      });
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };
  
  // Move to next question or end quiz
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(30);
    } else {
      // End of quiz
      setQuizComplete(true);
    }
  };
  
  // View results
  const viewResults = () => {
    router.push(`/quiz/results/battle-${Date.now()}`);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Quiz Header */}
      <header className="bg-card border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{quiz.title}</h1>
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              <span className={cn(
                "font-medium",
                timeLeft < 10 && !isAnswerSubmitted && !quizComplete && "text-destructive"
              )}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {!quizComplete ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Sidebar - Your Progress */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">You</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Questions</span>
                      <span>{currentQuestionIndex + 1}/{quiz.questions.length}</span>
                    </div>
                    <Progress 
                      value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Score</span>
                      <span>{score}/{quiz.questions.length}</span>
                    </div>
                    <Progress 
                      value={(score / quiz.questions.length) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Quiz Content */}
            <div className="md:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
                  <CardDescription>
                    Select the correct answer
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                    
                    <RadioGroup 
                      value={selectedAnswer || ""} 
                      onValueChange={setSelectedAnswer}
                      disabled={isAnswerSubmitted}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                          <div 
                            key={option.id}
                            className={cn(
                              "flex items-center border rounded-md p-3 transition-colors",
                              selectedAnswer === option.id && !isAnswerSubmitted && "border-primary bg-primary/5",
                              isAnswerSubmitted && option.id === currentQuestion.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20",
                              isAnswerSubmitted && selectedAnswer === option.id && option.id !== currentQuestion.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-900/20"
                            )}
                          >
                            <RadioGroupItem 
                              value={option.id} 
                              id={option.id}
                              className="mr-2"
                            />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              {option.text}
                            </Label>
                            {isAnswerSubmitted && option.id === currentQuestion.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {isAnswerSubmitted && selectedAnswer === option.id && option.id !== currentQuestion.correctAnswer && (
                              <XIcon className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={submitAnswer} 
                    disabled={!selectedAnswer || isAnswerSubmitted}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Right Sidebar - Opponent Progress */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Opponent Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Jane Smith</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Questions</span>
                      <span>{opponentProgress}/{quiz.questions.length}</span>
                    </div>
                    <Progress 
                      value={(opponentProgress / quiz.questions.length) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Score</span>
                      <span>{opponentScore}/{quiz.questions.length}</span>
                    </div>
                    <Progress 
                      value={(opponentScore / quiz.questions.length) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Quiz Complete View
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription>
                You've completed the {quiz.title} quiz battle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                {score > opponentScore ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-4">

                    </div>
                    <h3 className="text-2xl font-bold mb-2">You Won!</h3>
                    <p className="text-muted-foreground">
                      Congratulations on your victory!
                    </p>
                  </div>
                ) : score === opponentScore ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mb-4">
                      <AlertTriangle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">It's a Draw!</h3>
                    <p className="text-muted-foreground">
                      You and your opponent tied with the same score.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mb-4">
                      <XIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You Lost</h3>
                    <p className="text-muted-foreground">
                      Better luck next time! Keep practicing.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Your Score</h4>
                  <p className="text-2xl font-bold">{score}/{quiz.questions.length}</p>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Opponent Score</h4>
                  <p className="text-2xl font-bold">{opponentScore}/{quiz.questions.length}</p>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>You've earned {score * 10} credits for this quiz battle!</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button onClick={viewResults} className="w-full sm:w-auto">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Results
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => router.push("/quiz/matchmaking")}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Find Another Match
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
