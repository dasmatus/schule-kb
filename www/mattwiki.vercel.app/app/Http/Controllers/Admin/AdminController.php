<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleRevision;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $stats = [
            'totalArticles' => (string) Article::count(),
            'totalArticlesDelta' => '+'.Article::whereDate('created_at', '>=', now()->subWeek())->count().' this week',
            'registeredUsers' => (string) User::count(),
            'registeredUsersDelta' => '+'.User::whereDate('created_at', '>=', now()->subWeek())->count().' this week',
            'editsToday' => (string) ArticleRevision::whereDate('created_at', today())->count(),
            'editsTodayDelta' => 'edits today',
            'pendingReview' => (string) Article::where('status', 'review')->count(),
            'pendingReviewDelta' => 'need review',
        ];

        $articles = Article::with(['category', 'latestRevision.editor'])
            ->latest()
            ->take(20)
            ->get()
            ->map(fn ($a) => [
                'title' => $a->title,
                'slug' => $a->slug,
                'category' => $a->category?->name ?? '',
                'status' => $a->status,
                'editor' => mb_strtoupper(mb_substr($a->latestRevision?->editor?->username ?? 'UN', 0, 2)),
                'editorName' => $a->latestRevision?->editor?->username ?? 'Unknown',
                'lastEdit' => $a->updated_at->diffForHumans(),
                'views' => (string) $a->views,
            ]);

        return Inertia::render('Admin/Index', compact('stats', 'articles'));
    }
}
