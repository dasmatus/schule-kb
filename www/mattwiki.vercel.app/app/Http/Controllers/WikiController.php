<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Inertia\Inertia;

class WikiController extends Controller
{
    public function show(string $slug)
    {
        $article = Article::with(['category', 'latestRevision.editor', 'author'])
            ->where('slug', $slug)
            ->firstOrFail();

        $article->increment('views');

        $categories = Category::with(['articles' => fn ($q) => $q->published()])
            ->get()
            ->map(fn ($c) => [
                'name' => $c->name,
                'count' => $c->articles->count(),
                'articles' => $c->articles->map(fn ($a) => ['title' => $a->title, 'slug' => $a->slug]),
            ]);

        $lastEditor = $article->latestRevision?->editor ?? $article->author;

        return Inertia::render('Wiki/Show', [
            'article' => [
                'title' => $article->title,
                'slug' => $article->slug,
                'content' => $article->content,
                'category' => $article->category?->name ?? '',
                'tags' => [],
                'author' => $lastEditor?->username ?? 'Unknown',
                'authorInitials' => mb_strtoupper(mb_substr($lastEditor?->username ?? 'UN', 0, 2)),
                'updatedAt' => $article->updated_at->format('F j, Y'),
                'readTime' => $article->estimateReadTime(),
            ],
            'categories' => $categories,
        ]);
    }
}
