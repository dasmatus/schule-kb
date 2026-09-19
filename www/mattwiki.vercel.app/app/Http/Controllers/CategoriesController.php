<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function index(): \Inertia\Response
    {
        $categories = Category::with(['articles' => fn ($q) => $q->published()])
            ->get()
            ->map(fn ($c) => [
                'name' => $c->name,
                'slug' => $c->slug,
                'count' => $c->articles->count(),
                'articles' => $c->articles->map(fn ($a) => [
                    'title' => $a->title,
                    'slug' => $a->slug,
                    'description' => $a->firstParagraph(),
                    'readTime' => $a->estimateReadTime(),
                    'updated' => $a->updated_at->diffForHumans(),
                ]),
            ]);

        return Inertia::render('Categories/Index', [
            'categories' => Inertia::defer(fn () => $categories),
        ]);
    }
}
