# Feature Toggles Best Practice #

## Advantages ##

## Disadvantages ##
  * Adds complexity

## Why use Feature Toggles ##
  * Provide a safety net if a bug is found
    * Just turn the feature toggle off and the previous behaviour will take effect
  * Business requirements change
    * Leave the toggle turned off and update the feature to have the updated requirements
  * Features need to be released in two systems at the same time
    * Timing a dependant feature's release becomes trivial when it can be deployed and only released when the feature 
    toggle has been turned on. We've all been in the situation where we couldn't release because our team was ready to 
    release a feature that had a dependency on another system. Usually a lot of pressure was put on the team to ensure 
    the feature was delivered on time. Only to find on the day of release that out dependant system can't release. 
    Without feature toggles the code is now in an unreleasable state unless you revert changes or do other painful 
    things which result in that code no longer being integrated or even being lost 
  * Decouples deployment from release
  * Enables trunk based development and CI (you're not really doing CI if you're not doing trunk based development, 
  you're doing periodic/sometimes intergration)
  * Less likely to have merge conflicts
  * Reduce the amount to time to production, fix a bug, recover a system failure
  * Can be used to facilitate A/B Testing

## Why NOT to use Feature Toggles ##
  * You don't use, or have any plan move to, trunk based development, continuous integration and continuous deployment
    * If the team is using feature branches, adding feature toggles on top, provides all the pain of both (feature 
    branches and feature toggle), with limited extra benefits of using feature toggles
  * Moves some complexity of branching into the code base
    * Branching strategies are complex, moving to feature toggles doesn't completely remove all the complexity. If 
    the team isn't mature enough or lacks the discipline require to always implemented feature toggles a lot of pain can 
    be the result.

## Best Practices ##
  * Feature toggle all new code (except bugs)
  * When a feature toggle is off/missing the existing behaviour shouldn't change.
    * This works as a fail safe and is less likely to cause problems
  * Create the feature toggle before any other code
    * Going back to add a feature toggle after the code is done is much harder than adding the feature toogle as the
    first thing you do before any other code
    * If you add the feature toggle after the code is complete 
      * You might miss code that should have been toggled. This can introduce bugs and unexpected behaviour
      * You can't check your code into trunk because you don't have a feature toogle yet 
  * Make it easy for QAs to change the value in a test environment
  * Support different values for each environment (dev, test, prod)
  * Make Feature toggles easy to remove
    * Forget DRY code 
    * Make it easy to remove so bugs aren't introduced when removing the feature toogle
  * Write unit tests for feature toggles, for both on and off
    * Wrap test all test for a feature toggle in a describe('When feature toggle x is on/off', () => {})
  * Remove the feature toggle as soon as possible
    * You don't want a feature toggle around a feature toggle around a feature toggle, removing feature toggles as soon 
    as possible helps to prevent this
  *  Feature toggles should have good names
    * Use the business language to create a name of the feature. 'OneClickPurchase' is much better name than 'purchase' or 'temp'
  * Provide a description for each feature toggle
    * this can be very useful when to provide context to other team members or teams
  * Expose the current featrue toggle configuration
    * At some point you are going to need to know the state of each feature toggle to debug or test something.
  * Toggle at the edge of a system (as soon as possible) so not to poulate the entire code base with toggle logic

## Anti Patterns ##
  * Taking to long to delete a feature toogle from the code base.
    * Once a feature toggle has be turned on, ideally it should be deleted in a few days to a maximum of 2 weeks
    * Once code hasn't been touched in a while people become fearful of changing it. If a feature toggle is left in the 
    code base for too long, it is less likely to be removed. This can lead to feature toggles around feature toggles, 
    losing context on what the feature toggle does and effects. All of this makes a feature toggle even harder and more 
    error prone to remove
  * Not removing feature toggles
    * This is an extreme of taking to long to remove a feature toggle. This has all the drawbacks of taking to long to 
    remove a feature toggle with the added drawback of turning you code into a spaghetti mess no one can follow. This 
    will actually slow development down, increase the bug and error rate and generally make developers unhappy
  * Having many feature toggles in the system
    * Everytime code has more than one path it adds complexity. If you have a lot of feature toggles you have a lot more
    complex code than code with one a few paths.
  * Not having automated unit test for feature toggles
    * If you have a feature toggle in your code it had better work, and having unit tests is the only way you can know 
    for sure that a feature toggle works after every check in, and integration. 
  * Adding the feature toggle after the code is written
  * Making excuses as to why the code doesn't need a toggle
    * Sooner or later the following reasons will bite you 
      * This will be done before the release goes out
      * The feature is so simple it won't have any bugs
      * The business definitely wants this by this date, so it doesn't need a feature toggle
  * Feature toggles having non-descript names
    * Use the business language to create a name of the feature. 'OneClickPurchase' is much better name than 'purchase'
    or 'temp'
  * Reusing Feature Toggles
    * If you reuse feature toggles you run the risk of
      * Turning on a feature in production before it is ready
      * Linking two features together that will almost certainly need to be release at different times 
  * Using the same feature toggle instance on different projects
    * Even if you have a frontend that requires a new feature in a second system you shouldn't use the same feature 
    toggle. If you turn on a toggle, and it turns on the feature for both projects you run the risk of causing a
    concurrency problem. With all feature toggle services you should expect some delay between turning a toggle on and
    the toggle actually being turned on in production. That time can vary, so if the same feature toggle is used in two
    projects it is possible for a feature to be turned on in a system the dependant system and off in the  
  * Hard coding feature toggles. Doing this couples deployment and release, so you don't get one of the main advantages
  of feature toggles. This is less of a problem if code is deployed to production in less than an hour, however it is less 
  than ideal. It is better to use a third party service like LaunchDarkly, then a DB then a config file, then hard coded solution
    * "If your feature flag system doesn't support runtime configuration then you may have to restart the process you're
    testing in order to flip a toggle, or worse re-deploy an artifact into a testing environment. This can have a very
    detrimental effect on the cycle time of your validation process, which in turn impacts the all important feedback
    loop that CI/CD provides." Source: https://martinfowler.com/articles/feature-toggles.html
  * Having a feature toggled turned on in prod but off in testing environments.
    * This can lead to integration issues and problems only being found in production. 

## Sources ##
https://martinfowler.com/articles/feature-toggles.html  
https://trunkbaseddevelopment.com/feature-flags/  
