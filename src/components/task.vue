<template>
  <div class="task">
    <input class="checkbox" type="checkbox" @click="onClick" />
    <h4 class="title">{{ item.title }}</h4>
    <div class="calendar">
      <i class="icon fi-rr-calendar"></i>
      <span class="calendar-date">{{ item.todoDate | date }}</span>
    </div>
    <button class="comments main-btn" @click="openComments">
      <i class="icon fi-rr-comment-alt"></i>
    </button>
    <button class="edit main-btn" @click="openEdit">
      <i class="icon fi-rr-dart"></i>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { modalNames } from "@/models/modalWindowNames.js";

export default {
  name: "task-item",
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    onClick(event) {
      this.updateTaskStatus({
        taskId: this.item.id,
        status: event.target.checked,
      });
    },
    openEdit() {
      this.setModal({
        name: modalNames.editTask,
        taskId: this.item.id,
      });
    },
    openComments() {
      this.setModal({
        name: modalNames.addComment,
        taskId: this.item.id,
      });
    },
    ...mapMutations(["setModal", "updateTaskStatus"]),
  },
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid $borderColor;

  .checkbox {
    align-self: center;
  }

  .title {
    flex-grow: 1;
    text-align: left;
    margin-left: 1rem;
  }

  .calendar {
    display: flex;

    .fi-rr-calendar {
      padding-right: 5px;
    }
  }
}

.main-btn {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  margin-left: 20px;
  cursor: pointer;
}

.icon {
  font-size: 20px;
}

.fi-rr-comment-alt,
.fi-rr-dart {
  color: white;
}
</style>
