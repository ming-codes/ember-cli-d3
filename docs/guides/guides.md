
# Introduction

`ember-cli-d3` is an Ember addon to aid with integrating D3 data visuals into Ember application. Like D3 itself, it is not the goal of this project be become a widget library. Therefore, there are no data visuals packaged along with the addon. Pre-built data visuals will be available as part of the gallery as a starting point for you to get started. They are, however, will not be officially maintained.

# Getting Started

The first thing you'll need is to install the addon. TODO

# Concepts and Principles

`ember-cli-d3` follows the composiblity pattern of D3 while at the same time utilizes Ember's HTMLBars templates. The result is a very expressive composibility pattern that's also not too foreign to D3 people. This makes integrating existing D3 plugins and library a breeze.

# Core Classes

There are few classes that are considered to be core and will be used by most data visuals.

## `data-visual` Component

You'll need a `data-visual` component to act as a container for your visual. For the most part, this component is just an SVG element that also yields properies: `svg`, `width`, and `height`.

`width` and `height` are the dimensions of the SVG container. Use these to calculate positioning of the inner content. They are bound properties and will update accordly when its size changes.

`svg` is a "magic" object. Accessing properties on this object will create a `<g>` element under the `<svg>` with class name automatically set. Property access can be nested. `svg.chart.axis` will create `<svg><g class="chart"><g class="axis"></g></g></svg>`.

## `d3-support` Mixin

All components that are going to render SVG elements must implement this mixin. There is only 1 method on it that must be implemented: `call`. The `call` method will be invoked with `select` element as argument, passed in as a D3 selection.

## `join` util

## `graph` Test Helper
