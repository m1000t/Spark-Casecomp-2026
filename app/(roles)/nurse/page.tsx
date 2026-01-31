"use client";

import { useMemo } from "react";
import { useDemo } from "@/app/providers/DemoProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusTracker } from "@/app/components/StatusTracker";
import { RoleSwitcher } from "@/app/components/RoleSwitcher";
import { NotificationBanner } from "@/app/components/NotificationBanner";

export default function NursePage() {
  const {
    state,
    loading,
    confirmAppointment,
    assignDriver,
    markMissed,
    createReferral
  } = useDemo();

  const missedAppointments = useMemo(
    () => state.appointments.filter((appt) => appt.status === "Missed"),
    [state.appointments]
  );
  const unassignedRides = useMemo(
    () => state.transportRequests.filter((req) => req.status === "Requested"),
    [state.transportRequests]
  );
  const unconfirmedAppointments = useMemo(
    () => state.appointments.filter((appt) => appt.status === "Scheduled"),
    [state.appointments]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader
          title="Nurse Control Center"
          subtitle="Three priority queues, one click to fix."
        />
        <RoleSwitcher />
      </div>

      {state.notifications[0] ? (
        <NotificationBanner
          message={state.notifications[0].message}
          tone={state.notifications[0].tone}
        />
      ) : null}

      <StatusTracker
        title="Shared Status Tracker"
        steps={["Scheduled", "Confirmed", "Completed / Missed / Cancelled"]}
        activeStep={1}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4 border-alert/30">
          <div>
            <p className="text-sm font-semibold text-alert">🔴 Missed appointments</p>
            <h3 className="text-xl font-semibold text-slate-900">Requires follow-up</h3>
          </div>
          {loading ? (
            <Skeleton className="h-24" />
          ) : missedAppointments.length ? (
            missedAppointments.slice(0, 3).map((appt) => {
              const patient = state.patients.find((p) => p.id === appt.patientId);
              return (
                <div key={appt.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-base font-semibold text-slate-900">{patient?.name}</p>
                  <p className="text-sm text-slate-600">Missed {appt.time}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => createReferral(appt.patientId, "Follow-up care")}
                    >
                      Create referral
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => markMissed(appt.id)}
                    >
                      Send auto follow-up
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-base text-slate-600">No missed appointments right now.</p>
          )}
        </Card>

        <Card className="space-y-4 border-sun/30">
          <div>
            <p className="text-sm font-semibold text-sun">🟠 Unassigned rides</p>
            <h3 className="text-xl font-semibold text-slate-900">Transportation needs action</h3>
          </div>
          {loading ? (
            <Skeleton className="h-24" />
          ) : unassignedRides.length ? (
            unassignedRides.slice(0, 3).map((req) => {
              const patient = state.patients.find((p) => p.id === req.patientId);
              return (
                <div key={req.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-base font-semibold text-slate-900">{patient?.name}</p>
                  <p className="text-sm text-slate-600">Pickup {req.pickupTime}</p>
                  <Button className="mt-3 w-full" onClick={() => assignDriver(req.id, "Avery (Driver)")}
                  >
                    Assign driver
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="text-base text-slate-600">All rides are assigned.</p>
          )}
        </Card>

        <Card className="space-y-4 border-yellow-400/40">
          <div>
            <p className="text-sm font-semibold text-yellow-600">🟡 Unconfirmed appointments</p>
            <h3 className="text-xl font-semibold text-slate-900">Confirm in one click</h3>
          </div>
          {loading ? (
            <Skeleton className="h-24" />
          ) : unconfirmedAppointments.length ? (
            unconfirmedAppointments.slice(0, 3).map((appt) => {
              const patient = state.patients.find((p) => p.id === appt.patientId);
              return (
                <div key={appt.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-base font-semibold text-slate-900">{patient?.name}</p>
                  <p className="text-sm text-slate-600">{appt.time} with {appt.clinician}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="flex-1" onClick={() => confirmAppointment(appt.id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => markMissed(appt.id)}
                    >
                      Mark missed
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-base text-slate-600">All appointments confirmed.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
