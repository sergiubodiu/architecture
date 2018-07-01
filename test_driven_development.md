# Why Test Driven Development?

* To avoid over-engineering, to constrain ourselves
* To make it impossible to write untestable code
* To make make us think about object interfaces
* To know when we're done
* To convince the customer that the app works most of the time
* To keep high coverage
* To communicate your intent with the other members of your team
* To make continuous incremental progress
* To spend less time manually testing
* To make code more testable
* To keep focus on the requirements
* To make debugging easier or avoid the need for debugging
* To be able to easily identify bugs when needed
* To support refactoring, developers embrace/allow/give courage for change
* More cohesive objects
* Forces decoupling/reduced dependencies/better OO design
* It is harder to test highly coupled, non-cohesive code, so TDD deters you from writing it.
* Because it's easier to describe how something *should* work than to *make* it work
* Creates a living document/executable documentation
* Builds a safety net for your code
* Time spent is more stable/consistent productivity/predictable
* Prevents growth of code debt
* Allows you to check in often
* Allows you to switch team members, even without finishing a feature
* Ability to delete code safely
* Frees up QA to spend their time doing more important testing
* Know the tests are testing something (red first/falsify tests)
* Encourages sharing of knowledges; reduces silos/areas of expertise
* Makes sure you know what you're doing before you start
* Reduces the need for super-human discipline and vigilance on good OO design
* Promotes excellent test coverage

## What is our definition of a test in the context of TDD?
1. Executable description of code behavior
1. Description of how code should behave

## What is our definition of production code in the context of TDD?
1. An implementation that satisfies all tests at a given time
1. That that is sufficient for the tests to pass
