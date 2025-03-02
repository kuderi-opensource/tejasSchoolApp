import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import prisma from '../prisma';

// Institution Schema
const institutionSchema = z.object({
  name: z.string().min(3, "Institution name must be at least 3 characters"),
});

// Institution Router
export const institutionRouter = createTRPCRouter({
  
  // Create Institution
  createInstitution: publicProcedure
    .input(institutionSchema)
    .mutation(async ({ input }) => {
      return prisma.institution.create({
        data: {
          name: input.name,
        },
      });
    }),

  //  Get Institution by ID
  getInstitutionById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.institution.findUnique({
        where: { id: input.id },
      });
    }),

  //  List All Institutions
  listInstitutions: publicProcedure.query(async () => {
    return prisma.institution.findMany();
  }),

  //  Update Institution
  updateInstitution: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.institution.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),

  //  Delete Institution
  deleteInstitution: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.institution.delete({
        where: { id: input.id },
      });
    }),
});
