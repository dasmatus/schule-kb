<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

        return Inertia::render('Admin/Articles/Create', compact('categories'));
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

        return redirect('/admin')->with('success', 'Article created.');
    }

    public function edit(Article $article)
    {
        $categories = Category::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Articles/Edit', [
            'article' => [
                'slug' => $article->slug,
                'title' => $article->title,
                'content' => $article->content,
                'category_id' => $article->category_id,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
        ]);

        if ($article->wasChanged()) {
            ArticleRevision::create([
                'article_id' => $article->id,
                'editor_id' => Auth::id(),
                'summary' => 'Updated via admin panel',
            ]);
        }

        return redirect('/admin')->with('success', 'Article updated.');
    }

    public function updateStatus(Request $request, Article $article)
    {
        $request->validate([
            'status' => 'required|in:draft,review,published',
        ]);

        $article->update(['status' => $request->status]);

        return back()->with('success', 'Article status updated.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect('/admin')->with('success', 'Article deleted.');
    }
}
