<?php

namespace App\Data;

readonly class SiteSettingData
{
    public function __construct(
        public string $site_name,
        public string $site_description,
        public string $primary_hue,
        public string $primary_chroma,
        public string $primary_l,
    ) {}

    public static function fromArray(array $settings): self
    {
        return new self(
            site_name: $settings['site_name'] ?? 'WikiProject',
            site_description: $settings['site_description'] ?? 'A modern, collaborative knowledge base',
            primary_hue: $settings['primary_hue'] ?? '230',
            primary_chroma: $settings['primary_chroma'] ?? '0.15',
            primary_l: $settings['primary_l'] ?? '0.80',
        );
    }

    public function toArray(): array
    {
        return [
            'site_name' => $this->site_name,
            'site_description' => $this->site_description,
            'primary_hue' => $this->primary_hue,
            'primary_chroma' => $this->primary_chroma,
            'primary_l' => $this->primary_l,
        ];
    }
}
