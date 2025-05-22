<?php

namespace App\Filament\Resources\HomeServiceResource\Pages;

use App\Filament\Resources\HomeServiceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHomeService extends EditRecord
{
    protected static string $resource = HomeServiceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
