<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\SettingsController as AdminSettingsController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\Auth\AuthSyncController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserSettingsController;
use App\Http\Controllers\WikiController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/articles', [ArticlesController::class, 'index'])->name('articles.index');
Route::get('/categories', [CategoriesController::class, 'index'])->name('categories.index');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/wiki/{slug}', [WikiController::class, 'show'])->name('wiki.show');

// Neon Auth frontend sync (open to guests and authenticated users during token exchange)
Route::post('/auth/neon-sync', [AuthSyncController::class, 'sync'])->name('auth.neon-sync');
Route::get('/auth/resolve', [AuthSyncController::class, 'resolve'])->name('auth.resolve');

// Guest only
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
    Route::get('/signup', [RegisterController::class, 'create'])->name('register');
    Route::post('/signup', [RegisterController::class, 'store']);
});

// Logout
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout')->middleware('auth');

// Auth required
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::get('/settings', [UserSettingsController::class, 'index'])->name('settings');
    Route::put('/settings/username', [UserSettingsController::class, 'updateUsername']);
    Route::put('/settings/password', [UserSettingsController::class, 'updatePassword']);
    Route::delete('/settings/account', [UserSettingsController::class, 'destroyAccount']);
    Route::get('/articles/new', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
});

// Admin required
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/settings', [AdminSettingsController::class, 'index'])->name('settings');
    Route::put('/settings', [AdminSettingsController::class, 'update']);
    Route::get('/feature', [FeatureController::class, 'index'])->name('feature');
    Route::put('/feature/{article:slug}', [FeatureController::class, 'toggle']);
    Route::get('/articles/new', [AdminArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [AdminArticleController::class, 'store']);
    Route::get('/articles/{article:slug}/edit', [AdminArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article:slug}', [AdminArticleController::class, 'update'])->name('articles.update');
    Route::patch('/articles/{article:slug}/status', [AdminArticleController::class, 'updateStatus'])->name('articles.updateStatus');
    Route::delete('/articles/{article:slug}', [AdminArticleController::class, 'destroy'])->name('articles.destroy');
});
