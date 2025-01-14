export interface SprintSummary {
    sprintNumber: number;
    title: string;
    description: string;
    status: 'current' | 'upcoming' | 'planned';
    startDate: string;
  }
  
  export const roadmapData: SprintSummary[] = [
    {
        sprintNumber: 0,
        title: "Pre-release",
        description: "Cross platform desktop application, basic HTTP client with simple markdown "+
        "documentation on a per-request basis. ",
        status: "current",
        startDate: "Jan 2025"
      },
      {
      sprintNumber: 1,
      title: "Beta Launch",
      description: "Cross platform desktop application, basic HTTP client with simple markdown "+
      "documentation on a per-request basis. ",
      status: "upcoming",
      startDate: "Feb 2025"
    },
    {
      sprintNumber: 2,
      title: "Beta Round 2",
      description: "Dedicated documentation page. Generalized documentation not necessarily tied to a request.",
      status: "planned",
      startDate: "Mar 2025"
    },
    {
      sprintNumber: 3,
      title: "Beta round 3",
      description: "Open API import and export. Automatically updated documentation and OpenAPI spec when changes in requests are detected. ",
      status: "planned",
      startDate: "Apr 2025"
    },
    {
      sprintNumber: 4,
      title: "Public Beta",
      description: "Add support for environment variables, OAuth 2.0, and [TBD] third-party integrations",
      status: "planned",
      startDate: "May 2025"
    },
    {
      sprintNumber: 5,
      title: "V1.0 Release, Open Source",
      description: "Stable client, proof of concept achieved. At this point, we feel comfortable with the product and are ready to release it as open source. "+
      "From here, we will continue to iterate and improve the product based on user feedback. We will provide paid plans " +
      "for those who want to support the development of the product and enjoy a managed cloud service, but " +
      "the option to self-host will also be available. The source code will be released under the MIT license.",
      status: "planned",
      startDate: "Jun 2025"
    }
  ];
  