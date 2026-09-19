<?php

namespace App\Http\Middleware;

use App\Data\SiteSettingData;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'username' => $request->user()->username,
                    'is_admin' => (bool) $request->user()->is_admin,
                ] : null,
            ],
            'settings' => SiteSettingData::fromArray(SiteSetting::getAll())->toArray(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
