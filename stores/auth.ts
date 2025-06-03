import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: null,
    isAuthenticated: false,
  }),
  actions: {
    authenticated(info: any) {
      this.userInfo = info ;
      this.isAuthenticated = true;
    },
    getInfo() {
      return this.userInfo;
    },
    logout() {
      this.userInfo = null;
      this.isAuthenticated = false;
    },
    pushTask(idTask:any) {
      this.userInfo.tasks.push(idTask)
    }
  },
  persist: true,
});