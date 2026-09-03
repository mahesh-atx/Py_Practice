const topics = [
  { name:'Python Basics', desc:'Overview of Python, installation, running programs, print(), comments, indentation, and basic syntax.', icon:'00' },
  { name:'Variables', desc:'Learn values, variable assignment, naming rules, multiple assignment, constants, and dynamic typing.', icon:'01' },
  { name:'Data Types', desc:'Understand int, float, str, bool, NoneType, type inspection with type(), and type conversion.', icon:'02' },
  { name:'Input and Output', desc:'Read user input and format clear output with confidence.', icon:'03' },
  { name:'Operators', desc:'Work with arithmetic, comparison, logical, and assignment operators.', icon:'04' },
  { name:'Conditional Statements', desc:'Use if, elif, else, and combined conditions to control a program.', icon:'05' },
  { name:'For Loops', desc:'Repeat actions with for loops, range(), sequence iteration, and loop controls.', icon:'06' },
  { name:'While Loops', desc:'Control loops with conditions, state updates, break, continue, and input validation.', icon:'07' },
  { name:'Nested Loops', desc:'Combine outer and inner loops for patterns, coordinates, matrices, and grids.', icon:'08' },
  { name:'Strings', desc:'Index, slice, compare, format, and manipulate text with slicing and indexing.', icon:'09' },
  { name:'String Methods', desc:'Master built-in string methods: upper, lower, strip, split, join, replace, and find.', icon:'10' },
  { name:'Functions', desc:'Create reusable blocks with parameters, returns, and scope.', icon:'11' },
  { name:'Lists', desc:'Store and change ordered groups of values.', icon:'12' },
  { name:'Tuples', desc:'Work with fixed ordered data and tuple unpacking.', icon:'13' },
  { name:'Sets', desc:'Use unique values, membership checks, and set operations.', icon:'14' },
  { name:'Dictionaries', desc:'Store data as key-value pairs and work with nested data.', icon:'15' },
  { name:'Comprehension', desc:'Build lists, sets, and dictionaries in a compact, readable Python style.', icon:'16' },
  { name:'Exception Handling', desc:'Handle errors with try, except, else, and finally.', icon:'17' },
  { name:'File Handling', desc:'Read from and write to text files using Python.', icon:'18' },
  { name:'Modules and Packages', desc:'Structure code with import, built-in modules, custom modules, packages, and pip.', icon:'19' },
  { name:'Object-Oriented Programming', desc:'Use classes, objects, methods, inheritance, and composition.', icon:'20' }
];

const questionSeeds = {
  'Python Basics': {
    basic:[
      ['Hello World','Write a Python program that prints Hello, World! on the screen.','','Hello, World!',[{input:'',output:'Hello, World!'}]],
      ['Print multiple lines','Print Welcome to Python and Happy Coding on separate lines.','','Welcome to Python\nHappy Coding',[{input:'',output:'Welcome to Python\nHappy Coding'}]],
      ['Print calculations','Use print() to calculate and display the product of 10 and 5.','','50',[{input:'',output:'50'}]]
    ],
    intermediate:[
      ['Print with separators','Print three words: Python, is, awesome separated by dashes (-).','','Python-is-awesome',[{input:'',output:'Python-is-awesome'}]],
      ['Indented block message','Write an if statement with condition True and print Python is fun inside the indented block.','','Python is fun',[{input:'',output:'Python is fun'}]],
      ['Calculation breakdown','Print the result of (20 + 30) * 2 using print().','','100',[{input:'',output:'100'}]]
    ],
    advanced:[
      ['Formatted summary card','Print a 3-line card showing Language: Python, Released: 1991, Creator: Guido van Rossum.','','Language: Python\nReleased: 1991\nCreator: Guido van Rossum',[{input:'',output:'Language: Python\nReleased: 1991\nCreator: Guido van Rossum'}]],
      ['Custom end character','Use print() with the end parameter to print 1 2 3 on a single line separated by spaces without a trailing newline.','','1 2 3',[{input:'',output:'1 2 3'}]],
      ['Multi-expression print','Print the results of 15 + 5 and 15 * 5 on two separate lines.','','20\n75',[{input:'',output:'20\n75'}]]
    ]
  },

  'Variables': {
    basic:[
      ['Store a greeting','Create a variable named name and print a greeting using its value.','Nina','Hello, Nina!',[{input:'Sam',output:'Hello, Sam!'}]],
      ['Sum two variables','Read two integers into a and b and print their sum.','7 5','12',[{input:'100 25',output:'125'}]],
      ['Multiple assignment','Assign three values at once and print each one on a new line.','1 2 3','1\n2\n3',[{input:'4 5 6',output:'4\n5\n6'}]],
      ['Reassign a value','Read a number, double it by reassigning the same variable, and print it.','8','16',[{input:'5',output:'10'}]],
      ['String length','Read a word and print how many characters it has.','python','6',[{input:'code',output:'4'}]],
      ['Comparison result','Store the result of a greater-than comparison in a variable and print it.','4 9','False',[{input:'12 3',output:'True'}]]
    ],
    intermediate:[
      ['Swap two variables','Swap the values of a and b without using a third variable.','3\n7','7\n3',[{input:'10\n20',output:'20\n10'}]],
      ['Average of three','Read three numbers and print their average.','3 6 9','6.0',[{input:'2 4 6',output:'4.0'}]],
      ['Split a bill','Read a total amount and the number of people and print each share to two decimals.','100 3','33.33',[{input:'50 4',output:'12.50'}]],
      ['Rotate three values','Move a to b, b to c, and c to a (rotate right), then print all three.','1 2 3','3 1 2',[{input:'4 5 6',output:'6 4 5'}]],
      ['Concatenate numbers','Read two numbers, convert them into text, and print them joined with a hyphen.','4 9','4-9',[{input:'12 7',output:'12-7'}]]
    ],
    advanced:[
      ['Scale a value','Read a value and a scale factor and print the result as an int and then as a float.','10 2.5','25\n25.0',[{input:'4 1.5',output:'6\n6.0'}]],
      ['Swap a float and int','Read two values and print them after swapping their variables.','7 2.5','2.5 7',[{input:'9 4.5',output:'4.5 9'}]],
      ['Band check as int','Read a number and print 1 if it is between 10 and 20 inclusive, else 0.','15','1',[{input:'3',output:'0'}]],
      ['Sum spaced numbers','Read several whole numbers separated by spaces, convert each to int, and print their sum.','3 5 7','15',[{input:'1 2 3',output:'6'}]],
      ['Nearest rupee','Read a rupee amount and print the nearest whole rupee using rounding.','99.5','100',[{input:'12.4',output:'12'}]]
    ]
  },
  'Data Types': {
    basic:[
      ['Convert a value','Read a numeric string and convert it to an integer before adding 5.','12','17',[{input:'50',output:'55'}]],
      ['Check a type','Store a value and print its type using type().','42',"<class 'int'>",[{input:'hello',output:"<class 'str'>"}]],
      ['Float to integer','Read a decimal value, convert it to an integer, and print it.','7.9','7',[{input:'3.2',output:'3'}]],
      ['Type after conversion','Read a whole number as text, convert it to a float, and print its type.','5',"<class 'float'>",[{input:'3',output:"<class 'float'>"}]],
    ],
    intermediate:[
      ['Type of a string','Convert an integer into a string and print the type of that string.','5',"<class 'str'>",[{input:'42',output:"<class 'str'>"}]],
      ['Round a decimal','Read a float, print its rounded value and the type of that value.','3.6',"4\n<class 'int'>",[{input:'2.2',output:"2\n<class 'int'>"}]],
      ['Flip a boolean','Read a boolean as text, convert it to a bool, and print its opposite.','True','False',[{input:'False',output:'True'}]],
      ['Odd and big check','Read a number and print whether it is odd and whether it is greater than 10.','13','True\nTrue',[{input:'4',output:'False\nFalse'}]],
      ['Rupees and paise','Read a rupee amount as a decimal and print whole rupees and paise.','45.75','45 rupees 75 paise',[{input:'12.5',output:'12 rupees 50 paise'}]]
    ],
    advanced:[
      ['Normalize a value','Read a value, convert it to int when possible, otherwise print Invalid.','25','25',[{input:'abc',output:'Invalid'}]],
      ['Compare mixed values','Read two values and report whether they represent the same number.','5\n5.0','Same',[{input:'3\n4',output:'Different'}]],
      ['Typed record','Store name, age and active status and print each value with its type.','Nina\n21\nTrue','Nina: str\n21: int\nTrue: bool',[{input:'Leo\n30\nFalse',output:'Leo: str\n30: int\nFalse: bool'}]],
      ['Show a value three ways','Read an integer and print it as int, as float, and as text.','6','6\n6.0\n6',[{input:'2',output:'2\n2.0\n2'}]],
      ['Print three types','Read an int, a float and a boolean and print the type of each.','5\n3.2\nTrue',"<class 'int'>\n<class 'float'>\n<class 'bool'>",[{input:'1\n2.0\nFalse',output:"<class 'int'>\n<class 'float'>\n<class 'bool'>"}]],
    ]
  },

  'Variables and Data Types': {
    basic:[
      ['Store a greeting','Create a variable named name and print a greeting using its value.','Nina','Hello, Nina!',[{input:'Sam',output:'Hello, Sam!'}]],
      ['Convert a value','Read a numeric string and convert it to an integer before adding 5.','12','17',[{input:'50',output:'55'}]],
      ['Check a type','Store a value and print its type using type().','42',"<class 'int'>",[{input:'hello',output:"<class 'str'>"}]],
      ['Sum two variables','Read two integers into a and b and print their sum.','7 5','12',[{input:'100 25',output:'125'}]],
      ['Multiple assignment','Assign three values at once and print each one on a new line.','1 2 3','1\n2\n3',[{input:'4 5 6',output:'4\n5\n6'}]],
      ['Float to integer','Read a decimal value, convert it to an integer, and print it.','7.9','7',[{input:'3.2',output:'3'}]],
      ['Comparison result','Store the result of a greater-than comparison in a variable and print it.','4 9','False',[{input:'12 3',output:'True'}]],
      ['Reassign a value','Read a number, double it by reassigning the same variable, and print it.','8','16',[{input:'5',output:'10'}]],
      ['String length','Read a word and print how many characters it has.','python','6',[{input:'code',output:'4'}]],
      ['Type after conversion','Read a whole number as text, convert it to a float, and print its type.','5',"<class 'float'>",[{input:'3',output:"<class 'float'>"}]]
    ],
    intermediate:[
      ['Swap two variables','Swap the values of a and b without using a third variable.','3\n7','7\n3',[{input:'10\n20',output:'20\n10'}]],
      ['Average of three','Read three numbers and print their average.','3 6 9','6.0',[{input:'2 4 6',output:'4.0'}]],
      ['Split a bill','Read a total amount and the number of people and print each share to two decimals.','100 3','33.33',[{input:'50 4',output:'12.50'}]],
      ['Rupees and paise','Read a rupee amount as a decimal and print whole rupees and paise.','45.75','45 rupees 75 paise',[{input:'12.5',output:'12 rupees 50 paise'}]],
      ['Rotate three values','Move a to b, b to c, and c to a (rotate right), then print all three.','1 2 3','3 1 2',[{input:'4 5 6',output:'6 4 5'}]],
      ['Type of a string','Convert an integer into a string and print the type of that string.','5',"<class 'str'>",[{input:'42',output:"<class 'str'>"}]],
      ['Round a decimal','Read a float, print its rounded value and the type of that value.','3.6',"4\n<class 'int'>",[{input:'2.2',output:"2\n<class 'int'>"}]],
      ['Flip a boolean','Read a boolean as text, convert it to a bool, and print its opposite.','True','False',[{input:'False',output:'True'}]],
      ['Odd and big check','Read a number and print whether it is odd and whether it is greater than 10.','13','True\nTrue',[{input:'4',output:'False\nFalse'}]],
      ['Concatenate numbers','Read two numbers, convert them into text, and print them joined with a hyphen.','4 9','4-9',[{input:'12 7',output:'12-7'}]]
    ],
    advanced:[
      ['Normalize a value','Read a value, convert it to int when possible, otherwise print Invalid.','25','25',[{input:'abc',output:'Invalid'}]],
      ['Compare mixed values','Read two values and report whether they represent the same number.','5\n5.0','Same',[{input:'3\n4',output:'Different'}]],
      ['Typed record','Store name, age and active status and print each value with its type.','Nina\n21\nTrue','Nina: str\n21: int\nTrue: bool',[{input:'Leo\n30\nFalse',output:'Leo: str\n30: int\nFalse: bool'}]],
      ['Sum spaced numbers','Read several whole numbers separated by spaces, convert each to int, and print their sum.','3 5 7','15',[{input:'1 2 3',output:'6'}]],
      ['Show a value three ways','Read an integer and print it as int, as float, and as text.','6','6\n6.0\n6',[{input:'2',output:'2\n2.0\n2'}]],
      ['Scale a value','Read a value and a scale factor and print the result as an int and then as a float.','10 2.5','25\n25.0',[{input:'4 1.5',output:'6\n6.0'}]],
      ['Print three types','Read an int, a float and a boolean and print the type of each.','5\n3.2\nTrue',"<class 'int'>\n<class 'float'>\n<class 'bool'>",[{input:'1\n2.0\nFalse',output:"<class 'int'>\n<class 'float'>\n<class 'bool'>"}]],
      ['Swap a float and int','Read two values and print them after swapping their variables.','7 2.5','2.5 7',[{input:'9 4.5',output:'4.5 9'}]],
      ['Band check as int','Read a number and print 1 if it is between 10 and 20 inclusive, else 0.','15','1',[{input:'3',output:'0'}]],
      ['Nearest rupee','Read a rupee amount and print the nearest whole rupee using rounding.','99.5','100',[{input:'12.4',output:'12'}]]
    ]
  },
  'Input and Output': {
    basic:[
      ['Echo a sentence','Read one line and print it back exactly.','Python is fun','Python is fun',[{input:'Code every day',output:'Code every day'}]],
      ['Personal card','Read a name and a city and print them in one sentence.','Nina\nNagpur','Nina lives in Nagpur.',[{input:'Kiran\nPune',output:'Kiran lives in Pune.'}]],
      ['Formatted number','Read an integer and print it inside a sentence.','18','You are 18 years old.',[{input:'25',output:'You are 25 years old.'}]],
      ['Read a mark','Read a mark and print it along with a label.','85','Mark: 85',[{input:'42',output:'Mark: 42'}]],
      ['Read two and print sum','Read two integers and print them with their sum.','4 6','4 + 6 = 10',[{input:'3 9',output:'3 + 9 = 12'}]],
      ['Greet by name','Read a name and print a friendly welcome message.','Ria','Welcome, Ria!',[{input:'Dev',output:'Welcome, Dev!'}]],
      ['Read decimal and print','Read a decimal number and print it with two decimal places.','3.14159','3.14',[{input:'2.0',output:'2.00'}]],
      ['Read a flag','Read the word True or False and print its opposite.','True','False',[{input:'False',output:'True'}]],
      ['Print a line twice','Read a value and print it twice on separate lines.','hi','hi\nhi',[{input:'ok',output:'ok\nok'}]],
      ['Read three items','Read three integers and print them in a single line.','1 2 3','1 2 3',[{input:'9 8 7',output:'9 8 7'}]]
    ],
    intermediate:[
      ['Format a bill','Read an item name, quantity and price and print a clean total.','Notebook\n3\n49.5','Notebook: ₹148.50',[{input:'Pen\n5\n10.0',output:'Pen: ₹50.00'}]],
      ['Temperature report','Read Celsius and print the Fahrenheit value in a sentence.','25','25°C = 77.0°F',[{input:'0',output:'0°C = 32.0°F'}]],
      ['Aligned output','Read three labels and print each padded to 12 characters.','one\ntwo\nthree','one         \ntwo         \nthree       ',[{input:'cat\ndog\nbird',output:'cat         \ndog         \nbird        '}]],
      ['Read a box','Read width and height and print a labelled box with numbers.','4\n2','Width: 4\nHeight: 2',[{input:'7\n3',output:'Width: 7\nHeight: 3'}]],
      ['Discount label','Read a price and a discount percent and print both as text.','800\n15','Original: 800.00\nDiscount: 15%',[{input:'1000\n10',output:'Original: 1000.00\nDiscount: 10%'}]],
      ['Read Celsius and print','Read a temperature and print it with a unit label.','30','30 degree Celsius',[{input:'21',output:'21 degree Celsius'}]],
      ['Read two words','Read two words and print them joined by a colon.','hello world','hello:world',[{input:'left right',output:'left:right'}]],
      ['Print a receipt line','Read an item and a cost and print a formatted line.','Coffee 40','Item: Coffee | Cost: 40',[{input:'Tea 20',output:'Item: Tea | Cost: 20'}]],
      ['Read a score and label','Read a score and print the label and value with a colon.','76','Score: 76',[{input:'58',output:'Score: 58'}]],
      ['Print a summary','Read a name, a role and print a one-line summary.','Nina Manager','Nina works as Manager.',[{input:'Aman Engineer',output:'Aman works as Engineer.'}]]
    ],
    advanced:[
      ['Mini receipt','Read three item rows and print subtotal, tax and total.','Pen 2 10\nBook 1 100\nBag 1 300','Subtotal: 420.00\nTax: 42.00\nTotal: 462.00',[{input:'ItemA 1 50\nItemB 2 25\nItemC 1 100',output:'Subtotal: 200.00\nTax: 20.00\nTotal: 220.00'}]],
      ['Safe integer input','Keep reading until the user gives a valid integer, then print it.','x\ny\n17','17',[{input:'bad\n42',output:'42'}]],
      ['Report builder','Read four values and print a compact aligned report.','Nina\n21\nPython\n90','Name : Nina\nAge  : 21\nSkill: Python\nScore: 90',[{input:'Aman\n24\nData\n95',output:'Name : Aman\nAge  : 24\nSkill: Data\nScore: 95'}]],
      ['Read and multiply','Read two numbers in one line and print their product with no decimals.','6 7','42',[{input:'4 5',output:'20'}]],
      ['Distance label','Read a distance and print it as kilometres with two decimals.','3.456','3.46 km',[{input:'1.5',output:'1.50 km'}]],
      ['Order summary','Read an item, quantity and unit price and print a full line.','Fan 2 1500','Fan: 2 x 1500 = 3000',[{input:'Lamp 3 200',output:'Lamp: 3 x 200 = 600'}]],
      ['Read a tuple-like line','Read three comma-separated values and print each on a separate line.','a,b,c','a\nb\nc',[{input:'x,y,z',output:'x\ny\nz'}]],
      ['Print a total row','Read two numbers and print their sum right-aligned in a 10-character field.','12 20','        32',[{input:'3 4',output:'         7'}]],
      ['Read a range and label','Read start and end and print the span and count.','4 11','Span: 7\nCount: 8',[{input:'1 3',output:'Span: 2\nCount: 3'}]],
      ['Star rating','Read a rating between 1 and 5 and print it as a line of stars.','3','***',[{input:'5',output:'*****'}]]
    ]
  },
  'Operators': {
    basic:[
      ['Add two numbers','Read two integers and print their sum.','7 5','12',[{input:'100 25',output:'125'}]],
      ['Compare values','Read two integers and print whether the first is greater than the second.','9 4','True',[{input:'3 8',output:'False'}]],
      ['Check a range','Read a number and print whether it is between 10 and 20 inclusive.','16','True',[{input:'5',output:'False'}]],
      ['Multiply and divide','Read two numbers and print their product and quotient.','8 2','16\n4.0',[{input:'6 3',output:'18\n2.0'}]],
      ['Modulo result','Read two integers and print the remainder when the first is divided by the second.','17 5','2',[{input:'20 6',output:'2'}]],
      ['Check divisibility','Read two numbers and print True when the first is divisible by the second.','15 3','True',[{input:'14 4',output:'False'}]],
      ['Floor division','Read two integers and print the result of floor division.','17 5','3',[{input:'9 2',output:'4'}]],
      ['Absolute difference','Read two numbers and print the absolute difference.','10 3','7',[{input:'4 12',output:'8'}]],
      ['Exponentiation','Read a base and an exponent and print the result of the ** operator.','3 4','81',[{input:'2 5',output:'32'}]],
      ['Evaluate expression','Read two numbers and print the value of (a + b) * 2.','3 4','14',[{input:'2 6',output:'16'}]]
    ],
    intermediate:[
      ['Discount price','Apply a 15% discount to a price and print the final value.','800','680.0',[{input:'1000',output:'850.0'}]],
      ['Choose the larger','Use a conditional expression to print the larger of two values.','14 29','29',[{input:'50 12',output:'50'}]],
      ['Combine conditions','Print True only when a number is positive and even.','8','True',[{input:'-4',output:'False'}]],
      ['Within range','Print True when a number is between 5 and 50 (excluding the endpoints).','20','True',[{input:'5',output:'False'}]],
      ['Average price','Read three prices and print the average rounded to two decimals.','10 20 30','20.00',[{input:'5 10 15',output:'10.00'}]],
      ['Even and positive','Print True only when a number is even and greater than 0.','12','True',[{input:'-6',output:'False'}]],
      ['Absolute with condition','Print True when the distance from zero is greater than 100.','-150','True',[{input:'40',output:'False'}]],
      ['Remainder parity','Read a number and print 1 when it is odd, else 0.','9','1',[{input:'8',output:'0'}]],
      ['Weighted score','Read three values and print their weighted average.','50 60 70','61.0',[{input:'10 20 30',output:'21.0'}]],
      ['Time modulo','Read minutes and print the hour and minute part as a clock time.','135','02:15',[{input:'90',output:'01:30'}]]
    ],
    advanced:[
      ['Power without **','Calculate a positive integer power without using the ** operator.','3 4','81',[{input:'2 5',output:'32'}]],
      ['Modulo clock','Add minutes to a clock time and print the resulting hour and minute.','23 50','00:13',[{input:'10 20',output:'10:20'}]],
      ['Boolean score','Print True when a score is between 60 and 100 and a valid flag is present.','78 True','True',[{input:'45 True',output:'False'}]],
      ['Round a price','Read a price and round it to the nearest rupee.','19.6','20',[{input:'19.4',output:'19'}]],
      ['Score average with a twist','Read three marks, drop the lowest, and print the average of the remaining two.','60 80 70','75.0',[{input:'50 90 60',output:'75.0'}]],
      ['Range overlap','Read two ranges and print True when they overlap.','1 5\n3 8','True',[{input:'1 3\n5 8',output:'False'}]],
      ['Profit or loss','Read cost and selling price and print the profit (or minus for a loss).','200 250','50',[{input:'100 50',output:'-50'}]],
      ['Large of three with operators','Print the largest of three integers without using max().','7 14 9','14',[{input:'20 3 40',output:'40'}]],
      ['Compound interest flag','Print True when an amount becomes more than double with a simple multiplier.','100\n3','True',[{input:'200\n1',output:'False'}]],
      ['Nested expression','Read three integers and print the result of (a + b) * (b - c).','5 6 2','32',[{input:'9 3 1',output:'24'}]]
    ]
  },
  'Conditional Statements': {
    basic:[
      ['Even or odd','Read an integer and print whether it is even or odd.','11','Odd',[{input:'14',output:'Even'}]],
      ['Positive or negative','Read an integer and print Positive, Negative, or Zero.','-4','Negative',[{input:'10',output:'Positive'}]],
      ['Pass or fail','Read a score and print Pass when it is at least 40.','58','Pass',[{input:'32',output:'Fail'}]],
      ['Bigger of two','Read two numbers and print the bigger one.','8 13','13',[{input:'25 10',output:'25'}]],
      ['Eligible for discount','Read a bill amount and print Discount when it is at least 500.','650','Discount',[{input:'200',output:'No discount'}]],
      ['Vote eligibility','Read an age and print Eligible when it is 18 or more, else Not eligible.','20','Eligible',[{input:'15',output:'Not eligible'}]],
      ['Adult or minor','Print Adult when an age is at least 18, else Minor.','25','Adult',[{input:'12',output:'Minor'}]],
      ['Multiple of 5','Read a number and print True when it is a multiple of 5.','30','True',[{input:'13',output:'False'}]],
      ['Grade comment','Print Excellent when a score is 90 or more, else Good.','95','Excellent',[{input:'70',output:'Good'}]],
      ['Sign of difference','Print which number is larger: a, b, or Equal.','7 7','Equal',[{input:'9 3',output:'a'}]]
    ],
    intermediate:[
      ['Grade calculator','Print a grade A/B/C/D/F from a score.','82','A',[{input:'65',output:'B'}]],
      ['Largest of three','Read three integers and print the largest.','7 14 9','14',[{input:'20 15 8',output:'20'}]],
      ['Leap year','Check whether a year is a leap year.','2024','Leap year',[{input:'2023',output:'Not a leap year'}]],
      ['Number category','Print Even positive, Odd positive, Even negative, Odd negative, or Zero.','-9','Odd negative',[{input:'8',output:'Even positive'}]],
      ['BMI category','Read weight and height and print a category based on BMI.','70 1.7','Overweight',[{input:'60 1.7',output:'Normal'}]],
      ['Three-way comparison','Print Smaller, Equal, or Larger by comparing two values.','7 4','Larger',[{input:'5 5',output:'Equal'}]],
      ['Discount bracket','Print 10% when a price is below 500, else 20%.','400','10%',[{input:'900',output:'20%'}]],
      ['Quadrant finder','Read x and y and print which quadrant the point lies in.','-3 4','Quadrant II',[{input:'2 -5',output:'Quadrant IV'}]],
      ['Grade with feedback','Print a comment based on a score: High, Average, or Low.','60','Average',[{input:'95',output:'High'}]],
      ['Valid triangle','Read three sides and print whether they can form a triangle.','3 4 5','Valid',[{input:'1 2 3',output:'Invalid'}]]
    ],
    advanced:[
      ['Shipping tier','Choose a shipping price based on order amount and membership status.','1250 True','Free',[{input:'300 False',output:'Standard'}]],
      ['Triangle type','Given three sides, print whether the triangle is valid and its type.','3 3 4','Valid - Isosceles',[{input:'3 4 5',output:'Valid - Scalene'}]],
      ['Tax bracket','Calculate tax using three income brackets.','50000','5000.0',[{input:'20000',output:'0.0'}]],
      ['Electricity bill','Read units and compute a slab-based bill.','350','380',[{input:'120',output:'90'}]],
      ['Student result with grace','Read marks and decide: Pass, Fail, Or Pass with grace when marks are within 5 of the pass mark.','41','Pass',[{input:'36','output':'Pass with grace'}]],
      ['Age group','Read an age and print Toddler, Child, Teenager, Adult, or Senior.','15','Teenager',[{input:'70',output:'Senior'}]],
      ['Divisibility combo','Read a number and print its category by combinations of 3 and 5.','15','FizzBuzz',[{input:'9',output:'Fizz'}]],
      ['Largest and smallest','Read three numbers and print both the largest and the smallest.','9 2 6','Largest: 9\nSmallest: 2',[{input:'5 4 3',output:'Largest: 5\nSmallest: 3'}]],
      ['Salary with bonus','Read salary and years and add a bonus when years are 5 or more.','40000 7','44000',[{input:'30000 3',output:'30000'}]],
      ['Absolute threshold','Read a number and print its absolute value only when it is negative.','-9','9',[{input:'4',output:'4'}]]
    ]
  },
  
  'For Loops': {
    basic:[
      ['Print numbers from 1 to 10','Write a program that uses a for loop to print numbers from 1 to 10 on separate lines.','','1\n2\n3\n4\n5\n6\n7\n8\n9\n10',[{input:'',output:'1\n2\n3\n4\n5\n6\n7\n8\n9\n10'}]],
      ['Print numbers from 10 to 1','Use a for loop to print numbers in reverse from 10 down to 1 on separate lines.','','10\n9\n8\n7\n6\n5\n4\n3\n2\n1',[{input:'',output:'10\n9\n8\n7\n6\n5\n4\n3\n2\n1'}]],
      ['Print numbers from 1 to N','Take a number N from the user and print all numbers from 1 to N on separate lines.','5','1\n2\n3\n4\n5',[{input:'3',output:'1\n2\n3'},{input:'8',output:'1\n2\n3\n4\n5\n6\n7\n8'}]],
      ['Print even numbers from 1 to 20','Use a for loop to print only the even numbers between 1 and 20 on a single line separated by spaces.','','2 4 6 8 10 12 14 16 18 20',[{input:'',output:'2 4 6 8 10 12 14 16 18 20'}]],
      ['Print odd numbers from 1 to 20','Use a for loop to print only the odd numbers between 1 and 20 on a single line separated by spaces.','','1 3 5 7 9 11 13 15 17 19',[{input:'',output:'1 3 5 7 9 11 13 15 17 19'}]],
      ['Print the multiplication table','Take a number from the user and print its multiplication table from 1 to 10 in the format: N x i = result.','5','5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',[{input:'3',output:'3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30'},{input:'7',output:'7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70'}]],
      ['Find the sum from 1 to N','Take N from the user and use a for loop to calculate the sum from 1 to N. Print the result in the format: Sum = <result>.','5','Sum = 15',[{input:'10',output:'Sum = 55'},{input:'4',output:'Sum = 10'},{input:'1',output:'Sum = 1'}]],
      ['Count numbers divisible by 3','Take a number N from the user. Count how many numbers between 1 and N are divisible by 3. Print the result in the format: Count = <result>.','10','Count = 3',[{input:'15',output:'Count = 5'},{input:'5',output:'Count = 1'},{input:'2',output:'Count = 0'}]],
      ['Find the sum of even numbers','Take N from the user and find the sum of all even numbers from 1 to N. Print the result in the format: Sum = <result>.','10','Sum = 30',[{input:'6',output:'Sum = 12'},{input:'5',output:'Sum = 6'},{input:'20',output:'Sum = 110'}]],
      ['Print a simple pattern','Take a number N from the user and print * exactly N times, one per line.','5','*\n*\n*\n*\n*',[{input:'3',output:'*\n*\n*'},{input:'1',output:'*'},{input:'6',output:'*\n*\n*\n*\n*\n*'}]]
    ],
    intermediate:[
      ['Sum of numbers in a range','Take two numbers start and end from the user and find the sum of all numbers between them. Print the result in the format: Sum = <result>.','5\n10','Sum = 45',[{input:'1\n5',output:'Sum = 15'},{input:'10\n20',output:'Sum = 165'},{input:'7\n7',output:'Sum = 7'}]],
      ['Count even and odd numbers','Take a number N and count how many even and odd numbers exist from 1 to N. Print Even = <count> and Odd = <count> on separate lines.','10','Even = 5\nOdd = 5',[{input:'7',output:'Even = 3\nOdd = 4'},{input:'1',output:'Even = 0\nOdd = 1'},{input:'20',output:'Even = 10\nOdd = 10'}]],
      ['Find the largest number','Ask the user to enter 5 numbers, one at a time. Use a for loop to find the largest number without using max(). Print the result in the format: Largest = <result>.','12\n45\n7\n89\n23','Largest = 89',[{input:'5\n4\n3\n2\n1',output:'Largest = 5'},{input:'-10\n-50\n-3\n-20\n-1',output:'Largest = -1'},{input:'100\n250\n75\n300\n150',output:'Largest = 300'}]],
      ['Find the smallest number','Ask the user to enter 5 numbers, one at a time. Use a for loop to find the smallest number without using min(). Print the result in the format: Smallest = <result>.','12\n45\n7\n89\n23','Smallest = 7',[{input:'50\n40\n30\n20\n10',output:'Smallest = 10'},{input:'-10\n-50\n-3\n-20\n-1',output:'Smallest = -50'},{input:'8\n8\n8\n8\n8',output:'Smallest = 8'}]],
      ['Find the factorial','Take a number N and calculate its factorial using a for loop. Print the result in the format: N! = <result>.','5','5! = 120',[{input:'1',output:'1! = 1'},{input:'6',output:'6! = 720'},{input:'0',output:'0! = 1'},{input:'7',output:'7! = 5040'}]],
      ['Check whether a number is prime','Take a number from the user and use a for loop to check whether it is prime. Print \'<number> is prime\' or \'<number> is not prime\'.','17','17 is prime',[{input:'12',output:'12 is not prime'},{input:'2',output:'2 is prime'},{input:'1',output:'1 is not prime'},{input:'29',output:'29 is prime'}]],
      ['Print all factors of a number','Take a number from the user and print all numbers that divide it completely on separate lines.','12','1\n2\n3\n4\n6\n12',[{input:'7',output:'1\n7'},{input:'16',output:'1\n2\n4\n8\n16'},{input:'1',output:'1'}]],
      ['Count the number of digits','Take an integer from the user and count how many digits it has using a for loop. Print the result in the format: Number of digits = <result>.','58392','Number of digits = 5',[{input:'7',output:'Number of digits = 1'},{input:'1000',output:'Number of digits = 4'},{input:'849201',output:'Number of digits = 6'}]],
      ['Reverse a number','Take an integer and reverse its digits using a for loop and mathematical operations (% and //). Print the result in the format: Reverse = <result>.','12345','Reverse = 54321',[{input:'987',output:'Reverse = 789'},{input:'7',output:'Reverse = 7'},{input:'1042',output:'Reverse = 2401'}]],
      ['Check whether a number is Armstrong','Take a number from the user and check whether it is an Armstrong number. Print \'<number> is an Armstrong number\' or \'<number> is not an Armstrong number\'.','153','153 is an Armstrong number',[{input:'370',output:'370 is an Armstrong number'},{input:'123',output:'123 is not an Armstrong number'},{input:'9474',output:'9474 is an Armstrong number'},{input:'9',output:'9 is an Armstrong number'}]]
    ],
    advanced:[
      ['Sum of the first N even numbers','Take N and print the sum of the first N even numbers.','5','30',[{input:'3',output:'12'},{input:'4',output:'20'}]],
      ['Fibonacci up to N terms','Take a number N and print the first N terms of the Fibonacci sequence.','6','0 1 1 2 3 5',[{input:'4',output:'0 1 1 2'},{input:'8',output:'0 1 1 2 3 5 8 13'}]],
      ['Sum of digits','Take an integer and print the sum of its digits.','472','13',[{input:'909',output:'18'},{input:'5',output:'5'}]],
      ['Perfect number','Take a number and print True when it equals the sum of its positive divisors.','6','True',[{input:'12',output:'False'},{input:'28',output:'True'}]],
      ['HCF of two numbers','Take two numbers and print their greatest common divisor.','48 18','6',[{input:'12 8',output:'4'},{input:'17 5',output:'1'}]],
      ['Print a number pyramid','Take N and print ascending rows of numbers.','3','1\n1 2\n1 2 3',[{input:'2',output:'1\n1 2'}]],
      ['Count vowels in the input','Take a word and count its vowels.','education','5',[{input:'xyz',output:'0'},{input:'oasis',output:'3'}]],
      ['First N multiples of a number','Take a number and N and print its first N multiples.','4 5','4 8 12 16 20',[{input:'3 4',output:'3 6 9 12'}]],
      ['Count words','Take a sentence and count how many words it has.','learn python every day','4',[{input:'a b c',output:'3'},{input:'hi',output:'1'}]],
      ['Print a rectangle of stars','Take rows and columns and print that many rows of stars.','3 4','****\n****\n****',[{input:'2 3',output:'***\n***'}]]
    ]
  },
  'While Loops': {
    basic:[
      ['Print numbers from 1 to 10','Use a while loop to print numbers from 1 to 10 on separate lines.','','1\n2\n3\n4\n5\n6\n7\n8\n9\n10',[{input:'',output:'1\n2\n3\n4\n5\n6\n7\n8\n9\n10'}]],
      ['Print numbers from 10 to 1','Use a while loop to print numbers in reverse order from 10 down to 1 on separate lines.','','10\n9\n8\n7\n6\n5\n4\n3\n2\n1',[{input:'',output:'10\n9\n8\n7\n6\n5\n4\n3\n2\n1'}]],
      ['Print numbers from 1 to N','Take N from the user and use a while loop to print all numbers from 1 to N on separate lines.','5','1\n2\n3\n4\n5',[{input:'3',output:'1\n2\n3'},{input:'8',output:'1\n2\n3\n4\n5\n6\n7\n8'}]],
      ['Print even numbers from 1 to 20','Use a while loop to print only the even numbers between 1 and 20 on separate lines.','','2\n4\n6\n8\n10\n12\n14\n16\n18\n20',[{input:'',output:'2\n4\n6\n8\n10\n12\n14\n16\n18\n20'}]],
      ['Print odd numbers from 1 to N','Take N from the user and use a while loop to print all odd numbers from 1 to N on separate lines.','10','1\n3\n5\n7\n9',[{input:'7',output:'1\n3\n5\n7'},{input:'5',output:'1\n3\n5'},{input:'1',output:'1'}]],
      ['Multiplication table','Take a number from the user and print its multiplication table from 1 to 10 in the format: N x i = result using a while loop.','7','7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70',[{input:'5',output:'5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50'},{input:'4',output:'4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20\n4 x 6 = 24\n4 x 7 = 28\n4 x 8 = 32\n4 x 9 = 36\n4 x 10 = 40'}]],
      ['Sum from 1 to N','Take N from the user and use a while loop to calculate the sum from 1 to N. Print the result in the format: Sum = <result>.','5','Sum = 15',[{input:'10',output:'Sum = 55'},{input:'4',output:'Sum = 10'},{input:'1',output:'Sum = 1'}]],
      ['Count down by 2','Take a number N and use a while loop to print it while decreasing by 2 each time until it reaches or passes 0.','10','10\n8\n6\n4\n2\n0',[{input:'9',output:'9\n7\n5\n3\n1'},{input:'6',output:'6\n4\n2\n0'},{input:'0',output:'0'}]],
      ['Keep asking until the correct number is entered','Set a fixed secret number (7). Keep reading guesses until the user enters 7. For each incorrect guess, print Wrong!. When correct, print Correct!.','4\n9\n7','Wrong!\nWrong!\nCorrect!',[{input:'7',output:'Correct!'},{input:'1\n2\n3\n7',output:'Wrong!\nWrong!\nWrong!\nCorrect!'},{input:'10\n7',output:'Wrong!\nCorrect!'}]],
      ['Keep taking numbers until 0 is entered','Keep reading numbers until the user enters 0. Use a while loop to calculate and print the total sum of all numbers entered before 0 in the format: Sum = <result>.','5\n8\n2\n0','Sum = 15',[{input:'10\n20\n30\n0',output:'Sum = 60'},{input:'0',output:'Sum = 0'},{input:'100\n-25\n0',output:'Sum = 75'}]]
    ],
    intermediate:[
      ['Simple login system','Set username as \'admin\' and password as \'python123\'. Keep reading username and password pairs until both match. Print \'Wrong credentials\' for failed attempts, and \'Login successful\' when correct.','mahesh\n123\nadmin\npython123','Wrong credentials\nLogin successful',[{input:'admin\npython123',output:'Login successful'},{input:'user\npass\nadmin\nwrong\nadmin\npython123',output:'Wrong credentials\nWrong credentials\nLogin successful'}]],
      ['Password retry limit','Set password as \'secret\'. Give the user up to 3 attempts to enter the correct password using a while loop. Print \'Login successful\' if correct, or \'Account locked\' after 3 wrong attempts.','wrong1\nwrong2\nwrong3','Account locked',[{input:'secret',output:'Login successful'},{input:'pass1\nsecret',output:'Login successful'},{input:'a\nb\nc',output:'Account locked'}]],
      ['Menu-driven program','Create a menu: 1 -> Hello, 2 -> Good Morning, 3 -> Goodbye, 4 -> Exit. Keep reading choices with a while loop until the user enters 4, then print \'Exiting\'.','1\n2\n3\n4','Hello\nGood Morning\nGoodbye\nExiting',[{input:'4',output:'Exiting'},{input:'2\n1\n4',output:'Good Morning\nHello\nExiting'},{input:'3\n4',output:'Goodbye\nExiting'}]],
      ['Simple calculator that keeps running','Read two numbers and an operator (+, -, *, /), print the calculation result, then read \'yes\' or \'no\' to continue. Keep running while \'yes\' is entered.','10\n5\n+\nyes\n20\n4\n/\nno','15\n5.0',[{input:'8\n3\n*\nno',output:'24'},{input:'50\n10\n-\nyes\n7\n3\n+\nno',output:'40\n10'}]],
      ['Input validation','Ask the user for a number between 1 and 10 (inclusive). Keep asking and printing \'Invalid\' until a valid number is entered, then print \'Accepted: <number>\'.','15\n-2\n7','Invalid\nInvalid\nAccepted: 7',[{input:'5',output:'Accepted: 5'},{input:'0\n11\n10',output:'Invalid\nInvalid\nAccepted: 10'},{input:'100\n1',output:'Invalid\nAccepted: 1'}]],
      ['Shopping total','Keep reading item prices until the user enters 0. Sum all prices using a while loop and print the total in the format: Total = <sum>.','10\n25\n15\n0','Total = 50',[{input:'120\n80\n45\n0',output:'Total = 245'},{input:'0',output:'Total = 0'},{input:'99\n1\n0',output:'Total = 100'}]],
      ['Student marks input','Read marks one by one until -1 is entered. Print \'Total students = <count>\' and \'Average marks = <avg>\' (formatted to 2 decimals, or 0.00 if 0 students).','80\n90\n70\n-1','Total students = 3\nAverage marks = 80.00',[{input:'50\n60\n-1',output:'Total students = 2\nAverage marks = 55.00'},{input:'100\n-1',output:'Total students = 1\nAverage marks = 100.00'},{input:'-1',output:'Total students = 0\nAverage marks = 0.00'}]],
      ['Guessing game with hints','Set a secret number (42). Keep reading guesses until correct: print \'Too high\' if guess > 42, \'Too low\' if guess < 42, and \'Correct!\' when equal.','50\n20\n42','Too high\nToo low\nCorrect!',[{input:'42',output:'Correct!'},{input:'10\n30\n40\n42',output:'Too low\nToo low\nToo low\nCorrect!'},{input:'99\n42',output:'Too high\nCorrect!'}]],
      ['ATM menu','Start with balance = 5000. Options: 1 -> print \'Balance: ₹<balance>\', 2 -> deposit amount, 3 -> withdraw amount (or \'Insufficient funds\'), 4 -> print \'Thank you\' and exit.','1\n2\n1500\n1\n3\n2000\n1\n4','Balance: ₹5000\nBalance: ₹6500\nBalance: ₹4500\nThank you',[{input:'4',output:'Thank you'},{input:'1\n3\n6000\n4',output:'Balance: ₹5000\nInsufficient funds\nThank you'},{input:'2\n1000\n1\n4',output:'Balance: ₹6000\nThank you'}]],
      ['Continue or stop game','Read \'yes\' or \'no\' in a while loop. For each \'yes\', print \'Playing round <round_number>\' (starting at 1). When \'no\' is entered, print \'Game over. Total rounds played = <total>\'.','yes\nyes\nno','Playing round 1\nPlaying round 2\nGame over. Total rounds played = 2',[{input:'no',output:'Game over. Total rounds played = 0'},{input:'yes\nno',output:'Playing round 1\nGame over. Total rounds played = 1'},{input:'yes\nyes\nyes\nno',output:'Playing round 1\nPlaying round 2\nPlaying round 3\nGame over. Total rounds played = 3'}]]
    ],
    advanced:[
      ['Find the largest entered','Keep reading numbers until 0 is entered and print the largest one seen.','8\n3\n11\n0','11',[{input:'-2\n-9\n0',output:'-2'},{input:'5\n5\n0',output:'5'}]],
      ['Factorial in a while loop','Take a number N and print its factorial using a while loop in the format: N! = <result>.','5','5! = 120',[{input:'4',output:'4! = 24'},{input:'0',output:'0! = 1'}]],
      ['Power with while','Take a base and an exponent and print the result using a while loop.','3 4','81',[{input:'2 5',output:'32'},{input:'2 0',output:'1'}]],
      ['Number of digits in while','Take an integer and print how many digits it has.','849201','6',[{input:'7',output:'1'},{input:'1000',output:'4'}]],
      ['Reverse a number with while','Take an integer and print its reversed digits.','12345','54321',[{input:'987',output:'789'},{input:'1042',output:'2401'}]],
      ['Print spiral-ish triangle','Take N and print rows of stars of increasing length.','4','*\n**\n***\n****',[{input:'3',output:'*\n**\n***'}]],
      ['Sum until crossing a limit','Keep reading numbers until the running total reaches 100. Print Total = <sum>.','40\n30\n50\n10','Total = 130',[{input:'60\n50',output:'Total = 110'},{input:'100',output:'Total = 100'}]],
      ['Collatz sequence','Take a number and print its Collatz sequence until it reaches 1.','6','6\n3\n10\n5\n16\n8\n4\n2\n1',[{input:'3',output:'3\n10\n5\n16\n8\n4\n2\n1'},{input:'1',output:'1'}]],
      ['Count even inputs','Read numbers until 0 is entered and print how many were even.','2\n7\n8\n0','2',[{input:'1\n2\n3\n0',output:'1'},{input:'0',output:'0'}]],
      ['Armstrong in a range','Take N and print all Armstrong numbers from 1 to N.','500','1\n153\n370\n371\n407',[{input:'200',output:'1\n153'}]]
    ]
  },
  'Nested Loops': {
    basic:[
      ['Square pattern','Print an n by n square of stars.','3','***\n***\n***',[{input:'2',output:'**\n**'}]],
      ['Number grid','Print rows of repeated numbers 1 to n.','3','123\n123\n123',[{input:'2',output:'12\n12'}]],
      ['Coordinate pairs','Print every (row, column) pair for a 2 by 3 grid.','2 3','(1,1) (1,2) (1,3)\n(2,1) (2,2) (2,3)',[{input:'1 2',output:'(1,1) (1,2)'}]],
      ['Right triangle of stars','Print a right triangle with n rows.','4','*\n**\n***\n****',[{input:'3',output:'*\n**\n***'}]],
      ['Star grid with border','Print an n x n grid where only the border uses stars and the inside uses dots.','4','****\n*..*\n*..*\n****',[{input:'3',output:'***\n*.*\n***'}]],
      ['Reversed triangle','Print a right triangle pointing down with n rows.','4','****\n***\n**\n*',[{input:'3',output:'***\n**\n*'}]],
      ['Times-table grid of doubles','Print rows that double the column number.','3','1 2\n2 4\n3 6',[{input:'4',output:'1 2 3 4\n2 4 6 8\n3 6 9 12\n4 8 12 16'}]],
      ['Diagonal of ones','Print an n x n grid of zeros with a diagonal of ones.','3','100\n010\n001',[{input:'4',output:'1000\n0100\n0010\n0001'}]],
      ['Right-aligned triangle','Print a right-aligned triangle of stars with n rows.','4','   *\n  **\n ***\n****',[{input:'3',output:'  *\n **\n***'}]],
      ['Alphabet grid','Print rows of letters from a to the given letter, repeated across columns.','2','ab\nab',[{input:'3',output:'abc\nabc\nabc'}]]
    ],
    intermediate:[
      ['Multiplication grid','Print a 1 to n multiplication grid.','3','1 2 3\n2 4 6\n3 6 9',[{input:'2',output:'1 2\n2 4'}]],
      ['Diagonal of numbers','Print a triangle where each row prints increasing numbers.','4','1\n2 3\n4 5 6',[{input:'3',output:'1\n2 3\n4 5 6'}]],
      ['Pyramid of spaces and stars','Print a centered star pyramid with n rows.','4','   *\n  ***\n *****\n*******',[{input:'3',output:'  *\n ***\n*****'}]],
      ['Pattern of same number','Print rows containing the row number repeated that many times.','4','1\n22\n333\n4444',[{input:'3',output:'1\n22\n333'}]],
      ['Inverted centered triangle','Print an inverted centered star pyramid with n rows.','4','*******\n *****\n  ***\n   *',[{input:'3',output:'*****\n ***\n  *'}]],
      ['Multiplication row file','Print the multiplication tables from 1 to n.','3','1 2 3\n2 4 6\n3 6 9',[{input:'2',output:'1 2\n2 4'}]],
      ['Sum grid','Print an n x n grid where each cell (row, col) prints row + col with row and col starting at 1.','3','2 3 4\n3 4 5\n4 5 6',[{input:'2',output:'2 3\n3 4'}]],
      ['Hollow square','Print an n x n square that is hollow inside, using stars for the border.','5','*****\n*   *\n*   *\n*   *\n*****',[{input:'2',output:'**\n**'}]],
      ['Star table of multiples','Print a triangle where the row count doubles.','4','*\n**\n****\n********',[{input:'3',output:'*\n**\n****'}]],
      ['Checkerboard of numbers','Print a grid alternating 1 and 0 like a checkerboard.','4','1010\n0101\n1010\n0101',[{input:'3',output:'101\n010\n101'}]]
    ],
    advanced:[
      ['Prime grid','Print primes in a row-wise grid up to n.','12','2 3 5\n7 11',[{input:'10',output:'2 3 5\n7'}]],
      ['Pattern of increasing stars','Print a triangle of stars using a nested loop with a running counter.','4','*\n**\n***\n****',[{input:'3',output:'*\n**\n***'}]],
      ['Number pyramid','Print centered rows of the row number repeated.','4','   1\n  222\n 33333\n4444444',[{input:'3',output:'  1\n 222\n33333'}]],
      ['Diamond of stars','Print a diamond with n rows in the top half.','3','  *\n ***\n*****\n ***\n  *',[{input:'2',output:' *\n***\n *'}]],
      ['All pairs with a smaller first','Print all ordered pairs (a, b) where 1 <= a < b <= n.','4','1,2\n1,3\n1,4\n2,3\n2,4\n3,4',[{input:'3',output:'1,2\n1,3\n2,3'}]],
      ['Grid with a gap','Print an n x n grid of stars where the main diagonal cells are spaces.','3',' **\n* *\n** ',[{input:'2',output:' *\n* '}]],
      ['Diagonal star matrix','Print an n x n grid where both diagonals have stars and the rest are dots.','4','*..*\n.**.\n.**.\n*..*',[{input:'3',output:'*.*\n.*.\n*.*'}]],
      ['Pattern triangle of decreasing spaces','Print a left-aligned triangle with leading spaces forming a staircase.','4','*\n *\n  *\n   *',[{input:'3',output:'*\n *\n  *'}]],
      ['Pattern of 1s and 0s','Print a triangle where each row alternates 1 and 0 starting with the row number parity.','4','1\n01\n101\n0101',[{input:'3',output:'1\n01\n101'}]],
      ['Multiplication pyramid','Print a triangle of consecutive products.','4','1\n2 4\n3 6 9\n4 8 12 16',[{input:'3',output:'1\n2 4\n3 6 9'}]]
    ]
  },
  'Strings': {
    basic:[
      ['First character','Print the first character of a non-empty string.','Python','P',[{input:'Code',output:'C'}]],
      ['Reverse text','Print a string in reverse using slicing.','hello','olleh',[{input:'world',output:'dlrow'}]],
      ['Count vowels','Count vowels in a lowercase string.','education','5',[{input:'sky',output:'0'}]],
      ['Last character','Print the last character of a string.','Python','n',[{input:'code',output:'e'}]],
      ['Substring slice','Print the first three and last three characters of a word.','python','pyt\nhon',[{input:'coding',output:'cod\ning'}]],
      ['Character count','Print the number of characters in a string.','developer','9',[{input:'hi',output:'2'}]],
      ['Middle character','Print the middle character of an odd-length string.','abcde','c',[{input:'code',output:'o'}]],
      ['Print each character','Print each character of a word on its own line.','hey','h\ne\ny',[{input:'go',output:'g\no'}]],
      ['Check first letter','Print True when a word starts with the letter a.','apple','True',[{input:'banana',output:'False'}]],
      ['Characters at even positions','Print the characters at even positions (0-based) of a string.','python','p t o',[{input:'code',output:'c d'}]]
    ],
    intermediate:[
      ['Palindrome check','Check whether a word reads the same forward and backward.','level','Palindrome',[{input:'python',output:'Not palindrome'}]],
      ['Longest word','Read a sentence and print its longest word.','learn python every day','python',[{input:'code is fun',output:'code'}]],
      ['Slice the middle','Print the middle three characters of an odd-length string.','abcdefg','cde',[{input:'testing',output:'sti'}]],
      ['Swap first and last','Swap the first and last characters of a word and print it.','hello','oellh',[{input:'code',output:'eodc'}]],
      ['Reverse words','Read a sentence and print its words in reverse order.','one two three','three two one',[{input:'a b c',output:'c b a'}]],
      ['String to list','Read a comma-separated string and print each value on its own line.','a,b,c','a\nb\nc',[{input:'1,2,3',output:'1\n2\n3'}]],
      ['Count spaces','Count the number of spaces in a sentence.','code every day','2',[{input:'a b c',output:'2'}]],
      ['All positions of a letter','Print the positions of a letter in a word (0-based).','banana\na','1 3 5',[{input:'hello\nl',output:'2 3'}]],
      ['First and last word','Read a sentence and print its first and last word.','learn python fast','learn\nfast',[{input:'good morning',output:'good\nmorning'}]],
      ['Caesar shift by one','Shift each letter of a lowercase word forward by one (z becomes a).','abc','bcd',[{input:'xyz',output:'yza'}]]
    ],
    advanced:[
      ['Run-length idea','Compress repeated characters into counts such as aaabb -> a3b2.','aaabb','a3b2',[{input:'wwww',output:'w4'}]],
      ['Rotation check','Check whether one string is a rotation of another.','abc\ncab','True',[{input:'abc\nacb',output:'False'}]],
      ['Anagram check','Determine whether two strings are anagrams ignoring spaces and case.','Dormitory\ndirty room','True',[{input:'hello\nworld',output:'False'}]],
      ['Swap two characters','Swap the characters at two given indices of a word.','python\n0 5','nythop',[{input:'abcde\n1 3',output:'adcbe'}]],
      ['Remove vowels','Remove all vowels from a word (a, e, i, o, u).','education','dctn',[{input:'hello',output:'hll'}]],
      ['Order by length','Read a sentence and print its words sorted by length (shortest first).','one two four','one\ntwo\nfour',[{input:'big small tiny',output:'big\ntiny\nsmall'}]],
      ['Reverse order of characters','Take a word and print it with every other character reversed.','abcdef','badcfe',[{input:'wxyz',output:'xwyz'}]],
      ['Count of substrings','Count how many times "ab" appears in a string.','abcab','2',[{input:'abab',output:'2'},{input:'zz',output:'0'}]],
      ['Remove a substring','Remove all occurrences of "abc" from a string and print the rest.','abcabcxyz','xyz',[{input:'abcxabc',output:'x'}]],
      ['Capitalize words','Convert each word of a sentence to have its first letter uppercase.','learn python fast','Learn Python Fast',[{input:'code daily',output:'Code Daily'}]]
    ]
  },
  'String Methods': {
    basic:[
      ['Clean a name','Remove extra spaces from the ends of a string and print it.','  Nina  ','Nina',[{input:'  Alex ',output:'Alex'}]],
      ['Uppercase text','Convert a sentence to uppercase.','hello python','HELLO PYTHON',[{input:'code now',output:'CODE NOW'}]],
      ['Replace spaces','Replace every space with a hyphen.','learn python fast','learn-python-fast',[{input:'quick brown fox',output:'quick-brown-fox'}]],
      ['Lowercase text','Convert a sentence to lowercase.','HELLO PYTHON','hello python',[{input:'Code Daily',output:'code daily'}]],
      ['Count words','Count words in a sentence using split().','code every day','3',[{input:'a b c d',output:'4'}]],
      ['Check a prefix','Print True when a string starts with "py".','python','True',[{input:'java',output:'False'}]],
      ['Strip and length','Remove spaces from the ends and print the result length.','  hello  ','5',[{input:'  a b ',output:'3'}]],
      ['Title case','Convert a string to title case.','hello world','Hello World',[{input:'code daily',output:'Code Daily'}]],
      ['Ends with a dot','Print True when a sentence ends with a full stop.','Hello.','True',[{input:'Hello',output:'False'}]],
      ['Check if numeric','Print True when a string is made of digits only.','12345','True',[{input:'123a',output:'False'}]]
    ],
    intermediate:[
      ['Split words','Read a sentence and print each word on its own line.','code every day','code\nevery\nday',[{input:'python is awesome',output:'python\nis\nawesome'}]],
      ['Count a substring','Count how many times a substring appears.','banana\na','3',[{input:'mississippi\ns',output:'4'}]],
      ['Title a sentence','Convert a sentence to title case.','learn python today','Learn Python Today',[{input:'hello world',output:'Hello World'}]],
      ['Join a list','Use join() to combine words with a hyphen between them.','a b c','a-b-c',[{input:'x y z',output:'x-y-z'}]],
      ['Replace a word','Replace the first occurrence of a word in a sentence.','I like python\npython\ncoding','I like coding',[{input:'a b a\na\nc',output:'c b a'}]],
      ['Find a substring','Print the index where a substring first appears, or -1 when absent.','hello world\nworld','6',[{input:'hello\nxyz',output:'-1'}]],
      ['Swap case','Print a word with its case swapped.','PyThOn','pYtHoN',[{input:'hello',output:'HELLO'}]],
      ['Remove extra spaces','Replace multiple spaces between words with a single space.','a   b    c','a b c',[{input:'x  y',output:'x y'}]],
      ['Count letters and digits','Count the letters and digits in a string.','abc123','letters=3\ndigits=3',[{input:'a1b2',output:'letters=2\ndigits=2'}]],
      ['Reverse words and join','Reverse the order of words and join them with a dash.','one two three','three-two-one',[{input:'a b',output:'b-a'}]]
    ],
    advanced:[
      ['Normalize CSV text','Turn comma-separated values into trimmed, sorted labels.',' python, java , c ','c\njava\npython',[{input:' banana , apple , cherry ',output:'apple\nbanana\ncherry'}]],
      ['Mask an email','Show only the first character and domain of an email.','nina@example.com','n***@example.com',[{input:'alex@domain.org',output:'a***@domain.org'}]],
      ['Slug builder','Create a lowercase URL slug from a title by removing extra spaces.','Python Practice Page','python-practice-page',[{input:'Hello World Test',output:'hello-world-test'}]],
      ['Check if title is clean','Print True when a string contains no spaces and every word rule is met.','hello-world','True',[{input:'hello world',output:'False'}]],
      ['Count vowels and consonants','Count vowels and consonants in a word.','python','vowels=1\nconsonants=5',[{input:'education',output:'vowels=5\nconsonants=4'}]],
      ['Mask a credit card','Show only the last four digits of a card number.','123456789012','****9012',[{input:'43219876',output:'****9876'}]],
      ['Extract numbers','Read a line and print only the digit groups found in it.','x12y345z6','12 345 6',[{input:'a1b22c','output':'1 22'}]],
      ['Remove punctuation','Remove every punctuation character and print the clean word.','hello, world!','hello world',[{input:'code.java','output':'codejava'}]],
      ['Pad a number','Pad a number to 6 characters with leading zeros.','42','000042',[{input:'7',output:'000007'}]],
      ['Capitalize each word and strip','Remove extra spaces and capitalize each word of a sentence.','  learn  python  ','Learn Python',[{input:'  code daily  ',output:'Code Daily'}]]
    ]
  },
  'Functions': {
    basic:[
      ['Create a greeting','Write a function greet(name) that returns a greeting string.','Nina','Hello, Nina!',[{input:'Aman',output:'Hello, Aman!'}]],
      ['Square a number','Write a function square(n) and print its result.','7','49',[{input:'12',output:'144'}]],
      ['Add two values','Write add(a, b) that returns their sum.','4 9','13',[{input:'20 30',output:'50'}]],
      ['Difference function','Write difference(a, b) that returns a - b.','9 4','5',[{input:'15 20',output:'-5'}]],
      ['Even check function','Write is_even(n) that returns True for even numbers.','8','True',[{input:'7',output:'False'}]],
      ['Area of a rectangle','Write area(width, height) and print the area.','4 6','24',[{input:'5 5',output:'25'}]],
      ['Length of a word','Write word_length(word) that returns the number of characters.','python','6',[{input:'code',output:'4'}]],
      ['Double a value','Write double(n) that returns two times the value.','9','18',[{input:'21',output:'42'}]],
      ['Greet three times','Call a greeting function three times and print each line.','Ria','Hello, Ria!\nHello, Ria!\nHello, Ria!',[{input:'Dev',output:'Hello, Dev!\nHello, Dev!\nHello, Dev!'}]],
      ['Positive check','Write is_positive(n) that returns True when the number is greater than 0.','6','True',[{input:'-3',output:'False'}]]
    ],
    intermediate:[
      ['Factorial function','Write factorial(n) using a loop inside a function.','5','120',[{input:'3',output:'6'}]],
      ['Return the larger','Write max_of_two(a, b) without using max().','8 13','13',[{input:'25 10',output:'25'}]],
      ['Count vowels function','Return the vowel count of a string from a function.','beautiful','5',[{input:'rhythm',output:'0'}]],
      ['Sum of a list','Write sum_list(items) that returns the total of a list.','1 2 3 4','10',[{input:'5 6 7',output:'18'}]],
      ['Average function','Write average(a, b, c) that returns the mean.','4 8 12','8.0',[{input:'3 6 9',output:'6.0'}]],
      ['Range sum function','Write range_sum(start, end) that sums numbers between them.','5\n10','45',[{input:'1\n4',output:'10'}]],
      ['First letter function','Write first_letter(word) that returns the first character.','python','p',[{input:'code',output:'c'}]],
      ['Is prime function','Write is_prime(n) that returns True for prime numbers.','17','True',[{input:'12',output:'False'}]],
      ['Repeat function','Write repeat(word, times) that returns a string repeated.','ha\n3','hahaha',[{input:'go\n2',output:'gogo'}]],
      ['Area of a circle','Write circle_area(radius) that returns the area to two decimals.','2','12.57',[{input:'1',output:'3.14'}]]
    ],
    advanced:[
      ['Prime function','Create is_prime(n) and use it to print primes up to n.','12','2 3 5 7 11',[{input:'6',output:'2 3 5'}]],
      ['Higher-order filter','Write a function that returns values passing a condition function.','1 2 3 4 5','2 4',[{input:'10 15 20 25',output:'10 20'}]],
      ['Memoized fibonacci','Create fibonacci(n) with simple memoization and return the nth value.','10','55',[{input:'7',output:'13'}]],
      ['Default argument','Write greet2(name, greeting="Hi") that uses the default when not provided.','Nina','Hi, Nina!',[{input:'Sam',output:'Hi, Sam!'}]],
      ['Keyword argument','Write describe(name, age) and call it by keyword to print a sentence.','Nina\n21','Nina is 21 years old.',[{input:'Aman\n24',output:'Aman is 24 years old.'}]],
      ['Return multiple values','Write min_max(items) that returns both the smallest and the largest.','9 2 6','(2, 9)',[{input:'4 8 3',output:'(3, 8)'}]],
      ['Recursive sum','Write a recursive function rec_sum(n) that sums from 1 to n.','5','15',[{input:'4',output:'10'}]],
      ['Recursive power','Write a recursive function rec_power(base, exp) that computes powers.','3 4','81',[{input:'2 5',output:'32'}]],
      ['Is palindrome function','Write is_palindrome(word) that returns True for palindromes.','level','True',[{input:'python',output:'False'}]],
      ['Compose two functions','Write double(n) and increment(n), then print increment(double(3)).','3','7',[{input:'5',output:'11'}]]
    ]
  },
  'Lists': {
    basic:[
      ['Sum a list','Read a list of integers and print their sum.','1 2 3 4','10',[{input:'10 20 30',output:'60'}]],
      ['Largest item','Print the largest value from a list without using max().','4 8 2 7','8',[{input:'15 3 99 42',output:'99'}]],
      ['Count matches','Count how many times a target appears in a list.','1 2 2 4 2\n2','3',[{input:'5 5 5 1\n5',output:'3'}]],
      ['First and last','Print the first and last item of a list.','1 2 3 4','1\n4',[{input:'7 8 9',output:'7\n9'}]],
      ['Add to the end','Append a value to a list and print it.','1 2 3\n4','1 2 3 4',[{input:'a b\nc',output:'a b c'}]],
      ['Reverse a list','Print a list in reverse order.','1 2 3','3 2 1',[{input:'a b c d',output:'d c b a'}]],
      ['Length of a list','Print how many items are in a list.','1 2 3 4 5','5',[{input:'a b',output:'2'}]],
      ['Access an item','Print the second item of a list.','10 20 30','20',[{input:'5 6 7',output:'6'}]],
      ['Smallest item','Print the smallest value from a list using min().','4 8 2 7','2',[{input:'15 3 99 42',output:'3'}]],
      ['Count zeros','Count how many zeros appear in a list.','0 1 0 2 0','3',[{input:'1 2 3',output:'0'}]]
    ],
    intermediate:[
      ['Remove duplicates','Create a new list that keeps the first occurrence of each value.','1 2 2 3 1','1 2 3',[{input:'4 4 5 6 5',output:'4 5 6'}]],
      ['Second largest','Find the second largest distinct value in a list.','9 4 9 7','7',[{input:'10 20 30',output:'20'}]],
      ['Rotate list','Rotate a list right by k positions.','1 2 3 4 5\n2','4 5 1 2 3',[{input:'1 2 3\n1',output:'3 1 2'}]],
      ['Even numbers list','Print only the even numbers from a list.','1 2 3 4 5 6','2 4 6',[{input:'7 8 9',output:'8'}]],
      ['Sum of evens','Print the sum of the even numbers in a list.','1 2 3 4 6','12',[{input:'9 6 8',output:'14'}]],
      ['Sorted list','Print a list sorted in ascending order.','4 9 2 6','2 4 6 9',[{input:'5 1 4',output:'1 4 5'}]],
      ['Replace negative','Replace every negative number in a list with 0 and print it.','-3 4 -1 7','0 4 0 7',[{input:'-1 -2 5',output:'0 0 5'}]],
      ['Shift list left','Shift a list left by 1 and print it.','1 2 3','2 3 1',[{input:'a b c',output:'b c a'}]],
      ['Average of list','Print the average of a list rounded to two decimals.','10 20 30','20.00',[{input:'5 10 15',output:'10.00'}]],
      ['Remove the middle','Remove the middle item from an odd-length list and print it.','1 2 3 4 5','1 2 4 5',[{input:'a b c d e',output:'a b d e'}]]
    ],
    advanced:[
      ['Stable partition','Move all negative numbers before non-negative values while keeping relative order.','3 -1 4 -2 5','-1 -2 3 4 5',[{input:'-5 1 -2 3',output:'-5 -2 1 3'}]],
      ['Merge two sorted lists','Merge two sorted lists into one sorted list.','1 3 5\n2 4 6','1 2 3 4 5 6',[{input:'1 4\n2 3',output:'1 2 3 4'}]],
      ['Frequency of each item','Print each unique value with its count.','a b a c','a:2\nb:1\nc:1',[{input:'x y x y','output':'x:2\ny:2'}]],
      ['Pair sum target','Print pairs from a list whose values add to a target.','1 2 3 4\n5','1 4\n2 3',[{input:'2 3 4\n6','output':'2 4'}]],
      ['Remove duplicates keeping order','Remove duplicates while keeping the original order.','3 1 3 2 1','3 1 2',[{input:'a b a c',output:'a b c'}]],
      ['Move zeros to the end','Move all zeros in a list to the end keeping order of others.','1 0 2 0 3','1 2 3 0 0',[{input:'0 5 0 6',output:'5 6 0 0'}]],
      ['Find the missing number','A list holds 1..n with one missing value. Print it.','4\n1 2 4','3',[{input:'5\n1 2 4 5',output:'3'}]],
      ['List of common values','Print values present in both of two lists.','1 2 3\n2 3 4','2 3',[{input:'a b\nb c',output:'b'}]],
      ['Longest word in list','Print the longest word from a list of words.','cat elephant dog','elephant',[{input:'a bb ccc','output':'ccc'}]],
      ['Rotate list left by k','Shift a list left by k positions.','1 2 3 4 5\n2','3 4 5 1 2',[{input:'a b c\n1',output:'b c a'}]]
    ]
  },
  'Tuples': {
    basic:[
      ['Access a tuple','Print the third item from a tuple of four values.','10 20 30 40','30',[{input:'5 6 7 8',output:'7'}]],
      ['Unpack values','Unpack a tuple into three variables and print them.','10 20 30','10\n20\n30',[{input:'1 2 3',output:'1\n2\n3'}]],
      ['Tuple length','Print the number of items in a tuple.','4 7 9 2','4',[{input:'1 2',output:'2'}]],
      ['First and last','Print the first and last item of a tuple.','1 2 3 4','1\n4',[{input:'7 8 9',output:'7\n9'}]],
      ['A tuple is fixed','Create a tuple and print that it cannot be changed.','1 2 3','Immutable',[{input:'4 5',output:'Immutable'}]],
      ['Count an item','Count how many times a value appears in a tuple.','1 2 2 3\n2','2',[{input:'a a b\na',output:'2'}]],
      ['Index of an item','Print the index of a value in a tuple.','a b c\nb','1',[{input:'x y z\nz',output:'2'}]],
      ['Max of tuple','Print the maximum value in a tuple.','4 8 2','8',[{input:'5 3 9',output:'9'}]],
      ['Slicing a tuple','Print the middle element of a three-item tuple.','1 2 3','2',[{input:'a b c',output:'b'}]],
      ['Sum of tuple','Print the sum of values in a tuple of numbers.','1 2 3 4','10',[{input:'5 6 7',output:'18'}]]
    ],
    intermediate:[
      ['Swap with tuple unpacking','Swap two variables using tuple unpacking.','3 9','9\n3',[{input:'100 200',output:'200\n100'}]],
      ['Min max pair','Return the smallest and largest item from a tuple.','8 2 5 1','1\n8',[{input:'10 50 30 20',output:'10\n50'}]],
      ['Nested tuple access','Read nested tuple-like data and print one inner value.','A 10 B 20\nB','20',[{input:'X 1 Y 2\nY',output:'2'}]],
      ['Count even in tuple','Count how many even numbers are in a tuple.','1 2 3 4 6','3',[{input:'5 7 9',output:'0'}]],
      ['Tuple of pairs to list','Turn a tuple of pairs into a list of keys only.','(a,1) (b,2)','a b',[{input:'(x,1) (y,4)','output':'x y'}]],
      ['Reverse a tuple','Print a tuple reversed.','1 2 3','(3, 2, 1)',[{input:'a b c',output:'(c, b, a)'}]],
      ['Sum of a tuple','Print the sum of numbers in a tuple.','4 8 2','14',[{input:'3 5 7',output:'15'}]],
      ['Average of tuple','Print the average of a tuple rounded to two decimals.','10 20 30','20.00',[{input:'5 10 15',output:'10.00'}]],
      ['Concatenate tuples','Print the result of joining two tuples.','1 2\n3 4','(1, 2, 3, 4)',[{input:'a b\nc','output':'(a, b, c)'}]],
      ['Find the second largest','Print the second largest value in a tuple.','4 9 7 9','7',[{input:'10 20 30',output:'20'}]]
    ],
    advanced:[
      ['Zip to tuples','Combine two sequences into tuples of pairs.','1 2 3\na b c','(1, a) (2, b) (3, c)',[{input:'1 2\nx y',output:'(1, x) (2, y)'}]],
      ['Flatten pairs','Turn a tuple of pairs into one flat tuple.','(1,2) (3,4)','(1, 2, 3, 4)',[{input:'(5,6) (7,8)',output:'(5, 6, 7, 8)'}]],
      ['Sort pairs by second','Sort tuple pairs by the second element.','(a,3) (b,1) (c,2)','(b, 1)\n(c, 2)\n(a, 3)',[{input:'(x,5) (y,2)',output:'(y, 2)\n(x, 5)'}]],
      ['Unpack a tuple','Read a tuple of 3 items and print each item on its own line.','10 20 30','10\n20\n30',[{input:'1 2 3',output:'1\n2\n3'}]],
      ['Tuple of numbers sum','Sum pairs inside a tuple and print each row total.','1 2\n3 4','3\n7',[{input:'5 5\n2 3',output:'10\n5'}]],
      ['Swap a tuple pair','Swap the two elements of each pair in a list of pairs.','1 2\n3 4','(2, 1)\n(4, 3)',[{input:'a b\nc d','output':'(b, a)\n(d, c)'}]],
      ['Count above average','Count how many items in a tuple are above the average.','10 20 30 40','2',[{input:'1 2 3 4','output':'2'}]],
      ['Head and tail','Print all but the first item of a tuple.','1 2 3 4','(2, 3, 4)',[{input:'a b c',output:'(b, c)'}]],
      ['Tuple as keys','Use a tuple of pairs to print each unique first value.','a 1\na 2\nb 3','a b',[{input:'x 1\ny 2\nx 3','output':'x y'}]],
      ['Nested sum','Sum the first value of each pair in a tuple of pairs.','(1,2) (3,4) (5,6)','9',[{input:'(2,7) (8,1)','output':'10'}]]
    ]
  },
  'Sets': {
    basic:[
      ['Unique values','Remove duplicates from a sequence using a set.','1 2 2 3 1','1 2 3',[{input:'5 5 6 7 7',output:'5 6 7'}]],
      ['Membership','Check whether a target exists in a set.','1 2 4\n2','True',[{input:'1 2 4\n5',output:'False'}]],
      ['Unique letters','Print the number of unique letters in a word.','banana','3',[{input:'apple',output:'4'}]],
      ['Set length','Print the number of unique values in a set.','1 1 2 3 3','3',[{input:'a b a',output:'2'}]],
      ['Add to a set','Add a value to a set and print it.','1 2\n3','1 2 3',[{input:'a b\nc',output:'a b c'}]],
      ['Remove a value','Remove a value from a set and print the rest.','1 2 3\n2','1 3',[{input:'a b c\nb',output:'a c'}]],
      ['Union of sets','Print the union of two sets.','1 2\n2 3','1 2 3',[{input:'a c\nb c',output:'a c b'}]],
      ['Intersection of sets','Print the intersection of two sets.','1 2 3\n2 3 4','2 3',[{input:'a b\nb c',output:'b'}]],
      ['Is value present','Print True when a value is in a set.','1 2 3\n3','True',[{input:'1 2\n5',output:'False'}]],
      ['Discard a value','Remove a value without error and print the set.','1 2 3\n9','1 2 3',[{input:'a b\nz',output:'a b'}]]
    ],
    intermediate:[
      ['Union and intersection','Print union and intersection of two sets.','1 2 3\n2 3 4','1 2 3 4 | 2 3',[{input:'1 2\n2 3',output:'1 2 3 | 2'}]],
      ['Common values','Find values shared by three collections.','1 2 3\n2 3 4\n2 3 5','2 3',[{input:'1 2 4\n2 4 5\n2 4 6',output:'2 4'}]],
      ['Missing values','Find numbers from 1..n missing in a set of input values.','6\n1 3 4 6','2 5',[{input:'4\n1 4',output:'2 3'}]],
      ['Unique words','Count unique words in a sentence.','code python code','2',[{input:'a b c a',output:'3'}]],
      ['Set difference','Print values that are in the first set but not the second.','1 2 3\n2','1 3',[{input:'a b c\nb',output:'a c'}]],
      ['Remove duplicates preserving order','Remove duplicates from a list while keeping order of first occurrence.','3 1 3 2','3 1 2',[{input:'a b a c',output:'a b c'}]],
      ['Intersection count','Print how many values appear in both sets.','1 2 3 4\n2 3','2',[{input:'a b\nc d',output:'0'}]],
      ['Add several','Add multiple values to a set and print its length.','1 2\n2 3 4','4',[{input:'a\nb c','output':'3'}]],
      ['Symmetric check','Print values that are in set A or set B but not both.','1 2 3\n2 3 4','1 4',[{input:'1 2\n3 4',output:'1 2 3 4'}]],
      ['Largest unique','Print the largest number in a set.','4 9 2 9','9',[{input:'5 1 4',output:'5'}]]
    ],
    advanced:[
      ['Symmetric difference','Print values present in exactly one of two sets.','1 2 3\n2 3 4','1 4',[{input:'1 2\n2 3',output:'1 3'}]],
      ['Subset check','Check whether one set is a proper subset of another.','1 2\n1 2 3','True',[{input:'1 4\n1 2 3',output:'False'}]],
      ['Unique word count','Count unique normalized words in a sentence.','Code code, PYTHON python','2',[{input:'apple Apple BANANA',output:'2'}]],
      ['Letters in both','Print the letters that appear in both words (unique).','python\nphone','p h o n',[{input:'abc\nbcd',output:'b c'}]],
      ['Find common from many','Print values shared by four lists.','1 2 3\n2 3 4\n2 3 5\n2 3 6','2 3',[{input:'a b\nb c\nb d\nb e',output:'b'}]],
      ['First non-repeating','Print the first character that appears only once in a word.','swiss','w',[{input:'aabbc','output':'c'}]],
      ['Unique characters count','Print the count of unique characters in a word without using len(set()).','hello','4',[{input:'code',output:'4'}]],
      ['Common in all sizes','Given several words, print letters common to all of them.','car\ntea\ncat','a',[{input:'red\nrun','output':'r'}]],
      ['Sort a set','Print the sorted version of a set.','3 1 2','1 2 3',[{input:'c a b',output:'a b c'}]],
      ['Set equality','Print True when two sets contain the same elements.','1 2 3\n3 2 1','True',[{input:'1 2\n2 3',output:'False'}]]
    ]
  },
  'Dictionaries': {
    basic:[
      ['Read a value','Given a small dictionary, print the value for a requested key.','name Nina age 21\nage','21',[{input:'name Nina age 21\nname',output:'Nina'}]],
      ['Count words','Count words in a sentence using a dictionary.','a b a c a','a:3\nb:1\nc:1',[{input:'x y x',output:'x:2\ny:1'}]],
      ['Add a key','Add one new key-value pair and print the dictionary.','name Nina\nage 21',"{'name': 'Nina', 'age': 21}",[{input:'role dev\nlevel senior',output:"{'role': 'dev', 'level': 'senior'}"}]],
      ['Change a value','Update the value of a key in a dictionary.','score 10\nscore 20',"{'score': 20}",[{input:'a 1\na 2',output:"{'a': 2}"}]],
      ['Check a key','Print True when a given key exists in a dictionary.','name Nina\nname','True',[{input:'name Nina\nage',output:'False'}]],
      ['Remove a key','Delete a key from a dictionary and print it.','a 1 b 2\na',"{'b': 2}",[{input:'x 1 y 2\nx',output:"{'y': 2}"}]],
      ['Keys of a dict','Print all keys present in a dictionary.','a 1 b 2','a b',[{input:'x 1 y 2',output:'x y'}]],
      ['Values of a dict','Print all values present in a dictionary.','a 1 b 2','1 2',[{input:'x 5 y 6',output:'5 6'}]],
      ['Length of dict','Print how many key-value pairs a dictionary has.','a 1 b 2 c 3','3',[{input:'x 1',output:'1'}]],
      ['Build a dict','Build a dictionary from pairs and print one value.','a 1 b 2 c 3\nb','2',[{input:'x 10 y 20\nx',output:'10'}]]
    ],
    intermediate:[
      ['Character frequency','Count the frequency of each character in a string.','banana','b:1 a:3 n:2',[{input:'noon',output:'n:2 o:2'}]],
      ['Invert a dictionary','Swap dictionary keys and values when values are unique.','a 1 b 2 c 3','1:a 2:b 3:c',[{input:'x 10 y 20',output:'10:x 20:y'}]],
      ['Group words','Group words by their first letter.','apple ant ball bat','a: apple ant\nb: ball bat',[{input:'cat car dog',output:'c: cat car\nd: dog'}]],
      ['Sum of values','Print the sum of all values in a dictionary.','a 10 b 20','30',[{input:'x 5 y 7',output:'12'}]],
      ['Largest value key','Print the key with the largest value.','a 10 b 30','b',[{input:'x 5 y 12',output:'y'}]],
      ['Default value','Print value for a key or a default when it is missing.','a 1 b 2\nc','0',[{input:'x 5\nx',output:'5'}]],
      ['Empty check','Print True when a dictionary is empty.','','True',[{input:'a 1',output:'False'}]],
      ['Merge two dicts','Merge two dictionaries into one, later values overriding.','a 1 b 2\nb 3 c 4',"{'a': 1, 'b': 3, 'c': 4}",[{input:'x 1\nx 2 y 3',output:"{'x': 2, 'y': 3}"}]],
      ['Values match key count','Print the keys whose value is greater than 10.','a 5 b 15 c 20','b c',[{input:'x 2 y 12','output':'y'}]],
      ['Square the values','Return a new dict where each value is squared.','a 2 b 3',"{'a': 4, 'b': 9}",[{input:'x 4','output':"{'x': 16}"}]]
    ],
    advanced:[
      ['Nested totals','Sum numeric values inside a nested dictionary.','a:10,20\nb:5,7','42',[{input:'x:1,2\ny:3,4',output:'10'}]],
      ['Top scorer','Read names and scores and print the highest scorer.','Nina 88\nAman 94\nRiya 91','Aman',[{input:'Leo 80\nSam 99',output:'Sam'}]],
      ['Merge settings','Merge two nested configuration dictionaries with later values overriding.','theme dark lang en\nlang fr font mono',"{'theme': 'dark', 'lang': 'fr', 'font': 'mono'}",[{input:'a 1 b 2\nb 3 c 4',output:"{'a': 1, 'b': 3, 'c': 4}"}]],
      ['Most common word','Print the word that appears most often in a sentence.','a b a c a b','a',[{input:'x y x y y',output:'y'}]],
      ['Word length map','Build a dict mapping each word to its length.','hi hello',"{'hi': 2, 'hello': 5}",[{input:'a abc','output':"{'a': 1, 'abc': 3}"}]],
      ['Count grades','Count how many students have each grade.','A B A C A',"{'A': 3, 'B': 1, 'C': 1}",[{input:'A A B','output':"{'A': 2, 'B': 1}"}]],
      ['Sum by key group','Given pairs, sum values that share the same key.','a 5\na 3\nb 2',"{'a': 8, 'b': 2}",[{input:'x 1\nx 2\ny 4',output:"{'x': 3, 'y': 4}"}]],
      ['Dict of reversed char count','Print the count of each letter in a sentence.','hello world',"{'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}",[{input:'aab','output':"{'a': 2, 'b': 1}"}]],
      ['Frequency of numbers','Count how many times each number appears in a list.','1 2 1 3',"{'1': 2, '2': 1, '3': 1}",[{input:'4 4 5','output':"{'4': 2, '5': 1}"}]],
      ['Max value key','Print the key with the largest value in a dict.','a 3 b 8 c 5','b',[{input:'x 2 y 10',output:'y'}]]
    ]
  },
    'Comprehension': {
  "basic": [
    [
      "Squares list",
      "Build a list of squares from 1 to N using a list comprehension.",
      "5",
      "1 4 9 16 25",
      [
        {
          "input": "3",
          "output": "1 4 9"
        },
        {
          "input": "6",
          "output": "1 4 9 16 25 36"
        }
      ]
    ],
    [
      "Numbers from 0 to N-1",
      "Use a list comprehension to create a list of numbers from 0 to N-1.",
      "5",
      "0 1 2 3 4",
      [
        {
          "input": "3",
          "output": "0 1 2"
        },
        {
          "input": "1",
          "output": "0"
        }
      ]
    ],
    [
      "Evens up to N",
      "Create a list of even numbers from 1 to N using a list comprehension with an if condition.",
      "10",
      "2 4 6 8 10",
      [
        {
          "input": "6",
          "output": "2 4 6"
        },
        {
          "input": "5",
          "output": "2 4"
        }
      ]
    ],
    [
      "Uppercase words",
      "Read space-separated words and create a list of uppercase words using a list comprehension.",
      "hi code python",
      "HI CODE PYTHON",
      [
        {
          "input": "learn fast",
          "output": "LEARN FAST"
        }
      ]
    ],
    [
      "Lengths of words",
      "Read words and create a list containing the length of each word using a list comprehension.",
      "hi hello python",
      "2 5 6",
      [
        {
          "input": "a bc def",
          "output": "1 2 3"
        }
      ]
    ],
    [
      "Multiples of 5",
      "Create a list of multiples of 5 from 1 to N using a list comprehension with if.",
      "25",
      "5 10 15 20 25",
      [
        {
          "input": "14",
          "output": "5 10"
        }
      ]
    ],
    [
      "Dictionary of squares",
      "Read N and build a dictionary {i: i * i} for numbers from 1 to N using a dictionary comprehension.",
      "4",
      "{1: 1, 2: 4, 3: 9, 4: 16}",
      [
        {
          "input": "3",
          "output": "{1: 1, 2: 4, 3: 9}"
        }
      ]
    ],
    [
      "Word length dictionary",
      "Read words and build a dictionary mapping each word to its length using a dictionary comprehension.",
      "cat apple",
      "{'cat': 3, 'apple': 5}",
      [
        {
          "input": "hi python",
          "output": "{'hi': 2, 'python': 6}"
        }
      ]
    ],
    [
      "Set comprehension unique squares",
      "Read space-separated integers and create a set of their squares using a set comprehension.",
      "1 2 2 3 3",
      "{1, 4, 9}",
      [
        {
          "input": "2 2 4",
          "output": "{16, 4}"
        }
      ]
    ],
    [
      "Odd numbers list",
      "Read N and create a list of odd numbers from 1 to N using a list comprehension.",
      "9",
      "1 3 5 7 9",
      [
        {
          "input": "6",
          "output": "1 3 5"
        }
      ]
    ]
  ],
  "intermediate": [
    [
      "Even and odd labels",
      "Read N and produce a list of \"Even\" or \"Odd\" labels for 1 to N using if-else inside a list comprehension.",
      "4",
      "Odd Even Odd Even",
      [
        {
          "input": "3",
          "output": "Odd Even Odd"
        },
        {
          "input": "5",
          "output": "Odd Even Odd Even Odd"
        }
      ]
    ],
    [
      "Filter numbers over threshold",
      "Given a list of numbers and a threshold K, keep only numbers greater than K using a list comprehension.",
      "1 5 9 12\n7",
      "9 12",
      [
        {
          "input": "4 6 8\n5",
          "output": "6 8"
        }
      ]
    ],
    [
      "Filter dictionary by value",
      "Given name and score pairs, keep only students with score >= 40 using a dictionary comprehension.",
      "Nina 85 Sam 30 Leo 60",
      "{'Nina': 85, 'Leo': 60}",
      [
        {
          "input": "A 50 B 20",
          "output": "{'A': 50}"
        }
      ]
    ],
    [
      "Positive numbers only",
      "Given space-separated integers, extract only positive numbers using a list comprehension with if.",
      "-1 2 -3 4 5 -6",
      "2 4 5",
      [
        {
          "input": "-5 10 -2 20",
          "output": "10 20"
        }
      ]
    ],
    [
      "Set comprehension unique vowels",
      "Read a sentence and extract all unique vowels present using a set comprehension.",
      "python programming",
      "i o",
      [
        {
          "input": "hello world",
          "output": "e o"
        }
      ]
    ],
    [
      "Square of odd numbers only",
      "Read N and build a list of squares for only odd numbers from 1 to N using a list comprehension.",
      "9",
      "1 9 25 49 81",
      [
        {
          "input": "5",
          "output": "1 9 25"
        }
      ]
    ],
    [
      "Invert dictionary",
      "Swap keys and values of a dictionary using a dictionary comprehension.",
      "a 1 b 2 c 3",
      "{'1': 'a', '2': 'b', '3': 'c'}",
      [
        {
          "input": "x 10 y 20",
          "output": "{'10': 'x', '20': 'y'}"
        }
      ]
    ],
    [
      "Clean and strip strings",
      "Given comma-separated names with extra whitespace, clean them using a list comprehension.",
      "  Mahesh ,  Rahul , Priya  ",
      "Mahesh, Rahul, Priya",
      [
        {
          "input": "  apple , banana  ",
          "output": "apple, banana"
        }
      ]
    ],
    [
      "String length filter",
      "Read words and keep only words with length >= 4 using a list comprehension with if.",
      "cat elephant dog lion",
      "elephant lion",
      [
        {
          "input": "go code python",
          "output": "code python"
        }
      ]
    ],
    [
      "Even squares dictionary",
      "Build a dictionary {x: x * x} for only even numbers from 1 to N using a dictionary comprehension.",
      "6",
      "{2: 4, 4: 16, 6: 36}",
      [
        {
          "input": "5",
          "output": "{2: 4, 4: 16}"
        }
      ]
    ]
  ],
  "advanced": [
    [
      "Flatten 2D matrix",
      "Flatten a 2D matrix into a 1D list using a nested list comprehension.",
      "1 2\n3 4",
      "1 2 3 4",
      [
        {
          "input": "5 6\n7 8",
          "output": "5 6 7 8"
        },
        {
          "input": "1 2 3\n4 5 6",
          "output": "1 2 3 4 5 6"
        }
      ]
    ],
    [
      "Cartesian pairs",
      "Given two lists of items, build all coordinate pair tuples (a, b) using a list comprehension.",
      "1 2\na b",
      "(1, a) (1, b) (2, a) (2, b)",
      [
        {
          "input": "x y\n1 2",
          "output": "(x, 1) (x, 2) (y, 1) (y, 2)"
        }
      ]
    ],
    [
      "Vowel or consonant tags",
      "For each character in a lowercase word, output \"V\" if vowel else \"C\" using if-else in a list comprehension.",
      "code",
      "C V C V",
      [
        {
          "input": "python",
          "output": "C C C C V C"
        }
      ]
    ],
    [
      "Unique word lengths set",
      "Given a sentence, create a set of lengths of words that have length >= 3 using set comprehension.",
      "go for the big win today",
      "{3, 5}",
      [
        {
          "input": "python code is fun",
          "output": "{3, 4, 6}"
        }
      ]
    ],
    [
      "Character frequency dictionary",
      "Build a character count dictionary for a string using a dictionary comprehension.",
      "banana",
      "{'b': 1, 'a': 3, 'n': 2}",
      [
        {
          "input": "noon",
          "output": "{'n': 2, 'o': 2}"
        }
      ]
    ],
    [
      "Matrix transpose",
      "Transpose a 2x3 matrix into 3x2 using a nested list comprehension.",
      "1 2 3\n4 5 6",
      "1 4\n2 5\n3 6",
      [
        {
          "input": "10 20 30\n40 50 60",
          "output": "10 40\n20 50\n30 60"
        }
      ]
    ],
    [
      "Filter and discount dictionary",
      "Apply a 10% discount (round to int) to products with price >= 100 in a dictionary.",
      "pen 20 book 150 bag 200",
      "{'book': 135, 'bag': 180}",
      [
        {
          "input": "shirt 120 cap 50",
          "output": "{'shirt': 108}"
        }
      ]
    ],
    [
      "Extract matrix column",
      "Extract column index K (0-indexed) from a 3x3 matrix using a list comprehension.",
      "1 2 3\n4 5 6\n7 8 9\n1",
      "2 5 8",
      [
        {
          "input": "1 2 3\n4 5 6\n7 8 9\n0",
          "output": "1 4 7"
        }
      ]
    ],
    [
      "Filter non-zero dictionary",
      "Filter out all keys whose value is 0 from a dictionary using a dictionary comprehension.",
      "a 5 b 0 c 10 d 0",
      "{'a': 5, 'c': 10}",
      [
        {
          "input": "x 0 y 4",
          "output": "{'y': 4}"
        }
      ]
    ],
    [
      "Divisible by 3 and 5",
      "From 1 to N, collect numbers divisible by both 3 and 5 using a list comprehension.",
      "45",
      "15 30 45",
      [
        {
          "input": "30",
          "output": "15 30"
        },
        {
          "input": "14",
          "output": ""
        }
      ]
    ]
  ]
},
  'Exception Handling': {
    basic:[
      ['Safe division','Divide two values and print a friendly message when division by zero occurs.','10 0','Cannot divide by zero',[{input:'10 2',output:'5.0'}]],
      ['Integer parser','Convert a string to int and print Invalid on failure.','abc','Invalid',[{input:'42',output:'42'}]],
      ['Index guard','Read an index and handle an out-of-range list access.','10','Index out of range',[{input:'1',output:'20'}]],
      ['Safe conversion to float','Convert a string to float and print Not a number on failure.','3.5','3.5',[{input:'abc',output:'Not a number'}]],
      ['Zero check in subtraction','Subtract two numbers, catching only when the result is exact.','10 3','7',[{input:'9 5',output:'4'}]],
      ['List element getter','Read an index into a list and print the value or Default.','2','30',[{input:'9',output:'Default'}]],
      ['Dict lookup guard','Look up a key and print Missing when it is not present.','name Nina\nage','Missing',[{input:'name Nina\nname',output:'Nina'}]],
      ['Parse a list of numbers','Convert each token to int, skipping invalid ones.','10 a 20','10 20',[{input:'1 x 2','output':'1 2'}]],
      ['Safe type conversion','Try to convert a value to int, falling back to its string length on failure.','123','123',[{input:'abc',output:'3'}]],
      ['Divide many','Divide 100 by each value in a list, printing errors for zeros.','10 0 4','10\nError\n25',[{input:'2 0',output:'50\nError'}]]
    ],
    intermediate:[
      ['Retry input','Keep asking for a valid integer using try/except.','x\n12','12',[{input:'15',output:'15'}]],
      ['File-style parser','Parse several values and skip invalid numeric entries.','10 a 4 b 7','10 4 7',[{input:'1 x 2 y',output:'1 2'}]],
      ['Key guard','Safely access a dictionary key and print Missing when absent.','name Nina\ncity','Missing',[{input:'name Nina\nname',output:'Nina'}]],
      ['Convert then add','Read two values, convert to int, and add, handling errors.','3 4','7',[{input:'a 4','output':'Invalid'}]],
      ['Safe average','Compute an average of a list of numbers, guarding against empty.','','0.00',[{input:'4 6',output:'5.00'}]],
      ['Try a division table','Print 100 / n for numbers in a range, skipping zero.','0 1 2','Error\n100.0\n50.0',[{input:'1 2','output':'100.0\n50.0'}]],
      ['Parse scores','Count how many valid integers appear on a line.','10 abc 30','2',[{input:'a b',output:'0'}]],
      ['Exception type message','Read two values and print the specific error that occurs on invalid input.','10 0','ZeroDivisionError',[{input:'10 2',output:'None'}]],
      ['Retry with max attempts','Keep reading until a valid int or after 3 failures print Fail.','a\nb\nc','Fail',[{input:'1','output':'1'}]],
      ['Safe list sum','Sum a comma-separated list, ignoring non-numeric values.','1,2,x,3','6',[{input:'a,4,b','output':'4'}]]
    ],
    advanced:[
      ['Custom error','Raise ValueError for a negative age and handle it cleanly.','-2','Age must be non-negative',[{input:'25',output:'25'}]],
      ['Transaction guard','Process a set of updates and roll back when any update is invalid.','+10\n-5\n-20','Rolled back',[{input:'+10\n-5',output:'5'}]],
      ['Nested handling','Handle conversion and division errors separately in one flow.','x\n2','Invalid number',[{input:'10\n0',output:'Cannot divide by zero'}]],
      ['Safe percentage','Calculate a percentage, guarding against non-numeric and zero denominators.','10 0','Error',[{input:'20 50',output:'40.0'}]],
      ['Parse salary slip','Read a salary and raise an error when it is negative.','-5','Salary cannot be negative',[{input:'5000',output:'5000'}]],
      ['List access custom','Read an index and print the value or a custom IndexError message.','5','Invalid index',[{input:'1',output:'50'}]],
      ['Convert a CSV row','Convert each cell of a row to int, raising for invalid cells.','1,2,3','1 2 3',[{input:'1,x','output':"'x' is not a number"}]],
      ['Graceful percentage of many','Compute percentages for many values, printing entries on error.','10 0 25\n40','25.0\nError\n62.5',[{input:'20 0\n50','output':'40.0\nError'}]],
      ['Trade calculation','Compute a price with a markup, raising when markup is invalid.','100 50','150.0',[{input:'100 -10','output':'Invalid markup'}]],
      ['Two types of errors','Read two numbers and report whether an error is a type or value error.','abc 2','Type error',[{input:'10 0',output:'Value error'}]]
    ]
  },
  'File Handling': {
    basic:[
      ['Read a file','Read all lines from a text file and print them.','hello.txt','Hello\nWorld\nPython file handling',[{input:'notes.txt',output:'Learning Python\nPractice makes perfect\nLine 3 notes'}]],
      ['Write text','Write a given line to a text file.','Hello Python','File saved',[{input:'Test message',output:'File saved'}]],
      ['Count lines','Count the number of non-empty lines in a file.','notes.txt','3',[{input:'hello.txt',output:'3'}]],
      ['Print first line','Print only the first line of a text file.','hello.txt','Hello',[{input:'notes.txt',output:'Learning Python'}]],
      ['Read a file in a loop','Loop over a file and print each line.','notes.txt','Learning Python\nPractice makes perfect\nLine 3 notes',[{input:'hello.txt',output:'Hello\nWorld\nPython file handling'}]],
      ['Check if a file exists','Print True when a file exists.','hello.txt','True',[{input:'missing.txt',output:'False'}]],
      ['Append a line','Add a line to a file and report success.','done','Appended',[{input:'new',output:'Appended'}]],
      ['Word count in file','Count all words in a text file.','notes.txt','7',[{input:'hello.txt',output:'4'}]],
      ['Print last line','Print the last line of a text file.','notes.txt','Line 3 notes',[{input:'hello.txt',output:'Python file handling'}]],
      ['Delete a file','Delete a file and print a message.','notes.txt','File deleted',[{input:'temp.txt',output:'File deleted'}]]
    ],
    intermediate:[
      ['Copy a file','Read one file and write its contents into another file.','source.txt','Copied',[{input:'hello.txt',output:'Copied'}]],
      ['Log summary','Read a log and count ERROR and INFO lines.','INFO\nERROR\nINFO','INFO: 2\nERROR: 1',[{input:'ERROR\nERROR',output:'INFO: 0\nERROR: 2'}]],
      ['Append notes','Append a new note to a file and print the new line count.','done','4',[{input:'another',output:'4'}]],
      ['Read numbers and sum','Read integers from a file and print their total.','nums.txt','15',[{input:'data.txt',output:'33'}]],
      ['Reverse file lines','Print the lines of a file in reverse order.','a.txt','c\nb\na',[{input:'b.txt',output:'z\ny\nx'}]],
      ['Longest line','Print the length of the longest line in a file.','notes.txt','22',[{input:'hello.txt',output:'21'}]],
      ['Word frequency','Count how often a word appears in a file.','notes.txt\nPython','2',[{input:'notes.txt\nperfect',output:'1'}]],
      ['Replace in file','Replace a word in a file and write the result.','python\ncoding','Replaced',[{input:'a\nb',output:'Replaced'}]],
      ['Write numbers','Write numbers from 1 to n into a file.','4','Written',[{input:'5',output:'Written'}]],
      ['Count a character','Count how many times a character appears in a file.','hello.txt\no','2',[{input:'hello.txt\na',output:'1'}]]
    ],
    advanced:[
      ['CSV totals','Read rows from a CSV-like file and calculate a numeric column total.','a,10\nb,20','30',[{input:'x,5\ny,15',output:'20'}]],
      ['Safe file read','Handle missing files and print a simple error message.','missing.txt','File not found',[{input:'absent.txt',output:'File not found'}]],
      ['Chunk a large file','Read a text file and report how many chunks of size n are needed.','2500\n1000','3',[{input:'1000\n500',output:'2'}]],
      ['Filter lines','Print lines from a file that contain a given word.','a.txt\ncat','z line 2',[{input:'a.txt\ndog','output':'z line 2'}]],
      ['Largest number in file','Read numbers from a file and print the maximum.','nums.txt','15',[{input:'data.txt','output':'22'}]],
      ['Merge two files','Combine the contents of two files into one.','a.txt b.txt','Merged',[{input:'x.txt y.txt',output:'Merged'}]],
      ['Sort numbers file','Read numbers from a file, sort them and print.','nums.txt','5 7 8 9 10',[{input:'data.txt','output':'9 12 21 33'}]],
      ['File to dictionary','Build a dictionary from a file of key-value pairs and print one value.','config.txt\nhost','localhost',[{input:'config.txt\nport',output:'8080'}]],
      ['Read and update a counter','Read a counter, add 1, and write it back.','counter.txt','Incremented',[{input:'counter.txt','output':'Incremented'}]],
      ['Search and count matches','Count how many lines match a pattern in a file.','a.txt\ndog','2',[{input:'a.txt\nline','output':'3'}]]
    ]
  },
    'Modules and Packages': {
  "basic": [
    [
      "Square root with math",
      "Read a number and use math.sqrt() to print its square root.",
      "16",
      "4.0",
      [
        {
          "input": "25",
          "output": "5.0"
        },
        {
          "input": "100",
          "output": "10.0"
        }
      ]
    ],
    [
      "Ceil and floor",
      "Read a decimal number and print its ceil and floor using math.",
      "4.3",
      "5\n4",
      [
        {
          "input": "9.8",
          "output": "10\n9"
        }
      ]
    ],
    [
      "Factorial with math",
      "Read an integer N and print math.factorial(N).",
      "5",
      "120",
      [
        {
          "input": "4",
          "output": "24"
        },
        {
          "input": "6",
          "output": "720"
        }
      ]
    ],
    [
      "GCD with math",
      "Read two integers and find their greatest common divisor with math.gcd().",
      "48 18",
      "6",
      [
        {
          "input": "24 36",
          "output": "12"
        }
      ]
    ],
    [
      "Circle area with math.pi",
      "Read radius R and calculate area = math.pi * R * R to two decimal places.",
      "3",
      "28.27",
      [
        {
          "input": "5",
          "output": "78.54"
        }
      ]
    ],
    [
      "Import with alias",
      "Import math as m and calculate m.pow(2, 4).",
      "",
      "16.0",
      [
        {
          "input": "",
          "output": "16.0"
        }
      ]
    ],
    [
      "Integer square root",
      "Read N and use math.isqrt(N) to compute the integer square root.",
      "20",
      "4",
      [
        {
          "input": "100",
          "output": "10"
        }
      ]
    ],
    [
      "Radians to degrees",
      "Read an angle in radians and convert it using math.degrees() rounded to 1 decimal.",
      "3.14159",
      "180.0",
      [
        {
          "input": "1.5708",
          "output": "90.0"
        }
      ]
    ],
    [
      "Random choice simulation",
      "Pick a word from a list of given words using index simulation.",
      "apple banana mango\n1",
      "banana",
      [
        {
          "input": "red green blue\n0",
          "output": "red"
        }
      ]
    ],
    [
      "Hypotenuse calculation",
      "Read base and perpendicular sides and calculate hypotenuse using math.hypot().",
      "3 4",
      "5.0",
      [
        {
          "input": "5 12",
          "output": "13.0"
        }
      ]
    ]
  ],
  "intermediate": [
    [
      "Counter frequency",
      "Use collections.Counter on words and print the count for a requested word.",
      "apple banana apple cherry apple\napple",
      "3",
      [
        {
          "input": "cat dog cat\ncat",
          "output": "2"
        }
      ]
    ],
    [
      "Days between dates",
      "Read two dates in YYYY-MM-DD format and print the number of days between them.",
      "2026-01-01\n2026-01-11",
      "10",
      [
        {
          "input": "2026-05-01\n2026-05-20",
          "output": "19"
        }
      ]
    ],
    [
      "Formatted date string",
      "Read year, month, day and print formatted as DD/MM/YYYY using datetime.",
      "2026 9 2",
      "02/09/2026",
      [
        {
          "input": "2025 12 25",
          "output": "25/12/2025"
        }
      ]
    ],
    [
      "Permutations count",
      "Read N and R and compute number of permutations math.perm(N, R).",
      "5 2",
      "20",
      [
        {
          "input": "6 3",
          "output": "120"
        }
      ]
    ],
    [
      "Combinations count",
      "Read N and R and compute number of combinations math.comb(N, R).",
      "5 2",
      "10",
      [
        {
          "input": "6 3",
          "output": "20"
        }
      ]
    ],
    [
      "Trigonometric values",
      "Read angle in degrees, convert to radians, and print math.sin() to two decimal places.",
      "90",
      "1.00",
      [
        {
          "input": "30",
          "output": "0.50"
        }
      ]
    ],
    [
      "Add days to date",
      "Read a date YYYY-MM-DD and an integer N, add N days and print the resulting date.",
      "2026-01-01\n5",
      "2026-01-06",
      [
        {
          "input": "2026-02-25\n5",
          "output": "2026-03-02"
        }
      ]
    ],
    [
      "Median calculation",
      "Read space-separated numbers and print their median using statistics.median().",
      "1 3 5 7 9",
      "5.0",
      [
        {
          "input": "10 20 30 40",
          "output": "25.0"
        }
      ]
    ],
    [
      "Logarithm calculation",
      "Read a number X and base B and compute math.log(X, B) rounded to two decimals.",
      "8 2",
      "3.00",
      [
        {
          "input": "100 10",
          "output": "2.00"
        }
      ]
    ],
    [
      "Compound interest with pow",
      "Read principal, annual rate (percent), and years, compute compound interest amount.",
      "1000 5 2",
      "1102.50",
      [
        {
          "input": "500 10 1",
          "output": "550.00"
        }
      ]
    ]
  ],
  "advanced": [
    [
      "Defaultdict word grouping",
      "Group words by their length into a dictionary and print length groups.",
      "cat dog fish bird",
      "3: cat dog\n4: fish bird",
      [
        {
          "input": "a be see",
          "output": "1: a\n2: be\n3: see"
        }
      ]
    ],
    [
      "Euler distance 2D",
      "Read coordinates (x1, y1) and (x2, y2) and calculate Euclidean distance with math.dist().",
      "0 0 3 4",
      "5.0",
      [
        {
          "input": "1 1 4 5",
          "output": "5.0"
        }
      ]
    ],
    [
      "Deque rotation",
      "Read integers and rotate them right by K steps.",
      "1 2 3 4 5\n2",
      "4 5 1 2 3",
      [
        {
          "input": "10 20 30\n1",
          "output": "30 10 20"
        }
      ]
    ],
    [
      "Module name guard check",
      "Simulate checking if __name__ == \"__main__\" and print Running directly or Imported.",
      "__main__",
      "Running directly",
      [
        {
          "input": "my_module",
          "output": "Imported"
        }
      ]
    ],
    [
      "Path basename and dirname",
      "Read a file path and print its directory and filename.",
      "folder/subfolder/test.py",
      "folder/subfolder\ntest.py",
      [
        {
          "input": "docs/report.pdf",
          "output": "docs\nreport.pdf"
        }
      ]
    ],
    [
      "Statistics mode and variance",
      "Read numbers and print mode and sample variance (1 decimal place).",
      "1 2 2 3 4",
      "Mode: 2\nVariance: 1.3",
      [
        {
          "input": "5 5 5 5",
          "output": "Mode: 5\nVariance: 0.0"
        }
      ]
    ],
    [
      "Weekday of date",
      "Read date YYYY-MM-DD and print day of the week (e.g. Monday, Tuesday).",
      "2026-09-02",
      "Wednesday",
      [
        {
          "input": "2026-01-01",
          "output": "Thursday"
        }
      ]
    ],
    [
      "Pseudo-random LCG sequence",
      "Generate first 5 numbers of a Linear Congruential Generator given seed, a, c, m.",
      "1 5 1 16",
      "6 15 12 13 2",
      [
        {
          "input": "3 2 3 10",
          "output": "9 1 5 3 9"
        }
      ]
    ],
    [
      "Cumulative product with itertools",
      "Read integers and compute cumulative products.",
      "1 2 3 4",
      "1 2 6 24",
      [
        {
          "input": "2 3 2",
          "output": "2 6 12"
        }
      ]
    ],
    [
      "Cartesian product with itertools",
      "Generate product of two collections.",
      "A B\n1 2",
      "A1 A2 B1 B2",
      [
        {
          "input": "X Y\n9",
          "output": "X9 Y9"
        }
      ]
    ]
  ]
},
  'Object-Oriented Programming': {
    basic:[
      ['Create a class','Create a Person class with a name attribute and print it.','Nina','Nina',[{input:'Aman',output:'Aman'}]],
      ['Add a method','Create a Rectangle class with area().','4 6','24',[{input:'5 5',output:'25'}]],
      ['Use __init__','Create a Book object using __init__ and print its title.','Python Basics','Python Basics',[{input:'Fluent Python',output:'Fluent Python'}]],
      ['Greeting method','Add a greet() method to a class that prints a message.','Alex','Hello, Alex!',[{input:'Ria',output:'Hello, Ria!'}]],
      ['Age attribute','Create a class with an age attribute and print it.','21','21',[{input:'30',output:'30'}]],
      ['Perimeter method','Add perimeter() to a Rectangle class.','4 6','20',[{input:'5 5',output:'20'}]],
      ['String representation','Override __str__ to print a friendly message.','Nina','I am Nina.',[{input:'Sam',output:'I am Sam.'}]],
      ['Counter with class','Create a class and count how many objects are made.','3','3',[{input:'5',output:'5'}]],
      ['Simple inheritance','Create a base class and a child class that inherits from it.','dog','Animal: dog',[{input:'cat',output:'Animal: cat'}]],
      ['Instantiate twice','Create two objects from one class and print both names.','Nina\nAman','Nina\nAman',[{input:'a\nb',output:'a\nb'}]]
    ],
    intermediate:[
      ['Bank account','Create a BankAccount class with deposit and withdraw methods.','1000\n250\n100','1150',[{input:'500\n100\n50',output:'550'}]],
      ['Inheritance','Create Animal and Dog classes where Dog overrides speak().','dog','Woof',[{input:'cat',output:'Meow'}]],
      ['Class counter','Track how many objects of a class have been created.','3','3',[{input:'5',output:'5'}]],
      ['Circle class','Create a Circle class with area() to two decimals.','2','12.57',[{input:'1',output:'3.14'}]],
      ['Student class','Create a Student class with a marks attribute and pass/fail method.','78','Pass',[{input:'35',output:'Fail'}]],
      ['Square class','Create a Square class with side length and area().','5','25',[{input:'3',output:'9'}]],
      ['Class radius param','Create a Circle with a radius set at construction and print its area.','4','50.27',[{input:'2',output:'12.57'}]],
      ['Bank transfer','Add a transfer method to a BankAccount class.','1000\n200\n300','1100',[{input:'500\n100\n50',output:'550'}]],
      ['Vehicle subclass','Create Vehicle and Car classes where Car overrides a method.','car','Car is moving',[{input:'bike',output:'Bike is moving'}]],
      ['Compare objects','Implement __lt__ to compare two Book objects by pages.','300\n200','Book A is longer',[{input:'150\n400',output:'Book B is longer'}]]
    ],
    advanced:[
      ['Encapsulation','Build a class with a private balance and safe deposit/withdraw methods.','1000\n-50','950',[{input:'500\n-100',output:'400'}]],
      ['Polymorphism','Use a common draw() method across different shape classes.','circle square','Drawing circle\nDrawing square',[{input:'square circle',output:'Drawing square\nDrawing circle'}]],
      ['Library model','Model Book and Library classes and search books by title.','Python\nJava\nPython','Python',[{input:'C++\nGo\nRust',output:'Not found'}]],
      ['Class attribute shared','Create a class with a shared attribute and print it from two objects.','','python',[{input:'',output:'python'}]],
      ['Inheritance chain','Create a three-level inheritance chain and print the call.','','Grandchild',[{input:'',output:'Grandchild'}]],
      ['Property getter','Create a class with a property that squares a value on access.','5','25',[{input:'4',output:'16'}]],
      ['Static method','Create a static helper method on a class.','12','7',[{input:'20',output:'11'}]],
      ['Method overriding with super','Call the parent method from a child overridden method.','','Woof and Animal',[{input:'',output:'Woof and Animal'}]],
      ['Bank inheritance','Have SavingsAccount inherit from BankAccount and add interest.','1000\n5','1050',[{input:'2000\n10',output:'2200'}]],
      ['Composition','Compose a Library from multiple Book objects and list titles.','Python\nJava','Python\nJava',[{input:'Go\nRust',output:'Go\nRust'}]]
    ]
  }
};

/* ==========================================================================
   Topic content sourcing
   ==========================================================================
   A topic can be served from a shared bucket rather than owning its own
   array. Two topics drawing on one bucket then hold identical questions,
   so question ids are filed under the SOURCE name (see TOPIC_SOURCE) —
   otherwise a learner solves "Swap two variables" under Variables and
   meets it again, still unsolved, under Data Types.
   ========================================================================== */

const TOPIC_SOURCE = {
  'Loops': 'For Loops',
  'List Comprehension': 'Comprehension',
  'Comprehensions': 'Comprehension'
};

questionSeeds['Loops'] = questionSeeds['For Loops'];

questionSeeds['List Comprehension'] = questionSeeds['Comprehension'];
questionSeeds['Comprehensions'] = questionSeeds['Comprehension'];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { topics, questionSeeds, TOPIC_SOURCE };
}

