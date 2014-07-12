#!/bin/bash
for A in `find . -name *.coffee`; do 
	git add $A
	coffee -cbw $A &
done;
for A in `find . -name *.html`; do 
	git add $A
done;
for A in `find . -name *.txt`; do 
	git add $A
done;
for A in `find . -name *.jpg`; do 
	git add $A
done;
for A in `find . -name *.png`; do 
	git add $A
done;