<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['username', 'email', 'password_hash', 'is_admin'];

    protected $hidden = ['password_hash'];

    protected $casts = ['is_admin' => 'boolean'];

    public function getAuthPasswordName(): string
    {
        return 'password_hash';
    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'author_id');
    }

    public function revisions()
    {
        return $this->hasMany(ArticleRevision::class, 'editor_id');
    }
}
