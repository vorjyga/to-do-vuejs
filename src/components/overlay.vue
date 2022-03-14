<template>
  <div class="overlay" @click="closeFromOutside">
    <div class="content">
      <button class="btn-close" @click="close">
        <i class="fi-rr-cross-small"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { emptyModal } from "@/models/emptyModal.js";

export default {
  name: "overlay-modal",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    close() {
      this.$store.commit("setModal", emptyModal);
    },
    closeFromOutside(event) {
      if (event.eventPhase === 2) {
        this.close();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $background;
  overflow: hidden;
}
.content {
  border: 1px solid $borderColor;
  background: white;

  height: auto;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (min-width: 501px) {
    width: 500px;
  }
  .btn-close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: inherit;
    i {
      font-size: 25px;
      font-weight: 600;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
