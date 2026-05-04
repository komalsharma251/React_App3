"use client"; 
// Enables client-side features (React hooks and real-time Firebase listeners)

// React hooks
import { useEffect, useState } from "react";

// Firebase Firestore functions for real-time data
import {
  onSnapshot,  // listens to real-time updates
  query,       // creates query
  orderBy,     // sorts data
} from "firebase/firestore";

// Import tasks collection reference from API layer
import { tasksCollection } from "@/api/tasks";

//  TypeScript type for a Task object
export type Task = {
  id: string;        // unique document ID
  title: string;     // task title
  completed: boolean;// task completion status
};

//  Custom hook to manage tasks
export const useTasks = () => {

  // State to store list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  //  Runs when component using this hook mounts
  useEffect(() => {

    // Create query to fetch tasks sorted by latest first
    const q = query(tasksCollection, orderBy("createdAt", "desc"));

    // Real-time listener (auto updates when data changes)
    const unsubscribe = onSnapshot(q, (snapshot) => {

      // Map Firebase documents to Task objects
      const taskList: Task[] = snapshot.docs.map((document) => ({
        id: document.id,
        title: document.data().title,
        completed: document.data().completed,
      }));

      // Update state with latest tasks
      setTasks(taskList);

      // Stop loading after data is fetched
      setLoading(false);
    });

    // Cleanup function to remove listener when component unmounts
    return () => unsubscribe();

  }, []); // Empty dependency → runs only once

  // Return tasks, setter (for optimistic UI), and loading state
  return { tasks, setTasks, loading };
};