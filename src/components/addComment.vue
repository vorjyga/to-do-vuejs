<template>
  <div class="task-block">
    <div class="header-block m-b-20">
      <h1 class="header">{{ header | translate }}</h1>
      <a @click.prevent="editTask" class="header-link">{{
        "EDIT_TASK" | translate
      }}</a>
    </div>
    <div class="task">
      <div class="task-description">
        {{ task.description }}
      </div>
      <div class="task-bottom">
        <div class="task-date">
          <span class="text-bold">{{ "DATE" | translate }}: </span>
          <span>{{ task.todoDate | date }}</span>
        </div>
        <div class="task-priorty">
          <span class="text-bold">{{ "PRIORITY" | translate }}: </span>
          <span>{{ taskPriority | translate }} </span>
        </div>
      </div>
    </div>
    <div class="task-comments">
      <div
        v-for="comment in commentList"
        :key="comment.id"
        class="task-comment m-b-20"
      >
        <div class="comment-header">
          <span class="comment-author text-bold">
            {{ comment.author }}
          </span>
          <span class="comment-date">
            {{ comment.date | date }}
          </span>
        </div>
        <div class="comment-text">
          {{ comment.text }}
        </div>
      </div>
    </div>
    <form class="input-block" @submit.prevent="onSubmit">
      <input type="text" v-model="input" class="comment-input" />
      <button type="submit" class="main-btn">
        {{ "ADD_COMMENT" | translate }}
      </button>
    </form>
  </div>
</template>

<script>
import { modalNames } from "@/models/modalWindowNames.js";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { priorities } from "@/models/priorities.js";
import { v4 as uuidv4 } from "uuid";
import { emptyModal } from "@/models/emptyModal.js";

export default {
  name: modalNames.addComment,
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    input: "",
  }),
  computed: {
    header() {
      return this.task.title;
    },
    task() {
      return this.getTaskById(this.taskId);
    },
    commentList() {
      return [...this.task.comments].sort((a, b) => a.date - b.date);
    },
    taskPriority() {
      return priorities.find((priority) => priority.id === this.task.priority)
        .name;
    },
    ...mapGetters(["getTaskById"]),
  },
  methods: {
    editTask() {
      this.setModal({
        name: modalNames.editTask,
        taskId: this.task.id,
      });
    },
    onSubmit() {
      if (this.input.length) {
        this.addComment({
          taskId: this.taskId,
          comment: {
            id: uuidv4(),
            text: this.input,
            author: "Author", // ??
            date: Date.now(),
          },
        });
      }
      this.setModal(emptyModal);
    },
    ...mapMutations(["setModal"]),
    ...mapActions(["addComment"]),
  },
};
</script>

<style scoped lang="scss">
.header-block {
  display: flex;
  align-items: baseline;
}
.header-link {
  margin-left: 10px;
}
.task {
  border-bottom: 0.2rem solid $borderColor;
  &-comments {
    margin: 1.5rem 0;
  }
  &-description {
    min-height: 5rem;
    width: 100%;
    text-align: start;
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
}
.comment {
  &-header {
    text-align: start;
  }
  &-date {
    margin-left: 5px;
    font-size: 11px;
    color: $background;
  }
  &-text {
    text-align: start;
  }
}
.input-block {
  display: flex;
  justify-content: space-between;
  & > * {
    padding: 5px 10px;
  }
  .comment-input {
    flex-grow: 1;
  }
  .main-btn {
    margin-left: 10px;
    color: white;
    font-weight: 600;
  }
}
</style>
