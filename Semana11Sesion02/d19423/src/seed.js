require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Ticket = require("./models/ticket.model");

const STATUSES = ["open", "in_progess", "closed"];
const PRIORITIES = ["low", "medium", "high"];
const TAG_GROUPS = [
  ["support", "web"],
  ["billing", "payment"],
  ["bug", "frontend"],
  ["bug", "backend"],
  ["feature", "mobile"],
  ["account", "security"],
  ["sales", "lead"],
  ["ops", "urgent"],
];

function buildTickets(count) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const tagGroup = TAG_GROUPS[index % TAG_GROUPS.length];

    return {
      title: `Ticket ${String(number).padStart(3, "0")} de soporte`,
      description: `Solicitud generada para el ticket ${number}. El cliente reporta un incidente y requiere seguimiento del equipo de soporte.`,
      status: STATUSES[index % STATUSES.length],
      priority: PRIORITIES[index % PRIORITIES.length],
      customerEmail: `cliente${number}@example.com`,
      tags: [...tagGroup, `batch-${Math.floor(index / 10) + 1}`],
    };
  });
}

async function seedTickets() {
  const rawCount = process.env.SEED_COUNT || process.argv[2] || "100";
  const count = Number.parseInt(rawCount, 10);
  const shouldClear = process.env.SEED_CLEAR !== "false";

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("SEED_COUNT debe ser un entero mayor a 0");
  }

  await connectDB();

  try {
    if (shouldClear) {
      await Ticket.deleteMany({});
      console.log("Coleccion tickets limpiada");
    }

    const tickets = buildTickets(count);
    const inserted = await Ticket.insertMany(tickets);

    console.log(`${inserted.length} tickets insertados correctamente`);
  } finally {
    await mongoose.connection.close();
    console.log("Conexion a MongoDB cerrada");
  }
}

seedTickets().catch((error) => {
  console.error("Error ejecutando el seed:", error.message);
  process.exit(1);
});
