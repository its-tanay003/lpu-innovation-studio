import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().endsWith("@lpu.in"),
  password: z.string().min(8),
  lpuId: z.string().regex(/^\d+$/),
  branch: z.string().min(2),
  year: z.string().min(1),
  bio: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const { name, email, password, lpuId, branch, year, bio } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { lpuId }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or LPU ID already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        lpuId,
        branch,
        year,
        bio,
        role: "student",
        innovation_score: 0,
        is_active: true,
      },
    });

    // Note: Verification email via Resend would go here
    // For now, we return success
    
    return NextResponse.json(
      { userId: user.id, message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An internal error occurred during registration" },
      { status: 500 }
    );
  }
}
