<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use App\Models\Member;
use Illuminate\Http\Request;

class GroupeController extends Controller
{
    //
    public function index() {

        $group = [];

        $groupId = Member::where('user_id', auth()->id())->get()->pluck('group_id');

        foreach ($groupId as $id) {
            array_push($group, Groupe::findOrFail($id));
        }

        return $group;
    }

    public function create(Request $request)
    {
        $data = [
            "name" => $request->name,
            "description" => $request->description,
            "user_id" => auth()->id(),
        ];

        try {
            
            $group = Groupe::create($data);

            $data = [
                'user_id' => auth()->id(),
                'group_id' => $group->id
            ];

            $member = Member::create($data);
            return response()->json([
                'group' => $group,
                'message' => 'Groupe créer avec succès',
                'Le createur lui même ajouter' => $member
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
        }
    }

}
