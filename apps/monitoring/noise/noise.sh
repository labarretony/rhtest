#!/bin/bash

while true
do
    curl rhapi:8080/api/rechercher?mode=all
    curl rhapi:8080/api/rechercher?mode=all
    curl rhapi:8080/api/rechercher
    sleep 1
done