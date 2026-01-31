"use client";

import { useMemo } from "react";
import { useDemo } from "@/app/providers/DemoProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/app/components/SectionHeader";
import { RoleSwitcher } from "@/app/components/RoleSwitcher";

export default function DriverPage() {
  const { state, loading, updateTransportStatus } = useDemo();

  const rides = useMemo(
    () => state.transportRequests.slice(0, 3),
    [state.transportRequests]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader
          title="Driver View"
          subtitle="Today’s rides with big, mobile-friendly buttons."
        />
        <RoleSwitcher />
      </div>

      <Card>
        <h3 className="text-xl font-semibold text-slate-900">Today’s rides</h3>
        <p className="mt-2 text-sm text-slate-600">Updates sync instantly with the nurse dashboard.</p>
        <div className="mt-4 space-y-4">
          {loading ? (
            <Skeleton className="h-24" />
          ) : rides.length ? (
            rides.map((ride) => {
              const patient = state.patients.find((p) => p.id === ride.patientId);
              return (
                <div key={ride.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-base font-semibold text-slate-900">{patient?.name}</p>
                  <p className="text-sm text-slate-600">Pickup: {ride.pickupTime}</p>
                  <p className="mt-2 text-sm text-slate-600">Status: {ride.status}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    <Button
                      variant="secondary"
                      onClick={() => updateTransportStatus(ride.id, "Assigned")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => updateTransportStatus(ride.id, "Picked Up")}
                    >
                      Picked up
                    </Button>
                    <Button
                      onClick={() => updateTransportStatus(ride.id, "Completed")}
                    >
                      Dropped off
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-base text-slate-600">No rides assigned yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
