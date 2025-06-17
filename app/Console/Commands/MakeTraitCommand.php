<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeTraitCommand extends Command
{
    protected $signature = 'make:trait {name}';
    protected $description = 'Create a new trait';

    public function handle()
    {
        $name = $this->argument('name');
        $path = app_path("Traits/{$name}.php");

        if (File::exists($path)) {
            $this->error("Trait {$name} already exists!");
            return;
        }

        // Ensure directory exists
        File::ensureDirectoryExists(app_path('Traits'));

        // Create trait content
        $stub = <<<EOT
<?php

namespace App\Traits;

trait {$name}
{
    // Add your trait methods here
}
EOT;

        File::put($path, $stub);
        $this->info("Trait {$name} created successfully!");
    }
}
