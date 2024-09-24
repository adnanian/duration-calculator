# Duration Calculator

|                                                         	|                                                      	|
|:-------------------------------------------------------:	|:----------------------------------------------------:	|
|                          Author                         	|                     Adnan Wazwaz                     	|
|                         Version                         	|                          1.0                         	|
|                      Original Date                      	|                   2024 September 24                  	|
|                   Current Version Date                  	|                   2024 September 24                  	|
|                     Adnanian App No.                    	|                          TBD                         	|
| [**Demo**](https://www.youtube.com/watch?v=yooOnKeghUc) 	| [**Live**](https://duration-calculator.netlify.app/) 	|

## Table of Contents

## Overview

### What This Application Does

Duration Calculator is a simple front-end web application that allows you to
calculate the total amount of time to complete your processes and tasks. In this
context, a *duration* is defined as the amount of time during which something
continues or lasts.

For example, you take three walks every day: the first walk you take right before
work, early in the morning around your neighborhood; the second walk during lunch
break around the building where you work at; and the final walk around your
neighborhood again after you've come home from work.

Suppose that it takes you (on average) **fifteen minutes** to walk from your
home around the neighborhood until you come back home, and **three minutes** and
**thirty-five seconds** to walk around the company building. During break, you
walk around the building **four times**. This means that the duration for the
neighborhood walk is 15 minutes, and the company building lap is 3 minutes, and
35 seconds.

The total duration in this scenario would be **44 minutes and 20 seconds**. This
is calcualted like so:

$$ totalDuration = (neighborhoodLap × 2) + (companyBuildingLap × 4) $$
$$ = (15 min × 2) + (3 min, 35 sec × 4) $$
$$ = 30 min + 14 min, 20 sec $$
$$ = 44 min, 20 sec $$

Note, that the actual times during the days, such as 8:30 PM and 9:45 AM, are
not taken into account when calculating total durations. Also note that I do
not take days, weeks, months, or years into account as they obstruct my needs
for calculating total durations. Saying that it took 1 day and 15 hours to
complete a task, while mathematically accurate, does not mean that I spent
39 hours in one session to complete that task. It's better to cap the units
at hours.

### Why This Application was Created

This application was created out of inspiration for the mobile application,
*Time Calculator*, by Hà Thành, which is available on both
[Apple](https://apps.apple.com/us/app/time-calculator/id1369060155) and
[Android](https://play.google.com/store/apps/details?id=com.teaxapp.hourcal&hl=en-US).

There are times where I want to avoid using my phone due to the psychological
dangers of checking for notifications or scrolling on social media. During
such periods, I would need to calculate durations for my work, side-projects,
and personal hobbies of mine. (Yes, when I say I emphasize efficiency, I mean it.)
However, I surprisingly discover that there is not a website that calculates
durations without being forced to incorporate starting and end times. While such
a thing is very beneficial for many situations, my situtations personally don't
require it. So this is one reason why I decided to create a web application that
can solve this need for me.

Another reason was because during the time the first version of this app was
developed, I was learning TypeScript and wanted to hone my skills for it. And
what better way to improve your tech stack than practicing what you learned by
creating small side projects? I wanted to learn TypeScript because I love
when languages are statically typed. TypeScript was perfect for a JavaScript
developer like myself. I didn't have to learn a completely new language like C#,
which also uses static typing. I figured, since I just finished learning TS, I
might as well make an app built with it to:

1. Test my current TS skills.
2. Improve my TS skills.
3. Ensure that I do not forget anything that I learned, otherwise, learning it
would have been a complete waste of time.

## How to Use

1. On the top of the page, you will see a dropdown list of languages. Select
the language that you would like to view the page in. As of 1.1, the following
languages are supported:

    - Amharic
    - Arabic
    - Bengali
    - German
    - Spanish
    - French
    - Hindi
    - Indonesian
    - Italian
    - Japanese
    - Korean
    - Malay
    - Dutch
    - Oromo
    - Portuguese
    - Russian
    - Somali
    - Turkish
    - Ukranian
    - Urdu
    - Vietnamese
    - Mandarin Chinese

    ![Selecting a language.](/README_files/dc-select-lang.png)

2. Below you will see a table of inputs. Each row represents an individual
duration or a scale for multiplication/division. Use the slider to adjust the
number of rows.

    ![Minimum row size: 2](/README_files/dc-2-rows.png)
    ![Maximum row size: 100](/README_files/dc-100-rows.png)

3. For each row, set the duration, scale, or operand. If the currently selected
operand is a **+** or a **-**, then you will be able to set a duration for that
row; otherwise, you will be able to set a scale. The scale is for multiplying or
dividing durations.

    ![Duration Input Example](/README_files/dc-input.png)

4. Once you have finished inputing your calculables, click on the compute button
to calculate the total duration.

    ![Duration Calculation Result](/README_files/dc-result.png)

**NOTE:** the way calculation works in this application is as follows. First,
the calculation between the first and second rows are performed, which starts
the running total. Then, each subsequent row performs the appropriate calculation
with the running total.

In our example, we first add 425:31:22.753 and 116:49:01.335 together, which
equals 542:20:24.088. Next, we, subtract 22:37:28.219 from the current total,
which gives us 519:42:55.869. Then, the next row is a scale, 18.159, which we
multiply to the current total, which gives us 9437:30:50.805. Lastly, we process
the final row, which is a divisor scale of 1.678, which means we divide the
current total by the scale, which gives us the correct result of 5624:15:48.513.

Alternatively, here's a mathematically visual representation of the iterative
approach:

$$ TotalDuration = Calculable_1 + Calculable_2 $$
$$ TotalDuration = TotalDuration - Calculable_3 $$
$$ TotalDuration = TotalDuration × Calculable_4 $$
$$ TotalDuration = TotalDuration ÷ Calculable_5 $$

$$ TotalDuration = 425:31:22.753 + 116:49:01.335 = 522:20:24.088 $$
$$ TotalDuration = 522:20:24.088 - 22:37:28.219 = 519:42:55.869 $$
$$ TotalDuration = 519:42:55.869 * 18.159 = 9437:30:50.805 $$
$$ TotalDuration = \frac{9437:30:50.805}{1.678} = 5624:15:48.513 $$

In summary, calculation is not performed using PEMDAS, but through an iterative
process on the running total. During calculation, the array of Calculable objects
are iterated and processed as if it was a Linked List.

## Technologies

As noted earlier, this is a mainly frontend web application. However, there is
a tiny bit of backend involved. Below is list of languages and frameworks used:

- HTML
- CSS
- TypeScript
- React

The "tiny bit of backend" is a React library called **react-i18next**. This is
used for language translation.

As for the langauge translations themselves, almost all of them were generated
through ChatGPT. English is the original language of this application of course,
so that was written by me. The only exception was for Arabic. I translated most
of the English into Arabic by myself, since I'm also an Arabic speaker. However,
I did need to use ChatGPT sometimes, mainly for correcting the grammar, and
ensuring that vocabulary used is in a context of technology.

Initially, I wanted to have the app only in English and Arabic. But I eventually
changed my mind and wanted to generate more JSON files in other languages for
fun.

## Limitations

Since I'm still relatively new to TypeScript, I have yet to figure out all there
is about the language. I haven't figured out how to handle input validation
without an error being thrown from my class constructors. I'm still trying
to process the concept of type guarding.

Another limitation is the ability to search the app and have it first load in
your system's language instead of English by default. I can either work around
this by adding a universally recognized symbol that represents language that
indicates to any user regardless of what languages they speak that they can
select any language from the dropdown list.

One last thing to note is that since most of the translations were provided by
ChatGPT, I, who obviously does not speak all these languages, have no way of
validating them without hiring native speakers of those languages.

## Future Plans
I wish to improve this application by doing the following:

- Adding input validation for duration units and scales.

- Review translations with native speakers.

## Credits
MIT License

Copyright (c) 2024 Adnan Wazwaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.