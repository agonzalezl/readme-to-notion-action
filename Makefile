SHELL := /bin/bash

default:
	@echo "Usage:"
	@echo "  make build          | build dist package"

build:
	ncc build index.js --license licenses.txt
