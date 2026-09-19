<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'content' => fake()->paragraphs(3, true),
            'status' => 'draft',
            'views' => 0,
            'featured' => false,
            'category_id' => Category::factory(),
            'author_id' => User::factory(),
        ];
    }

    public function published(): static
    {
        return $this->state(['status' => 'published']);
    }
}
