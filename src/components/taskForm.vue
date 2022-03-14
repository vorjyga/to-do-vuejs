<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="title form-block">
      <label class="title-label" for="title">{{ "TITLE" | translate }}</label>
      <input
        id="title"
        class="title-input form-input"
        name="title"
        type="text"
        required
        v-model="form.title"
      />
    </div>
    <div class="description form-block">
      <label class="description-label" for="description">{{
        "DESCRIPTION" | translate
      }}</label>
      <textarea
        id="description"
        class="description-input form-input"
        name="description"
        rows="3"
        v-model="form.description"
      ></textarea>
    </div>
    <div class="date form-block">
      <div>{{ "SET_DUE_DATE" | translate }}</div>
      <div>
        <input
          class="form-date-input form-input"
          placeholder="DD"
          type="number"
          required
          pattern=".{1,2}"
          v-model="form.todoDate.date"
        />
        <input
          class="form-date-input form-input"
          placeholder="MM"
          type="number"
          required
          pattern=".{1,2}"
          v-model="form.todoDate.month"
        />
        <input
          class="form-date-input form-input"
          placeholder="YYYY"
          type="number"
          required
          pattern=".{4}"
          v-model="form.todoDate.year"
        />
      </div>
    </div>

    <div class="priority form-block">
      <div class="priority-label">{{ "PRIORITY" | translate }}</div>
      <select
        v-model="form.priority"
        id="priority"
        name="priority"
        class="form-priority form-input"
      >
        <option
          v-for="priority in priorities"
          :key="priority.id"
          :value="priority.id"
          :selected="priority.id === form.priority"
        >
          {{ priority.name | translate }}
        </option>
      </select>
    </div>
    <div class="comments form-block">
      <label class="comments-label">{{ "COMMENTS" | translate }}</label>
      <textarea
        id="comments"
        class="comments-input form-input"
        name="comments"
        rows="3"
        v-model="form.comment"
      ></textarea>
    </div>
    <button class="big-red-btn main-btn add-task" type="submit">
      {{ buttonTitle | translate }}
    </button>
  </form>
</template>

<script>
import { priorities } from "@/models/priorities.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "taskForm",
  props: {
    task: {
      type: Object,
      required: false,
    },
    buttonTitle: {
      type: String,
      default: "ADD_TASK",
    },
    taskId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    form: {
      title: "",
      description: "",
      todoDate: {
        date: "",
        month: "",
        year: "",
      },
      priority: 1,
      comment: "",
      done: false,
    },
    comments: [],
  }),
  computed: {
    priorities() {
      return priorities;
    },
  },
  methods: {
    onSubmit() {
      const { date, month, year } = this.form.todoDate;
      const todoDate = new Date(`${year}-${month}-${date}`).getTime();
      const comment = {
        text: this.form.comment,
        author: "Author",
        date: Date.now(),
        id: uuidv4(),
      };
      const task = {
        id: this.taskId,
        title: this.form.title,
        description: this.form.description,
        todoDate,
        priority: this.form.priority,
        done: this.form.done,
        comments: [...this.comments, comment],
      };

      this.$emit("submit", task);
    },
  },
  created() {
    if (this.task) {
      const { task } = this;
      const date = new Date(task.todoDate);
      this.comments = [...task.comments];
      const comment = task.comments.length ? this.comments.shift() : "";
      this.form = {
        title: task.title,
        description: task.description,
        todoDate: {
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        priority: task.priority,
        comment: comment.text,
        done: this.done,
      };
    }
  },
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-flow: column nowrap;
  &-block {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  .title-input,
  .description-input,
  .comments-input {
    align-self: stretch;
  }
  .form-priority {
    width: 212px;
  }
  .date {
    .form-date-input {
      width: 50px;
      text-align: center;

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
  .big-red-btn {
    color: white;
    align-self: flex-end;
    margin: 0;
  }
}
</style>
