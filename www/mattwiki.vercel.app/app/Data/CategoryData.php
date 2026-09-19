<?php

namespace App\Data;

use App\Models\Category;

readonly class CategoryData
{
    public function __construct(
        public string $name,
        public int $count,
    ) {}

    public static function fromModel(Category $category): self
    {
        return new self(
            name: $category->name,
            count: (int) $category->articles_count,
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'count' => $this->count,
        ];
    }
}
