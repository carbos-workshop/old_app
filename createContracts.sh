#!/bin/bash
zos add Gaia C3PO
zos session --network development --expires 3600
zos push --deploy-dependencies
c3po=$(zos create C3PO --init initialize)
zos create Gaia --args $c3po
