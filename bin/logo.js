#!/usr/bin/env node
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var test = 1;

	console.log(test);

}));
