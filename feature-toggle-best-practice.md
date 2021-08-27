# Feature Toggles Best Practice #

## Advantages ##

## Disadvantages ##
  * Adds complexity

## Why use Feature Toggles ##
  * Safety net if bug found
  * Business requirements change
  * features needs to be released in two systems at the same time
  * Decouples deployment from release
  * Enables trunk based development and CI (you're not really doing CI if you're not doing trunk based development, you're doing periodic/sometimes intergration)
  * Less likely to have merge conflicts

## Best Practices ##
  * Feature toogle all new code (except bugs)
  * When a feature toggle is off/missing the existing behaviour shouldn't change.
    * This works as a fail safe and is less likely to cause problems
  * Create the feature toggle before any other code
    * Going back to add a feature toggle after the code is done is much harder than adding the feature toogle as the first thing you do before any other code
    * If you add the feature toggle after the code is complete 
      * You might miss code that should have been toggled. This can introduce bugs and unexpected behaviour
      * You can't check your code in trunk because you don't have a feature toogle yet 
  * Make Feature toggles easy to remove
    * forget DRY code. 
    * Make it easy to remove so bugs aren't introduced when removing the feature toogle
  * Write unit tests for feature toggles, for both on and off
    * Wrap test all test for a feature toggle in a describe('When feature toggle x is on/off', () => {})
  * Remove the feature toggle as soon as possible
    * You don't want a feature toggle around a feature toggle around a feature toggle, removing feature toggles as soon as possible help to prevent this 

## Anti Patterns ##
  * Not removing feature toggles
  * Not having automated unit test for feature toggles
  * Adding the feature toogle after the code is written
  * Making excuses as to why the code doesn't need a toggle
    * Sooner or later the following reasons will bite you 
      * This will be done before the release goes out
      * The feature is so simple it won't have any bugs
      * The business definitely wants this by this date so it doesn't need a feature toggle
  * Reusing Feature Toggles
    * If you reuse feature toggles you run the risk of
      * Turning on a feature in production before it is ready
      * Linking two features together that will almost cerntainly need to be release at firrent times 
  * Using the same feature toggle instance on different projects
    * Even if you have a frontend that requires a new feature in a second system you shouldn't use the same feature toggle. If you turn on a toggle and it turns on the feature for projects you run the risk of causing a concurrency problems. With all feature toggle services you should expect some delay between turning a toggle on and the toggle actually being turn on in production. That time can vary so if the same feature toggle is used in two projects it is possible for a 
  * Hard coding feature toggles. Doing this couples deployment and release, so you don't get one of the main advantages of feature toggles. This is less of a problem if code is deployed to production in less than an hour but it is less than ideal. It is better to use a thrid party service like LaunchDarkly, then a DB then a hard coded solution
  * Having a feature toggled turned on in prod but off in testing environments. This can lead to integration issues and problems only being found in production. 
## Sources ##
https://martinfowler.com/articles/feature-toggles.html
