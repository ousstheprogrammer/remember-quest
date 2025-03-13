
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeworkForm } from "@/components/homework/HomeworkForm";
import { MainLayout } from "@/components/layout/MainLayout";
import { toast } from "@/hooks/use-toast";
import { HomeworkFormData, HomeworkItem } from "@/lib/types";

const EditHomework = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [homework, setHomework] = useState<HomeworkItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get homework items from localStorage
    const storedItems = localStorage.getItem("homeworkItems");
    
    if (storedItems && id) {
      try {
        const parsedItems = JSON.parse(storedItems, (key, value) => {
          // Convert string dates back to Date objects
          if (key === "dueDate" || key === "createdAt") {
            return new Date(value);
          }
          return value;
        }) as HomeworkItem[];
        
        const found = parsedItems.find((item) => item.id === id);
        
        if (found) {
          setHomework(found);
        } else {
          toast({
            title: "Task not found",
            description: "The task you're trying to edit could not be found.",
            variant: "destructive",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error parsing stored items:", error);
        toast({
          title: "Error loading task",
          description: "There was an error loading the task data.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
    
    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (data: HomeworkFormData) => {
    // Get existing items from localStorage
    const storedItems = localStorage.getItem("homeworkItems");
    let items: HomeworkItem[] = [];
    
    if (storedItems && id) {
      try {
        items = JSON.parse(storedItems, (key, value) => {
          // Convert string dates back to Date objects
          if (key === "dueDate" || key === "createdAt") {
            return new Date(value);
          }
          return value;
        });
        
        // Update the item
        const updatedItems = items.map((item) =>
          item.id === id
            ? {
                ...item,
                ...data,
              }
            : item
        );
        
        localStorage.setItem("homeworkItems", JSON.stringify(updatedItems));
        
        toast({
          title: "Task updated",
          description: "Your task has been updated successfully.",
        });
        
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating stored items:", error);
        toast({
          title: "Error updating task",
          description: "There was an error updating the task data.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-60 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-md pb-20">
        <h1 className="mb-6 text-center text-2xl font-bold">Edit Task</h1>
        {homework && <HomeworkForm initialData={homework} onSubmit={handleSubmit} />}
      </div>
    </MainLayout>
  );
};

export default EditHomework;
