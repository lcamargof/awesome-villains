<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Villain;
use Intervention\Image\Facades\Image;
use File;

class VillainController extends Controller
{
    private $validationRules;

    public function __construct() {
        // Reglas de validación
        $this->validationRules = [
            'name'        => 'required|max:50',
            'alias'       => 'required|max:50',
            'origin'      => 'required|max:100',
            'abilities'   => 'required|max:150',
            'awesomeness' => 'required|max:100',
            'wiki'        => 'required|max:100'
        ];

        $this->validationMessages = array(
            'required'  => 'Se tiene que conocer el :attribute del villano!.',
            'max'       => 'El :attribute no puede ser mayor a :max caracteres.'
        );
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
        $this->validate($request, $this->validationRules, $this->validationMessages);

        // Revisar si tiene avatar
        if ($request->input('avatar') != 'default.jpg') {
            // Hacer los cambios respectivos ver metodo
            $this->moveAvatar($request->input('avatar'));
        }

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
            $this->validate($request, $this->validationRules, $this->validationMessages);

            // Revisar si tiene avatar
            if ($request->input('avatar') != $villain->avatar) {
                // Hacer los cambios respectivos ver metodo
                $this->moveAvatar($request->input('avatar'), $villain->avatar);
            }

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

    /**
     * Avatar upload (ajax)
     *
     * @param  int  $id
     * @return Response
     */ 
    public function uploadAvatar(Request $request) {
        // Get file
        $file = $request->file('uploadfile');

        // Set random filename
        $filename = str_random(20).'.'.$file->getClientOriginalExtension();

        // resize the image to a height of 200 and constrain aspect ratio (auto width)
        $img = Image::make($file)->fit(200, 200, null, 'top');

        // El caso ideal seria subir la imagen a un servidor de amazon que se encargue de borrar las imagenes temporales/etc, aqui solo lo muevo a una carpeta temporal a la que se debe programar un proceso para remover los archivos viejos y listo
        if($img->save('temporal'.'/'.$filename)) {
            return response()->json([
                'result' => 'success',
                'file' => $filename
            ], 200);    
        } else {
            return response()->json([
                'result' => 'error'
            ], 200);    
        } 
    }

    /**
     * Mover el archivo temporal
     *
     */

    private function moveAvatar($new, $old = 'default.jpg') {
        $oldpath = '/temporal'.'/'.$new;
        $newpath = '/avatars'.'/'.$new;
        // Renombrar el archivo
        if(File::move(public_path().$oldpath, public_path().$newpath)) {
            // Borrar avatar anterior si era distinto a default.jpg
            if($old != 'default.jpg') {
                File::delete('/avatars'.'/'.$old);
            }
        }         
    }
}
