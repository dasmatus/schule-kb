<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    public function index(): \Inertia\Response
    {
        $articles = Article::with('category')
            ->published()
            ->latest()
            ->get()
            ->map(fn ($a) => [
                'title' => $a->title,
                'slug' => $a->slug,
                'category' => $a->category?->name ?? '',
                'description' => $a->firstParagraph(),
                'readTime' => $a->estimateReadTime(),
                'updated' => $a->updated_at->diffForHumans(),
                'featured' => $a->featured,
            ]);

        return Inertia::render('Articles/Index', [
            'articles' => Inertia::defer(fn () => $articles),
        ]);
    }
}
