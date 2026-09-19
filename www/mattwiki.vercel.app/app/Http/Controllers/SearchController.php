<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $query = $request->string('q')->trim()->value();

        $results = [];

        if ($query !== '') {
            $results = Article::with('category')
                ->published()
                ->where(function ($q) use ($query) {
                    $q->whereRaw('LOWER(title) LIKE LOWER(?)', ["%{$query}%"])
                        ->orWhereRaw('LOWER(content) LIKE LOWER(?)', ["%{$query}%"]);
                })
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
        }

        return Inertia::render('Search/Index', [
            'query' => $query,
            'results' => $results,
        ]);
    }
}
