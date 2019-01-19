#!/usr/bin/env python3

"""
Script to automate folder & file creation for challenges

Example:
  - $ python3 makeproject.py
    Num:  33
    Name: Kickass Fibonacci Sequence #5!
    URL:  http://not-important-in-this-example.com
  - creates `./→33_kickass-fibonacci-sequence-5/main.py`
            `./→33_kickass-fibonacci-sequence-5/tests.py`
"""


import os
import re

from templates import UNITTEST_TEMPLATE, FUNCTION_TEMPLATE


def make_project(num, name, url):
    os.chdir(os.sys.path[0])                 # Set CWD (make sure we're here)
    name = kebabize(name)
    dirname = f"→{num}_{name}"
    os.makedirs(dirname)
    os.chdir(dirname)
    with open('main.py', 'w') as file:
        file.write(f'"""{url}"""\n\n' + FUNCTION_TEMPLATE)
    with open('tests.py', 'w') as file:
        file.write(UNITTEST_TEMPLATE)


def kebabize(name):
    name = name.strip().lower()
    name = re.sub(r'[^a-z\d\s]+', '', name)  # Remove non-alpha characters
    name = re.sub(r'\s+', '-', name)         # Change whitespaces to dashes
    return name


def main():
    num = input('Num:  ')
    name = input('Name: ')
    url = input('URL:  ')
    make_project(num, name, url)


if __name__ == '__main__':
    main()
