<template>
  <div id="app">
    <overlay-modal v-if="activeModal && activeModal.name">
      <component
        :is="activeModal.name"
        :taskId="activeModal.taskId"
      ></component>
    </overlay-modal>
    <div class="main">
      <header class="main-header">
        <h1>{{ "PAWATASK" | translate }}</h1>
        <button @click="add" class="add-task main-btn">
          {{ "BUTTON_ADD" | translate }}
        </button>
      </header>
      <task-list></task-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { modalNames } from "@/models/modalWindowNames.js";

import OverlayModal from "@/components/overlay.vue";
import TaskList from "@/components/task-list.vue";
import AddTask from "@/components/addTask.vue";
import EditTask from "@/components/editTask.vue";
import AddComment from "@/components/addComment.vue";

export default {
  components: {
    TaskList,
    OverlayModal,
    AddTask,
    EditTask,
    AddComment,
  },
  name: "App",
  computed: {
    ...mapGetters(["activeModal"]),
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
.main {
  margin: 2rem auto;
  max-width: 1200px;
  width: 200rem;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 0.2rem solid $borderColor;

    .add-task {
      font-weight: 600;
      font-size: 1rem;
      line-height: 1rem;
    }
  }
}
</style>
