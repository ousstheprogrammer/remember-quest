
import { useState } from "react";
import { format } from "date-fns";
import { Calendar, CheckCircle, Circle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HomeworkItem } from "@/lib/types";

interface HomeworkCardProps {
  homework: HomeworkItem;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: HomeworkItem) => void;
}

export function HomeworkCard({ homework, onComplete, onDelete, onEdit }: HomeworkCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const daysLeft = Math.ceil((homework.dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  
  const getStatusColor = () => {
    if (homework.completed) return "bg-green-100 text-green-800";
    if (daysLeft <= 0) return "bg-red-100 text-red-800";
    if (daysLeft <= 2) return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };
  
  const getStatusText = () => {
    if (homework.completed) return "Completed";
    if (daysLeft <= 0) return "Overdue";
    if (daysLeft === 1) return "Due Tomorrow";
    return `Due in ${daysLeft} days`;
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 ease-in-out animate-fade-in",
        homework.completed ? "bg-muted/50" : "bg-card shadow-soft hover:shadow-md"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "mt-1 h-6 w-6 rounded-full transition-colors",
                homework.completed ? "text-green-500" : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => onComplete(homework.id, !homework.completed)}
            >
              {homework.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            
            <div>
              <h3 
                className={cn(
                  "line-clamp-1 text-lg font-semibold transition-colors",
                  homework.completed && "text-muted-foreground line-through"
                )}
              >
                {homework.title}
              </h3>
              <p 
                className={cn(
                  "line-clamp-2 text-sm text-muted-foreground",
                  homework.completed && "line-through"
                )}
              >
                {homework.description}
              </p>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-border/50 bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  {homework.subject}
                </span>
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  getStatusColor()
                )}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "flex-shrink-0 transition-opacity duration-200 ease-in-out",
            isHovering ? "opacity-100" : "opacity-0"
          )}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-accent-foreground"
              onClick={() => onEdit(homework)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-500"
              onClick={() => onDelete(homework.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          <time dateTime={homework.dueDate.toISOString()}>
            Due {format(homework.dueDate, "PPP")}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}
