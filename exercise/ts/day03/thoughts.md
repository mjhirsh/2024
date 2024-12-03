Have been eyeing the property tests with intrigue and trepidation

The first test I added, was for testing if we can create a gift and
fc.record seemed good from fast-check docs. It then made more
sense to wrap the parameters of prepareGift (reference to day01).

From there it flowed pretty easily, was expecting more of a struggle,
as the basic example seemed a bit tricky at first on the docs when I
looked at it on day00.
assignToChild and recommendations are for another day

Left Santa a failing test so he can start setting and getting attributes.
(Just wanted to have another go at writing a property test)

Todo:
Separate gift test and santaWorkshopService tests?
Type arguments to prepareGift better!
