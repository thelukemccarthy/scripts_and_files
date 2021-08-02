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
  * 

## Best Practices ##
  * Feature toogle all new code (except bugs)
  * Create the feature toggle before any other code
  * Make Feature toggles easy to remove, forget DRY code
  * 

## Anti Patterns ##
  * Not removing feature toggles
  * Not having automated unit test for feature toggles
  * Adding the feature toogle after the code is written
  * Reusing Feature Toggles
  * Using the same feature toggle on different projects
  * 

## Sources ##
https://martinfowler.com/articles/feature-toggles.html
