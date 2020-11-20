<?php

namespace App\Http\Controllers; 
use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ExpenseController extends Controller
{
    public function index()
    {   
         $user_id=Auth::id();
         $expenses = Expense::where('user_id',$user_id)->get();
         return response()->json($expenses);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' 
        ]);
        $expense =  Expense::create([
            'user_id' => Auth::id(),
            'name' => $request->input('name'),
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
        ]);
       
        return response()->json(['message'=> 'expense created', 
        'expense' => $expense]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        return $expense;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' 
        ]);
       $expense->update($request->all());
        return response()->json([
            'message' => 'expense updated!',
            'expense' => $expense
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();
        return response()->json([
            'message' => 'expense deleted'
        ]);
        
    }
}