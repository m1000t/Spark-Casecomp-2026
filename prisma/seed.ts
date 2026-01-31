import { PrismaClient, Role, AppointmentStatus, ReferralStatus, TransportStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.followUpTask.deleteMany();
  await prisma.rideAssignment.deleteMany();
  await prisma.transportRequest.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  const nurse = await prisma.user.create({
    data: {
      name: "Maya Brooks",
      email: "nurse@clearwater.demo",
      role: Role.NURSE
    }
  });

  await prisma.user.create({
    data: {
      name: "Dr. Patel",
      email: "doctor@clearwater.demo",
      role: Role.DOCTOR
    }
  });

  await prisma.user.createMany({
    data: [
      {
        name: "Avery Diaz",
        email: "driver1@clearwater.demo",
        role: Role.DRIVER
      },
      {
        name: "Jordan Lee",
        email: "driver2@clearwater.demo",
        role: Role.DRIVER
      }
    ]
  });

  const patients = await prisma.patient.createMany({
    data: [
      {
        name: "Elsie Gray",
        age: 74,
        location: "Clearwater Ridge"
      },
      {
        name: "Harold Stone",
        age: 80,
        location: "North Bend"
      },
      {
        name: "Lena Park",
        age: 67,
        location: "Pine Creek"
      },
      {
        name: "Tomas Reed",
        age: 71,
        location: "Clearwater Ridge"
      }
    ]
  });

  const patientRecords = await prisma.patient.findMany();

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patientRecords[0].id,
        clinician: "Dr. Patel",
        time: "Today 10:30 AM",
        status: AppointmentStatus.SCHEDULED
      },
      {
        patientId: patientRecords[1].id,
        clinician: "Dr. Patel",
        time: "Yesterday 2:00 PM",
        status: AppointmentStatus.MISSED
      },
      {
        patientId: patientRecords[2].id,
        clinician: "Dr. Singh",
        time: "Tomorrow 9:00 AM",
        status: AppointmentStatus.SCHEDULED
      }
    ]
  });

  await prisma.referral.create({
    data: {
      patientId: patientRecords[3].id,
      type: "Cardiology consult",
      status: ReferralStatus.CREATED
    }
  });

  await prisma.transportRequest.create({
    data: {
      patientId: patientRecords[0].id,
      pickupTime: "Today 9:45 AM",
      status: TransportStatus.REQUESTED
    }
  });

  await prisma.notification.createMany({
    data: [
      {
        message: "Missed appointment detected: auto follow-up needed.",
        tone: "urgent"
      },
      {
        message: `Nurse on duty: ${nurse.name}`,
        tone: "info"
      }
    ]
  });

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
