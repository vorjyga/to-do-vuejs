<template>
  <div class="task-block m-b-20">
    <h1 class="header">{{ header | translate }}</h1>
    <task-form :task-id="taskId" @submit="onSubmit"></task-form>
  </div>
</template>

<script>
import { modalNames } from "@/models/modalWindowNames.js";
import { mapGetters, mapActions } from "vuex";
import TaskForm from "@/components/taskForm.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: modalNames.addTask,
  components: { TaskForm },
  data: () => ({
    taskId: uuidv4(),
  }),
  computed: {
    header() {
      return "NEW_TASK";
    },
    ...mapGetters(["getTaskById"]),
  },
  methods: {
    onSubmit(task) {
      this.addTask(task);
    },
    ...mapActions(["addTask"]),
  },
};
</script>

<style scoped lang="scss"></style>
