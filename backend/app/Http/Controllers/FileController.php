<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function store(Request $request, $groupId)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|image|mimes:jpeg,png,jpg,pdf,docx,doc,txt,zip|max:1048',
        ]);

        try {

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $filePath = null;

            if ($request->hasFile('file')) {

                $image = $request->file('file');
                $file_path = time() . '.' . $image->getClientOriginalExtension();
                $file_name = $image->getClientOriginalName();
                $file_size = $image->getSize();
                $filePath = $image->storeAs('file', $file_path, 'public');
            }
            $user = User::findOrFail(auth()->id());

            $data = [
                'file_name' => $file_name,
                'file_path' => $filePath,
                'file_size' => $file_size,
                'user_id' => auth()->id(),
                'sender_name' => $user->name,
                'group_id' => $groupId
            ];

            $fileData = File::create($data);

            return response()->json([
                $fileData,
                'message' => 'Envoie réussie!'
            ], 201);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return response()->json($user, 500);
        }
    }

    public function show_file($groupId)
    {
        // $user = auth()->user();

        $file = File::where('group_id', $groupId)->get();

        if ($file)
            return response()->json($file, 200);
        else
            return response()->json(['message' => 'Aucun fichier dans ce groupe'], 404);
    }
}
