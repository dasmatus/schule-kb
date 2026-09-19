# Account Deletion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let authenticated users permanently delete their own account from the Settings page.

**Architecture:** A `DELETE /settings/account` route calls a new `destroyAccount` method on `UserSettingsController`, which issues a SQL DELETE on the user row, logs the session out, and redirects to `/`. The frontend adds a "Danger zone" card at the bottom of `Settings/Index.tsx` with a checkbox gate before the delete button.

**Tech Stack:** Laravel 12, Inertia.js v2, React 19, Tailwind CSS v4, PHPUnit

---

### Task 1: Write failing feature test

**Files:**
- Create: `tests/Feature/AccountDeletionTest.php`

- [ ] **Step 1: Create the test file**

```bash
php artisan make:test --phpunit AccountDeletionTest
```

- [ ] **Step 2: Replace the generated file contents**

Replace `tests/Feature/AccountDeletionTest.php` with:

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountDeletionTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete('/settings/account');

        $response->assertRedirect('/');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertGuest();
    }

    public function test_unauthenticated_user_cannot_delete_account(): void
    {
        $response = $this->delete('/settings/account');

        $response->assertRedirect('/login');
    }
}
```

- [ ] **Step 3: Run the test to confirm it fails**

```bash
php artisan test --compact tests/Feature/AccountDeletionTest.php
```

Expected: 2 failures — route not found (404) or similar.

---

### Task 2: Add `destroyAccount` method and route

**Files:**
- Modify: `app/Http/Controllers/UserSettingsController.php`
- Modify: `routes/web.php`

- [ ] **Step 1: Add `destroyAccount` to `UserSettingsController`**

Open `app/Http/Controllers/UserSettingsController.php` and add this method after `updatePassword`:

```php
public function destroyAccount(Request $request): \Illuminate\Http\RedirectResponse
{
    $user = Auth::user();

    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    $user->delete();

    return redirect('/');
}
```

- [ ] **Step 2: Add the DELETE route**

Open `routes/web.php` and add one line inside the `auth` middleware group, after the `put('/settings/password', ...)` line:

```php
Route::delete('/settings/account', [UserSettingsController::class, 'destroyAccount']);
```

- [ ] **Step 3: Run pint to fix formatting**

```bash
vendor/bin/pint --dirty --format agent
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
php artisan test --compact tests/Feature/AccountDeletionTest.php
```

Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add app/Http/Controllers/UserSettingsController.php routes/web.php tests/Feature/AccountDeletionTest.php
git commit -m "feat: add account deletion endpoint"
```

---

### Task 3: Add Danger Zone UI to Settings page

**Files:**
- Modify: `resources/js/pages/Settings/Index.tsx`

- [ ] **Step 1: Add the `TrashIcon` import**

At the top of `resources/js/pages/Settings/Index.tsx`, add `TrashIcon` to the HugeIcons import. Change:

```tsx
import { UserCircleIcon, LockPasswordIcon } from "@hugeicons/core-free-icons"
```

to:

```tsx
import { UserCircleIcon, LockPasswordIcon, Delete02Icon } from "@hugeicons/core-free-icons"
```

- [ ] **Step 2: Add the delete form state**

Below the `passwordForm` line, add:

```tsx
const deleteForm = useForm({ confirmed: false })
```

- [ ] **Step 3: Add the handler**

Below the `handlePassword` function, add:

```tsx
function handleDeleteAccount(e: React.FormEvent) {
  e.preventDefault()
  deleteForm.delete("/settings/account")
}
```

- [ ] **Step 4: Add the Danger Zone section**

After the closing `</section>` of the password card (around line 90), add:

```tsx
{/* Danger zone */}
<section className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
  <div className="mb-5 flex items-center gap-3">
    <HugeiconsIcon icon={Delete02Icon} className="size-5 text-rose-400" />
    <h2 className="text-lg font-semibold text-rose-400">Danger zone</h2>
  </div>
  <p className="mb-4 text-sm text-white/60">
    Permanently deletes your account. This cannot be undone. Your articles will remain but will no longer be attributed to you.
  </p>
  <form onSubmit={handleDeleteAccount} className="space-y-4">
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={deleteForm.data.confirmed}
        onChange={(e) => deleteForm.setData("confirmed", e.target.checked)}
        className="size-4 rounded accent-rose-500"
      />
      <span className="text-sm text-white/70">I understand this is permanent and cannot be undone</span>
    </label>
    <button
      type="submit"
      disabled={!deleteForm.data.confirmed || deleteForm.processing}
      className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {deleteForm.processing ? "Deleting…" : "Delete account"}
    </button>
  </form>
</section>
```

- [ ] **Step 5: Build assets and verify in browser**

```bash
npm run build
```

Navigate to `/settings` while logged in and confirm the Danger zone section appears below the password card, the button is disabled until the checkbox is checked, and clicking Delete redirects to `/` with the account removed.

- [ ] **Step 6: Commit**

```bash
git add resources/js/pages/Settings/Index.tsx
git commit -m "feat: add danger zone UI for account deletion on settings page"
```
