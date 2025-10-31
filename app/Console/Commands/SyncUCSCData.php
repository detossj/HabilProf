<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Alumno;
use App\Models\Profesor_guia;
use App\Models\Profesor_co_guia;
use App\Models\Profesor_comision;
use App\Models\Profesor_tutor;
use App\Models\Nota_en_linea;

class SyncUCSCData extends Command
{
    protected $signature = 'sync:ucsc';
    protected $description = 'Sincroniza alumnos, profesores y notas desde los módulos fantasmas UCSC (DB externa)';

    public function handle()
    {
        $this->comment('================================================================');
        $this->comment('=== TAREA SYNC:UCSC INICIADA EN: ' . now()->toDateTimeString() . ' ===');
        $this->comment('================================================================');
        $this->info('Iniciando sincronización con módulos fantasmas UCSC...');

        try {
           
            $baseUrl = 'http://localhost:8000/api/externo';
            $urls = [
                'alumnos'   => "$baseUrl/alumnos",
                'guias'     => "$baseUrl/profesores/guias",
                'co_guias'  => "$baseUrl/profesores/co-guias",
                'comision'  => "$baseUrl/profesores/comision",
                'tutores'   => "$baseUrl/profesores/tutores",
                'notas'     => "$baseUrl/notas",
            ];

            // Descargar todos los datos
            $this->info('Descargando datos desde las rutas externas...');
            $responses = [];
            foreach ($urls as $key => $url) {
                $response = Http::timeout(10)->get($url);
                if (!$response->ok()) {
                    $this->error("Error al obtener datos de $url");
                    return Command::FAILURE;
                }
                $responses[$key] = $response->json()['data'] ?? [];
            }

            // Cargar Alumnos
            $alumnos = $responses['alumnos'] ?? [];
            $this->info('Sincronizando alumnos...');
            foreach ($alumnos as $a) {
                Alumno::updateOrCreate(
                    ['run_alumno' => $a['run_alumno']],
                    [
                        'nombre_alumno' => $a['nombre_alumno'] ?? null,
                        'correo_alumno' => $a['correo_alumno'] ?? null,
                    ]
                );
            }
            $this->info(count($alumnos) . ' alumnos sincronizados.');

            // Cargar Profesores guía
            $profesGuia = $responses['guias'] ?? [];
            $this->info('Sincronizando profesores guía...');
            foreach ($profesGuia as $p) {
                Profesor_guia::updateOrCreate(
                    ['run_profesor_guia' => $p['run_profesor_guia']],
                    [
                        'nombre_profesor_guia' => $p['nombre_profesor_guia'] ?? null,
                        'correo_profesor_guia' => $p['correo_profesor_guia'] ?? null,
                    ]
                );
            }
            $this->info(count($profesGuia) . ' profesores guía sincronizados.');

            // Cargar Profesores co-guía
            $profesCoGuia = $responses['co_guias'] ?? [];
            $this->info('Sincronizando profesores co-guía...');
            foreach ($profesCoGuia as $p) {
                Profesor_co_guia::updateOrCreate(
                    ['run_profesor_co_guia' => $p['run_profesor_co_guia']],
                    [
                        'nombre_profesor_co_guia' => $p['nombre_profesor_co_guia'] ?? null,
                        'correo_profesor_co_guia' => $p['correo_profesor_co_guia'] ?? null,
                    ]
                );
            }
            $this->info(count($profesCoGuia) . ' profesores co-guía sincronizados.');

            // Cargar Profesores comisión
            $profesComision = $responses['comision'] ?? [];
            $this->info('Sincronizando profesores comisión...');
            foreach ($profesComision as $p) {
                Profesor_comision::updateOrCreate(
                    ['run_profesor_comision' => $p['run_profesor_comision']],
                    [
                        'nombre_profesor_comision' => $p['nombre_profesor_comision'] ?? null,
                        'correo_profesor_comision' => $p['correo_profesor_comision'] ?? null,
                    ]
                );
            }
            $this->info(count($profesComision) . ' profesores comisión sincronizados.');

            // Cargar Profesores tutores
            $profesTutores = $responses['tutores'] ?? [];
            $this->info('Sincronizando profesores tutores...');
            foreach ($profesTutores as $p) {
                Profesor_tutor::updateOrCreate(
                    ['run_profesor_tutor' => $p['run_profesor_tutor']],
                    [
                        'nombre_profesor_tutor' => $p['nombre_profesor_tutor'] ?? null,
                        'correo_profesor_tutor' => $p['correo_profesor_tutor'] ?? null,
                    ]
                );
            }
            $this->info(count($profesTutores) . ' profesores tutores sincronizados.');

        // Cargar Notas
        $notas = $responses['notas'] ?? [];
        $this->info('Sincronizando notas en línea de Habilitación Profesional...');
        $contador = 0;

        foreach ($notas as $n) {

            // Solo procesar notas que contengan "habilitacion profesional"
            if (!isset($n['titulo']) || stripos($n['titulo'], 'Habilitación Profesional') === false) {
                continue;
            }

            $runAlumno = $n['run_alumno'];

            // Buscar habilitación existente
            $habilPring = \App\Models\Habilitacion_pring::where('run_alumno', $runAlumno)->first();
            $habilPrinv = \App\Models\Habilitacion_prinv::where('run_alumno', $runAlumno)->first();
            $habilPrtut = \App\Models\Habilitacion_prtut::where('run_alumno', $runAlumno)->first();

            if ($habilPring) {
                $habilPring->update([
                    'fecha_nota' => $n['fecha_nota'] ?? now(),
                    'nota_final' => $n['nota'] ?? null,
                ]);
                $contador++;
            } elseif ($habilPrinv) {
                $habilPrinv->update([
                    'fecha_nota' => $n['fecha_nota'] ?? now(),
                    'nota_final' => $n['nota'] ?? null,
                ]);
                $contador++;
            } elseif ($habilPrtut) {
                $habilPrtut->update([
                    'fecha_nota' => $n['fecha_nota'] ?? now(),
                    'nota_final' => $n['nota'] ?? null,
                ]);
                $contador++;
            }
        }

        $this->info($contador . ' notas de Habilitación Profesional sincronizadas.');


            $this->info('Sincronización completada correctamente.');
            return Command::SUCCESS;

        } catch (\Throwable $e) {
            $this->error('Error en la sincronización: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
