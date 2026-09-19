# Account Deletion — Design Spec

**Date:** 2026-06-08

## Overview

Add the ability for authenticated users to permanently delete their own account from the Settings page. Deletion is a hard SQL DELETE on the local `users` row.

## Scope

- Deletes the local Laravel `users` record via SQL `DELETE`
- Does **not** call Neon Auth to delete the external account (no API available)
- Articles and revisions authored/edited by the user are retained; `author_id` / `editor_id` are set to `NULL` by existing FK constraints (`ON DELETE SET NULL`)
- Admins are subject to the same rule — no special guard

## UI

A new "Danger zone" glass-card section is appended below the "Change password" card on `resources/js/pages/Settings/Index.tsx`.

### Elements

- Red-accented section heading (e.g. `text-rose-400`)
- Checkbox: "I understand this is permanent and cannot be undone"
- "Delete account" button: destructive red, disabled until checkbox is checked and not `processing`

No modal or additional confirmation step.

## Backend

### Route

```
DELETE /settings/account
```

Added to `routes/web.php` alongside the existing settings routes, behind `auth` middleware.

### Controller

New method `destroyAccount` on `UserSettingsController`:

1. Retrieve the authenticated user
2. Call `$user->delete()` — issues SQL `DELETE FROM users WHERE id = ?`
3. Log the session out (`Auth::logout()`, invalidate + regenerate token)
4. Redirect to `/` with a flash message

### Validation / Authorization

- Route is protected by the `auth` middleware
- No password required (checkbox is the only gate)

## Testing

Feature test covering:
- Authenticated user can delete their own account (user row removed, session invalidated, redirected to `/`)
- Unauthenticated request returns 401/redirect
