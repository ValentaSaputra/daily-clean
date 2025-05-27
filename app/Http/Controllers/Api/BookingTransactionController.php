<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingTransactionRequest;
use App\Http\Resources\Api\BookingTransactionApiResource;
use App\Models\BookingTransaction;
use App\Models\HomeService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingTransactionController extends Controller
{
    //
    public function store(StoreBookingTransactionRequest $request)
    {
        try {
            // Validate the request data
            $validatedData = $request->validated();

            // Handle the file upload
            if ($request->hasFile('proof')) {
                $filePath = $request->file('proof')->store('proofs', 'public');
                $validatedData['proof'] = $filePath;
            }

            // Retrive the service ID from the request
            $serviceId = $request->input('service_ids'); // no need to decord json, as it is already an array

            if (empty($serviceIds)) {
                return response()->json(['message' => 'No services selected'], 400);
            }

            // fetch services from the database
            $services = HomeService::whereIn('id', $serviceIds)->get();
            if ($services->isEmpty()) {
                return response()->json(['message' => 'Invalid services'], 404);
            }

            // calculate the total price, tax, insurance, and grand total
            $totalPrice = $services->sum('price');
            $tax = $totalPrice * 0.12;
            $grandTotal = $totalPrice + $tax;

            // use carbon to set schedule_at to tommorow's date
            // agar safety saat dari frontend menginputkan waktu yang sudah lewat / tahun lalu
            $validatedData['schedule_at'] = Carbon::tommorow()->toDateString();

            // populate the booking transaction data
            $validatedData['total_price'] = $grandTotal;
            $validatedData['total_tax_amount'] = $tax;
            $validatedData['sub_total'] = $totalPrice;
            $validatedData['is_paid'] = false; // default to false, can be updated later
            $validatedData['booking_trx_id'] = BookingTransaction::generateUniqueTrxId();

            // Create the booking transaction
            $bookingTransaction = BookingTransaction::create($validatedData);

            if (!$bookingTransaction) {
                return response()->json(['message' => 'Booking Transaction not created'], 500);
            }

            // Create transaction details for each service
            foreach ($services as $service) {
                $bookingTransaction->transactionDetails()->create([
                    'home_service_id' => $service->id,
                    'price' => $service->price,
                ]);
            }

            // Return the created booking transaction with details
            // load untuk menampilkan relasi transactionDetails
            return new BookingTransactionApiResource($bookingTransaction->load('transactionDetails'));

            // 
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    // 
    public function booking_details(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'booking_trx_id' => 'required|string',
        ]);

        $booking = BookingTransaction::where('email', $request->email)
            ->where('booking_trx_id', $request->booking_trx_id)
            ->with([
                'transactionDetails',
                'transactionDetails.homeService',
            ])
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }
        return new BookingTransactionApiResource($booking);
    }
}
