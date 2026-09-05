---
title: Retries aren’t reliability.
description: A retry is a bet about the kind of failure you have.
publishedAt: 2026-08-29
sample: true
tags: [Reliability]
---

A retry assumes the next attempt has a reasonable chance of succeeding. That assumption is useful for a transient network failure. It is less useful for invalid input, missing permissions, or a dependency that is already overloaded.

Before adding another attempt, decide which failures qualify, how long you are willing to wait, and whether the operation can safely happen twice.

Backoff and jitter help avoid synchronized traffic spikes. A retry budget keeps one user request from becoming a surprisingly ambitious load test. A deadline makes the total cost visible.

The awkward case is the timeout after a successful write. The caller does not know whether the operation happened. That needs idempotency or reconciliation, not just enthusiasm.

Retries are one tool in a reliability strategy. They are not the strategy itself.
