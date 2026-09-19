<?php

namespace App\Data;

use App\Models\Article;
use Illuminate\Support\Carbon;

readonly class ArticleData
{
    public function __construct(
        public string $title,
        public string $slug,
        public string $category,
        public string $description,
        public string $readTime,
        public string $updated,
    ) {}

    public static function fromModel(Article $article): self
    {
        return new self(
            title: $article->title,
            slug: $article->slug,
            category: $article->category?->name ?? 'Uncategorized',
            description: $article->firstParagraph(),
            readTime: $article->estimateReadTime(),
            updated: $article->updated_at->diffForHumans(),
        );
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'description' => $this->description,
            'readTime' => $this->readTime,
            'updated' => $this->updated,
        ];
    }
}
