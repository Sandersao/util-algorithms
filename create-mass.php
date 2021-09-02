<?php
function str_rand($length = 10, $type = 'an')
{
	if ($type == 'a') {
		$family = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	} else if ($type == 'n') {
		$family = '0123456789';
	} else {
		$family = '0123456789abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	$chars = strlen($family);
	$string = '';
	for ($i = 0; $i < $length; $i++) {
		$actualAn = rand(0, $chars - 1);
		$string .= $family[$actualAn];
	}
	return $string;
}

function generate_line()
{
	$columns = [
		65, 45, 72, 56, 22, 24, 44, 26, 31, 54, 10, 30, 29, 69, 57, 36, 35, 40, 71, 32, 33, 18, 77, 72, 76, 50,
		20, 10, 16, 32, 17, 33, 42, 25, 52, 80, 22, 26, 50, 61, 20, 58, 46, 36, 45, 41, 63, 28, 68, 73, 71, 15,
		55, 35, 67, 63, 51, 70, 33, 31, 40, 12, 34, 53, 64, 31, 46, 78, 66, 67, 66, 45, 33,
	];

	$data = [];
	for ($i = 0; $i < count($columns); $i++) {
		$data[] = str_rand(80);
	}

	return implode('|', $data);
}

$mi = 1000;
$finalData = '';
$finalFileName = __DIR__ . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'mass-' . time() . '.csv';
for ($i = 0; $i < $mi; $i++) {
	$data = '';
	for ($j = 0; $j < 1; $j++) {
		$data .= generate_line() . "\n";
	}
	file_put_contents($finalFileName, $data, FILE_APPEND);
}
