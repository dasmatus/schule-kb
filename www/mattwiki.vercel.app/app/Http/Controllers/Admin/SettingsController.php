<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => SiteSetting::getAll(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'nullable|string',
            'primary_hue' => 'required|string',
            'primary_chroma' => 'required|string',
            'primary_l' => 'required|string',
        ]);

        SiteSetting::setAll($request->only([
            'site_name', 'site_description', 'primary_hue', 'primary_chroma', 'primary_l',
        ]));

        return back()->with('success', 'Settings saved.');
    }
}
