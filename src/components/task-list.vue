<template>
  <div class="taskList-block">
    <div v-if="!taskList.length" class="no-tasks">
      <span>{{ "NO_TASK" | translate }}. </span
      ><a @click.prevent="add" href="_blank">{{ "ADD_TASK" | translate }}</a>
    </div>
    <div v-else class="task-list">
      <div v-for="task in taskList" :key="task.id">
        <task-item :item="task"></task-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import TaskItem from "@/components/task.vue";
import { modalNames } from "@/models/modalWindowNames.js";

export default {
  name: "task-list",
  components: { TaskItem },
  computed: {
    ...mapGetters(["taskList"]),
  },
  methods: {
    add() {
      this.setModal({
        name: modalNames.addTask,
      });
    },
    ...mapMutations(["setModal"]),
  },
};
</script>

<style scoped lang="scss">
.no-tasks {
  text-align: start;
  margin-top: 1rem;
}
</style>
