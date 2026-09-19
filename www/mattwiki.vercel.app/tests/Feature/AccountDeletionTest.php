<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountDeletionTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete('/settings/account', ['confirmed' => true]);

        $response->assertRedirect('/');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertGuest();
    }

    public function test_unauthenticated_user_cannot_delete_account(): void
    {
        $response = $this->delete('/settings/account');

        $response->assertRedirect('/login');
    }

    public function test_delete_without_confirmation_is_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete('/settings/account', ['confirmed' => false]);

        $response->assertSessionHasErrors('confirmed');
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }
}
