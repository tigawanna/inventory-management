import { TrackingSheetRow } from "@/routes/dashboard/todos/tracking/load/-components/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TrackingSheetStore {
  trackingSheet: TrackingSheetRow[];
  setTrackingSheet: (
    value: (prev: TrackingSheetRow[]) => TrackingSheetRow[],
  ) => void;
  removeRow: (row: TrackingSheetRow) => void;
  addRow: (row: TrackingSheetRow) => void;
  editRow: (row: TrackingSheetRow) => void;
}

export const useTrackingSheetStore = create<TrackingSheetStore>()(
  devtools(
    persist(
      (set) => ({
        trackingSheet: [],
        setTrackingSheet: (data) => {
          set((state) => ({ trackingSheet: data(state.trackingSheet) }));
        },
        removeRow: (row) => {
          set((state) => ({
            trackingSheet: state.trackingSheet.filter((r) => r !== row),
          }));
        },
        addRow: (row) => {
          set((state) => ({ trackingSheet: [...state.trackingSheet, row] }));
        },
        editRow: (row) => {
          set((state) => {
            const index = state.trackingSheet.findIndex((r) => r === row);
            if (index !== -1) {
              const newRows = [...state.trackingSheet];
              newRows[index] = row;
              return { trackingSheet: newRows };
            }
            return { trackingSheet: state.trackingSheet };
          });
        },
      }),

      {
        name: "tracking-sheet-storage",
      },
    ),
  ),
);
