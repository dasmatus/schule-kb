<?php

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_page_renders(): void
    {
        $response = $this->get('/search');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->where('query', '')
            ->where('results', [])
        );
    }

    public function test_search_returns_matching_articles_by_title(): void
    {
        Article::factory()->published()->create(['title' => 'Laravel Testing Guide']);
        Article::factory()->published()->create(['title' => 'Vue.js Basics']);

        $response = $this->get('/search?q=Laravel');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->where('query', 'Laravel')
            ->has('results', 1)
            ->where('results.0.title', 'Laravel Testing Guide')
        );
    }

    public function test_search_returns_matching_articles_by_content(): void
    {
        Article::factory()->published()->create([
            'title' => 'Generic Title',
            'content' => 'This article covers Eloquent relationships in depth.',
        ]);
        Article::factory()->published()->create(['title' => 'Unrelated Article']);

        $response = $this->get('/search?q=Eloquent');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->has('results', 1)
            ->where('results.0.title', 'Generic Title')
        );
    }

    public function test_search_excludes_unpublished_articles(): void
    {
        Article::factory()->create(['title' => 'Draft Article', 'status' => 'draft']);

        $response = $this->get('/search?q=Draft');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->where('results', [])
        );
    }

    public function test_search_with_no_query_returns_empty_results(): void
    {
        Article::factory()->published()->count(3)->create();

        $response = $this->get('/search');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->where('query', '')
            ->where('results', [])
        );
    }

    public function test_search_is_case_insensitive(): void
    {
        Article::factory()->published()->create(['title' => 'PHP Best Practices']);

        $response = $this->get('/search?q=php');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->has('results', 1)
        );
    }
}
