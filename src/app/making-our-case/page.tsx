import Link from "next/link";
import HttPeteArticle from "./article";
const articleContent :string= `
# The Case for HttPete

Picture the workflow of the average developer. We know this changes a lot based on personal preference and the specific contexts, but you can replace any of them by any given variation, our point remains the same. 

We’ve highlighted the steps “fixed” by industry standard solutions with a ✅, and ❓are potential failure points and opportunities for information to go out of synch (seealso: dirty).  It mostly goes like this:

\`\`\`
> Some arbitrary amount meetings of any given flavor of agile happens
# Design and product documents are created, and placed into Tickets
> Developer checks Ticketing system, referencing Figma and Docs website
> Opens Editor, works on code 
>> In the process:
>>> Changes public api payloads causing breaking change
# ✅ Developer updates OpenAPI spec
>>> Changes model and applies migrations to development database
# ❓The reasons for changing must be documented elsewhere, if at all.
# One could argue it could be included in the OpenAPI spec, but our
# **opinionated** stance is that is not the right place for it.
>>> Finishes by writing tests, ensuring major use cases are covered
# ✅Tests serve as a sort of documentation, if well written
> Commit code 
# ✅ Ideally, we have branch rules and documentation to act as reference for newcomers,
# can be kept in readme.md
> Confluence to create functional or business related documentation
# ❓Room for divergence from OpenAPI spec
> Bitbucket to create and manage PR
# ❓At this point, code may have changed due to PR comments, documentation may not have 
# been updated
> PR Merged, Build goes through pipeline
# ✅ Build process information can be stored in markdown in repo
> Application successfully built, running in some cloud provider

... Some months fly by, a wild bug appears; Original contributor is no longer in the picture, new developer picks up the Ticket
> Opens Ticketing system, checks for associated PR
> Opens Documentation system to check original requirements
> Opens source control tool, explores commit changes and affected files
> Run the application locally and access OpenAPI page, get context
> Start exploring code, making changes and experimenting
> ...
> Bug is fixed, changed endpoint and model once more, applying another migration
# ❓May or may not update OpenAPI spec
# ❓May or may not update model documentation
> Commits code
> Creates PR
# ❓Code might change, may or may not update OpenAPI spec and/or docs
> PR Merged, application deployed
\`\`\`

Some of us don’t like admitting it, but we are human and have flaws. We fail, constantly. So we need to make sure our systems, processes and tools are prepared for our failures. 

As developers, we tend to hop between tools all the time, and have accepted this as the status quo. We believe it’s about time someone stepped in to intervene, so we’re doing it ourselves.

Here’s what we propose instead:

\`\`\`
> Some amount of any given flavor of agile meetings happen
# ✅ Design and product documents are created, and placed into HttPete
> ⏱️Developer searches for ticket reference in HttPete, getting access to:
- Feature specification docs
- Related endpoints
- Past contributors (people who may know some useful information)
-- Link to view all docs authored by each contributor
> Opens Editor, works on code 
>> In the process:
>>> Changes public api payloads causing breaking change, uses HttPete to call said
>>> endpoints, having immediate access to documentation and changing it as the feature
>>> is built
# ✅ Developer may or may not update OpenAPI spec here, depending on many factors
# ✅ HttPete detects changes in the endpoints, and provides a warning if OpenAPI spec 
# is not updated. If it is, HttPete automatically updates the Endpoint definitions 
# and associated documents.
>>> Changes model and applies migrations to development database
# ✅ Using HttPete's markdown editor - developer specifies **why** the changes were 
# applied. The "what changed" part is HttPete's job to figure out, developer 
# focuses on the why.
>>> Finishes by writing tests, ensuring major use cases are covered
# ✅ Tests serve as a sort of documentation, if well written
# ✅ HttPete detects tests associated with a request, and indexes that information as 
# part of what the user can see in the HttPete client, making tests *searchable*
> Commit code 
# ✅ Ideally, we have branch rules and documentation to act as reference for newcomers,
# can be kept in readme.md
# ✅ Developers can opt for a readme.md or a dedicated page on HttPete.
# If branch rules information is in markdown format, HttPete can index that data
# and show it.
> Confluence to create functional or business related documentation
# ✅ Functional documentation is created in HttPete
> Bitbucket to create and manage PR
# ✅If changes are detected during a PR, HttPete ensures the documentation is coherent
# with the code
> PR Merged, Build goes through pipeline
# ✅Build process information can be stored in markdown in repo
# ✅Once again, this can be either a markdown file or a dedicated page
> Application successfully built, running in some cloud provider

... Some months fly by, a wild bug appears; Original contributor is no longer in the picture, new developer picks up the Ticket
> Opens Ticketing system, checks for associated PR
# ✅From the PR information, developer searches HttPete for issue, immediately receives:
# - Associated functional and product documents
# - Associated Endpoints, each with a dedicated document
# - Associated tests in codebase
# - A history of changes, with quick access to **why** things changed over time
⏱️[OBSOLETE]> Opens Documentation system to check original requirements
⏱️[OBSOLETE]> Opens source control tool, explores commit changes and affected files
⏱️[OBSOLETE]> Run the application locally and access OpenAPI page, get context
> Start exploring code, making changes and experimenting
> ...
> Bug is fixed, changed endpoint and model once more, applying another migration
# ✅HttPete detects model change, notifies of missing documentation
# 'Doc Missing' flag turned on until manual override by authorized user
# When overriding, user must specify a reason.
> Commits code
> Creates PR
# ✅HttPete ensures changes are documented, notifies otherwise.
# 'Doc Missing' flag turned on until manual override by authorized user
> PR Merged, application deployed
# ✅HttPete detects the release and generates release notes and/or slack/discord 
# notifications
\`\`\`

In a nutshell, our mission is to centralize knowledge once and for all, and give developers a tool that can help save time and make the process less painful. By eliminating the friction between testing APIs and documenting them, we believe we can allow developers to finally be able to trust their documentation. 

## **Main Features**

### **OpenAPI & Postman Import**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGZw7zN9rEqfrFUsmBQNZvWCVLogRb8Jp3wjxz)

- Import your existing OpenAPI specifications or Postman collections to get a head start. This feature ensures a smooth transition and immediate productivity gains.
- Post-MVP:
    - Intelligent generation of documents on import

### **Rich Markdown Documentation**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGcPYTivVcNCGlMUr8oLsjD5AdbiTF6BvywHZX)

- **Flexible Content Creation**: Craft detailed markdown documents for each endpoint, incorporating images, diagrams, and custom content beyond the limitations of standard specifications. This flexibility allows for richer, more informative documentation.
- Post MVP:
    - Intelligent generation - Generate documentation from endpoint information, with context

### **Built-in API Client**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGXYfHKz33NHk4dJ5chUTljsPFyBCGK8rAp2Ox)

- **Integrated Testing Environment**: Test your API endpoints directly within HttPete. Embed responses into your documentation and automatically track necessary environment variables, creating a cohesive testing and documentation experience.
- Post MVP:
    - Pre and post request scripts
    - Generate OpenAPI specs from HttPete information

### **Dynamic Specification Updates**

- HttPete detects changes in your API requests and notifies of pending changes. Optionally, it also updates the OpenAPI specification accordingly. This dynamic synchronization ensures your documentation reflects the current state of your API, reducing manual updates and potential errors.
- Post-MVP:
    - Extensive version control
    - Assistant: Use AI to track changes contextually, and make informed decisions on what to document and when

### **Centralized Documentation Management**

- Manage both endpoint-specific and general documentation in a dedicated, organized tab. This centralization simplifies access and maintenance, promoting consistency across your API documentation. This also ties every type of documentation together in a single platform, and makes it indexed and searchable.
- Post MVP:
    - Intelligent generation of Documents, Diagrams, and more.

### **Collaboration & Version Control**

- Collaboration across members of an organization, and access management features.
- Post-MVP:
    - Version Control
    - Comments
    - Advanced Sharing options

## **Why HttPete?**

We don’t see a future where AI replaces programmers, at least not yet. We do see, however, a future where knowledge continues to grow exponentially in value, and keeping track of it in a format that is easily searchable - not just by humans, but also AI - becomes mission critical. In this future, developers will need their tools to be data-first, and provide as much flexibility as, ironically enough, humanly possible.

Developers often find themselves juggling multiple tools, one for testing APIs, another for documentation, and perhaps more for collaboration. This fragmented approach not only hampers current productivity, but it is also incompatible with the way we see the future happening.

HttPete was born out of the need for a unified solution that treats documentation and knowledge management as a first-class citizen, right alongside API testing, without forcing any compromises on the rest of the workflow. By consolidating these essential tasks into one platform, HttPete streamlines your tasks, reduces context switching, and ensures your API documentation is always up-to-date and readily accessible.

## **Open Source**

At the moment, the code for HttPete is closed source. However, we will open-source the code for the HttPete desktop client at the moment of v1.0, which we expect to be in June 2025. Until then, we will keep working on the code privately, whilst doing small closed beta rounds with selected users. If you’d like to take part in the Beta program as an early adopter, please sign up using the [button on the hero section of our website](https://httpete.dev)

### Why not open-source right now?

Ever hear the expression “too many cooks in the kitchen”? We’re a little worried about that. For now, we want to stay faithful to our initial vision, and iterate based on direct user feedback.

### Why Open Source at All?

We believe having the ability to write code is like a superpower, and by keeping our source code to ourselves we’d be denying the community the opportunity to exercise their superpowers. 

Good tools are all about extensibility and tailored configurations. Unfortunately, we only have so much time to implement features, and will never be able to implement everything. But just because we can’t, **it doesn’t mean you can’t.** Anyone, from any place or any creed, will be free to grab the code for HttPete and start extending it to their needs, and never owe us a single penny.

Over time, HttPete will evolve in the direction its maintainers see as ‘best’ - but ‘best’ is subjective, and we may make mistakes along the way. We will actively seek and listen to feedback from the community, and will welcome contributions with open arms - provided they genuinely improve the experience of the end user - but if at any point you see things differently, you can just grab the code and run it yourself from there.

The beauty of open-source is the instant conflict resolution that the fork button provides. We not only acknowledge, but welcome that. We’ll take competition over drama any day of the week.

### Contributing

For now, we’re not taking any active contributions. Once v1.0 launches, we will open up contributions on Github.

Until then, the best way of supporting HttPete is by joining our online communities on =[Discord](https://discord.gg/ur7RB6XydJ) and =[Reddit](https://www.reddit.com/r/httpete/), and following our =[LinkedIn](https://www.linkedin.com/company/httpete) page
`
const MakingOurCase = () => {
  return (
    <>
    <div className="container sticky top-4 mx-auto mt-4">
      <Link href="/" className="p-2" style={{textDecoration: 'none'}}> 
        <span  className="text-red-400">← Go Back</span>
      </Link>
    </div>
      <div className="container mx-auto">
        <HttPeteArticle articleContent={articleContent} />
      </div>
    </>
  );
};

export default MakingOurCase;