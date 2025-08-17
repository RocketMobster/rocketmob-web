#!/bin/bash

# Skip type checking
export NEXT_SKIP_TYPESCRIPT_CHECK=true

# Update site version from changelog
node scripts/updateSiteVersion.js

# Build with Next.js
next build

# Create root redirect
node scripts/createRedirect.js

echo "Build completed successfully!"
