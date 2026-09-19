<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserSettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index');
    }

    public function updateUsername(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,'.Auth::id(),
        ]);

        Auth::user()->update(['username' => $request->username]);

        return back()->with('success', 'Username updated.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = Auth::user();
        if (! Hash::check($request->current_password, $user->getAuthPassword())) {
            return back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        $user->update(['password_hash' => Hash::make($request->password)]);

        return back()->with('success', 'Password changed.');
    }

    public function destroyAccount(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate(['confirmed' => 'accepted']);

        $user = Auth::user();

        $user->delete();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
