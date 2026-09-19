<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleRevision;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function create()
    {
        $categories = Category::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Articles/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $slug = Str::slug($request->title);
        $base = $slug;
        $i = 1;
        while (Article::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        $article = Article::create([
            'slug' => $slug,
            'title' => $request->title,
            'content' => $request->content,
            'status' => 'draft',
            'category_id' => $request->category_id,
            'author_id' => Auth::id(),
            'views' => 0,
            'featured' => false,
        ]);

        ArticleRevision::create([
            'article_id' => $article->id,
            'editor_id' => Auth::id(),
            'summary' => 'Initial creation',
        ]);

        return redirect('/')->with('success', 'Article submitted for review.');
    }
}
