<?php

namespace Tests\Feature\Admin;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleCrudTest extends TestCase
{
    use RefreshDatabase;

    private function adminUser(): User
    {
        return User::factory()->admin()->create();
    }

    private function regularUser(): User
    {
        return User::factory()->create();
    }

    // --- edit ---

    public function test_admin_can_view_edit_page(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($admin)->get("/admin/articles/{$article->slug}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Articles/Edit')
            ->has('article')
            ->has('categories')
        );
    }

    public function test_non_admin_cannot_view_edit_page(): void
    {
        $user = $this->regularUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($user)->get("/admin/articles/{$article->slug}/edit");

        $response->assertStatus(403);
    }

    public function test_guest_cannot_view_edit_page(): void
    {
        $article = Article::factory()->create();

        $response = $this->get("/admin/articles/{$article->slug}/edit");

        $response->assertRedirect('/login');
    }

    // --- update ---

    public function test_admin_can_update_article(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($admin)->put("/admin/articles/{$article->slug}", [
            'title' => 'Updated Title',
            'content' => 'Updated content here.',
            'category_id' => $article->category_id,
        ]);

        $response->assertRedirect('/admin');
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => 'Updated Title',
        ]);
    }

    public function test_update_requires_title(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($admin)->put("/admin/articles/{$article->slug}", [
            'title' => '',
            'content' => 'Some content.',
            'category_id' => $article->category_id,
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_non_admin_cannot_update_article(): void
    {
        $user = $this->regularUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($user)->put("/admin/articles/{$article->slug}", [
            'title' => 'Hacked Title',
            'content' => 'Hacked content.',
            'category_id' => $article->category_id,
        ]);

        $response->assertStatus(403);
    }

    // --- updateStatus ---

    public function test_admin_can_approve_article(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create(['status' => 'draft']);

        $response = $this->actingAs($admin)->patch("/admin/articles/{$article->slug}/status", [
            'status' => 'published',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'status' => 'published',
        ]);
    }

    public function test_status_must_be_valid(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($admin)->patch("/admin/articles/{$article->slug}/status", [
            'status' => 'invalid-status',
        ]);

        $response->assertSessionHasErrors('status');
    }

    public function test_non_admin_cannot_change_status(): void
    {
        $user = $this->regularUser();
        $article = Article::factory()->create(['status' => 'draft']);

        $response = $this->actingAs($user)->patch("/admin/articles/{$article->slug}/status", [
            'status' => 'published',
        ]);

        $response->assertStatus(403);
    }

    // --- destroy ---

    public function test_admin_can_delete_article(): void
    {
        $admin = $this->adminUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($admin)->delete("/admin/articles/{$article->slug}");

        $response->assertRedirect('/admin');
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }

    public function test_non_admin_cannot_delete_article(): void
    {
        $user = $this->regularUser();
        $article = Article::factory()->create();

        $response = $this->actingAs($user)->delete("/admin/articles/{$article->slug}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('articles', ['id' => $article->id]);
    }

    public function test_guest_cannot_delete_article(): void
    {
        $article = Article::factory()->create();

        $response = $this->delete("/admin/articles/{$article->slug}");

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('articles', ['id' => $article->id]);
    }
}
