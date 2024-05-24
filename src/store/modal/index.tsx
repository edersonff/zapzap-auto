import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Alert = {
  message: string;
  status: number;
};

export type AlertStore = {
  alerts: Alert[];
  pushAlert: (alert: Alert) => void;
  popAlert: (alert: Alert) => void;
};

const alertStore = persist<AlertStore>(
  (set) => ({
    alerts: [],
    pushAlert: (alert) => {
      set((state) => ({
        alerts: [...state.alerts, alert],
      }));
      setTimeout(() => {
        set((state) => ({
          alerts: state.alerts.filter((e) => e !== alert),
        }));
      }, 5000);
    },
    popAlert: (alert) => {
      set((state) => ({
        alerts: state.alerts.filter((e) => e !== alert),
      }));
    },
  }),
  {
    name: "alert-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useAlertStore = create(alertStore);
