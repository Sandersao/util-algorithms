<?php

$fileDir = __DIR__ . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'mass-1630627464.csv';

$handle = fopen($fileDir, 'r');
$actualLine = 0;
$actualFile = 0;
$qtdePerFile = 500000;
while (($line = fgets($handle)) !== false) {
    if ($actualLine >= $qtdePerFile) {
        $actualFile++;
        $actualLine = 0;
    } else {
        $actualLine++;
    }
    file_put_contents($fileDir . '-' . $actualFile, $line, FILE_APPEND);
}
fclose($handle);
