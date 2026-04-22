// PHASE 2: Drizzle ORM schema definitions (type-safe only, no runtime DB connection)
// This file provides type definitions for the consultation leads table.
// Actual database connection will be configured in Phase 2 deployment.

import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const consultationLeads = pgTable('consultation_leads', {
    id: serial('id').primaryKey(),
    platform: text('platform').notNull(),
    painPoint: text('pain_point').notNull(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email').notNull(),
    revenueRange: text('revenue_range').notNull(),
    privacyAgreed: boolean('privacy_agreed').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    status: text('status').notNull().default('new'), // new | contacted | converted | closed
    assignedTo: text('assigned_to'), // PHASE 2: team member assignment
    notes: text('notes'), // PHASE 2: CRM notes
});

export type ConsultationLeadRecord = typeof consultationLeads.$inferSelect;
export type NewConsultationLead = typeof consultationLeads.$inferInsert;
