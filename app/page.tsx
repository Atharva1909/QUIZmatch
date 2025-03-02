import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Zap className="h-8 w-8" />
              <span>QuizMatch</span>
            </div>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline" className="bg-background/20 hover:bg-background/40">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn Faster with Real-Time Quiz Battles</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Challenge yourself and others in interactive quiz competitions. Master new skills through gamified learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/20 hover:bg-background/40">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose QuizMatch?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 text-primary">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
              <p className="text-muted-foreground">
                Engage with dynamic content designed to make learning enjoyable and effective.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 text-primary">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Matchmaking</h3>
              <p className="text-muted-foreground">
                Challenge other learners to quiz battles and see who knows the material best.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 text-primary">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
              <p className="text-muted-foreground">
                Earn credits, badges, and climb the leaderboards as you master new topics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join thousands of students who are already improving their skills through our interactive platform.
          </p>
          <Link href="/signup">
            <Button size="lg">Create Your Free Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 md:mb-0">
              <Zap className="h-5 w-5" />
              <span>QuizMatch</span>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuizMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}