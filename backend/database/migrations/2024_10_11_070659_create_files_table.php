<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_size');
            $table->string('sender_name');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('group_id');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('group_id')->references('id')->on('groupes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
