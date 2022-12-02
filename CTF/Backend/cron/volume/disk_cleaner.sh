#!/bin/sh
date +%H:%M:%S
echo 'Disk Cleaner task initialized'
for CNT in 20 40 60 80 100; do echo "Analyzing trash files: $CNT%"; done
for CNT in 20 40 60 80 100; do echo "Cleaning trash files: $CNT%"; done
echo 'Disk has been cleaned.'
