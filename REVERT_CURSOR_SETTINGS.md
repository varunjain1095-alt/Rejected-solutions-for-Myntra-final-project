# REMINDER: Revert Cursor Agent Settings

**Created:** Before overnight build (Aug 26, 2026)

## Action required after all 5 rejected solutions are implemented and bug-tested

You temporarily enabled **Run Everything** for the overnight agent build.

### Revert steps

1. Open **Cursor Settings** (`Ctrl + ,`)
2. Go to **Agents** > **Approvals & Execution**
3. Change **Run Everything** back to **Auto-review** (recommended default)

### Why revert

Run Everything lets the agent run all terminal commands without approval. Fine for an unattended build, but less safe for day-to-day use.

### When to revert

- [ ] Shared wishlist shell is working
- [ ] All 5 rejected solution demos are working
- [ ] Bug testing is complete
- [ ] **Revert Cursor setting to Auto-review**

---

Delete this file after you have reverted the setting.
