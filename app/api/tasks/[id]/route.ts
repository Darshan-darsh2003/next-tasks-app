import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });
  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, description, completed } = await request.json();
  const task = await prisma.task.update({
    where: { id: Number(params.id) },
    data: { title, description, completed },
  });
  return NextResponse.json(task);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.task.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Task deleted" });
}
