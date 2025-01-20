import Link from "next/link";
import HttPeteArticle from "../article";

const articleContent :string= `# The Technical Case for HttPete

Let's be honest - we're all tired of dealing with fragmented tooling and outdated documentation. As developers, we spend countless hours jumping between different tools, updating specs that should be automated, and searching through multiple sources just to understand why something was built the way it was. HttPete is our answer to this chaos.

## The Current Development Reality

Here's what most of us deal with daily:
\`\`\`
# Common Developer Workflow Pain Points:
> Context switch to Postman/Insomnia for API testing
> Manually update OpenAPI specs after changes
> Search through Git history for context
> Hunt down documentation across multiple systems
> Try to remember why we made certain decisions
# Common failure points:
# - Outdated OpenAPI specs
# - Missing documentation updates
# - Lost historical context
# - Inconsistent environment variables
\`\`\`

These issues create a cascade of technical problems:
- Divergence between API implementation and specification
- Incomplete or outdated documentation
- Lost context around technical decisions
- Environment inconsistencies across team members
- Fragmented testing approaches

## HttPete: A Developer-First Solution

Let's break down how HttPete solves these technical challenges:

### Intelligent Request Tracking

\`\`\`
# Traditional API Development Flow:
> Make changes to endpoint
> Remember to update OpenAPI spec
> Update documentation (maybe)
> Update tests
> Push changes
# Common issues:
# - Forgotten spec updates
# - Inconsistent documentation
# - Lost test coverage

# HttPete Flow:
> Make changes to endpoint
> HttPete detects changes automatically
> Suggests spec updates based on actual usage
> Links tests to documentation
> Maintains historical context
# Benefits:
# - Automated spec synchronization
# - Integrated documentation
# - Test coverage tracking
\`\`\`

## **Core Technical Features**

### **OpenAPI & Postman Import**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGZw7zN9rEqfrFUsmBQNZvWCVLogRb8Jp3wjxz)

- Full OpenAPI 3.0+ compatibility
- Seamless Postman collection import
- Environment variable management
- Post-MVP:
    - Intelligent spec generation from requests
    - Automatic schema inference

### **Advanced Markdown Documentation**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGcPYTivVcNCGlMUr8oLsjD5AdbiTF6BvywHZX)

- **Full Markdown Support**: Including GFM extensions
- **Code Highlighting**: Support for all major languages
- **Mermaid Integration**: For diagrams and flows
- Post MVP:
    - Custom extensions for API-specific documentation
    - Automated documentation generation from code

### **Powerful API Client**

![image.png](https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGXYfHKz33NHk4dJ5chUTljsPFyBCGK8rAp2Ox)

- **Advanced Request Configuration**:
  - Custom scripts pre/post request
  - Environment variable management
  - Request chaining
  - Response validation
- Post MVP:
    - GraphQL support
    - WebSocket testing
    - gRPC integration

### **Real-time Spec Synchronization**

\`\`\`
# Technical Implementation:
> Request interceptor tracks actual API usage
> Diff engine compares against current spec
> Automatic schema inference
> Conflict resolution system
# Advanced features:
# - Custom validation rules
# - Schema evolution tracking
# - Breaking change detection
\`\`\`

### **Knowledge Graph Architecture**

- Graph-based storage for documentation relationships
- Bidirectional linking between docs, tests, and code
- Full text search with technical context
- Post MVP:
    - AI-powered relationship inference
    - Automated knowledge clustering

### **Developer-First Collaboration**

- Git-style version control for docs
- Conflict resolution system
- Diff viewer for documentation changes
- Post-MVP:
    - Branch-based documentation workflow
    - PR integration

## **Technical Architecture**

HttPete is built with a focus on extensibility:
\`\`\`
# Core Components:
> Request Interceptor
  # - Captures API calls
  # - Tracks schema changes
  # - Manages environments
> Documentation Engine
  # - Markdown processing
  # - Real-time preview
  # - Custom extensions
> Knowledge Graph
  # - Relationship tracking
  # - Search indexing
  # - Context management
> Test Integration
  # - Test discovery
  # - Coverage tracking
  # - Result aggregation
\`\`\`

## **Open Source Commitment**

Coming June 2025, HttPete will be fully open-source:
- MIT licensed
- Extensible plugin system
- Custom renderer support
- GraphQL API for integrations
- Docker deployment support

### Technical Roadmap

Post v1.0 plans include:
\`\`\`
# Near-term:
> GraphQL support
> WebSocket testing
> Custom extension API
> Branch-based docs

# Long-term:
> AI-powered documentation
> Schema inference engine
> Automated testing
> Custom renderers
\`\`\`

### Contributing

While we're not taking contributions yet, we're building with extensibility in mind. Our architecture will support:
- Custom documentation renderers
- Plugin system for new features
- Test runner integrations
- CI/CD integrations

Join our developer community:
- =[Discord](https://discord.gg/ur7RB6XydJ) for technical discussions
- =[Reddit](https://www.reddit.com/r/httpete/) for feature requests
- =[LinkedIn](https://www.linkedin.com/company/httpete) for updates`;

const MakingOurCase = () => {
  return (
    <>
    <div className="container sticky top-4 mx-auto mt-4">
      <Link href="/" className="p-2" style={{textDecoration: 'none'}}> 
        <span  className="text-red-400">← Go Back</span>
      </Link>
    </div>
      <div className="container mx-auto">
        <HttPeteArticle articleContent={articleContent}/>
      </div>
    </>
  );
};

export default MakingOurCase;