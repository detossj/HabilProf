<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Alumno;
use App\Models\Profesor_guia;
use App\Models\Profesor_co_guia;
use App\Models\Profesor_comision;
use App\Models\Profesor_tutor;

class SyncUCSCData extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'sync:ucsc';

    /**
     * The console command description.
     */
    protected $description = 'Sincroniza alumnos y profesores desde los JSON Mock-UCSC';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->comment('================================================================');
        $this->comment('=== TAREA SYNC:UCSC INICIADA EN: ' . now()->toDateTimeString() . ' ===');
        $this->comment('================================================================');

        $this->info('Iniciando sincronización con Mock-UCSC...');

        try {
            // URLS
            $profUrl = 'https://facuna-m.github.io/Mock-UCSC/registros_profesores.json';
            $alumUrl = 'https://facuna-m.github.io/Mock-UCSC/registros_alumnos.json';

            $profResponse = Http::get($profUrl);
            $alumResponse = Http::get($alumUrl);

            if (!$profResponse->ok() || !$alumResponse->ok()) {
                $this->error('Error al descargar los archivos JSON.');
                return Command::FAILURE;
            }

            $profData = $profResponse->json();
            $alumData = $alumResponse->json();

            // Alumnos
            $alumnos = $alumData['alumnos'] ?? [];
            $this->info('Sincronizando alumnos...');
            foreach ($alumnos as $a) {
                // Reemplaza o crea un Alumno con el rut encontrado en los sistemas UCSC
                Alumno::updateOrCreate(
                    ['run_alumno' => $a['run_alumno']],
                    [
                        'nombre_alumno' => $a['nombre_alumno'] ?? null,
                        'correo_alumno' => $a['correo_alumno'] ?? null,
                    ]
                );
            }
            $this->info(count($alumnos) . ' alumnos sincronizados.');

            // Profesores Guía 
            $profesGuia = $profData['profesores_guia'] ?? [];
            $this->info('Sincronizando profesores guía...');
            foreach ($profesGuia as $p) {
                // Reemplaza o crea un Profesor Guia con el rut encontrado en los sistemas UCSC
                Profesor_guia::updateOrCreate(
                    ['run_profesor_guia' => $p['run_profesor_guia']],
                    [
                        'nombre_profesor_guia' => $p['nombre_profesor_guia'] ?? null,
                        'correo_profesor_guia' => $p['correo_profesor_guia'] ?? null,
                    ]
                );
            }
            $this->info(count($profesGuia) . ' profesores guía sincronizados.');

            // Profesores Co-Guía
            $profesCoGuia = $profData['profesores_co_guia'] ?? [];
            $this->info('Sincronizando profesores co-guía...');
            foreach ($profesCoGuia as $p) {
                // Reemplaza o crea un Profesor co Guia con el rut encontrado en los sistemas UCSC
                Profesor_co_guia::updateOrCreate(
                    ['run_profesor_co_guia' => $p['run_profesor_co_guia']],
                    [
                        'nombre_profesor_co_guia' => $p['nombre_profesor_co_guia'] ?? null,
                        'correo_profesor_co_guia' => $p['correo_profesor_co_guia'] ?? null,
                    ]
                );
            }
            $this->info(count($profesCoGuia) . ' profesores co-guía sincronizados.');

            // Profesores Comisión
            $profesComision = $profData['profesores_comision'] ?? [];
            $this->info('Sincronizando profesores comisión...');
            foreach ($profesComision as $p) {
                // Reemplaza o crea un Profesor Comision con el rut encontrado en los sistemas UCSC
                Profesor_comision::updateOrCreate(
                    ['run_profesor_comision' => $p['run_profesor_comision']],
                    [
                        'nombre_profesor_comision' => $p['nombre_profesor_comision'] ?? null,
                        'correo_profesor_comision' => $p['correo_profesor_comision'] ?? null,
                    ]
                );
            }
            $this->info(count($profesComision) . ' profesores comisión sincronizados.');

            // Profesores Tutores
            $profesTutores = $profData['profesores_tutores'] ?? [];
            $this->info('Sincronizando profesores tutores...');
            foreach ($profesTutores as $p) {
                // Reemplaza o crea un Profesor Tutor con el rut encontrado en los sistemas UCSC
                Profesor_tutor::updateOrCreate(
                    ['run_profesor_tutor' => $p['run_profesor_tutor']],
                    [
                        'nombre_profesor_tutor' => $p['nombre_profesor_tutor'] ?? null,
                        'correo_profesor_tutor' => $p['correo_profesor_tutor'] ?? null,
                    ]
                );
            }
            $this->info(count($profesTutores) . ' profesores tutores sincronizados.');

            $this->info('Sincronización completada correctamente.');
            return Command::SUCCESS;

        } catch (\Throwable $e) {
            $this->error('Error en la sincronización: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
