#!/bin/bash

# Run tests
npm run test || { echo "Tests failed, stopping."; exit 1; }

# Version, commit, push, and publish
npm version patch || { echo "Versioning failed, stopping."; exit 1; }
git add . || { echo "Git add failed, stopping."; exit 1; }
git commit -m "pub" || { echo "Git commit failed, stopping."; exit 1; }
git push origin main || { echo "Git push failed, stopping."; exit 1; }
npm publish --access public || { echo "Publishing failed, stopping."; exit 1; }

echo "All steps completed successfully."