"use client"; // Enables client-side features (React hooks, routing, etc.)

// React hooks
import { useEffect, useState } from "react";

// Next.js router for navigation
import { useRouter } from "next/navigation";

// Toast notifications for user feedback
import toast from "react-hot-toast";

// Custom hook to fetch and manage tasks
import { useTasks, Task } from "@/hooks/useTasks";

// API functions (separated Firebase logic)
import {
  addTaskToDB,
  updateTaskStatus,
  deleteTaskFromDB,
} from "@/api/tasks";

// Main Dashboard Component
export default function DashboardPage() {
  const router = useRouter();

  // Get tasks, loading state, and setter from custom hook
  const { tasks, setTasks, loading } = useTasks();

  // State for input field
  const [title, setTitle] = useState("");

  //  Check login status on page load
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    // Redirect to login if not authenticated
    if (isAdmin !== "true") {
      router.push("/login");
    }
  }, [router]);

  // ➕ Add new task
  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload

    const cleanTitle = title.trim();

    // Validation
    if (!cleanTitle) {
      toast.error("Please enter a task");
      return;
    }

    try {
      // Call API function to add task to Firebase
      await addTaskToDB(cleanTitle);

      toast.success("Task added successfully");

      setTitle(""); // clear input field
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task");
    }
  };

  //  Toggle task completion
  const toggleComplete = async (task: Task) => {
    const newStatus = !task.completed;

    //  Optimistic UI update (instant UI change)
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id ? { ...item, completed: newStatus } : item
      )
    );

    try {
      // Update task in Firebase
      await updateTaskStatus(task.id, newStatus);

      toast.success(newStatus ? "Task completed" : "Task marked pending");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");

      //  Revert UI if Firebase update fails
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === task.id ? { ...item, completed: task.completed } : item
        )
      );
    }
  };

  //  Delete task
  const deleteTask = async (id: string) => {
    const oldTasks = tasks; // backup current state

    //  Optimistic UI update (remove instantly)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      // Delete from Firebase
      await deleteTaskFromDB(id);

      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");

      //  Revert UI if delete fails
      setTasks(oldTasks);
    }
  };

  //  Logout function
  const logout = () => {
    localStorage.removeItem("isAdmin"); // clear login
    toast.success("Logged out");
    router.push("/login"); // redirect to login
  };

  //  Task statistics
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="task-page">
      <div className="container">
        <div className="task-wrapper mx-auto">

          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="task-badge">Admin Dashboard</span>
              <h1 className="mb-0">Task Manager</h1>
            </div>

            {/* Logout Button */}
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </div>

          {/* Statistics Section */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="stat-card">
                <span>Total Tasks</span>
                <h3>{tasks.length}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <span>Completed</span>
                <h3>{completedCount}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <span>Pending</span>
                <h3>{pendingCount}</h3>
              </div>
            </div>
          </div>

          {/* Task Input + List Section */}
          <div className="task-card">

            {/* Add Task Form */}
            <form onSubmit={addTask} className="task-form">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                <i className="bi bi-plus-lg me-1"></i>
                Add Task
              </button>
            </form>

            {/* Loading State */}
            {loading ? (
              <div className="empty-box">
                <i className="bi bi-hourglass-split"></i>
                <h5>Loading tasks...</h5>
                <p>Please wait while tasks load from Firebase.</p>
              </div>
            ) : tasks.length === 0 ? (

              /* Empty State */
              <div className="empty-box">
                <i className="bi bi-check2-circle"></i>
                <h5>No tasks yet</h5>
                <p>Add your first task to get started.</p>
              </div>
            ) : (

              /* Task List */
              <div className="task-list">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item ${task.completed ? "done" : ""}`}
                  >
                    <div className="task-left">

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                      />

                      {/* Task Title */}
                      <span>{task.title}</span>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}