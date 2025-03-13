
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomeworkCard } from "@/components/homework/HomeworkCard";
import { EmptyState } from "@/components/homework/EmptyState";
import { toast } from "@/hooks/use-toast";
import { HomeworkFormData, HomeworkItem, Subject } from "@/lib/types";

// Mock data generator
const generateMockData = (): HomeworkItem[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    {
      id: "1",
      title: "Math Homework - Algebra",
      description: "Complete exercises 10-15 on page 45",
      subject: "Math",
      dueDate: tomorrow,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Science Lab Report",
      description: "Write up the findings from the chemistry experiment",
      subject: "Science",
      dueDate: nextWeek,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "History Essay",
      description: "2000 word essay on World War II",
      subject: "History",
      dueDate: new Date(now.getTime() - 86400000), // Yesterday
      completed: true,
      createdAt: new Date(),
    },
  ];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [homeworkItems, setHomeworkItems] = useState<HomeworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedHomework, setSelectedHomework] = useState<HomeworkItem | null>(null);

  // Load data from localStorage or use mock data on first load
  useEffect(() => {
    const storedItems = localStorage.getItem("homeworkItems");
    
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems, (key, value) => {
          // Convert string dates back to Date objects
          if (key === "dueDate" || key === "createdAt") {
            return new Date(value);
          }
          return value;
        });
        setHomeworkItems(parsedItems);
      } catch (error) {
        console.error("Error parsing stored items:", error);
        setHomeworkItems(generateMockData());
      }
    } else {
      setHomeworkItems(generateMockData());
    }
    
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Save to localStorage whenever homeworkItems changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("homeworkItems", JSON.stringify(homeworkItems));
    }
  }, [homeworkItems, loading]);

  const handleComplete = (id: string, completed: boolean) => {
    setHomeworkItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed } : item
      )
    );
    
    toast({
      title: completed ? "Task completed" : "Task marked incomplete",
      description: completed
        ? "Great job! Task marked as complete."
        : "Task marked as incomplete.",
    });
  };

  const handleDelete = (id: string) => {
    setHomeworkItems((prev) => prev.filter((item) => item.id !== id));
    
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const handleEdit = (homework: HomeworkItem) => {
    setSelectedHomework(homework);
    navigate(`/edit/${homework.id}`);
  };

  const handleAddHomework = (data: HomeworkFormData) => {
    const newItem: HomeworkItem = {
      id: crypto.randomUUID(),
      ...data,
      completed: false,
      createdAt: new Date(),
    };
    
    setHomeworkItems((prev) => [newItem, ...prev]);
  };

  // Filter and sort homework items
  const filteredHomeworkItems = homeworkItems
    .filter((item) => {
      // Filter by search query
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Filter by subject
      const matchesSubject =
        subjectFilter === "all" || item.subject === subjectFilter;
        
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      // Sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by due date (earliest first)
      return a.dueDate.getTime() - b.dueDate.getTime();
    });

  // Group items by completion status
  const pendingItems = filteredHomeworkItems.filter((item) => !item.completed);
  const completedItems = filteredHomeworkItems.filter((item) => item.completed);

  // Get unique subjects for filter dropdown
  const uniqueSubjects = Array.from(new Set(homeworkItems.map((item) => item.subject)));

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Your Tasks</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => navigate("/add")}>
              <Plus className="mr-1 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredHomeworkItems.length === 0 ? (
          <EmptyState 
            title="No tasks found" 
            description={
              searchQuery || subjectFilter !== "all"
                ? "Try adjusting your filters or search query."
                : "Add your first homework task to get started."
            }
          />
        ) : (
          <Tabs defaultValue="pending" className="mt-6">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="pending">
                Pending ({pendingItems.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedItems.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="animate-fade-in">
              {pendingItems.length === 0 ? (
                <EmptyState 
                  title="No pending tasks" 
                  description="Great job! You've completed all your tasks."
                />
              ) : (
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-3"
                }>
                  {pendingItems.map((homework) => (
                    <HomeworkCard
                      key={homework.id}
                      homework={homework}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="animate-fade-in">
              {completedItems.length === 0 ? (
                <EmptyState 
                  title="No completed tasks" 
                  description="Your completed tasks will appear here."
                  showAddButton={false}
                />
              ) : (
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-3"
                }>
                  {completedItems.map((homework) => (
                    <HomeworkCard
                      key={homework.id}
                      homework={homework}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
