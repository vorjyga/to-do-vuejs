import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/styles/_variables.scss";
import en from "./translations/en.json";

Vue.config.productionTip = false;

const dictionary = en;

Vue.filter("translate", (value) => {
  if (!value) {
    return "";
  }
  value = value.toString();
  return dictionary[value] || value;
});

Vue.filter("date", (value) => {
  if (!value) {
    return "";
  }
  if (!(typeof value === "number")) {
    return value;
  }
  const date = new Date(value);
  const day = ("0" + date.getDate()).toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${day}/${month}/${date.getFullYear()}`;
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
