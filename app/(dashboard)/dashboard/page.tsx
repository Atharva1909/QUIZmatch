"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Clock, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard-layout";

export default function DashboardPage() {
  const [progress, setProgress] = useState(68);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Welcome Card */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                Track your progress and continue learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">12</span>
                    <span className="text-sm text-muted-foreground">Lessons Completed</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">8</span>
                    <span className="text-sm text-muted-foreground">Quizzes Won</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
            <Button asChild className="w-full">
            <Link href="/under-development">
  Continue Learning
</Link>

              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions Card */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump right into learning activities
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button asChild variant="outline" className="justify-start">
                <Link href="/quiz/matchmaking">
                  <Users className="mr-2 h-4 w-4" />
                  Find Quiz Match
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Lessons
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/profile">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Statistics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Tabs */}
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lessons">Recent Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Recent Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Lessons</CardTitle>
                <CardDescription>
                  Your recently viewed and completed lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${lesson.completed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {lesson.completed ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">{lesson.category}</p>
                        </div>
                      </div>
                      <Button asChild size="sm" variant={lesson.completed ? "outline" : "default"}>
                        <Link href={`/lessons/${lesson.id}`}>
                          {lesson.completed ? "Review" : "Continue"}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/lessons">View All Lessons</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quizzes</CardTitle>
                <CardDescription>
                  Your recent quiz attempts and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${quiz.result === 'Won' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : quiz.result === 'Lost' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{quiz.title}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`${quiz.result === 'Won' ? "text-green-600 dark:text-green-400" : quiz.result === 'Lost' ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
                              {quiz.result}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{quiz.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/quiz/results/${quiz.id}`}>
                          View Results
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/quiz/history">View Quiz History</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Badges and milestones you've unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/achievements">View All Achievements</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Sample data
const recentLessons = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    category: "Programming",
    completed: true,
  },
  {
    id: "2",
    title: "Advanced React Hooks",
    category: "Web Development",
    completed: false,
  },
  {
    id: "3",
    title: "Data Structures: Arrays & Objects",
    category: "Computer Science",
    completed: true,
  },
  {
    id: "4",
    title: "CSS Grid & Flexbox",
    category: "Web Development",
    completed: false,
  },
];

const recentQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    result: "Won",
    score: "8/10",
    date: "Today",
  },
  {
    id: "2",
    title: "React Components",
    result: "Lost",
    score: "6/10",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "CSS Layouts",
    result: "Draw",
    score: "7/10",
    date: "3 days ago",
  },
  {
    id: "4",
    title: "TypeScript Basics",
    result: "Won",
    score: "9/10",
    date: "1 week ago",
  },
];

const recentAchievements = [
  {
    id: "1",
    title: "Quick Learner",
    description: "Completed 10 lessons in a week",
    date: "2 days ago",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Quiz Champion",
    description: "Won 5 quiz battles in a row",
    date: "1 week ago",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Early Bird",
    description: "Completed a lesson before 7 AM",
    date: "2 weeks ago",
    icon: <Clock className="h-5 w-5" />,
  },
];