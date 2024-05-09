#!/bin/sh
set -e

echo "Starting SSH ..."
/usr/sbin/sshd

npx serve build