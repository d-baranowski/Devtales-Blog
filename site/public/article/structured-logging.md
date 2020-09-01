<metadata-json>
{
    "id": "1grZp90FUiP4F24zJWLpDWN48X8",
    "title": "Structured Logging",
    "date": "2020-08-31T10:35:25.794Z",
    "category": "technique",
    "status": "default",
    "tags": [ "logs", "operations", "monitoring", "alerting" ] 
}
<metadata-json>


## Introduction

This article aims to give pointers on how to design effective logs for your applications. 
In a world of growing complexity, a carefully designed logging strategy is crucial to
the successful operation of distributed systems.

## Motivation for good logs
While under development we can use debugging and unit tests to discover and fix issues. 
Due to this it is easy for a developer to forget or undervalue sufficient, smart logging. 
Metrics and logs are our only insight into systems running in production. 
Reliance on replicating issues in "dev" to understand them can be a symptom of insufficient logging.
Some problems will only manifest in production environments or in unusual circumstances. 

## Writing good logs
When working on a production issue every minute counts. Good logs can make all the difference in these situations.  

Good logs are:
- Easy to access
- Easy to read
- Easy to understand


### How to make logs easy to access
While logging to a file might be sufficient in monolithic systems that run on a single or very few machines, 
this isn't the case anymore.
Many modern systems run on distributed ephemeral environments. Logging to a file on a host in such circumstances is
 bad practice for following reasons: 

- When the host gets terminated the logs might be lost
- It's hard to find the relevant logs since there are many potential hosts

In order to make logs easy to access make use of [log aggregation tools](https://opensource.com/article/18/9/open-source-log-aggregation-tools).  
Being able to find all the logs in a single place and query them effectively can save thousands of pounds when
resolving a production issue. 
Engineers working on the system will need to be trained in how to access and use these tools.

### How to make logs easy to read    
Try to make each log's line stand alone and not be reliant on previous log lines for context. 
When searching through logs aggregated from many sources log lines will not appear in order and it might be easy
to miss important context information. Also you might filter out some log lines which could potentially obscure context.   

- In micro-service architectures it's especially important to create a logging standard to ensure consistent logging across teams and projects.
- Make use of JSON logs to allow for appending useful metadata and make them easier to query. 
- Catch errors and log them out in a meaningful way. 
- Do not rely on huge stack traces where a well written log line would suffice.   

### How to make logs easy to understand 
- Make use of [tracing ids](https://microservices.io/patterns/observability/distributed-tracing.html) to identify how a single request makes its way through a distributed system. 
The tracing id should be generated once and then passed between involved services. 
This way we'll be able to get all logs related to a single request even across multiple services.
- Include a way to identify host machine in your logs where applicable. 
Sometimes issues are related to a specific host machine or a limited subset of host machines. 
In order to understand that type of issue, this information needs to be easily available in each log. 
- Consider using hardcoded unique log ids for each log line. 
This way you'll be able to quickly find which line of code the log originated from. Some logging libraries include source code file name and line number automatically. 
- Include timestamp and log level. 
- Consider restricting number of log levels to make it easier to find logs. 
For example, including warnings as a valid log level can lead to ambiguity. What is a warning vs error? 
If it's a warning but we never need to react to it should it really be a warning?
- Don't log anything a human can't read.  
- Do not log personally identifiable information (PII).
- Log relevant metadata such as elapsed time for long running operations.
