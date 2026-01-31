export type AppointmentStatus = "Scheduled" | "Confirmed" | "Completed" | "Missed" | "Cancelled";
export type ReferralStatus = "Created" | "Scheduled" | "Completed" | "Escalated";
export type TransportStatus =
  | "Requested"
  | "Assigned"
  | "Picked Up"
  | "Completed"
  | "Failed";

export interface Patient {
  id: string;
  name: string;
  age: number;
  location: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  time: string;
  clinician: string;
  status: AppointmentStatus;
}

export interface Referral {
  id: string;
  patientId: string;
  type: string;
  status: ReferralStatus;
}

export interface TransportRequest {
  id: string;
  patientId: string;
  pickupTime: string;
  status: TransportStatus;
  driverId?: string;
}

export interface FollowUpTask {
  id: string;
  patientId: string;
  reason: string;
  status: "Open" | "Closed";
}

export interface Notification {
  id: string;
  message: string;
  tone: "info" | "warning" | "urgent";
}

export interface DemoState {
  patients: Patient[];
  appointments: Appointment[];
  referrals: Referral[];
  transportRequests: TransportRequest[];
  followUpTasks: FollowUpTask[];
  notifications: Notification[];
}

export const initialDemoState: DemoState = {
  patients: [
    {
      id: "patient-1",
      name: "Elsie Gray",
      age: 74,
      location: "Clearwater Ridge"
    },
    {
      id: "patient-2",
      name: "Harold Stone",
      age: 80,
      location: "North Bend"
    },
    {
      id: "patient-3",
      name: "Lena Park",
      age: 67,
      location: "Pine Creek"
    },
    {
      id: "patient-4",
      name: "Tomas Reed",
      age: 71,
      location: "Clearwater Ridge"
    }
  ],
  appointments: [
    {
      id: "appt-1",
      patientId: "patient-1",
      time: "Today 10:30 AM",
      clinician: "Dr. Patel",
      status: "Scheduled"
    },
    {
      id: "appt-2",
      patientId: "patient-2",
      time: "Yesterday 2:00 PM",
      clinician: "Dr. Patel",
      status: "Missed"
    },
    {
      id: "appt-3",
      patientId: "patient-3",
      time: "Tomorrow 9:00 AM",
      clinician: "Dr. Singh",
      status: "Scheduled"
    }
  ],
  referrals: [
    {
      id: "ref-1",
      patientId: "patient-4",
      type: "Cardiology consult",
      status: "Created"
    }
  ],
  transportRequests: [
    {
      id: "ride-1",
      patientId: "patient-1",
      pickupTime: "Today 9:45 AM",
      status: "Requested"
    }
  ],
  followUpTasks: [],
  notifications: [
    {
      id: "note-1",
      message: "Missed appointment detected: auto follow-up needed.",
      tone: "urgent"
    }
  ]
};
