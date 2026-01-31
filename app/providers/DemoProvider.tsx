"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DemoState, initialDemoState } from "../lib/demo-data";

interface DemoContextValue {
  state: DemoState;
  loading: boolean;
  confirmAppointment: (appointmentId: string) => void;
  assignDriver: (requestId: string, driverName: string) => void;
  markMissed: (appointmentId: string) => void;
  createReferral: (patientId: string, type: string) => void;
  requestPickup: (patientId: string) => void;
  updateTransportStatus: (requestId: string, status: DemoState["transportRequests"][number]["status"]) => void;
  closeFollowUp: (taskId: string) => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

const STORAGE_KEY = "clearwater-demo-state";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      setState(JSON.parse(stored) as DemoState);
    }
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loading]);

  const value = useMemo<DemoContextValue>(
    () => ({
      state,
      loading,
      confirmAppointment: (appointmentId) => {
        setState((prev) => ({
          ...prev,
          appointments: prev.appointments.map((appt) =>
            appt.id === appointmentId ? { ...appt, status: "Confirmed" } : appt
          ),
          notifications: [
            {
              id: `note-${Date.now()}`,
              message: "Appointment confirmed and shared across the team.",
              tone: "info"
            },
            ...prev.notifications
          ]
        }));
      },
      assignDriver: (requestId, driverName) => {
        setState((prev) => ({
          ...prev,
          transportRequests: prev.transportRequests.map((req) =>
            req.id === requestId ? { ...req, status: "Assigned", driverId: driverName } : req
          ),
          notifications: [
            {
              id: `note-${Date.now()}`,
              message: `Driver ${driverName} assigned instantly.`,
              tone: "info"
            },
            ...prev.notifications
          ]
        }));
      },
      markMissed: (appointmentId) => {
        setState((prev) => {
          const appointment = prev.appointments.find((appt) => appt.id === appointmentId);
          if (!appointment) return prev;
          return {
            ...prev,
            appointments: prev.appointments.map((appt) =>
              appt.id === appointmentId ? { ...appt, status: "Missed" } : appt
            ),
            followUpTasks: [
              {
                id: `task-${Date.now()}`,
                patientId: appointment.patientId,
                reason: "Auto follow-up after missed appointment",
                status: "Open"
              },
              ...prev.followUpTasks
            ],
            notifications: [
              {
                id: `note-${Date.now()}`,
                message: "Missed appointment triggered auto follow-up + alert.",
                tone: "urgent"
              },
              ...prev.notifications
            ]
          };
        });
      },
      createReferral: (patientId, type) => {
        setState((prev) => ({
          ...prev,
          referrals: [
            { id: `ref-${Date.now()}`, patientId, type, status: "Created" },
            ...prev.referrals
          ],
          notifications: [
            {
              id: `note-${Date.now()}`,
              message: "Referral created and routed to scheduling.",
              tone: "info"
            },
            ...prev.notifications
          ]
        }));
      },
      requestPickup: (patientId) => {
        setState((prev) => ({
          ...prev,
          transportRequests: [
            {
              id: `ride-${Date.now()}`,
              patientId,
              pickupTime: "Next available",
              status: "Requested"
            },
            ...prev.transportRequests
          ],
          notifications: [
            {
              id: `note-${Date.now()}`,
              message: "Pickup request created for dispatch.",
              tone: "info"
            },
            ...prev.notifications
          ]
        }));
      },
      updateTransportStatus: (requestId, status) => {
        setState((prev) => ({
          ...prev,
          transportRequests: prev.transportRequests.map((req) =>
            req.id === requestId ? { ...req, status } : req
          )
        }));
      },
      closeFollowUp: (taskId) => {
        setState((prev) => ({
          ...prev,
          followUpTasks: prev.followUpTasks.map((task) =>
            task.id === taskId ? { ...task, status: "Closed" } : task
          )
        }));
      }
    }),
    [state, loading]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
