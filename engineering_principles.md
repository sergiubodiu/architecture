# Engineering Principles

## Ship it and iterate.
No matter how perfect a design might _seem_, the only way to _know_ whether it works is to get it in the hands of users
and see how they use it. Resist the urge to add “one more” feature and let users show you what to focus on next.

## Make changes small, make them often.
Make small, incremental changes that have a lower risk than large, irreversible deployments. Controlled, gradual rollouts
that can be easily rolled back let us find and fix problems before they become major annoyances to lots of people.
“Big bang” launches are best avoided: they significantly increase the chance something will go wrong in a big way.

## Technical debt is a useful tool.
The conscious, careful accumulation of technical debt can be a powerful tool that lets us ship the thing we’re building faster.
Don’t be afraid of it, but be deliberate about it. Just like with financial debt, we know that we need to repay it over time to avoid the interest on the debt becoming unbearable.

## Solve problems at the root.
Having a crisp collective understanding of our domain and of our code is fundamental to building high-quality systems that don’t break
and which remain as easy to change in 10 years as they are today. Break problems down into their smallest atoms and understand them deeply.
This doesn’t contradict the point about technical debt: while quick fixes and hacks are necessary and useful, understand what a “full” solution looks like.

## Do not accept deviant system behaviour.
When a system repeatedly exhibits behaviour that we can’t explain, it’s easy to become collectively accustomed to it and treat it as “normal".
This is an incredibly dangerous trap that we need to help each other fight against: in reality, far from being normal, such a system is out of control.
Take the time to investigate and understand the problem.

## Write code to be read.
The best code can distill complex ideas into something concise and easy-to-follow. When you review pull requests from your peers, remember:
if code is hard to understand, it’s probably too complex – and complex code is a breeding ground for insidious bugs.

## Write code to be debugged.
Software has bugs. This is normal. You can help yourself and your peers by thinking about how you might debug software from the get-go:
favour languages and libraries that have good introspection tools, don’t swallow errors silently, and use telemetry and logging liberally.
Use comments to explain the why and not the what.

## If you can’t show it’s a bottleneck, don’t optimise it.
Correctness is nearly always more important than performance. Because optimisation generally increases code complexity, only go after
performance when you are sure a program works correctly and is running at a sufficiently large scale that the gains will be significant.
Telemetry and profiling are the only sure ways to know where the bottlenecks are: intuition is often misleading.

## Unblock others whenever you can.
If someone is stuck, helping them is an incredibly high-value use of your time: spreading knowledge and skills levels everyone up.
If someone is waiting on you for a code review, prioritise it ahead of writing new code yourself.

## Leave the codebase better than you found it.
Any engineer can propose a change to any part of our codebase, and you’re never stepping on anyone’s toes by trying to make things better. 
