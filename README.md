# Duration Calculator

|                      	|                                                      	|
|:--------------------:	|:----------------------------------------------------:	|
|        Author        	|                     Adnan Wazwaz                     	|
|        Version       	|                          1.0                         	|
|     Original Date    	|                   2024 September 24                  	|
| Current Version Date 	|                   2024 September 24                  	|
|   Adnanian App No.   	|                          TBD                         	|
|     [**Demo**]()     	| [**Live**](https://duration-calculator.netlify.app/) 	|

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
not taken into account when calculating total durations.

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

## Technologies

As noted earlier, this is a mainly frontend web application. However, there is
a tiny bit of backend involved. Below is list of languages and frameworks used:

- HTML
- CSS
- TypeScript
- React

The "tiny bit of backend" is a React library called **react-i18next**. This is
used for language translation.

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