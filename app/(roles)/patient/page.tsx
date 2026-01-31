"use client";

import { useEffect, useMemo, useState } from "react";
import { useDemo } from "@/app/providers/DemoProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusTracker } from "@/app/components/StatusTracker";
import { SectionHeader } from "@/app/components/SectionHeader";
import { RoleSwitcher } from "@/app/components/RoleSwitcher";

const commands = [
  "what's my next appointment",
  "do i have a ride",
  "request pickup",
  "talk to care assistant",
  "mental health"
];

export default function PatientPage() {
  const { state, loading, requestPickup, createReferral } = useDemo();
  const patient = state.patients[0];
  const appointment = state.appointments.find((appt) => appt.patientId === patient.id);
  const transport = state.transportRequests.find((req) => req.patientId === patient.id);
  const [transcript, setTranscript] = useState("Ready for voice command.");
  const [response, setResponse] = useState("Hello! I can help with your appointment and ride.");
  const [listening, setListening] = useState(false);

  const appointmentStep = useMemo(() => {
    switch (appointment?.status) {
      case "Confirmed":
        return 1;
      case "Completed":
        return 2;
      case "Missed":
      case "Cancelled":
        return 2;
      default:
        return 0;
    }
  }, [appointment]);

  const transportStep = useMemo(() => {
    switch (transport?.status) {
      case "Assigned":
        return 1;
      case "Picked Up":
        return 2;
      case "Completed":
      case "Failed":
        return 3;
      default:
        return 0;
    }
  }, [transport]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [response]);

  const handleCommand = (text: string) => {
    const normalized = text.toLowerCase();
    setTranscript(text);
    if (normalized.includes("next appointment")) {
      setResponse(
        appointment
          ? `Your next appointment is ${appointment.time} with ${appointment.clinician}.`
          : "You have no upcoming appointments right now."
      );
      return;
    }
    if (normalized.includes("ride")) {
      setResponse(
        transport
          ? `Your ride status is ${transport.status}. Pickup time ${transport.pickupTime}.`
          : "I don't see a ride yet. I can request one for you."
      );
      return;
    }
    if (normalized.includes("request pickup")) {
      requestPickup(patient.id);
      setResponse("Pickup requested. A driver will be assigned soon.");
      return;
    }
    if (normalized.includes("talk") || normalized.includes("assistant")) {
      setResponse("I'm here with you. You can ask about rides or appointments.");
      return;
    }
    if (normalized.includes("mental")) {
      createReferral(patient.id, "Private mental health check-in");
      setResponse("Request sent privately to your care team. You're not alone.");
      return;
    }
    setResponse("Sorry, I didn't catch that. Try one of the five demo commands.");
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as Window & {
        SpeechRecognition?: typeof window.SpeechRecognition;
        webkitSpeechRecognition?: typeof window.SpeechRecognition;
      }).SpeechRecognition ||
      (window as Window & {
        SpeechRecognition?: typeof window.SpeechRecognition;
        webkitSpeechRecognition?: typeof window.SpeechRecognition;
      }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setTranscript("Voice not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      handleCommand(spoken);
    };
    recognition.start();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader
          title="Patient Home"
          subtitle="Voice-first guidance with large, clear actions."
        />
        <RoleSwitcher />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Talk to Care Assistant</h3>
              <p className="mt-2 text-base text-slate-600">
                Speak a command or tap a button below. We show the transcript so judges can follow.
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Voice ready
            </span>
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Transcript</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{transcript}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-500">Assistant response</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{response}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={startListening} className="flex-1">
              {listening ? "Listening..." : "Start voice command"}
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCommand("What's my next appointment?")}
            >
              What’s my next appointment?
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCommand("Do I have a ride?")}
            >
              Do I have a ride?
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCommand("Request pickup")}
            >
              Request pickup
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCommand("Talk to care assistant")}
            >
              Talk to Care Assistant
            </Button>
          </div>
          <div className="mt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleCommand("Mental health")}
            >
              I need mental health support
            </Button>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-900">My next appointment</h3>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-8" />
              <Skeleton />
              <Skeleton className="h-10" />
            </div>
          ) : appointment ? (
            <div className="space-y-2 text-base text-slate-700">
              <p className="text-xl font-semibold text-slate-900">{appointment.time}</p>
              <p>Clinician: {appointment.clinician}</p>
              <p>Status: {appointment.status}</p>
            </div>
          ) : (
            <p className="text-base text-slate-600">No upcoming appointments yet.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusTracker
          title="Appointment status"
          steps={["Scheduled", "Confirmed", "Completed / Missed / Cancelled"]}
          activeStep={appointmentStep}
        />
        <StatusTracker
          title="Transport status"
          steps={["Requested", "Assigned", "Picked Up", "Completed / Failed"]}
          activeStep={transportStep}
        />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Voice command library</h3>
        <p className="mt-2 text-sm text-slate-600">Demo supports exactly five commands.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {commands.map((command) => (
            <span
              key={command}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              “{command}”
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
