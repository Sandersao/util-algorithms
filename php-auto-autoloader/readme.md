## Test with composer autoloader

### Introduction
This project visionate the studye of autoload implementation via composer

### Step-by-step
1. First thing to do is the creation of the `composer.json` file. You can do it via composer init or by hand

Example of command for creation of the `composer.json` with composer
> composer init

2. The next step is to add your Default class and the relative path of your code

> "autoload": {
>       "psr-4": {
>           "Alt\\": "src/"
>       }
>   }

- Obs: Note that the "Alt\\\\" and the "src/" may change based, repectively, on your "Default" class name and on your source codes folder

3. The third is to run the autoloader dump

> composer dump-autoload

- Obs: You can try just runnin `composer install` to make the commands work
> composer install

4. Then is just load the composer autoloader code into your "index" file

> require realpath('vendor\autoload.php');

- Obs: Note that that the address may change based on your folder structure

### Warning
The autoload implementation will not work with the default namespace create as `AutoalodTest`