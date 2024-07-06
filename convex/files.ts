import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    console.log('server identity', await ctx.auth.getUserIdentity())
    // if (!(await ctx.auth.getUserIdentity())) {
    //   return []
    // }
    await ctx.db.insert('files', {
      name: args.name,
      orgId: args.orgId,
    })
  },
})

export const getFiles = query({
  args: {
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    console.log('server identity', await ctx.auth.getUserIdentity())
    // if (!(await ctx.auth.getUserIdentity())) {
    //   return []
    // }
    return ctx.db
      .query('files')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
      .collect()
  },
})
