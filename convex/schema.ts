import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Other tables here...

  files: defineTable({ name: v.string(), orgId: v.optional(v.string()) }).index(
    'by_orgId',
    ['orgId'],
  ),
})
