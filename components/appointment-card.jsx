"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AppointmentCard({
  appointment = null,
  userRole,
  refetchAppointments,
}) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [notes, setNotes] = useState(appointment?.notes || "");
  const router = useRouter();

  if (!appointment) {
    return (
      <Card className="p-4 text-center">
        <p className="text-muted-foreground">No appointment data</p>
      </Card>
    );
  }

  const handleAction = async (status) => {
    try {
      const res = await fetch(`/api/appointments/${appointment?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (!res.ok) throw new Error("Failed to update appointment");

      if (refetchAppointments) await refetchAppointments();
      setOpen(false);
      setAction(null);
      router.refresh();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Appointment with{" "}
          {appointment?.doctor?.name || appointment?.patient?.name || "Unknown"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Date:</strong>{" "}
          {appointment?.startTime
            ? new Date(appointment.startTime).toLocaleString()
            : "N/A"}{" "}
          -{" "}
          {appointment?.endTime
            ? new Date(appointment.endTime).toLocaleString()
            : "N/A"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{appointment?.status || "N/A"}</span>
        </p>

        <Textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex gap-2">
          {userRole === "doctor" && (
            <>
              <Button onClick={() => handleAction("completed")}>
                Mark Completed
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
          {userRole === "patient" && (
            <Button
              variant="destructive"
              onClick={() => handleAction("cancelled")}
            >
              Cancel Appointment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
