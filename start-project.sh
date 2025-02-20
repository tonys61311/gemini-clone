#!/bin/bash

# 確保腳本在當前腳本所在目錄運行
cd "$(dirname "$0")"

echo "Installing dependencies..."
# npm install

echo "Starting the project..."
npm run dev &

echo "Waiting for the development server to start..."
sleep 10

echo "Opening the browser..."
if which xdg-open > /dev/null
then
  xdg-open http://localhost:5173/
elif which gnome-open > /dev/null
then
  gnome-open http://localhost:5173/
elif which open > /dev/null
then
  open http://localhost:5173/
else
  echo "Could not detect the web browser to open. Please open http://localhost:5173/ manually."
fi

wait
