import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const scene = ref(0)
  const machineId = ref(0)

  return {
    scene,
    machineId
  }
})