#!/bin/bash
set -e

echo "Deployment started ...showing status information"

# Pull the latest version of the app
git pull git@github.com:celestialmk/tofali_carbonfootprint_frontend.git main
echo "New changes copied to server !"


#echo "Installing Dependencies..."
#npm install

#echo "Running build"
npm run build



# Reloading Application So New Changes could reflect on webapp
echo "Tofali Carbon Footprint restart"
service nginx restart


echo "Deployment Finished!"