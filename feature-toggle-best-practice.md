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
  * When the feature toggle is off/missing the existing behaviour shouldn't change
  * Create the feature toggle before any other code
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
  * Reusing Feature Toggles
  * Using the same feature toggle on different projects
  * Hard coding feature toggles. Doing this couples deployment and release, so you don't get one of the main advantages of feature toggles. This is less of a problem if code is deployed to production in less than an hour but it is less than ideal. It is better to use a thrid party service like LaunchDarkly, then a DB then a hard coded solution

## Sources ##
https://martinfowler.com/articles/feature-toggles.html
