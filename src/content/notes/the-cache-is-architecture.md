---
title: Your cache is part of your architecture.
description: Especially when the system stops working without it.
publishedAt: 2026-08-21
sample: true
tags: [Systems]
---

If disabling the cache would overwhelm the database, the cache is no longer an optional performance improvement. It is a capacity dependency.

That changes the questions worth asking. How does the system behave during a cold start? Can the database survive a popular key expiring? What happens when an invalidation message arrives late?

The answers do not always require elaborate infrastructure. A little request coalescing, sensible expiry variation, and a clear stale-data policy can go a long way.

But the dependency should be written down. A component that is “just an optimization” tends to receive less operational attention than a component the system needs to remain available.

Names do not change failure modes. They can, however, change whether anyone remembers to plan for them.
