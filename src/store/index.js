import Vue from "vue";
import Vuex from "vuex";
import { tasksModule } from "@/store/tasks.js";
import { modalNames } from "@/models/modalWindowNames.js";
import { emptyModal } from "@/models/emptyModal.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openModal: {
      ...emptyModal,
    },
  },
  getters: {
    activeModal(state) {
      return state.openModal.name ? state.openModal : null;
    },
  },
  mutations: {
    setModal(state, payload) {
      let modal = {
        ...emptyModal,
      };
      switch (payload.name) {
        case modalNames.addTask:
          modal.name = modalNames.addTask;
          break;
        case modalNames.editTask:
          modal.name = modalNames.editTask;
          modal.taskId = payload.taskId;
          break;
        case modalNames.addComment:
          modal.name = modalNames.addComment;
          modal.taskId = payload.taskId;
          break;
      }
      state.openModal = modal;
    },
  },
  actions: {},
  modules: { tasksModule },
  strict: process.env.NODE_ENV !== "production",
});
