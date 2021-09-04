<?php
function str_rand($length = 10, $type = 'Aa0s', $fill = null)
{
    $fill = $fill == null ? [] : $fill;
    $fill['side'] = !isset($fill['side']) ? '' : $fill['side'];
    $fill['char'] = !isset($fill['char']) ? ' ' : $fill['char'];

    $family =
        (preg_match('/[a]/', $type) ? 'abcdefghijklmnopqrstuvwxyz' : '') .
        (preg_match('/[s]/', $type) ? ' ' : '') .
        (preg_match('/[A]/', $type) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') .
        (preg_match('/[s]/', $type) ? ' ' : '') .
        (preg_match('/[0]/', $type) ? '0123456789' : '') .
        // (preg_match('/[s]/', $type) ? ' ' : '') .
        // (preg_match('/[ç]/', $type) ? 'çáàãâäéèêëíìîïóòõôöúùûüñ' : '') .
        // (preg_match('/[s]/', $type) ? ' ' : '') .
        // (preg_match('/[Ç]/', $type) ? 'ÇÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÑ' : '').
        '';

    $chars = strlen($family);
    $string = '';
    if (preg_match('/(d|e)/', $fill['side'])) {
        $qtdeFill = rand(0, $length - 1);
    }
    for ($i = 0; $i < $length; $i++) {
        $actualAn = rand(0, $chars - 1);
        $actualCar = $family[$actualAn];
        if (preg_match('/e/', $fill['side']) && $qtdeFill > $i) {
            $actualCar = $fill['char'];
        }
        if (preg_match('/d/', $fill['side']) && $qtdeFill < $i) {
            $actualCar = $fill['char'];
        }
        $string .= $actualCar;
    }
    return $string;
}

function generate_column_data($qtde = 73)
{
    $data = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'array_data.json');
    $data = json_decode($data, true);
    return $data;
}

function generate_line($columns)
{
    $data = [];
    for ($i = 0; $i < count($columns); $i++) {
        $fill = $columns[$i]['qtde_spaces'] > 5 ? ['side' => 'd'] : null;
        $data[] = str_rand(
            $columns[$i]['qtde'],
            $columns[$i]['flgs'],
            $fill
        );
    }
    return implode('|', $data);
}

function create_data($finalFileName, $columnsData, $clicles = 1000, $cunckSize = 1)
{
    for ($i = 0; $i < $clicles; $i++) {
        $data = '';
        for ($j = 0; $j < $cunckSize; $j++) {
            $data .= generate_line($columnsData) . "\n";
        }
        $data = utf8_encode($data);
        file_put_contents($finalFileName, $data, FILE_APPEND);
    }
}

$clicles = 3800;
$cunckSize = 2000;
$finalFileName = __DIR__ . DIRECTORY_SEPARATOR .
    'data' . DIRECTORY_SEPARATOR .
    'mass-' . time() . '.csv';
$columnsData = generate_column_data();

create_data($finalFileName, $columnsData, $clicles, $cunckSize);
