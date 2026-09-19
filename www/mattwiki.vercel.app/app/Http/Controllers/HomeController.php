<?php

namespace App\Http\Controllers;

use App\Data\ArticleData;
use App\Data\CategoryData;
use App\Data\RecentChangeData;
use App\Models\Article;
use App\Models\ArticleRevision;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Home', [
            'featured' => Inertia::defer(fn () => Article::with('category')
                ->featured()->published()
                ->latest()
                ->take(6)
                ->get()
                ->map(fn ($a) => ArticleData::fromModel($a)->toArray())),

            'recentChanges' => Inertia::defer(fn () => ArticleRevision::with(['article.category', 'editor'])
                ->latest()
                ->take(10)
                ->get()
                ->filter(fn ($r) => $r->article !== null)
                ->map(fn ($r) => RecentChangeData::fromModel($r)->toArray())
                ->values()),

            'categories' => Inertia::defer(fn () => Category::query()
                ->withCount(['articles' => fn ($q) => $q->published()])
                ->get()
                ->map(fn ($c) => CategoryData::fromModel($c)->toArray())),
        ]);
    }
}
