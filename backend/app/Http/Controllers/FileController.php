<?php

namespace App\Http\Controllers;

use App\Mail\SendFileMail;
use App\Models\File;
use App\Models\Groupe;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function store(Request $request, $groupId)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:jpeg,png,exe,jpg,pdf,docx,doc,txt,zip|max:10048',
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
            $group = Groupe::findOrFail($groupId);
            $users_id = Member::where('group_id', $groupId)->pluck('user_id');

            $data = [
                'file_name' => $file_name,
                'file_path' => $filePath,
                'file_size' => $file_size,
                'user_id' => auth()->id(),
                'sender_name' => $user->name,
                'group_id' => $groupId
            ];

            $fileData = File::create($data);


            if ($fileData) {
                foreach ($users_id as $id) {
                    $user = User::findOrFail($id);

                    Mail::to($user->email)->send(
                        new SendFileMail(
                            $user->name,
                            $user->email,
                            $group->name,
                            $file_name,
                            $file_size
                        )
                    );
                }
            }

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
