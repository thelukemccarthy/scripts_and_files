# Feature Toggles Good Practices #
The following is my opinion of good practice when using feature toggles. I came to these views after using feature
toggles on multiple projects and noticed teams having similar issues. Admittedly my experience with feature toggles is 
somewhat narrow. I have used feature toggles to release code into production frequently. This approach is sometimes 
called release toggles. I have used feature toggles for A/B Testing only a few features.  As for Ops Toggles, 
Permissioning Toggles or Experiment Toggles, I don't really have any experience. So if you are 
implementing feature toggles for a reason other than releasing new feature into production, at least some of what is
here might not apply to your situation. A great resources for other types of feature toggles is the [blog post on Martin 
Fowler's blog written by Pete Hodgson](https://martinfowler.com/articles/feature-toggles.html) 

## Why use Feature Toggles ##
  * Provide a safety net if a bug is found
    * Just turn the feature toggle off and the previous behaviour will take effect
  * Business requirements change
    * Leave the toggle turned off and update the feature to have the updated requirements
  * Features need to be released in two systems at the same time
    * Timing a dependant feature's release becomes trivial when it can be deployed and only released when the feature 
    toggle has been turned on. We've all been in the situation where we couldn't release because our team of a
    dependency on another system. Usually a lot of pressure was put on the team to ensure 
    the feature was delivered on time. Only to find on the day of release the dependant system can't release. 
    Without feature toggles the code would be in an unreleasable state unless you revert changes or do other painful 
    things which result in that code no longer being integrated with the new changes, or even being lost 
  * Decouples deployment from release
    * This encapsulates the points above
  * Enables trunk based development and CI (Even if you have a CI server, you're not really doing CI if you're not doing
    trunk based development, you're doing periodic/sometimes integration)
  * Less likely to have merge conflicts
    * Feature toggles allow trunk based development. With everyone continuously check in and pulling from trunk you are
    less likely to have merge conflicts. Even if you do have merge conflicts the conflicts will be smaller and easier to 
    resolve
  * Reduce the amount to time to production, fix a bug, recover a system failure
    * When done well, feature toggles reduce the risk of deploying to production. This means you can deploy on every 
    commit reducing the time to get anything into production 
  * Can be used to facilitate A/B Testing
    * With feature toggles and a thrid party service like Launch Darkly, A/B testing become quite easy. You can of 
    course do A/B testing without a thrid party service, but don't, it's harder than you think

## Why NOT use Feature Toggles ##
  * Some types of projects 
    * Machinery (cars, planes, earth move equipment etc)
    * Desktop software that needs to keep track of versions
    * Low trust environments, such as open source software. The low trust refers to the people you take pull requests 
    from and not the software. If you're taking a pull request from someone you don't know you probably want to check
    their code before it hits your trunk
    * Medical equipment
  * You don't use, or have any plan move to, trunk based development, continuous integration and continuous delivery
    * If the team is using feature branches, adding feature toggles on top, provides all the pain of both (feature 
    branches and feature toggle), with limited extra benefits of using feature toggles
  * Moves some complexity of branching into the code base
    * Branching strategies are complex, while using feature toggles reduces the complexity they don't remove the 
    complexity entirely. If the team isn't mature enough or lacks the discipline require to always implemented feature
    toggles, a lot of pain can result

## Best Practices ##
  * Feature toggle all new code (except bugs, but probably bugs too)
    * You never know what is going to change, or be found. Imagine the confidence and trust you can build when a Product
    Owner comes to you and asks to remove a feature minutes before a release, and you smile and say "No Problem" 
  * When a feature toggle is off/missing the existing behaviour shouldn't change
    * This works as a fail-safe and is less likely to cause problems in production if someone forgets to create a 
    feature toggle in the production environment 
  * Create the feature toggle before any other code
    * Going back to add a feature toggle after the code is done is much harder than adding the feature toggle as the
    first thing you do before any other code
    * If you add the feature toggle after the code is complete 
      * You might miss code that should have been toggled. This means you might not be able to turn a feature off, this 
      is a huge problem. Furthermore, adding the feature toggle later can introduce bugs and unexpected behaviour
      * You can't check your code into trunk because you don't have a feature toggle yet, as it could be released to 
      production while incomplete 
  * Make it easy for QAs to change the value of a feature toggle in a test environment
    * The QAs will want to test the that the expected behaviour with the toggle on and off. This provides a very
    high level of confidence when pushing changes to production 
  * Support different values for each environment (dev, test, prod)
    * Allowing different values for a toggle in each environment means you can release a feature into any environment
    and when you are ready. On in dev when working on a new feature, on in test when it's ready for testing and on in
    prod once it's ready for release
  * Make Feature toggles easy to remove
    * Forget DRY code, the copied copy will be deleted soon anyway 
    * Make it easy to remove so bugs aren't introduced when removing the feature toggle. This is very important as you 
    can't turn a feature off once it has been removed from the code base
  *  Remove the feature toggle as soon as possible
     * You don't want a feature toggle, around a feature toggle, around a feature toggle. Removing feature toggles as soon
     as possible helps to prevent this
  * Write unit tests for feature toggles, for both on and off
    * Wrap all tests for a feature toggle in a describe. This has the added benefit of making it easy to delete the
    relevant tests when you delete the feature toggle
    ```js
      describe('website', () => {
        describe('Given the darkmode feature is turned on', () => {
          // mock the feature toggle to be on
          // all tests for the feature being on go here 
        })
        describe('Given the darkmode feature is turned off', () => {
          // mock the feature toggle to be off
          // all tests for the feature being off go here 
        })
      })
    ```
  * Feature toggles should have good names
    * Use the business language to create a name of the feature. 'OneClickPurchase' is much better name than 'purchase' or 'temp'
  * Provide a description for each feature toggle
    * This can be very useful when to provide context to other team members or teams
  * Expose the current feature toggle configuration
    * At some point you are going to need to know the state of each feature toggle to debug or test something. This
    should be well before a crisis requires the current state of the feature toggle 
  * Toggle at the edge of a system (as soon as possible) so not to pollute the entire code base with toggle logic

## Anti Patterns ##
  * Adding the feature toggle after the code is written
    * Adding toggles after coding the feature means you are likely to have changed the existing code and possibly
      introduced bugs into both the existing code and the new code
    * You will eventually miss code that should have been toggled. When a feature needs to be toggled off you will get
      strange buggy behaviour
  * Not having automated unit test for feature toggles
    * If you have a feature toggle in your code it had better work, and having unit tests is the only way you can know
      for sure that a feature toggle works after every check in, and integration
  * Taking to long to delete a feature toggle from the code base
    * Once a feature toggle has be turned on, ideally it should be deleted in a few days to a maximum of 2 weeks
    * Once code hasn't been touched in a while people become fearful of changing it. If a feature toggle is left in the 
    code base for too long, it is less likely to be removed. This can lead to feature toggles around feature toggles, 
    losing context on what the feature toggle does and effects. All of this makes a feature toggle harder and more 
    error prone to remove
  * Not removing feature toggles
    * This is an extreme of taking to long to remove a feature toggle. This has all the drawbacks of taking to long to 
    remove a feature toggle with the added drawback of turning you code into a spaghetti mess no one can follow. This 
    will actually slow development down, increase the bug and error rate and generally make developers unhappy
  * Having many feature toggles in the system
    * Everytime code has more than one path it adds complexity. If you have a lot of feature toggles you have a lot more
    complex code than code with just a few paths
  * Making excuses why the code doesn't need a toggle
    * Sooner or later the following reasons will bite you 
      * "***This will be done before the release goes out.***" Sooner or later it won't be done and it will be your fault the 
      team can't release or worse has a production issue
      * "***The feature is so simple it won't have any bugs.***" Sometimes simple things turn out complex and it will be your 
      fault the team can't release or worse has a production issue 
      * "***The business definitely wants this by this date, so it doesn't need a feature toggle.***" Who hasn't had the business
      change a requirement without notice and the last second? Save yourself the stress and put a toggle around it
  * Feature toggles having non-descript names
    * Use the business language to create a name of the feature. 'OneClickPurchase' is much better name than 'purchase'
    or 'temp'
  * Reusing Feature Toggles
    * If you reuse feature toggles you run the risk of
      * Turning on a feature in production before it is ready
      * Linking two features together that will almost certainly need to be release at different times 
  * Using the same feature toggle instance on different projects
    * Even if you have a frontend that requires a new feature in a second system, you shouldn't use the same feature 
    toggle. If you turn on a toggle, and it turns on the feature for both projects you run the risk of causing a
    concurrency problem. With all feature toggle services you should expect some delay between turning a toggle on and
    the toggle actually being turned on in production. That time can vary, so if the same feature toggle is used in two
    projects it is possible for a feature to be turned on in a system the dependant system and off in the supporting
    system
    * Just like our code we don't want to lump together different concerns. Each system should have its own sandbox for
    the feature toggle values. It reduces confusion when turning on a toggle. If more than one system is using the same
    sandbox how do you know which system you're turning the feature on for?
    * What happens if someone in another team changes the value of a feature toggle or deletes it. Have a sandbox for 
    each project or sandbox and only give permissions to team members that actively work or support on the system 
  * Hard coding feature toggles
    * Doing this couples deployment and release, so you don't get one of the main advantages
    of feature toggles. This is less of a problem if the code is deployed to production in no more than an hour, however it is less 
    than ideal. It is better to use a third party service like LaunchDarkly, then a DB then a config file, then hard coded solution
    * "If your feature flag system doesn't support runtime configuration then you may have to restart the process you're
    testing in order to flip a toggle, or worse re-deploy an artifact into a testing environment. This can have a very
    detrimental effect on the cycle time of your validation process, which in turn impacts the all important feedback
    loop that CI/CD provides." Source: https://martinfowler.com/articles/feature-toggles.html
  * Having a feature toggled turned on in prod but off in testing environments
    * This can lead to integration issues and problems only being found in production 

## Sources ##
https://martinfowler.com/articles/feature-toggles.html  
https://trunkbaseddevelopment.com/feature-flags/  
https://jessitron.com/2021/03/27/those-pesky-pull-request-reviews/
