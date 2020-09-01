<metadata-json>
{
    "id": "1groQapveQBGQ6JsIKl4rQCaH0o",
    "title": "How not to start a blog",
    "date": "2019-02-16T09:08:00.463Z",
    "category": "approach",
    "status": "default",
    "tags": [ "software project", "scope" ] 
}
<metadata-json>

As a young and passionate software developer I have a tendency to try to solve EVERY problem through writing a piece of code. When I decided to start a blog writing my own solution was only natural. 

## Invent problems
Software developers love solving problems, and when there are no problems to solve we love inventing our own. I stay reasonable when working on real projects, so I decided to let go when working on the blog in my spare time. Following this 'logic', when I was faced with a challenge of writing a blog with 99% of static content React was an obvious choice. I did consider using server side rendered templates using Thymeleaf or other similar technologies, but that would be boring and no one likes boring projects. 
Since I was using React I really needed to make it a polymorphic application. SEO is a big factor for a Blog and rendering my JS sites on the server will help to make my website easier to crawl. I could render my react component server side on Node Express, but I already did that on one of my previous projects. There is an amazing alternative in Java 8 called Nashorn. It lets me render my react components on the JVM! What could possibly go wrong? 
Next thing to add to my tech stack is a tool which will make contacting the Database easier. I could use an off the shelf ORM like Hibernate. That however  has performance cost! I can't afford to risk that on my blog! Another option would be to write my SQL by hand. This approach will lead to code that is difficult to maintain, as it violates the DRY principle. Writing my own reflections based SQL generator was the only 'reasonable' option at this stage.

## Live with them
After picking the most interesting tech stack I could think of, and setting myself some ambitious requirements I started to write my blog. As I was adding code I was growing more eager to write blog posts. At first It was great! I was learning new things and discovering interesting solutions to various problems. I did a simple POC for my home made ORM and it worked out great. The first couple simple pages I wrote in react were rendering on Nashorn without many issues. 
After a while my initial excitement with the new technologies slowly gave way to frustration.
The polymorphic react application was introducing new complexity to the project. I didn't only have to write code that will work when rendered on the server, but I also had to make the same code provide the same functionality when ran solely on the client. As requirements grew more complicated, so did my ORM code. I found that I was spending more time writing my ORM implementation than I was on actual implementation code for the blog. When It comes to Nashorn, it turned out to be worryingly slow and impossible to debug. With all of these issues I was forced to push the release date further and further away. 
I ended up having to cut many features out of the scope of the project and focus solely on the MVP. I listened to the silent voice of reason and used the JPA instead of my own ORM implementation to save time. Nashorn is still causing more problems than it solves.

## Conclusion
From developer's perspective I loved being able to learn new things and sharpening my technical skills. From the Client's perspective I was frustrated at how long it took to complete. Even after such a long time, there are still many features and improvements that need to be done in order to make this website fully functional. 
I only invested my own time into this project, but it let me empathise with people who also invest their money into software.
When you find yourself bringing new technologies into projects you work on always remember that every new technology has costs associated with it. It brings complexity and requires everyone on the team to learn something. Make sure to asses if it will solve more problems than it will cause. It could be that you are trying to shoot a flea with a shotgun.
