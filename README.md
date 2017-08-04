Architecture
===================

It's been said that "software is eating the world", with lower start-up costs and a vastly expanded market for online services, the result is a global economy that for the first time will be fully digitally wired — the dream of every cyber-visionary of the early 1990s, finally delivered, a full generation later. Each organization’s cloud adoption journey is unique. In order to successfully execute your adoption, you need to understand your organization’s current state, the target state, and the transition required to achieve the target state. Knowing this will help you set goals and create work streams that will enable staff to thrive in the cloud.

Software architecture diagrams are a great way to explain and document how a software system works, yet software development teams waste time and money because they struggle to communicate software architecture. The diagrams are also disconnected from the code, which limits their usefulness for architectural improvement. Static diagrams, whether drawn on a whiteboard or with a general purpose diagramming tool such as Microsoft Visio, tend to get out of date quickly and often don't reflect the real structure of the code. On the other hand, automatically generated diagrams, such as UML class diagrams created by reverse-engineering the code, typically show far too much detail, limiting their usefulness.

Modernization Journey
-----------------------
Industry trend shows the need to ensure that both business and technical stakeholders understand how cloud adoption will impact their owned and managed capabilities, hence we see the following stages on the modernization journey
### Crawl
  - Invest in engineering thought leadership
  - Focus on shipping product
  - Microservices & Cloud strategy definition

### Walk
  - Invest in Lean mindset and practices
  - DevOps adoption
  - Microservices & Cloud implementation
  - On-demand releases
  - Establish baseline metrics

### Run
  - Spread talent across organization
  - Manage to metrics
  - Optimize and Extend

Three Main Lessons of Cloud Migration
-------------------------------------
Netflix journey to the cloud began in August of 2008, when they experienced a major database corruption and for three days could not ship DVDs to our members. Completing the Netflix Cloud Migration in early [January, 2016][1], after seven years of diligent effort, they have finally completed their cloud migration and shut down the last remaining data center bits used to stream services their streaming service!

### 1. Cloud Native architecture
  - Service-Based architecture
  - NoSQL Databases

### 2. Embrace Cloud Native Operations
  - DevOps
  - AMI deployments
  - Simian Army drills

### 3. Evolve into a Cloud Native Organization
  - New Skillset
  - Minimal Process
  - Empower Dev Teams
  
AWS Cloud Adoption Framework
Cloud adoption requires that fundamental changes are discussed and considered across the entire organization, and that stakeholders across all organizational units—both outside and within IT—support these changes. The [AWS Cloud Adoption Framework][2] (AWS CAF) provides guidance that supports each unit in your organization so that each area understands how to update skills, adapt existing processes, and introduce new processes to take maximum advantage of the services provided by cloud computing.

Availability Percentage calculation
-----------------------------------
Availability is usually expressed as a percentage of uptime in a given year. The following table shows the downtime that will be allowed for a particular percentage of availability, presuming that the system is required to operate continuously. Service level agreements often refer to monthly downtime or availability in order to calculate service credits to match monthly billing cycles. The following table shows the translation from a given availability percentage to the corresponding amount of time a system would be unavailable. Uptime and availability can be used synonymously, as long as the items being discussed are kept consistent. That is, a system can be up, but its services are not available, as in the case of a network outage.

|Availability % | Downtime per year |	Downtime per month |Downtime per week |	Downtime per day
| :---    |     ---:      |           ---: |          ---: |         ---: |
|     99% | 3.65 days     | 	  7.20 hours |	  1.68 hours | 14.4 minutes |
|   99.9% | 8.76 hours 	  |   43.8 minutes |	10.1 minutes | 1.44 minutes |
|  99.95% | 4.38 hours 	  |  21.56 minutes |	5.04 minutes | 43.2 seconds |
|  99.99% | 52.56 minutes | 	4.38 minutes |	1.01 minutes | 8.64 seconds |

Whiteboard
-----------------
Sketching out software architecture diagrams on a whiteboard is probably the starting point for many of us. Although it's quick to get started, the resulting diagrams are often erased because somebody else needs to use the whiteboard. Taking a photo of the whiteboard allows you to at least capture the sketches, but that resulting photo isn't something you can update easily. Whiteboards are a great tool for sketching out ideas, but the result is a collection of transient, static diagrams.

Documentation
----------------
This is the definition of the supplementary documentation (a collection of content in Markdown or AsciiDoc, and accompanying images). Documentation consists of a number of different possible sections, each of which takes the form of a separate piece of Markdown or AsciiDoc content. Structurizr diagrams can be embedded into the documentation sections too.

General purpose diagramming tools
---------------------------------
There are a number of popular general purpose diagramming tools available that software teams typically use for creating software architecture diagrams. These include Microsoft Visio, OmniGraffle, draw.io, Creately, Gliffy, Lucidchart, etc. The key strength of a general purpose diagramming tool is that you can create almost any type of diagram you can imagine. You usually also have full control over what every element on your diagram canvas looks like because aspects such as element size, element alignment, line thickness, font size, text alignment, etc are all almost infinitely customisable. General purpose diagramming tools give you a lot of power.

[1]: netflix/Netflix.md
[2]: https://d0.awsstatic.com/whitepapers/aws_cloud_adoption_framework.pdf
