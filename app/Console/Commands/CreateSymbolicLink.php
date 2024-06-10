<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateSymbolicLink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:symlink';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a symbolic link for storage';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $command = 'New-Item -ItemType SymbolicLink -Path .\public\storage -Target storage\app\public';
        $output = null;
        $return_var = null;
        
        // Detect if the OS is Windows
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Use PowerShell to create the symbolic link on Windows
            exec("powershell.exe -Command \"$command\"", $output, $return_var);
        } else {
            // Use ln command for Unix-like OS
            $command = 'ln -s ' . base_path('storage/app/public') . ' ' . public_path('storage');
            exec($command, $output, $return_var);
        }

        if ($return_var !== 0) {
            $this->error('Failed to create the symbolic link.');
            return 1;
        }

        $this->info('Symbolic link created successfully.');
        return 0;
    }
}
