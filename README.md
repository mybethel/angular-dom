Angular DOM
===========

A set of re-usable components for manipulating the DOM in an Angular app. All
components are written without any dependencies including jQuery.

This is a very early iteration of the component library. Tests and sample code
as well as additional components will be added in time.

Currently, the following components are available:

## Equalizer

Force two elements to match height. By default, all first level children are
equalized. Optionally, a CSS selector can be passed as an argument.

## Sticky element

Creates a sticky or floating element which is confined to it's parent. Uses
include a floating header or sidebar that should follow the user as they scroll.
An optional `offset` parameter can be used to indicate the distance from the
top when the sticky status is toggled.
