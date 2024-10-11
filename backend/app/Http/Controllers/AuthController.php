<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'same:password',
        ]);

        try {
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $check_invitation = Invitation::where('email', $request->email)->get()->pluck('group_id');

            if ($check_invitation->count() > 0) {
                foreach ($check_invitation as $groupId) {
                    Member::create(['user_id' => $user->id,'group_id'=> $groupId]);
                    $invite = Invitation::where('email', $request->email)->first();
                    $invite->delete();
                }
            }

            return response()->json($user, 201);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return response()->json($user, 500);
        }
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        $user = User::where('email', $request->email)->first();

        if (!$user)
            return response()->json([
                'message' => 'Email incorrecte!'
            ], 401);

        if (!Hash::check($data['password'], $user->password))
            return response()->json([
                'message' => 'Mot de passe incorrecte!'
            ], 401);
        // $user = Auth::user();
        $user->tokens()->delete();
        $user->token = $user->createToken($user->id)->plainTextToken;

        return response()->json([
            'token' => $user->token,
            'user' => $user,
            'message' => 'Connexion reussie'
        ], 200);

        // return response()->json(['error' => 'Unauthorized'], 401);
    }
}
