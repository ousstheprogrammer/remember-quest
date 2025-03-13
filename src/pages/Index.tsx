
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="animate-fade-in text-center">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Ouss SaaS
        </h1>
        <p className="mt-4 max-w-xl text-balance text-lg text-muted-foreground">
          Your personal homework assistant that helps you stay organized and never miss an assignment again.
        </p>
        
        <div className="mt-10">
          <Link to="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="animate-fade-in shadow-soft backdrop-blur-sm [animation-delay:200ms]">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-4">Track Deadlines</CardTitle>
            <CardDescription>
              Never miss an assignment with clear due date tracking.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="animate-fade-in shadow-soft backdrop-blur-sm [animation-delay:300ms]">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-4">Organize by Subject</CardTitle>
            <CardDescription>
              Categorize assignments by subject for better organization.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="animate-fade-in shadow-soft backdrop-blur-sm [animation-delay:400ms]">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-4">Track Progress</CardTitle>
            <CardDescription>
              Mark completed assignments and track your progress over time.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <p className="mt-16 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Ouss SaaS. All rights reserved.
      </p>
    </div>
  );
};

export default Index;
