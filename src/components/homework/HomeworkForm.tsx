
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { HomeworkFormData, HomeworkItem, Subject } from "@/lib/types";

interface HomeworkFormProps {
  initialData?: HomeworkItem;
  onSubmit: (data: HomeworkFormData) => void;
}

const subjects: Subject[] = [
  "Math",
  "Science",
  "History",
  "English",
  "Art",
  "Music",
  "PE",
  "Languages",
  "Computer Science",
  "Other",
];

export function HomeworkForm({ initialData, onSubmit }: HomeworkFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [subject, setSubject] = useState<Subject>(initialData?.subject || "Other");
  const [dueDate, setDueDate] = useState<Date>(initialData?.dueDate || new Date());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!subject) {
      newErrors.subject = "Subject is required";
    }
    
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const data: HomeworkFormData = {
      title,
      description,
      subject,
      dueDate,
    };
    
    onSubmit(data);
    toast({
      title: initialData ? "Task updated" : "Task added",
      description: initialData ? "Your task has been updated successfully." : "Your task has been added successfully.",
    });
    navigate("/dashboard");
  };

  return (
    <Card className="mx-auto w-full max-w-md animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Task" : "Add New Task"}</CardTitle>
          <CardDescription>
            {initialData
              ? "Update your homework task details."
              : "Fill in the details to add a new homework task."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Math homework chapter 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Complete exercises 1-10 from page 45"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={subject} 
              onValueChange={(value) => setSubject(value as Subject)}
            >
              <SelectTrigger id="subject" className={errors.subject ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-xs text-red-500">{errors.subject}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="due-date">
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="due-date"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    errors.dueDate ? "border-red-500" : "",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => date && setDueDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-xs text-red-500">{errors.dueDate}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Task" : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
