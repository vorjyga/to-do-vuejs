<template>
  <div class="task-block m-b-20">
    <h1 class="header">{{ header | translate }}</h1>
    <task-form
      :taskId="taskId"
      :task="task"
      :buttonTitle="'EDIT_TASK'"
      @submit="onSubmit"
    ></task-form>
  </div>
</template>

<script>
import { modalNames } from "@/models/modalWindowNames.js";
import { mapActions, mapGetters } from "vuex";
import TaskForm from "@/components/taskForm.vue";

export default {
  name: modalNames.editTask,
  components: {
    TaskForm,
  },
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  computed: {
    header() {
      return this.task.title;
    },
    task() {
      return this.getTaskById(this.taskId);
    },
    ...mapGetters(["getTaskById"]),
  },

  methods: {
    onSubmit(task) {
      this.updateTask(task);
    },
    ...mapActions(["updateTask"]),
  },
};
</script>

<style scoped></style>
