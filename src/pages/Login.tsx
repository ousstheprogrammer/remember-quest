
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, BookOpen, Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // This is a placeholder for actual authentication logic
    console.log("Login data:", data);
    toast({
      title: "Login Successful",
      description: "Welcome back to Ouss SaaS!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6 flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="mr-2 h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Ouss SaaS</h1>
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-white shadow-soft">
          <div className="relative h-40 w-full bg-primary/10">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Login background" 
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent"></div>
          </div>
          
          <div className="px-6 pb-8 pt-6">
            <h2 className="mb-6 text-2xl font-semibold">Welcome back</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            className="pl-10"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            className="pl-10 pr-10"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                to="/"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Ouss SaaS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
