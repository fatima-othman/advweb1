<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_protected_profile_route_requires_authentication(): void
    {
        $response = $this->getJson('/api/user/me');

        $response->assertUnauthorized();
    }
}
