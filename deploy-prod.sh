#!/bin/sh
rsync -avz --exclude deploy.sh --exclude .git --exclude \*.\*~ -e ssh ./* wandb@wallandbinkley.com:wallandbinkley.com/mcc/ 
