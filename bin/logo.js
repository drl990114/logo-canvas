#!/usr/bin/env node
const { createCanvas, loadImage } = require('canvas')
const { Logo } = require('../dist')
const canvas = createCanvas(200, 200)
const logo = new Logo({ canvas })
logo.save()
