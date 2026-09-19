<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index()
    {
        $articles = Article::with('category')
            ->published()
            ->orderBy('title')
            ->get()
            ->map(fn ($a) => [
                'title' => $a->title,
                'slug' => $a->slug,
                'category' => $a->category?->name ?? '',
                'featured' => (bool) $a->featured,
            ]);

        return Inertia::render('Admin/Feature', compact('articles'));
    }

    public function toggle(Article $article)
    {
        $article->update(['featured' => ! $article->featured]);

        return back();
    }
}
