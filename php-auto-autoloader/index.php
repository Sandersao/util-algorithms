<?php

use Alt\Test;

require realpath('vendor\autoload.php');

$test = new Test;

echo $test->sum(2, 5);
