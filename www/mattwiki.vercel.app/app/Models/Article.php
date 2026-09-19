<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'title', 'content', 'status', 'views', 'featured', 'category_id', 'author_id'];

    protected $casts = ['featured' => 'boolean', 'views' => 'integer'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function revisions()
    {
        return $this->hasMany(ArticleRevision::class);
    }

    public function latestRevision()
    {
        return $this->hasOne(ArticleRevision::class)->latestOfMany('created_at');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function estimateReadTime(): string
    {
        $wordCount = str_word_count(strip_tags($this->content));
        $minutes = max(1, (int) round($wordCount / 200));

        return "{$minutes} min read";
    }

    public function firstParagraph(): string
    {
        $lines = explode("\n", $this->content);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line && ! str_starts_with($line, '#') && ! str_starts_with($line, '!') && ! str_starts_with($line, '|')) {
                return mb_strimwidth(strip_tags($line), 0, 200, '…');
            }
        }

        return '';
    }
}
