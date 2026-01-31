"use client";

import { useMemo, useState } from "react";
import { useDemo } from "@/app/providers/DemoProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/app/components/SectionHeader";
import { RoleSwitcher } from "@/app/components/RoleSwitcher";

export default function DoctorPage() {
  const { state, loading, confirmAppointment } = useDemo();
  const [note, setNote] = useState("Ready for your confirmation.");

  const pendingAppointments = useMemo(
    () => state.appointments.filter((appt) => appt.status === "Scheduled"),
    [state.appointments]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader
          title="Doctor View"
          subtitle="Confirm visits and send a quick note back to nursing."
        />
        <RoleSwitcher />
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Appointments needing confirmation
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Keep the shared status tracker accurate.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Ready to confirm
          </span>
        </div>
        <div className="mt-4 space-y-4">
          {loading ? (
            <Skeleton className="h-20" />
          ) : pendingAppointments.length ? (
            pendingAppointments.slice(0, 3).map((appt) => {
              const patient = state.patients.find((p) => p.id === appt.patientId);
              return (
                <div key={appt.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-base font-semibold text-slate-900">{patient?.name}</p>
                  <p className="text-sm text-slate-600">{appt.time}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="flex-1" onClick={() => confirmAppointment(appt.id)}
                    >
                      Confirm appointment
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setNote("Patient confirmed. Please prep follow-up reminders.")}
                    >
                      Send note to nurse
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-base text-slate-600">No pending confirmations.</p>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Note to nurse</h3>
        <textarea
          className="mt-3 min-h-[120px] w-full rounded-2xl border border-slate-200 p-4 text-base text-slate-900"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <Button className="mt-4 w-full" onClick={() => setNote("Note sent to nurse dashboard.")}
        >
          Send note
        </Button>
      </Card>
    </div>
  );
}
