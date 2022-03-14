import { v4 as uuidv4 } from "uuid";
import { emptyModal } from "@/models/emptyModal.js";

export const tasksModule = {
  state: () => ({
    taskList: [],
  }),
  mutations: {
    updateItems(state, payload) {
      state.taskList = payload;
    },
    updateComments(state, { taskId, comment }) {
      const task = state.taskList.find((task) => task.id === taskId);
      task.comments.push(comment);
    },
    updateTaskStatus(state, { taskId, status }) {
      const task = state.taskList.find((task) => task.id === taskId);
      task.done = status;
    },
  },
  actions: {
    addTask({ state, commit }, payload) {
      const newTask = {
        id: uuidv4(),
        title: payload.title,
        description: payload.description,
        todoDate: payload.todoDate,
        priority: payload.priority,
        comments: payload.comments,
        done: false,
      };
      commit("updateItems", [...state.taskList, newTask]);
      commit("setModal", emptyModal);
    },
    updateTask({ state, commit }, payload) {
      const list = state.taskList.filter((task) => task.id !== payload.id);
      commit("updateItems", [...list, payload]);
      commit("setModal", emptyModal);
    },
    addComment({ commit }, payload) {
      commit("updateComments", payload);
    },
  },
  getters: {
    taskList(state) {
      return state.taskList;
    },
    getTaskById: (state) => (taskId) => {
      return state.taskList.find((task) => task.id === taskId);
    },
  },
};
