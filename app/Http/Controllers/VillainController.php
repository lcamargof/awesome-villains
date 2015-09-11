<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Villain;

class VillainController extends Controller
{
    private $validationRules;

    public function __construct() {
        // Reglas de validación
        $validationRules = [
            'name'        => 'required|max:50',
            'alias'       => 'required|max:50',
            'origin'      => 'required|max:100',
            'abilities'   => 'required|max:150',
            'awesomeness' => 'required|max:100',
            'wiki'        => 'required|max:100',
            'avatar'      => 'max:100'
        ];
    }
    /**
     * Mostrar la lista de villanos (index)
     *
     * @return Response
     */
    public function index()
    {
        $villains = Villain::all();

        return response()->json([
            'result' => 'success', 
            'villains' => $villains
        ], 200);
    }

    /**
     * Guardar un villano.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Validando el input
        $this->validate($request, $this->validationRules);

        // Creando el nuevo villano
        if($villain = Villain::create($request->input())) {
            return response()->json([
                'result' => 'success', 
                'msg' => '<strong> ¡¡¡Éxito!!!</strong> Villano añadido a la lista satisfactoriamente.', 
                'id' => $villain->id
            ], 200);
        } else {
            return response()->json([
                'result' => 'error', 
                'msg' => '<strong> ¡¡¡ERROR!!!</strong> Tu villano no fue suficientemente awesome :/.'
            ], 200);
        }
    }

    /**
     * Regresar información de ESE villano
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        if($villain = Villain::find($id)) {
            return response()->json([
                'result' => 'success', 
                'villains' => $villain
            ], 200);
        } else {
            return response()->json([
                'result' => 'error', 
                'villains' => $villains,
                'msg' => 'No es un villano awesome'
            ], 200);
        }
    }

    /**
     * Actualizar la información del villano
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        if($villain = Villain::find($id)) {
            // Validando el input
            $this->validate($request, $this->validationRules);
            // Actualizando campos (manera repetitiva)
            $villain->name          = $request->input('name');
            $villain->alias         = $request->input('alias');
            $villain->origin        = $request->input('origin');         
            $villain->abilities     = $request->input('abilities');
            $villain->awesomeness   = $request->input('awesomeness');
            $villain->wiki          = $request->input('wiki');
            $villain->avatar        = $request->input('avatar');
            $villain->save();
            // return
            return response()->json([
                'result' => 'success', 
                'msg' => '<strong> ¡¡¡Éxito!!!</strong> Villano actualizado satisfactoriamente.', 
                'id' => $villain->id
            ], 200);
        } else {
            // No se encontro el villano
            return response()->json([
                'result' => 'error', 
                'msg' => 'No existe este villano?!'
            ], 200);           
        }
    }

    /**
     * Eliminar el villano
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if(Villain::destroy($id)) {
            return response()->json([
                'result' => 'success', 
                'msg' => 'Villano expulsado awesomente'
            ], 200);    
        } else {
            return response()->json([
                'result' => 'error', 
                'msg' => 'Villano demasiado awesome para ser expulsado, siquiera existe?!'
            ], 200);    
        }
    }
}
