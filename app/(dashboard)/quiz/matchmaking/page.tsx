"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Timer, 
  Loader2, 
  BookOpen, 
  CheckCircle2, 
  X, 
  AlertCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard-layout";

// Quiz topic categories
const quizTopics = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Core concepts, functions, and modern ES6+ features",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "High",
    difficulty: "Medium",
  },
  {
    id: "react",
    name: "React",
    description: "Components, hooks, state management, and React patterns",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "High",
    difficulty: "Medium",
  },
  {
    id: "css",
    name: "CSS & Layouts",
    description: "Flexbox, Grid, animations, and responsive design",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "Medium",
    difficulty: "Easy",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Types, interfaces, generics, and advanced patterns",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "Medium",
    difficulty: "Hard",
  },
  {
    id: "node",
    name: "Node.js",
    description: "Server-side JavaScript, APIs, and backend concepts",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "Medium",
    difficulty: "Hard",
  },
  {
    id: "html",
    name: "HTML",
    description: "Semantic markup, accessibility, and best practices",
    icon: <BookOpen className="h-5 w-5" />,
    popularity: "High",
    difficulty: "Easy",
  },
];

export default function QuizMatchmakingPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [matchmakingState, setMatchmakingState] = useState<"idle" | "searching" | "found" | "starting">("idle");
  const [searchTime, setSearchTime] = useState(0);
  const [opponent, setOpponent] = useState<{ name: string; level: number } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Handle matchmaking search
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (matchmakingState === "searching") {
      interval = setInterval(() => {
        setSearchTime((prev) => {
          // Simulate finding a match after 5 seconds
          if (prev >= 5 && matchmakingState === "searching") {
            setMatchmakingState("found");
            setOpponent({
              name: "Jane Smith",
              level: 24,
            });
            
            toast({
              title: "Opponent found!",
              description: "Preparing to start the quiz battle...",
            });
            
            // Simulate starting the quiz after finding an opponent
            setTimeout(() => {
              setMatchmakingState("starting");
              
              // Redirect to the quiz page after a short delay
              setTimeout(() => {
                router.push(`/quiz/battle?topic=${selectedTopic}`);
              }, 1500);
            }, 2000);
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [matchmakingState, selectedTopic, router, toast]);

  // Start matchmaking
  const startMatchmaking = () => {
    if (!selectedTopic) {
      toast({
        title: "Topic required",
        description: "Please select a quiz topic to continue",
        variant: "destructive",
      });
      return;
    }
    
    setMatchmakingState("searching");
    setSearchTime(0);
    
    toast({
      title: "Searching for opponents",
      description: "This may take a few moments...",
    });
  };

  // Cancel matchmaking
  const cancelMatchmaking = () => {
    setMatchmakingState("idle");
    setSearchTime(0);
    setOpponent(null);
    
    toast({
      title: "Matchmaking cancelled",
      description: "You can try again when you're ready",
    });
  };

  // Start solo quiz
  const startSoloQuiz = () => {
    if (!selectedTopic) {
      toast({
        title: "Topic required",
        description: "Please select a quiz topic to continue",
        variant: "destructive",
      });
      return;
    }
    
    router.push(`/quiz/solo?topic=${selectedTopic}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Quiz Matchmaking</h1>
        
        {matchmakingState === "idle" ? (
          <Tabs defaultValue="topics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="topics">Select Topic</TabsTrigger>
              <TabsTrigger value="custom">Custom Match</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizTopics.map((topic) => (
                  <Card 
                    key={topic.id} 
                    className={`cursor-pointer transition-all ${
                      selectedTopic === topic.id 
                        ? "ring-2 ring-primary" 
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {topic.icon}
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                        </div>
                        {selectedTopic === topic.id && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 text-xs text-muted-foreground flex justify-between">
                      <span>Popularity: {topic.popularity}</span>
                      <span>Difficulty: {topic.difficulty}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={startMatchmaking} 
                  className="flex-1"
                  disabled={!selectedTopic}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Find Opponent
                </Button>
                <Button 
                  onClick={startSoloQuiz} 
                  variant="outline" 
                  className="flex-1"
                  disabled={!selectedTopic}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Practice Solo
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Match Settings</CardTitle>
                  <CardDescription>
                    Create a custom quiz match with specific parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <RadioGroup defaultValue="medium">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy" />
                        <Label htmlFor="easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard" />
                        <Label htmlFor="hard">Hard</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time Limit Per Question</Label>
                    <RadioGroup defaultValue="30">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15" id="time-15" />
                        <Label htmlFor="time-15">15 seconds</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="time-30" />
                        <Label htmlFor="time-30">30 seconds</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="60" id="time-60" />
                        <Label htmlFor="time-60">60 seconds</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Number of Questions</Label>
                    <RadioGroup defaultValue="10">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id="q-5" />
                        <Label htmlFor="q-5">5 questions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10" id="q-10" />
                        <Label htmlFor="q-10">10 questions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15" id="q-15" />
                        <Label htmlFor="q-15">15 questions</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button className="w-full sm:w-auto">
                    <Users className="mr-2 h-4 w-4" />
                    Create Custom Match
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Share Match Link
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle>
                {matchmakingState === "searching" && "Searching for Opponents"}
                {matchmakingState === "found" && "Opponent Found!"}
                {matchmakingState === "starting" && "Starting Quiz Battle"}
              </CardTitle>
              <CardDescription>
                {matchmakingState === "searching" && "Looking for players with similar skill level..."}
                {matchmakingState === "found" && "Preparing to start the quiz battle"}
                {matchmakingState === "starting" && "Loading questions and setting up the battle"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              {matchmakingState === "searching" && (
                <>
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Searching for {selectedTopic && quizTopics.find(t => t.id === selectedTopic)?.name} quiz opponents
                    </div>
                    <div className="flex items-center justify-center">
                      <Timer className="h-4 w-4 mr-1" />
                      <span>{searchTime} seconds</span>
                    </div>
                  </div>
                  <Progress value={Math.min(searchTime * 10, 100)} className="w-full max-w-md h-2" />
                </>
              )}
              
              {(matchmakingState === "found" || matchmakingState === "starting") && opponent && (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                    {matchmakingState === "starting" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{opponent.name}</h3>
                  <p className="text-muted-foreground mb-4">Level {opponent.level}</p>
                  
                  {matchmakingState === "found" && (
                    <div className="flex items-center gap-2 text-sm bg-accent p-2 rounded-md">
                      <AlertCircle className="h-4 w-4" />
                      <span>Quiz will begin in a few seconds...</span>
                    </div>
                  )}
                  
                  {matchmakingState === "starting" && (
                    <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary p-2 rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading quiz questions...</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-center">
              {matchmakingState === "searching" && (
                <Button variant="outline" onClick={cancelMatchmaking}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel Matchmaking
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}