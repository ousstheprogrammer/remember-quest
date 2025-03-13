
import { useNavigate } from "react-router-dom";
import { HomeworkForm } from "@/components/homework/HomeworkForm";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomeworkFormData, HomeworkItem } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

const AddHomework = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: HomeworkFormData) => {
    // Get existing items from localStorage
    const storedItems = localStorage.getItem("homeworkItems");
    let items: HomeworkItem[] = [];
    
    if (storedItems) {
      try {
        items = JSON.parse(storedItems, (key, value) => {
          // Convert string dates back to Date objects
          if (key === "dueDate" || key === "createdAt") {
            return new Date(value);
          }
          return value;
        });
      } catch (error) {
        console.error("Error parsing stored items:", error);
      }
    }
    
    // Create new homework item
    const newItem: HomeworkItem = {
      id: crypto.randomUUID(),
      ...data,
      completed: false,
      createdAt: new Date(),
    };
    
    // Add to beginning of array and save
    const updatedItems = [newItem, ...items];
    localStorage.setItem("homeworkItems", JSON.stringify(updatedItems));
    
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
    
    navigate("/dashboard");
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-md pb-20">
        <h1 className="mb-6 text-center text-2xl font-bold">Add New Task</h1>
        <HomeworkForm onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
};

export default AddHomework;
