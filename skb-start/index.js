var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4ZWYyMjJmYjc0ZDAwMTFiZTgyZDEiLCJ1c2VybmFtZSI6Imljb2Rlci54eGlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE0NzgwMjkwOTJ9.RO9T8fgBlLp81JZ2GBuq1ZCHZzvmIhb-sYLz4HTE8ZU';
var skb = new Skb(token);
skb.taskHelloWorld('Чуваки, вы классные! Замечательная идея с курсом!');
