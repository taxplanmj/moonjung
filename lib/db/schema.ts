// Drizzle ORM schema definitions. Connects to Neon Postgres via
// drizzle-orm/neon-http (no Hyperdrive needed — Neon's serverless driver
// talks HTTP, which works fine from Cloudflare Pages Functions).

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

/**
 * 블로그 글. 지금은 자사 블로그(챗지피티 자동 작성)만 이 테이블에 씁니다.
 * 나중에 네이버/티스토리 RSS 수집을 붙이면 같은 테이블에 source만 다르게
 * 넣거나(외부 글은 contentMarkdown 없이 excerpt+externalUrl만 채움), 필요해지면
 * 그때 분리해도 됩니다 — 지금은 자사 블로그 하나만 필요해서 단순하게 시작합니다.
 */
export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull(),
    contentMarkdown: text('content_markdown').notNull(),
    imageUrl: text('image_url').notNull(), // R2 public URL
    source: text('source').notNull().default('own-blog'), // own-blog | naver-blog | tistory
    externalUrl: text('external_url'), // RSS 소스일 때만 사용 (원문 링크)
    status: text('status').notNull().default('draft'), // draft | published — 발행 API는 항상 draft로 저장, 승인 링크로 published 전환
    publishedAt: timestamp('published_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type BlogPostRecord = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
