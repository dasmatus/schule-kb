<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleRevision extends Model
{
    const UPDATED_AT = null;

    protected $fillable = ['article_id', 'editor_id', 'summary'];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }
}
