<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    //

    public function addMember($user_id, $group_id)
    {
        $data = [
            'user_id' => $user_id,
            'group_id' => $group_id
        ];

        $check = Member::where('user_id', $user_id)
            ->where('group_id', $group_id)->first();

        if (!$check) {
            $member = Member::create($data);

            return response()->json([
                'membre' => $member,
                'message' => 'Membre ajouter avec succès!'
            ]);
        } else return response()->json(['message' => 'Déjà membre du groupe']);
    }

    public function invitation(Request $request, $group_id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);

        $data = [
            'email' => $request->email,
            'group_id' => $group_id
        ];

        try {
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $check = Invitation::where('email', $data['email'])
                ->where('group_id', $group_id)->first();

            $check_user = User::where('email', $data['email'])->first();

            if ($check_user) {
                return response()->json(['message' => 'La personne est déjà inscrite, allez simplement l\'ajouter']);
            } elseif (!$check) {
                $invite = Invitation::create($data);
                return response()->json([
                    'Invité' => $invite,
                    'message' => 'Invitation envoyée avec succès !!!'
                ]);
            } else return response()->json(['message' => 'Déjà invité dans ce groupe...'], 201);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return response()->json($user, 500);
        }
    }
}
