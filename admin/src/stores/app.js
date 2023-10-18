import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const menuOpen = ref(false);
  function toogleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }
  return { menuOpen, toogleMenuOpen };
});
