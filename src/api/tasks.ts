
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const tasksCollection = collection(db, "tasks");

// Add new task
export const addTaskToDB = async (title: string) => {
  return await addDoc(tasksCollection, {
    title,
    completed: false,
    createdAt: serverTimestamp(),
  });
};

// Update task complete status
export const updateTaskStatus = async (id: string, completed: boolean) => {
  return await updateDoc(doc(db, "tasks", id), {
    completed,
  });
};

// Delete task
export const deleteTaskFromDB = async (id: string) => {
  return await deleteDoc(doc(db, "tasks", id));
};