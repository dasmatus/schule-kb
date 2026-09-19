<?php

namespace App\Data;

use App\Models\ArticleRevision;

readonly class RecentChangeData
{
    public function __construct(
        public string $title,
        public string $slug,
        public string $category,
        public string $editor,
        public string $initials,
        public string $summary,
        public string $time,
    ) {}

    public static function fromModel(ArticleRevision $revision): self
    {
        return new self(
            title: $revision->article->title,
            slug: $revision->article->slug,
            category: $revision->article->category?->name ?? 'Uncategorized',
            editor: $revision->editor?->username ?? 'Anonymous',
            initials: mb_strtoupper(mb_substr($revision->editor?->username ?? 'AN', 0, 2)),
            summary: $revision->summary ?? '',
            time: $revision->created_at->diffForHumans(),
        );
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'editor' => $this->editor,
            'initials' => $this->initials,
            'summary' => $this->summary,
            'time' => $this->time,
        ];
    }
}
