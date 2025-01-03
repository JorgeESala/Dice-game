# Task 3

## Usage

When launched it accepts 3 or more strings, each containing 6 comma-separated integers. E.g., python node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3.

## Video 

[![Task 3](https://img.youtube.com/vi/jJsXP1_Iqi0/0.jpg)](https://www.youtube.com/watch?v=jJsXP1_Iqi0)


This is the solution to the following task:

Using the language of your choice—from the C#/JavaScript/TypeScript/Java/PHP/Ruby/Python/Rust set, please—to write a console script that implements a generalized dice game (with the supports of arbitrary values on the dice). Of course, it's recommended to use the language of your "specialization," i.e. C# or JavaScript/TypeScript, but it's not required.

When launched with command line parameters—arguments to the main or Main method in the case of Java or C# correspondingly, sys.argv in Python, process.argv in Node.js, etc.—it accepts 3 or more strings, each containing 6 comma-separated integers. E.g., python game.py 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3.

If the arguments are incorrect, you must display a neat error message,not a stacktrace—what exactly is wrong and an example of how to do it right (e.g., user specified only two dice or no dice at all, used non-integers, etc.). All messages should be in English.

Important: dice configuration is passed as command line arguments; you don't "parse" it from the input stream.

The victory is defined as follows—computer and user select different dice, perform their "throws," and whoever rolls higher wins. 

The first step of the game is to determine who makes the first move. You have to prove to the user that choice is fair (it's not enough to generate a random bit 0 or 1; the user needs a proof of the fair play). 

When the users make the throw, they select dice using CLI "menu" and "generate" a random value with the help of the computer. The options consist of all the available dice, the exit (cancel) option, and the help option.

When the computer makes the throw, it selects dice and "generates" a random value. 

Of course, "random" generation is also should be provable fair. 
.
So, you need to implement provable "fair" random integer generation (other from 0 to 1 or from 0 to 5).

To generate such a value, the computer generates a one-time cryptographically secure random key (using corresponding API like SecureRandom, RandomNumberGenerator, etc.—it's mandatory) with a length of at least 256 bits.

Then the computer generates a uniformly distributed integer in the required range (using secure random; note that % operator is not enough to get uniform distribution) and calculates HMAC (based on SHA3) from the generated integers as a message with the generated secret key. Then the computer displays the HMAC to the user. 

After that, the user selects an integer in the same range. The resulted value is calculated as the sum of user number and computer number using modular arithmetic. When the computer displays the result, it also shows the used secret keys.

Re-read the paragraph above; the sequence is critical (it simply doesn't make sense to do it differently, for example, showing the key before the user number selection or displaying HMAC the second time instead of the key, etc.).

Note that "fair random generation" requires the participation of both parties, the user and the computer; just to generate random number and print it is not enough.

Thus the user can check that the computer doesn't cheat (of course, the computer can still try to cheat, but the user can counteract to that).

When you select the "help" option in the terminal, you need to display a table (use ASCII-graphic) that shows probabilities of winning for each dice pair. 
The table generation should be in a separate class. The probability calculation should be in a separate class. The implementation of the fair number generation "protocol" should be in a separate class. The random key/number generation and HMAC calculation should be in a separate class. The dice configuration parsing should be in a separate class. The dice abstraction should be in a separate class. Generally, your code should consist of at least 6-9 classes. 

You should use the core class libraries and third-party libraries to the maximum, and not reinvent the wheel. 

THE NUMBER OF DICE CAN BE ARBITRARY ( > 2). 
Note that the second player (user or computer, depending on whether user have guessed the computer choice 0/1 or not) cannot select the dice selected by the first player (computer or user). 
The first "fair generatio" (0 or 1) should determine who selects the dice first. The opponents select different dice and after that perform their throws (in fact, the order of throws should be unimportant, because they use different dice).
