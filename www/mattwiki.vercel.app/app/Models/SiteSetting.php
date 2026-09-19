<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $primaryKey = 'key';

    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    private static array $defaults = [
        'site_name' => 'WikiProject',
        'site_description' => 'A modern, collaborative knowledge base',
        'primary_hue' => '230',
        'primary_chroma' => '0.15',
        'primary_l' => '0.80',
    ];

    public static function getAll(): array
    {
        try {
            $rows = self::all()->pluck('value', 'key')->toArray();

            return array_merge(self::$defaults, $rows);
        } catch (\Exception $e) {
            return self::$defaults;
        }
    }

    public static function setAll(array $data): void
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
