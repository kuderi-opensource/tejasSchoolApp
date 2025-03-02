import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import prisma from '../prisma';

export const schoolRouter = createTRPCRouter({
  // Create a new school
  create: protectedProcedure
    .input(
      z.object({
        institutionId: z.string(), // Ensure institutionId is passed
        name: z.string().min(2, "School name must be at least 2 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { institutionId, name } = input;

      try {
        const school = await ctx.prisma.school.create({
          data: {
            institutionId,
            name,
          },
        });

        return { success: true, school };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, error: error.message };
        }
        throw error;
      }
    }),

  // ✅ Get all schools under an institution
  getByInstitution: publicProcedure
    .input(
      z.object({
        institutionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const schools = await ctx.prisma.school.findMany({
        where: { institutionId: input.institutionId },
        orderBy: { name: "asc" },
      });

      return schools;
    }),

  // Get a specific school by ID
  getById: publicProcedure
    .input(
      z.object({
        schoolId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const school = await ctx.prisma.school.findUnique({
        where: { id: input.schoolId },
      });

      if (!school) {
        throw new Error("School not found");
      }

      return school;
    }),

  //  Update a school
  update: protectedProcedure
    .input(
      z.object({
        schoolId: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { schoolId, name } = input;

      try {
        const updatedSchool = await ctx.prisma.school.update({
          where: { id: schoolId },
          data: {
