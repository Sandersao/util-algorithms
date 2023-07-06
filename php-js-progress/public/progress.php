<?php
function echoFlushing($message)
{
    echo $message;
    ob_flush();
}

$timeBetweenProgress = 0.05;
$expectedProgress = 175;

echoFlushing($expectedProgress);

for ($i=0; $i < $expectedProgress; $i++) {
    usleep($timeBetweenProgress * 1000000);
    echoFlushing($i+1);
}