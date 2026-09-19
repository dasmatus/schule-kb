<?php

namespace App\Http\Controllers;

use App\Models\ArticleRevision;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        $recentEdits = ArticleRevision::with(['article.category'])
            ->where('editor_id', $user->id)
            ->latest()
            ->take(5)
            ->get()
            ->filter(fn ($r) => $r->article !== null)
            ->map(fn ($r) => [
                'title' => $r->article->title,
                'slug' => $r->article->slug,
                'summary' => $r->summary ?? '',
                'time' => $r->created_at->diffForHumans(),
            ])
            ->values();

        return Inertia::render('Profile/Index', [
            'profileUser' => [
                'username' => $user->username,
                'member_since' => $user->created_at->format('F Y'),
            ],
            'recentEdits' => $recentEdits,
        ]);
    }
}
