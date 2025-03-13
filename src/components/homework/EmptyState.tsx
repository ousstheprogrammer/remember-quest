
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showAddButton?: boolean;
}

export function EmptyState({
  title = "No tasks yet",
  description = "Add your first homework task to get started.",
  showAddButton = true,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] animate-fade-in flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 px-6 py-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <BookOpen className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-xl font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      
      {showAddButton && (
        <Link to="/add">
          <Button className="mt-6" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </Link>
      )}
    </div>
  );
}
