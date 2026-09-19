<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->string('password_hash')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->string('password_hash')->nullable(false)->change();
            });
        }
    }
};
