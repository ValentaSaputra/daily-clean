<?php

namespace App\Filament\Resources\HomeServiceResource\Pages;

use App\Filament\Resources\HomeServiceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHomeServices extends ListRecords
{
    protected static string $resource = HomeServiceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
