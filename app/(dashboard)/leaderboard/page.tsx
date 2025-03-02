"use client";

import { useState } from "react";
import { 
  Trophy, 
  Medal, 
  Star, 
  Users, 
  Filter,
  ArrowUpDown,
  ChevronUp,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/dashboard-layout";

// Sample leaderboard data
const users = [
  {
    id: "1",
    name: "Emma Johnson",
    username: "emmaj",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    score: 9850,
    quizzes: 42,
    winRate: 85,
    rank: 1,
    change: "up",
    badges: ["Quiz Master", "Perfect Score", "5-Win Streak"],
    level: 32
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "mikechen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    score: 9340,
    quizzes: 38,
    winRate: 82,
    rank: 2,
    change: "up",
    badges: ["JavaScript Expert", "Quick Learner"],
    level: 30
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    username: "sophiar",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    score: 8920,
    quizzes: 45,
    winRate: 78,
    rank: 3,
    change: "down",
    badges: ["CSS Wizard", "React Pro"],
    level: 29
  },
  {
    id: "4",
    name: "David Kim",
    username: "davidk",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    score: 8750,
    quizzes: 36,
    winRate: 80,
    rank: 4,
    change: "same",
    badges: ["TypeScript Guru"],
    level: 28
  },
  {
    id: "5",
    name: "Atharva J",
    username: "Atharv",
    avatar: "",
    score: 8200,
    quizzes: 34,
    winRate: 76,
    rank: 5,
    change: "up",
    badges: ["Node.js Expert"],
    level: 27
  },
  {
    id: "6",
    name: "Olivia Wilson",
    username: "oliviaw",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    score: 7980,
    quizzes: 32,
    winRate: 75,
    rank: 6,
    change: "down",
    badges: ["HTML Master"],
    level: 26
  },
  {
    id: "7",
    name: "James Smith",
    username: "jamessmith",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop",
    score: 7650,
    quizzes: 30,
    winRate: 73,
    rank: 7,
    change: "up",
    badges: ["Web Dev Pro"],
    level: 25
  },
  {
    id: "8",
    name: "Emily Davis",
    username: "emilyd",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop",
    score: 7320,
    quizzes: 28,
    winRate: 72,
    rank: 8,
    change: "down",
    badges: ["CSS Expert"],
    level: 24
  },
  {
    id: "9",
    name: "Daniel Brown",
    username: "danielb",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
    score: 7100,
    quizzes: 26,
    winRate: 70,
    rank: 9,
    change: "same",
    badges: ["JavaScript Pro"],
    level: 23
  },
  {
    id: "10",
    name: "Ava Martinez",
    username: "avam",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    score: 6850,
    quizzes: 24,
    winRate: 68,
    rank: 10,
    change: "up",
    badges: ["React Apprentice"],
    level: 22
  }
];

// Sample categories for filtering
const categories = ["All", "JavaScript", "React", "CSS", "TypeScript", "Node.js", "HTML"];

export default function LeaderboardPage() {
  const [timeFrame, setTimeFrame] = useState("all-time");
  const [category, setCategory] = useState("All");
  
  // Get user rank (for highlighting current user)
  const currentUserId = "5"; // Simulated current user ID
  const currentUserRank = users.findIndex(user => user.id === currentUserId) + 1;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank against other learners</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {category}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                  {categories.map((cat) => (
                    <DropdownMenuRadioItem key={cat} value={cat}>
                      {cat}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  {timeFrame === "all-time" 
                    ? "All Time" 
                    : timeFrame === "monthly" 
                      ? "This Month" 
                      : "This Week"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={timeFrame} onValueChange={setTimeFrame}>
                  <DropdownMenuRadioItem value="all-time">All Time</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="monthly">This Month</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="weekly">This Week</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Top 3 Users */}
              {users.slice(0, 3).map((user, index) => (
                <Card key={user.id} className={index === 0 ? "md:col-span-2" : "md:col-span-1"}>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2">
                      {index === 0 ? (
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <Trophy className="h-6 w-6" />
                        </div>
                      ) : index === 1 ? (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          <Medal className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <Medal className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center mb-2">
                      <Avatar className={index === 0 ? "h-20 w-20" : "h-16 w-16"}>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex justify-center gap-2 mb-2">
                      {user.badges.slice(0, 2).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold">{user.score.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{user.quizzes}</p>
                        <p className="text-xs text-muted-foreground">Quizzes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{user.winRate}%</p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Global Rankings</CardTitle>
                <CardDescription>
                  Top performers based on quiz scores and participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-5">User</div>
                    <div className="col-span-2 text-center">Level</div>
                    <div className="col-span-2 text-center">Quizzes</div>
                    <div className="col-span-2 text-center">Score</div>
                  </div>
                  
                  <div className="divide-y">
                    {users.map((user) => (
                      <div 
                        key={user.id} 
                        className={`grid grid-cols-12 items-center p-3 ${
                          user.id === currentUserId 
                            ? "bg-primary/5 dark:bg-primary/10" 
                            : ""
                        }`}
                      >
                        <div className="col-span-1 text-center font-medium">
                          <div className="flex items-center justify-center">
                            {user.rank}
                            {user.change === "up" ? (
                              <ChevronUp className="h-4 w-4 text-green-500" />
                            ) : user.change === "down" ? (
                              <ChevronDown className="h-4 w-4 text-red-500" />
                            ) : null}
                          </div>
                        </div>
                        
                        <div className="col-span-5">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">@{user.username}</div>
                            </div>
                            {user.id === currentUserId && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>{user.level}</span>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-center">{user.quizzes}</div>
                        
                        <div className="col-span-2 text-center font-medium">
                          {user.score.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Friends Leaderboard</CardTitle>
                <CardDescription>
                  See how you rank among your friends
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Connect with friends</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Add friends to see how you compare with them on the leaderboard.
                  Challenge them to quiz battles and climb the ranks together!
                </p>
                <Button>Find Friends</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}