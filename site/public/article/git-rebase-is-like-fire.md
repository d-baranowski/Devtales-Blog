<metadata-json>
{
    "id": "1grmC08sQCHQNqz8kBM4O1dRBW8",
    "title": "Git Rebase is like fire",
    "date": "2019-02-16T09:08:00.463Z",
    "category": "technology",
    "status": "default",
    "tags": [ "git", "version-control" ] 
}
<metadata-json>
Git rebase is like fire. In inexperienced hands in can do a lot of harm, but if its handled with care it will make your life much better. Let it help you make your projects easier to maintain.  

![Help me to help you](https://devtales.net/blog-content/help-me-to-help-you.gif)

## Scary ghost stories

When I first started using git I was told never to use git rebase because it is dangerous. After gaining experience using git someone else told me to use it. At first I tough it was blasphemy even to mention this command. However after giving it a try I could no longer live without it. It lets me keep my commit history clean and therefore much more useful. 
The danger that everyone talks about is the fact that this command rewrites history and generates new git commit tags for rebased commits. This means that if you are working on the same branch as someone else you should not rebase it because it will make it really hard to resolve git conflicts. 
Imagine you have the same commit duplicated locally on your machine and your coworkers machine. If you rebase and try to merge your changes with your co-worker's, git has no way of identifying that your version of commit is the same as your friend's version. Its id has been changed. Keep this in mind when you use rebase. You should use it on personal feature branches, but if you need to do this on a shared branch make sure that everyone is aware that you plan to do this and that everyone's changes are securely merged before proceeding. This means that rebasing master is almost never a good idea. 

## A good commit
A good commit history is invaluable for maintainability of a project. It will aid you when you come back to a project that you haven't worked on in a long time or a project that you have never seen before. Having a good commit history will allow you to understand the context in which the code has been written. That in turn will help you to understand the problems that developers have been faced with in the past and justify the design decisions they made as well as the assumptions they had. Read [this](https://chris.beams.io/posts/git-commit/) for an amazing summary of how to write a good commit message. Think about the times where you had to change the code written by someone who has already left the company. You could not ask them why did they do something the way they have done it or what were the requirements they were working towards. Now imagine that you can summon their git ghost that will tell you all the information you want to know and let you replay their thought process commit by commit. 

## Dirty commit history is technical debt
Unfortunately as we write the code we don't always have the time to spend to write good commit messages. When we are in debugging and tweaking mode we don't want to focus on elaborate git commits. Don't worry. You can have the cake and eat it! If you remember to rebase your feature branches before merging them you will have a great occasion to clean up the mess you have left before and arrange it into a clean and easy to follow list of good commits.

## What is git rebase
Git rebase is a way to rewrite git history. It allows you to remove commits, reorder commits split commits and combine them. It's a very powerful tool. It's okay If all this power is making you nervous. Allow me to put you at ease. During an interactive rebase you can --abort at any time to go back to state from before you started rebasing. This [blog post](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) gives you a very nice conceptual overview of how rebase works.

## How to split large commits
1. Checkout your feature branch.
2. Commit all your changes. Make sure git status returns 'nothing to commit, working tree clean'.
3. Start the interactive rebase. Type git rebase -i master. This will open the editor you have setup for git. That is vim by default. If you prefer more modern editors check this out to set your default editor to atom.
4. Mark the commits you want to split for editing like so: 

```
// bash //
p d0e1c498 Fix bug 'BS-1234'
e 00c0fd30 Large commit
e d0e1c498 Another large commit
e 1dc0321a This needs splitting
```

Once you are ready to proceed just safe the changes to the file and close the text editor.

1. The rebase will proceed to the first commit in the list that was marked for editing now you're able to split it.
2. First un-stage all changes in this commit by running git reset HEAD~ don't worry your changes won't get deleted. They will only get uncommitted. Now we can proceed to selecting changes for new commits after the split.
3. Add only the changes you want using git add -p and commit them the usual way.
4. When you are ready to proceed to the next commit marked for editing just run git rebase --continue and repeat steps 2 and 3.

## How to reorder messy history
As we write code we don't always follow a logical ordered path. It likely that as we write code we discover and fix new things that are not always related to the feature we are working on. Also when we start working on a feature we don't always know what to do from start to end so naturally we might take some wrong turns along the way.
If your git history looks something like this:

```
// bash //
pick d0e1c498 Work on feature one 
pick 00c0fd30 Small fix here
pick d0e1c498 Work on feature one
pick 1dc0321a Another small unrelated fix
pick 00c0fd30 Work on feature two
pick d0e1c498 Try something
pick d0e1c498 Work on feature one
pick 00c0fd30 Revert what I have tried before
```

There is nothing stopping you reordering the commits to give them a better flow. A history that is easy to follow if much more valuable. All you need to do is reorder the lines.  

```
// bash //
pick d0e1c498 Work on feature one 
pick d0e1c499 Work on feature one
pick d0e1c410 Work on feature one
pick 00c0fd30 Work on feature two
pick 1dc0321a Another small unrelated fix
pick 00c0fd30 Small fix here
pick d0e1c498 Try something
pick 00c0fd30 Revert what I have tried before
```

Sometimes we try solutions that don't really work out. Feel free to remove the commits that don't add any value since we end up reverting their changes anyway. 

```
// bash //
pick d0e1c498 Work on feature one 
pick d0e1c499 Work on feature one
pick d0e1c410 Work on feature one
pick 00c0fd30 Work on feature two
pick 1dc0321a Another small unrelated fix
pick 00c0fd30 Small fix here
```

## How to split feature branch into multiple branches
You might find that you have mixed multiple features onto a single branch. Ideally you would like to save the people who review your pull request the headache of having to review massive amounts of code. The more code you try to merge at once the more difficult it will be for other people to understand your intent and spot any problems. They will be more likely just to accept the request without giving it more than a brief glance. Don't be cruel and split your feature branches into manageable chunks. This way when the CI fails you have less code to search through for bugs. 
If you have a git history which looks like this: 

```
// bash //
pick d0e1c498 Work on feature one 
pick d0e1c499 Work on feature one
pick d0e1c410 Work on feature one
pick 00c0fd30 Work on feature two
pick 1dc0321a Work on feature two
pick 00c0fd30 Work on feature two
pick d0e1c498 Work on feature three
pick 00c0fd30 Work on feature three
```

1. Clone the branch using for each feature. 

```
// bash //
git checkout -b feature-one
git checkout -b feature-two
git checkout -b feature-three
```

2. Use git rebase -i to remove the commits that don't apply to given branch. For example branch feature one should look like this:

```
// bash //
pick d0e1c498 Work on feature one 
pick d0e1c499 Work on feature one
pick d0e1c410 Work on feature one
```

## If you fuck up
There are times when you really fuck up with git. Sometimes you override something that should not be overridden or you remove a git commit that should not be removed. Don't lose hope! Git has your back. Click [here](http://effectif.com/git/recovering-lost-git-commits) for the rescue. 

![time-reverse](https://devtales.net/blog-content/unfuck-it.gif)

## Remember the golden rule
Remember the golden rule: Don't rebase shared branches! Now that you know about rebase remember that: 

![with great power](https://devtales.net/blog-content/with-great-power.gif)
